import { GameDifficulty } from '../types';

export interface PerformanceInput {
  accuracy: number; // 0 to 100
  normalizedSpeed: number; // 0 to 100 (100 = optimal fast, 0 = very slow)
  consistency: number; // 0 to 100
  assistanceEfficiency: number; // 0 to 100 (100 = no hints used, lower if multiple hints)
  patientRequestedPause?: boolean;
  distressSignal?: boolean;
}

export interface AdaptationResult {
  performanceScore: number;
  currentDifficulty: GameDifficulty;
  recommendedDifficulty: GameDifficulty;
  action: 'INCREASE' | 'MAINTAIN' | 'REDUCE_SLIGHTLY' | 'SIMPLIFY_AND_SUPPORT' | 'OFFER_BREAK';
  explanation: string;
  offerHint: boolean;
  repeatInstructions: boolean;
  offerHumanSupport: boolean;
}

/**
 * MementoCare AI Explainable Adaptive Engine
 * Formula:
 * performanceScore = accuracy * 0.45 + normalizedSpeed * 0.25 + consistency * 0.20 + assistanceEfficiency * 0.10
 *
 * Rules:
 * 85–100 -> Increase difficulty by one level
 * 70–84  -> Maintain current difficulty
 * 50–69  -> Reduce difficulty slightly, offer optional hint
 * Below 50 -> Simplify activity, slow down, repeat instructions, offer human support
 *
 * If patient requested pause or distress signal -> Maintain difficulty, show break option, no forced completion.
 */
export function calculatePerformanceScore(input: PerformanceInput): number {
  const score =
    input.accuracy * 0.45 +
    input.normalizedSpeed * 0.25 +
    input.consistency * 0.20 +
    input.assistanceEfficiency * 0.10;
  return Math.min(100, Math.max(0, Math.round(score)));
}

export function evaluateAdaptation(
  currentDifficulty: GameDifficulty,
  input: PerformanceInput
): AdaptationResult {
  const performanceScore = calculatePerformanceScore(input);

  // Safety & Comfort check: pause or distress overrides progression
  if (input.patientRequestedPause || input.distressSignal) {
    return {
      performanceScore,
      currentDifficulty,
      recommendedDifficulty: currentDifficulty,
      action: 'OFFER_BREAK',
      explanation: 'Break or caregiver assistance offered to ensure calm, unhurried comfort.',
      offerHint: false,
      repeatInstructions: false,
      offerHumanSupport: true,
    };
  }

  if (performanceScore >= 85) {
    const nextDiff: GameDifficulty =
      currentDifficulty === 'easy' ? 'medium' : 'hard';
    const explanation =
      nextDiff !== currentDifficulty
        ? `Activity engagement is strong (${performanceScore}%). Progressing to ${nextDiff} to provide gentle, engaging stimulation.`
        : `Activity engagement remains consistently high (${performanceScore}%). Maintaining top engagement level.`;

    return {
      performanceScore,
      currentDifficulty,
      recommendedDifficulty: nextDiff,
      action: 'INCREASE',
      explanation,
      offerHint: false,
      repeatInstructions: false,
      offerHumanSupport: false,
    };
  } else if (performanceScore >= 70) {
    return {
      performanceScore,
      currentDifficulty,
      recommendedDifficulty: currentDifficulty,
      action: 'MAINTAIN',
      explanation: `Difficulty maintained at ${currentDifficulty} because interaction performance (${performanceScore}%) is within the expected steady range.`,
      offerHint: false,
      repeatInstructions: false,
      offerHumanSupport: false,
    };
  } else if (performanceScore >= 50) {
    const prevDiff: GameDifficulty =
      currentDifficulty === 'hard' ? 'medium' : 'easy';
    return {
      performanceScore,
      currentDifficulty,
      recommendedDifficulty: prevDiff,
      action: 'REDUCE_SLIGHTLY',
      explanation: `Adjusting difficulty to ${prevDiff} and offering gentle hints to keep activities relaxing and supportive.`,
      offerHint: true,
      repeatInstructions: false,
      offerHumanSupport: false,
    };
  } else {
    return {
      performanceScore,
      currentDifficulty,
      recommendedDifficulty: 'easy',
      action: 'SIMPLIFY_AND_SUPPORT',
      explanation: `Simplifying activity, providing voice repetition, and offering comforting caregiver connection.`,
      offerHint: true,
      repeatInstructions: true,
      offerHumanSupport: true,
    };
  }
}
