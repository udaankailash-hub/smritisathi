import 'package:flutter_test/flutter_test.dart';
import '../lib/ai/adaptive_engine.dart';

void main() {
  group('MementoCare AI Adaptive Engine Tests', () {
    test('calculatePerformanceScore applies weighted formula accurately', () {
      // Formula: accuracy * 0.45 + speed * 0.25 + consistency * 0.20 + assistance * 0.10
      // 100 * 0.45 + 100 * 0.25 + 100 * 0.20 + 100 * 0.10 = 100
      final scorePerfect = AdaptiveEngine.calculatePerformanceScore(
        accuracy: 100,
        normalizedSpeed: 100,
        consistency: 100,
        assistanceEfficiency: 100,
      );
      expect(scorePerfect, equals(100));

      // 80 * 0.45 (36) + 60 * 0.25 (15) + 70 * 0.20 (14) + 80 * 0.10 (8) = 73
      final scoreBalanced = AdaptiveEngine.calculatePerformanceScore(
        accuracy: 80,
        normalizedSpeed: 60,
        consistency: 70,
        assistanceEfficiency: 80,
      );
      expect(scoreBalanced, equals(73));
    });

    test('evaluateAdaptation increases difficulty on performance >= 85', () {
      final res = AdaptiveEngine.evaluateAdaptation(
        currentDifficulty: 'easy',
        accuracy: 95,
        normalizedSpeed: 90,
        consistency: 90,
        assistanceEfficiency: 95,
      );
      expect(res['action'], equals('INCREASE'));
      expect(res['recommendedDifficulty'], equals('medium'));
      expect(res['offerHumanSupport'], isFalse);
    });

    test('evaluateAdaptation maintains difficulty on steady performance 70-84', () {
      final res = AdaptiveEngine.evaluateAdaptation(
        currentDifficulty: 'medium',
        accuracy: 75,
        normalizedSpeed: 75,
        consistency: 75,
        assistanceEfficiency: 75,
      );
      expect(res['action'], equals('MAINTAIN'));
      expect(res['recommendedDifficulty'], equals('medium'));
    });

    test('evaluateAdaptation offers breaks on patient pause or distress signal', () {
      final res = AdaptiveEngine.evaluateAdaptation(
        currentDifficulty: 'medium',
        accuracy: 95,
        normalizedSpeed: 90,
        consistency: 90,
        assistanceEfficiency: 95,
        patientRequestedPause: true,
      );
      expect(res['action'], equals('OFFER_BREAK'));
      expect(res['offerHumanSupport'], isTrue);
    });
  });
}
