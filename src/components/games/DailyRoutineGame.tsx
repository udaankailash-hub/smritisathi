import React, { useState, useEffect } from 'react';
import { GameDifficulty, GameSessionResult } from '../../types';
import { sound } from '../../services/sound';
import { voice } from '../../services/voice';
import { gameEngine } from '../../services/gameEngine';
import { getLevelConfig } from '../../data/gameConfigurations';
import { GameControlStrip } from './GameControlStrip';
import { CalendarCheck, ArrowUp, ArrowDown, CheckCircle2, Sparkles, Clock } from 'lucide-react';

interface RoutineStep {
  id: number;
  correctOrder: number;
  title: string;
  emoji: string;
  timeHint: string;
}

const MASTER_ROUTINE_STEPS: RoutineStep[] = [
  { id: 1, correctOrder: 1, title: 'Wake Up & Drink Warm Water', emoji: '💧', timeHint: '07:00 AM' },
  { id: 2, correctOrder: 2, title: 'Morning Garden Walk & Air', emoji: '🌳', timeHint: '07:30 AM' },
  { id: 3, correctOrder: 3, title: 'Brew Hot Assam CTC Tea', emoji: '☕', timeHint: '08:30 AM' },
  { id: 4, correctOrder: 4, title: 'Read Newspaper & Puzzles', emoji: '📰', timeHint: '09:30 AM' },
  { id: 5, correctOrder: 5, title: 'Evening Call with Family', emoji: '👨‍👩‍👧', timeHint: '05:30 PM' },
];

interface DailyRoutineGameProps {
  difficulty: GameDifficulty;
  onComplete: (result: Omit<GameSessionResult, 'id' | 'patientId' | 'startedAt' | 'completedAt' | 'synced'>) => void;
  onExit?: () => void;
}

