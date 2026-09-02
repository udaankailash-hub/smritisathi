import 'dart:convert';
import 'package:uuid/uuid.dart';

enum SyncState { pending, syncing, synced, failed }

class OutboxEvent {
  final String eventId;
  final String entityType;
  final Map<String, dynamic> payload;
  final DateTime createdAt;
  int attemptCount;
  SyncState syncState;

  OutboxEvent({
    required this.eventId,
    required this.entityType,
    required this.payload,
    required this.createdAt,
    this.attemptCount = 0,
    this.syncState = SyncState.pending,
  });

  Map<String, dynamic> toJson() => {
        'eventId': eventId,
        'entityType': entityType,
        'payload': payload,
        'createdAt': createdAt.toIso8601String(),
        'attemptCount': attemptCount,
        'syncState': syncState.name,
      };

  factory OutboxEvent.fromJson(Map<String, dynamic> json) => OutboxEvent(
        eventId: json['eventId'],
        entityType: json['entityType'],
        payload: Map<String, dynamic>.from(json['payload']),
        createdAt: DateTime.parse(json['createdAt']),
        attemptCount: json['attemptCount'] ?? 0,
        syncState: SyncState.values.firstWhere(
          (e) => e.name == json['syncState'],
          orElse: () => SyncState.pending,
        ),
      );
}

class SyncOutboxManager {
  static final List<OutboxEvent> _queue = [];
  static bool _isOnline = true;
  static final _uuid = const Uuid();

  static void setNetworkOnline(bool online) {
    _isOnline = online;
    if (_isOnline) {
      processQueue();
    }
  }

  static bool get isOnline => _isOnline;

  static int get pendingCount =>
      _queue.where((e) => e.syncState != SyncState.synced).length;

  static OutboxEvent enqueue({
    required String entityType,
    required Map<String, dynamic> payload,
  }) {
    final event = OutboxEvent(
      eventId: "evt_${DateTime.now().millisecondsSinceEpoch}_${_uuid.v4().substring(0, 6)}",
      entityType: entityType,
      payload: payload,
      createdAt: DateTime.now(),
    );

    _queue.add(event);

    if (_isOnline) {
      processQueue();
    }

    return event;
  }

  static Future<int> processQueue() async {
    if (!_isOnline) return 0;

    int syncedCount = 0;
    for (final event in _queue) {
      if (event.syncState == SyncState.synced) continue;

      event.syncState = SyncState.syncing;
      event.attemptCount += 1;

      // Simulated idempotent network sync with server ack
      await Future.delayed(const Duration(milliseconds: 150));
      event.syncState = SyncState.synced;
      syncedCount += 1;
    }

    return syncedCount;
  }

  static List<OutboxEvent> getQueue() => List.unmodifiable(_queue);

  static void clearQueue() => _queue.clear();
}
