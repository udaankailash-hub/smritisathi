/**
 * MementoCare AI - Deterministic, Explainable Adaptive Engine
 * Strictly Non-Diagnostic: Measures interaction signals, not disease progression.
 */

export function calculatePerformanceScore({
  accuracy = 100,
  normalizedSpeed = 80,
  consistency = 80,
  assistanceEfficiency = 90,
}) {
  const weighted =
    accuracy * 0.45 +
    normalizedSpeed * 0.25 +
    consistency * 0.2 +
    assistanceEfficiency * 0.1;
  return Math.round(Math.min(100, Math.max(0, weighted)));
}

export function evaluateAdaptation(currentDifficulty = 'easy', metrics = {}) {
  // Fatigue / Distress / Human Pause Override
  if (metrics.patientRequestedPause || metrics.fatigueDetected) {
    return {
      action: 'OFFER_BREAK',
      recommendedDifficulty: 'easy',
      explanation: 'You seem tired or asked for a pause. Taking a short relaxing break.',
      offerHumanSupport: true,
    };
  }

  const score = calculatePerformanceScore(metrics);

  if (score >= 85) {
    const nextDiff = currentDifficulty === 'easy' ? 'medium' : 'hard';
    return {
      action: 'INCREASE',
      recommendedDifficulty: nextDiff,
      score,
      explanation: 'The next activity has been adjusted slightly forward based on confident recent interaction.',
    };
  } else if (score >= 70) {
    return {
      action: 'MAINTAIN',
      recommendedDifficulty: currentDifficulty,
      score,
      explanation: 'Interaction pace is steady and comfortable. Maintaining current level.',
    };
  } else if (score >= 50) {
    const nextDiff = currentDifficulty === 'hard' ? 'medium' : 'easy';
    return {
      action: 'REDUCE_SLIGHTLY',
      recommendedDifficulty: nextDiff,
      score,
      explanation: 'Giving you extra time and clearer prompts to keep the session relaxing.',
    };
  } else {
    return {
      action: 'SIMPLIFY_AND_SUPPORT',
      recommendedDifficulty: 'easy',
      score,
      explanation: 'Switching to gentle guided mode with voice assistance.',
      offerHumanSupport: true,
    };
  }
}