export const DailyRoutineGame: React.FC<DailyRoutineGameProps> = ({
  difficulty,
  onComplete,
  onExit,
}) => {
  const [steps, setSteps] = useState<RoutineStep[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [movesCount, setMovesCount] = useState(0);

  const levelNumber = difficulty === 'hard' ? 4 : difficulty === 'medium' ? 3 : 2;
  const levelConfig = getLevelConfig('game_daily_routine_recall', levelNumber);
  const stepCount = levelConfig.itemCount; // e.g. 2, 3, 4, or 5 steps

  useEffect(() => {
    gameEngine.startSession('p_abeni_01', 'game_daily_routine_recall', difficulty, levelNumber);

    const activeSubset = MASTER_ROUTINE_STEPS.slice(0, stepCount);
    // Shuffle steps ensuring not already in correct order
    let shuffled = [...activeSubset].sort(() => 0.5 - Math.random());
    while (shuffled.every((s, i) => s.id === activeSubset[i].id) && stepCount > 1) {
      shuffled = [...activeSubset].sort(() => 0.5 - Math.random());
    }

    setSteps(shuffled);
    setIsCompleted(false);
    setMovesCount(0);

    voice.speak('Put the daily activities in order from what happens first in the morning to last.', 'en');
  }, [difficulty]);

  const moveStep = (index: number, direction: 'UP' | 'DOWN') => {
    if (isCompleted || isPaused) return;
    sound.playClick();
    const newSteps = [...steps];
    const targetIdx = direction === 'UP' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newSteps.length) return;

    const temp = newSteps[index];
    newSteps[index] = newSteps[targetIdx];
    newSteps[targetIdx] = temp;

    setSteps(newSteps);
    setMovesCount((m) => m + 1);

    // Check if sorted
    const isSorted = newSteps.every((s, i) => s.correctOrder === i + 1);
    if (isSorted) {
      sound.playSuccess();
      setIsCompleted(true);
      gameEngine.recordAttempt(true);
      voice.speak('Excellent routine sequencing! Everything is in perfect daily order.', 'en');
    }
  };

  const handleFinish = () => {
    const session = gameEngine.completeSession(
      'p_abeni_01',
      'game_daily_routine_recall',
      'Daily Routine Story Sequencing',
      difficulty,
      levelNumber
    );

    onComplete({
      gameId: 'game_daily_routine_recall',
      gameTitle: 'Daily Routine Story Sequencing',
      category: 'DAILY_RECALL',
      difficulty,
      durationSeconds: session.durationSeconds,
      score: session.performanceScore,
      accuracy: session.accuracy,
      attempts: session.attempts,
      responseTimeMs: session.responseTimeMs,
      notes: session.notes,
    });
  };

  const handleRepeatInstruction = () => {
    gameEngine.recordInstructionRepeat();
    voice.speak('Arrange your morning activities from first to last using the arrow buttons.', 'en');
  };

  const handleNeedHelp = () => {
    gameEngine.recordHelpTriggered();
    gameEngine.recordHintUsed('Sorted the first morning step into place');
    // Place first item in correct slot
    const firstItem = steps.find((s) => s.correctOrder === 1);
    if (firstItem) {
      const remaining = steps.filter((s) => s.id !== firstItem.id);
      setSteps([firstItem, ...remaining]);
      voice.speak('We placed the first morning step at the top for you.', 'en');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top Header Card */}
      <div className="bg-[#101F31] border border-[#243A50] rounded-3xl p-5 shadow-xl flex flex-wrap items-center justify-between gap-4 text-[#F4F8FC]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-teal-500/20 text-teal-300 border border-teal-500/40 flex items-center justify-center">
            <CalendarCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider font-bold text-[#38D9C5]">
              {levelConfig.label}
            </div>
            <h3 className="text-base font-black">
              Arrange {stepCount} Daily Activities in Chronological Order
            </h3>
          </div>
        </div>

        <div className="text-xs font-bold text-[#7F91A6]">
          Moves: <span className="text-white font-black">{movesCount}</span>
        </div>
      </div>

      {/* Routine Steps List (Large 72px+ Touch Reordering Targets) */}
      <div className="space-y-3">
        {steps.map((step, idx) => {
          const isCorrectPosition = step.correctOrder === idx + 1;
          return (
            <div
              key={step.id}
              className={`p-4 sm:p-5 rounded-2xl border-2 flex items-center justify-between gap-4 transition-all duration-200 ${
                isCompleted || isCorrectPosition
                  ? 'bg-emerald-950/40 border-emerald-500/60 shadow-xs'
                  : 'bg-[#101F31] border-[#243A50]'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="w-9 h-9 rounded-xl bg-[#14283D] border border-[#243A50] flex items-center justify-center text-sm font-black text-[#38D9C5]">
                  {idx + 1}
                </span>
                <span className="text-3xl sm:text-4xl">{step.emoji}</span>
                <div>
                  <h4 className="text-base sm:text-lg font-black text-white">{step.title}</h4>
                  <span className="text-xs font-semibold text-[#7F91A6] flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Typical Time: {step.timeHint}
                  </span>
                </div>
              </div>

              {!isCompleted && (
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    disabled={idx === 0 || isPaused}
                    onClick={() => moveStep(idx, 'UP')}
                    className="w-12 h-12 rounded-xl bg-[#14283D] hover:bg-[#162B40] disabled:opacity-30 border border-[#243A50] text-[#38D9C5] flex items-center justify-center transition active:scale-95 cursor-pointer"
                    title="Move earlier"
                  >
                    <ArrowUp className="w-5 h-5" />
                  </button>
                  <button
                    disabled={idx === steps.length - 1 || isPaused}
                    onClick={() => moveStep(idx, 'DOWN')}
                    className="w-12 h-12 rounded-xl bg-[#14283D] hover:bg-[#162B40] disabled:opacity-30 border border-[#243A50] text-[#38D9C5] flex items-center justify-center transition active:scale-95 cursor-pointer"
                    title="Move later"
                  >
                    <ArrowDown className="w-5 h-5" />
                  </button>
                </div>
              )}

              {isCompleted && (
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mr-2" />
              )}
            </div>
          );
        })}
      </div>

      {/* Completion Button */}
      {isCompleted && (
        <button
          onClick={handleFinish}
          className="w-full py-4 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-black text-base rounded-2xl shadow-xl shadow-teal-500/20 active:scale-95 transition cursor-pointer"
        >
          Complete Daily Routine Activity
        </button>
      )}

      {/* Standardized Bottom Control Strip */}
      <GameControlStrip
        onRepeatInstruction={handleRepeatInstruction}
        onNeedHelp={handleNeedHelp}
        onTogglePause={() => setIsPaused(!isPaused)}
        onExit={onExit || (() => {})}
        onUseHint={handleNeedHelp}
        isPaused={isPaused}
      />
    </div>
  );
};
