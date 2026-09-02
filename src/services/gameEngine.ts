import { GameDifficulty } from '../types';
import { calculatePerformanceScore, evaluateAdaptation, AdaptationResult } from './adaptiveEngine';
import { offlineSync } from './offlineSync';

export type GameLifecycleState =
  | 'READY'
  | 'INSTRUCTION'
  | 'PLAYING'
  | 'PAUSED'
  | 'COMPLETED'
  | 'EVALUATED'
  | 'SAVED'
  | 'SYNCED';

export type AnalyticsEventType =
  | 'GAME_STARTED'
  | 'INSTRUCTION_PLAYED'
  | 'INSTRUCTION_REPEATED'
  | 'HINT_USED'
  | 'ANSWER_SUBMITTED'
  | 'GAME_PAUSED'
  | 'GAME_RESUMED'
  | 'GAME_COMPLETED'
  | 'GAME_EXITED'
  | 'SESSION_SAVED'
  | 'SESSION_SYNCED';

export interface GameAnalyticsEvent {
  id: string;
  sessionId: string;
  eventType: AnalyticsEventType;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface StandardGameSessionData {
  sessionId: string;
  eventId: string;
  patientId: string;
  gameId: string;
  gameType: string;
  difficulty: GameDifficulty;
  levelNumber: number;
  startedAt: string;
  completedAt: string;
  durationSeconds: number;
  attempts: number;
  correctAnswers: number;
  incorrectAnswers: number;
  accuracy: number;
  responseTimeMs: number;
  hintsUsed: number;
  repeatInstructionCount: number;
  helpUsed: boolean;
  completionStatus: 'COMPLETED' | 'PAUSED_BY_USER' | 'ABORTED';
  performanceScore: number;
  adaptation: AdaptationResult;
  offlineStatus: boolean;
  syncStatus: 'PENDING' | 'SYNCED';
  notes?: string;
}

class GameEngine {
  private activeState: GameLifecycleState = 'READY';
  private currentSessionId: string | null = null;
  private currentEventId: string | null = null;
  private startTime: number = Date.now();
  private analyticsEvents: GameAnalyticsEvent[] = [];
  private hintsCount: number = 0;
  private repeatInstructionCount: number = 0;
  private helpUsed: boolean = false;
  private attemptsCount: number = 0;
  private correctCount: number = 0;
  private incorrectCount: number = 0;

