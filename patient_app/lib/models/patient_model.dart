enum DifficultyLevel { easy, medium, hard }
enum ConsentState { pending, approved, paused, withdrawn }

class PatientModel {
  final String id;
  final String userId;
  final String name;
  final int age;
  final String gender;
  final String location;
  final String preferredLanguage;
  final DifficultyLevel difficultyLevel;
  final ConsentState consentState;
  final String caregiverName;
  final String caregiverPhone;
  final String assignedDoctor;
  final int batteryLevel;
  final bool isDeviceOnline;

  const PatientModel({
    required this.id,
    required this.userId,
    required this.name,
    required this.age,
    required this.gender,
    required this.location,
    required this.preferredLanguage,
    required this.difficultyLevel,
    required this.consentState,
    required this.caregiverName,
    required this.caregiverPhone,
    required this.assignedDoctor,
    this.batteryLevel = 85,
    this.isDeviceOnline = true,
  });

  factory PatientModel.demoAbeni() {
    return const PatientModel(
      id: 'p_abeni_01',
      userId: 'user_abeni',
      name: 'Abeni',
      age: 72,
      gender: 'female',
      location: 'Guwahati, Assam',
      preferredLanguage: 'en',
      difficultyLevel: DifficultyLevel.easy,
      consentState: ConsentState.approved,
      caregiverName: 'Priyanka Borah',
      caregiverPhone: '+91 94350 12345',
      assignedDoctor: 'Dr. Ananya Sharma',
      batteryLevel: 85,
      isDeviceOnline: true,
    );
  }
}
