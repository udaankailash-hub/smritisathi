class AdaptiveEngine {
  /// MementoCare AI Explainable Adaptive Scoring Formula:
  /// performanceScore = accuracy * 0.45 + normalizedSpeed * 0.25 + consistency * 0.20 + assistanceEfficiency * 0.10
  static int calculatePerformanceScore({
    required double accuracy, // 0.0 to 100.0
    required double normalizedSpeed, // 0.0 to 100.0
    required double consistency, // 0.0 to 100.0
    required double assistanceEfficiency, // 0.0 to 100.0
  }) {
    final double raw = accuracy * 0.45 +
        normalizedSpeed * 0.25 +
        consistency * 0.20 +
        assistanceEfficiency * 0.10;
    return raw.clamp(0.0, 100.0).round();
  }

  static Map<String, dynamic> evaluateAdaptation({
    required String currentDifficulty,
    required double accuracy,
    required double normalizedSpeed,
    required double consistency,
    required double assistanceEfficiency,
    bool patientRequestedPause = false,
    bool distressSignal = false,
  }) {
    final int score = calculatePerformanceScore(
      accuracy: accuracy,
      normalizedSpeed: normalizedSpeed,
      consistency: consistency,
      assistanceEfficiency: assistanceEfficiency,
    );

    if (patientRequestedPause || distressSignal) {
      return {
        'score': score,
        'recommendedDifficulty': currentDifficulty,
        'action': 'OFFER_BREAK',
        'explanation': 'Activity paused to prioritize comfort and restful pacing.',
        'offerHint': false,
        'offerHumanSupport': true,
      };
    }

    if (score >= 85) {
      final String nextDiff = currentDifficulty == 'easy' ? 'medium' : 'hard';
      return {
        'score': score,
        'recommendedDifficulty': nextDiff,
        'action': 'INCREASE',
        'explanation': 'Strong engagement ($score%). Progressing to $nextDiff level.',
        'offerHint': false,
        'offerHumanSupport': false,
      };
    } else if (score >= 70) {
      return {
        'score': score,
        'recommendedDifficulty': currentDifficulty,
        'action': 'MAINTAIN',
        'explanation': 'Difficulty maintained because performance ($score%) is within expected range.',
        'offerHint': false,
        'offerHumanSupport': false,
      };
    } else if (score >= 50) {
      final String prevDiff = currentDifficulty == 'hard' ? 'medium' : 'easy';
      return {
        'score': score,
        'recommendedDifficulty': prevDiff,
        'action': 'REDUCE_SLIGHTLY',
        'explanation': 'Adjusting to $prevDiff level and offering gentle hints.',
        'offerHint': true,
        'offerHumanSupport': false,
      };
    } else {
      return {
        'score': score,
        'recommendedDifficulty': 'easy',
        'action': 'SIMPLIFY_AND_SUPPORT',
        'explanation': 'Simplifying activity and offering comforting assistance.',
        'offerHint': true,
        'offerHumanSupport': true,
      };
    }
  }
}
