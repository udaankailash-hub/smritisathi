import 'package:flutter/material.dart';
import '../../core/constants.dart';
import '../../models/patient_model.dart';
import '../../ai/adaptive_engine.dart';
import '../../sync/sync_outbox_manager.dart';

class PersonalMemoryGameScreen extends StatefulWidget {
  final PatientModel patient;

  const PersonalMemoryGameScreen({super.key, required this.patient});

  @override
  State<PersonalMemoryGameScreen> createState() => _PersonalMemoryGameScreenState();
}

class _PersonalMemoryGameScreenState extends State<PersonalMemoryGameScreen> {
  int _currentIndex = 0;
  String? _selectedOption;
  bool _isAnswerChecked = false;
  bool _isCorrect = false;
  bool _isListening = false;
  final int _startTime = DateTime.now().millisecondsSinceEpoch;

  final List<Map<String, dynamic>> _memories = [
    {
      'label': 'Daughter Priyanka with Assam Tea',
      'photoUrl': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800',
      'question': 'Who is sharing warm morning tea with you on the veranda?',
      'options': [
        'Your Daughter Priyanka',
        'Your Doctor Ananya',
        'Your Niece Rumi',
        'Your Neighbor Mina'
      ],
      'correctAnswer': 'Your Daughter Priyanka',
      'hint': 'She visits you every morning with Assam green tea.',
    },
    {
      'label': 'Guwahati Ancestral Veranda & Garden',
      'photoUrl': 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
      'question': 'Where is this peaceful garden where you planted orchids?',
      'options': [
        'Silpukhuri Home, Guwahati',
        'Shillong Peak',
        'Kaziranga Forest',
        'Dibrugarh Tea Estate'
      ],
      'correctAnswer': 'Silpukhuri Home, Guwahati',
      'hint': 'Near the historic Guwahati lake where you enjoy morning air.',
    },
  ];

  void _handleOptionTap(String option) {
    if (_isAnswerChecked) return;

    final current = _memories[_currentIndex];
    final correct = option == current['correctAnswer'];

    setState(() {
      _selectedOption = option;
      _isAnswerChecked = true;
      _isCorrect = correct;
    });
  }

  void _handleVoiceAnswer() {
    setState(() => _isListening = true);
    Future.delayed(const Duration(milliseconds: 1200), () {
      if (mounted) {
        setState(() => _isListening = false);
        final current = _memories[_currentIndex];
        _handleOptionTap(current['correctAnswer']);
      }
    });
  }

  void _handleNext() {
    if (_currentIndex + 1 < _memories.length) {
      setState(() {
        _currentIndex += 1;
        _selectedOption = null;
        _isAnswerChecked = false;
        _isCorrect = false;
      });
    } else {
      // Calculate explainable score and queue outbox event
      final durationMs = DateTime.now().millisecondsSinceEpoch - _startTime;
      final adaptation = AdaptiveEngine.evaluateAdaptation(
        currentDifficulty: 'easy',
        accuracy: 100.0,
        normalizedSpeed: 85.0,
        consistency: 90.0,
        assistanceEfficiency: 100.0,
      );

      SyncOutboxManager.enqueue(
        entityType: 'GAME_SESSION',
        payload: {
          'patientId': widget.patient.id,
          'gameId': 'game_personal_memory',
          'score': adaptation['score'],
          'accuracy': 100,
          'durationSeconds': (durationMs / 1000).round(),
          'explanation': adaptation['explanation'],
        },
      );

      _showCompletionDialog(adaptation);
    }
  }

