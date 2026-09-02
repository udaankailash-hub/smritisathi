import 'package:flutter_test/flutter_test.dart';
import '../lib/sync/sync_outbox_manager.dart';

void main() {
  group('MementoCare AI Outbox Sync Tests', () {
    setUp(() {
      SyncOutboxManager.clearQueue();
      SyncOutboxManager.setNetworkOnline(false);
    });

    test('enqueue creates immutable unique event in pending state when offline', () {
      final event1 = SyncOutboxManager.enqueue(
        entityType: 'GAME_SESSION',
        payload: {'gameId': 'game_memory_match', 'score': 92},
      );

      final event2 = SyncOutboxManager.enqueue(
        entityType: 'REMINDER_STATUS',
        payload: {'reminderId': 'rem_01', 'status': 'COMPLETED'},
      );

      expect(event1.eventId, isNotEmpty);
      expect(event2.eventId, isNotEmpty);
      expect(event1.eventId, isNot(equals(event2.eventId)));
      expect(SyncOutboxManager.pendingCount, equals(2));
      expect(event1.syncState, equals(SyncState.pending));
    });

    test('reconnecting online flushes outbox queue and marks synced', () async {
      SyncOutboxManager.enqueue(
        entityType: 'GAME_SESSION',
        payload: {'gameId': 'game_personal_memory', 'score': 98},
      );

      expect(SyncOutboxManager.pendingCount, equals(1));

      // Network returns
      SyncOutboxManager.setNetworkOnline(true);
      final syncedCount = await SyncOutboxManager.processQueue();

      expect(syncedCount, equals(1));
      expect(SyncOutboxManager.pendingCount, equals(0));
    });
  });
}
