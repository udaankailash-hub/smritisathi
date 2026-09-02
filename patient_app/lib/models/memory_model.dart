enum MemoryCategory { people, places, events, objects, preferences, dailyRoutine }
enum MemoryApprovalState { draft, pendingReview, approved, rejected }

class BoundedDraft {
  final String activityType;
  final String question;
  final List<String> options;
  final String correctAnswer;
  final String hint;
  final String spokenPrompt;
  final int difficulty;

  const BoundedDraft({
    required this.activityType,
    required this.question,
    required this.options,
    required this.correctAnswer,
    required this.hint,
    required this.spokenPrompt,
    this.difficulty = 1,
  });

  Map<String, dynamic> toJson() => {
        'activityType': activityType,
        'question': question,
        'options': options,
        'correctAnswer': correctAnswer,
        'hint': hint,
        'spokenPrompt': spokenPrompt,
        'difficulty': difficulty,
      };
}

class MemoryModel {
  final String id;
  final String patientId;
  final MemoryCategory category;
  final String subcategory;
  final String humanLabel;
  final String description;
  final String assetPath;
  final String language;
  final MemoryApprovalState approvalState;
  final BoundedDraft? activityDraft;
  final String owner;
  final DateTime createdAt;

  const MemoryModel({
    required this.id,
    required this.patientId,
    required this.category,
    required this.subcategory,
    required this.humanLabel,
    required this.description,
    required this.assetPath,
    required this.language,
    required this.approvalState,
    this.activityDraft,
    required this.owner,
    required this.createdAt,
  });
}
