class SessionModel {
  final String id;
  final String patientId;
  final String gameId;
  final String eventId;
  final int score;
  final int accuracy;
  final int responseMs;
  final int attempts;
  final String assistanceUsed;
  final String completionStatus;
  final String notes;
  final DateTime createdAt;

  const SessionModel({
    required this.id,
    required this.patientId,
    required this.gameId,
    required this.eventId,
    required this.score,
    required this.accuracy,
    required this.responseMs,
    required this.attempts,
    required this.assistanceUsed,
    this.completionStatus = 'COMPLETED',
    this.notes = '',
    required this.createdAt,
  });

  Map<String, dynamic> toJson() => {
        'id': id,
        'patientId': patientId,
        'gameId': gameId,
        'eventId': eventId,
        'score': score,
        'accuracy': accuracy,
        'responseMs': responseMs,
        'attempts': attempts,
        'assistanceUsed': assistanceUsed,
        'completionStatus': completionStatus,
        'notes': notes,
        'createdAt': createdAt.toIso8601String(),
      };
}

enum ReminderType { medicine, hydration, dailyRoutine, appointment, familyCall, cognitiveGame }
enum ReminderStatus { upcoming, completed, snoozed, missed }

class ReminderModel {
  final String id;
  final String patientId;
  final ReminderType type;
  final String schedule;
  final String label;
  final bool active;
  final ReminderStatus status;
  final DateTime? completedAt;

  const ReminderModel({
    required this.id,
    required this.patientId,
    required this.type,
    required this.schedule,
    required this.label,
    required this.active,
    required this.status,
    this.completedAt,
  });
}