  void _showCompletionDialog(Map<String, dynamic> adaptation) {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (ctx) => AlertDialog(
        backgroundColor: const Color(AppConstants.surfaceDark),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
        title: const Row(
          children: [
            Icon(Icons.check_circle, color: Colors.tealAccent, size: 28),
            SizedBox(width: 8),
            Text("Activity Completed!", style: TextStyle(fontWeight: FontWeight.bold)),
          ],
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              "Wonderful memory recall! That was completely correct.",
              style: TextStyle(fontSize: 15),
            ),
            const SizedBox(height: 12),
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: Colors.black.withOpacity(0.3),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Text(
                "Adaptive Result: ${adaptation['explanation']}",
                style: const TextStyle(fontSize: 12, color: Colors.tealAccent),
              ),
            ),
          ],
        ),
        actions: [
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(AppConstants.tealAccent),
              foregroundColor: Colors.black,
            ),
            onPressed: () {
              Navigator.pop(ctx);
              Navigator.pop(context);
            },
            child: const Text("Return to Today Hub", style: TextStyle(fontWeight: FontWeight.bold)),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final current = _memories[_currentIndex];

    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(AppConstants.primaryDarkBg),
        title: Text(
          "Memory ${_currentIndex + 1} of ${_memories.length}",
          style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        actions: [
          TextButton.icon(
            onPressed: () => Navigator.pop(context),
            icon: const Icon(Icons.close, color: Colors.grey),
            label: const Text("Exit", style: TextStyle(color: Colors.grey)),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Photo Container
            Container(
              height: 220,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(24),
                border: Border.all(color: const Color(AppConstants.cardBorder)),
                image: DecorationImage(
                  image: NetworkImage(current['photoUrl']),
                  fit: BoxFit.cover,
                ),
              ),
            ),
            const SizedBox(height: 20),

            // Question & Voice Prompt
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: const Color(AppConstants.surfaceDark),
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: const Color(AppConstants.cardBorder)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    "GENTLE QUESTION",
                    style: TextStyle(
                      fontSize: 11,
                      fontWeight: FontWeight.bold,
                      color: Color(AppConstants.tealAccent),
                      letterSpacing: 1.1,
                    ),
                  ),
                  const SizedBox(height: 6),
                  Text(
                    current['question'],
                    style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 16),
                  Row(
                    children: [
                      ElevatedButton.icon(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(AppConstants.tealAccent),
                          foregroundColor: Colors.black,
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                        ),
                        onPressed: () {},
                        icon: const Icon(Icons.volume_up, size: 20),
                        label: const Text("Listen", style: TextStyle(fontWeight: FontWeight.bold)),
                      ),
                      const SizedBox(width: 12),
                      ElevatedButton.icon(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: _isListening ? Colors.rose : Colors.indigo,
                          foregroundColor: Colors.white,
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                        ),
                        onPressed: _handleVoiceAnswer,
                        icon: Icon(_isListening ? Icons.mic_off : Icons.mic, size: 20),
                        label: Text(
                          _isListening ? "Listening..." : "Voice Answer",
                          style: const TextStyle(fontWeight: FontWeight.bold),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Option Buttons (Large 64px Touch Targets)
            ...((current['options'] as List<String>).map((opt) {
              final isSelected = _selectedOption == opt;
              final isCorrectOpt = opt == current['correctAnswer'];

              Color bgColor = const Color(AppConstants.surfaceDark);
              Color borderColor = const Color(AppConstants.cardBorder);

              if (_isAnswerChecked) {
                if (isCorrectOpt) {
                  bgColor = Colors.teal.shade900.withOpacity(0.6);
                  borderColor = Colors.tealAccent;
                } else if (isSelected && !_isCorrect) {
                  bgColor = Colors.red.shade900.withOpacity(0.6);
                  borderColor = Colors.redAccent;
                }
              }

              return Padding(
                padding: const EdgeInsets.only(bottom: 12),
                child: SizedBox(
                  height: 64,
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: bgColor,
                      foregroundColor: Colors.white,
                      elevation: 0,
                      side: BorderSide(color: borderColor),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(18)),
                      alignment: Alignment.centerLeft,
                      padding: const EdgeInsets.symmetric(horizontal: 20),
                    ),
                    onPressed: () => _handleOptionTap(opt),
                    child: Text(
                      opt,
                      style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                    ),
                  ),
                ),
              );
            })),

            if (_isAnswerChecked) ...[
              const SizedBox(height: 12),
              SizedBox(
                height: 58,
                child: ElevatedButton.icon(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(AppConstants.tealAccent),
                    foregroundColor: Colors.black,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(18)),
                  ),
                  onPressed: _handleNext,
                  icon: const Icon(Icons.arrow_forward),
                  label: Text(
                    _currentIndex + 1 < _memories.length ? "Next Memory" : "Complete Activity",
                    style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w900),
                  ),
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