  public startSession(patientId: string, gameId: string, difficulty: GameDifficulty = 'easy', level: number = 1): string {
    this.activeState = 'PLAYING';
    this.startTime = Date.now();
    this.currentSessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    this.currentEventId = `evt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    this.hintsCount = 0;
    this.repeatInstructionCount = 0;
    this.helpUsed = false;
    this.attemptsCount = 0;
    this.correctCount = 0;
    this.incorrectCount = 0;

    this.logEvent('GAME_STARTED', { patientId, gameId, difficulty, level });
    return this.currentSessionId;
  }

  public recordAttempt(isCorrect: boolean, latencyMs: number = 1500) {
    this.attemptsCount += 1;
    if (isCorrect) {
      this.correctCount += 1;
    } else {
      this.incorrectCount += 1;
    }
    this.logEvent('ANSWER_SUBMITTED', { isCorrect, latencyMs, attempts: this.attemptsCount });
  }

  public recordHintUsed(hintText?: string) {
    this.hintsCount += 1;
    this.logEvent('HINT_USED', { totalHints: this.hintsCount, hintText });
  }

  public recordInstructionRepeat() {
    this.repeatInstructionCount += 1;
    this.logEvent('INSTRUCTION_REPEATED', { count: this.repeatInstructionCount });
  }

  public recordHelpTriggered() {
    this.helpUsed = true;
    this.logEvent('GAME_PAUSED', { reason: 'HELP_REQUESTED' });
  }

  public pauseSession() {
    this.activeState = 'PAUSED';
    this.logEvent('GAME_PAUSED', {});
  }

  public resumeSession() {
    this.activeState = 'PLAYING';
    this.logEvent('GAME_RESUMED', {});
  }

  public completeSession(
    patientId: string,
    gameId: string,
    gameType: string,
    difficulty: GameDifficulty,
    levelNumber: number = 1,
    customDurationMs?: number
  ): StandardGameSessionData {
    this.activeState = 'COMPLETED';
    const durationMs = customDurationMs || (Date.now() - this.startTime);
    const durationSeconds = Math.max(1, Math.round(durationMs / 1000));
    
    const accuracy = this.attemptsCount > 0
      ? Math.round((this.correctCount / this.attemptsCount) * 100)
      : 100;

    const normalizedSpeed = Math.max(10, Math.min(100, Math.round(100 - (durationSeconds * 1.5))));
    const assistanceEfficiency = Math.max(20, 100 - (this.hintsCount * 20 + this.repeatInstructionCount * 10));

    const adaptation = evaluateAdaptation(difficulty, {
      accuracy,
      normalizedSpeed,
      consistency: 88,
      assistanceEfficiency,
    });

    const isOffline = !offlineSync.isOnline();

    const sessionData: StandardGameSessionData = {
      sessionId: this.currentSessionId || `sess_${Date.now()}`,
      eventId: this.currentEventId || `evt_${Date.now()}`,
      patientId,
      gameId,
      gameType,
      difficulty,
      levelNumber,
      startedAt: new Date(this.startTime).toISOString(),
      completedAt: new Date().toISOString(),
      durationSeconds,
      attempts: this.attemptsCount || 1,
      correctAnswers: this.correctCount,
      incorrectAnswers: this.incorrectCount,
      accuracy,
      responseTimeMs: Math.round(durationMs / Math.max(1, this.attemptsCount)),
      hintsUsed: this.hintsCount,
      repeatInstructionCount: this.repeatInstructionCount,
      helpUsed: this.helpUsed,
      completionStatus: 'COMPLETED',
      performanceScore: adaptation.performanceScore,
      adaptation,
      offlineStatus: isOffline,
      syncStatus: isOffline ? 'PENDING' : 'SYNCED',
      notes: `Session evaluated. ${adaptation.explanation}`,
    };

    this.activeState = 'EVALUATED';
    this.logEvent('GAME_COMPLETED', {
      score: sessionData.performanceScore,
      accuracy: sessionData.accuracy,
      durationSeconds,
    });

    // Save to Offline Sync Outbox Queue
    offlineSync.saveLocalSession({
      id: sessionData.sessionId,
      patientId: sessionData.patientId,
      gameId: sessionData.gameId,
      gameTitle: gameType,
      category: 'MEMORY' as any,
      difficulty: sessionData.difficulty,
      startedAt: sessionData.startedAt,
      completedAt: sessionData.completedAt,
      durationSeconds: sessionData.durationSeconds,
      score: sessionData.performanceScore,
      accuracy: sessionData.accuracy,
      attempts: sessionData.attempts,
      responseTimeMs: sessionData.responseTimeMs,
      synced: !isOffline,
      notes: sessionData.notes,
    });

    this.activeState = isOffline ? 'SAVED' : 'SYNCED';
    return sessionData;
  }

  public logEvent(eventType: AnalyticsEventType, metadata?: Record<string, any>) {
    const event: GameAnalyticsEvent = {
      id: `evt_log_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      sessionId: this.currentSessionId || 'general',
      eventType,
      timestamp: new Date().toISOString(),
      metadata,
    };
    this.analyticsEvents.push(event);
  }

  public getAnalyticsEvents(): GameAnalyticsEvent[] {
    return [...this.analyticsEvents];
  }

  public getState(): GameLifecycleState {
    return this.activeState;
  }
}

export const gameEngine = new GameEngine();
