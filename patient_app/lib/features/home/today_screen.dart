import 'package:flutter/material.dart';
import '../../core/constants.dart';
import '../../models/patient_model.dart';
import '../games/personal_memory_game_screen.dart';

class TodayScreen extends StatelessWidget {
  final PatientModel patient;

  const TodayScreen({super.key, required this.patient});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // Orientation Card
          Container(
            padding: const EdgeInsets.all(24),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [Color(0xFF006767), Color(0xFF004F50)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: BorderRadius.circular(28),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.3),
                  blurRadius: 12,
                  offset: const Offset(0, 4),
                ),
              ],
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.2),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      const Icon(Icons.location_on, color: Colors.amber, size: 16),
                      const SizedBox(width: 6),
                      Text(
                        patient.location,
                        style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 16),
                Text(
                  "Good Morning, ${patient.name}!",
                  style: const TextStyle(
                    fontSize: 28,
                    fontWeight: FontWeight.w900,
                    color: Colors.white,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  "Today is a peaceful day. 2 activities recommended for your morning.",
                  style: TextStyle(fontSize: 16, color: Colors.teal.shade100),
                ),
              ],
            ),
          ),
          const SizedBox(height: 24),

          // Primary Activity Recommendation Card
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: const Color(AppConstants.surfaceDark),
              borderRadius: BorderRadius.circular(24),
              border: Border.all(color: const Color(AppConstants.cardBorder)),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(10),
                      decoration: BoxDecoration(
                        color: const Color(AppConstants.tealAccent).withOpacity(0.2),
                        borderRadius: BorderRadius.circular(16),
                      ),
                      child: const Icon(Icons.favorite, color: Color(AppConstants.tealAccent), size: 24),
                    ),
                    const SizedBox(width: 12),
                    const Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            "RECOMMENDED ACTIVITY",
                            style: TextStyle(
                              fontSize: 11,
                              fontWeight: FontWeight.bold,
                              color: Color(AppConstants.tealAccent),
                              letterSpacing: 1.1,
                            ),
                          ),
                          Text(
                            "Personal Memory Engagement",
                            style: TextStyle(fontSize: 18, fontWeight: FontWeight.w900),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                Text(
                  "Connect with verified family photos of daughter Priyanka and your morning veranda tea.",
                  style: TextStyle(fontSize: 14, color: Colors.grey.shade300),
                ),
                const SizedBox(height: 20),
                SizedBox(
                  width: double.infinity,
                  height: 64, // Large 64px tactile touch target
                  child: ElevatedButton.icon(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(AppConstants.tealAccent),
                      foregroundColor: const Color(AppConstants.primaryDarkBg),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(18)),
                      elevation: 0,
                    ),
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (ctx) => PersonalMemoryGameScreen(patient: patient),
                        ),
                      );
                    },
                    icon: const Icon(Icons.play_arrow, size: 28),
                    label: const Text(
                      "Start Memory Activity",
                      style: TextStyle(fontSize: 18, fontWeight: FontWeight.w900),
                    ),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 24),

          // Daily Routine / Reminders Summary
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: const Color(AppConstants.surfaceDark),
              borderRadius: BorderRadius.circular(24),
              border: Border.all(color: const Color(AppConstants.cardBorder)),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  "TODAY'S REMINDERS",
                  style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.grey),
                ),
                const SizedBox(height: 12),
                _buildReminderTile(
                  icon: Icons.water_drop,
                  color: Colors.blueAccent,
                  title: "Drink 1 Glass of Water",
                  time: "08:00 AM",
                  isDone: true,
                ),
                const Divider(color: Color(AppConstants.cardBorder), height: 16),
                _buildReminderTile(
                  icon: Icons.medication,
                  color: Colors.emeraldAccent,
                  title: "Morning BP & Heart Health Tablet",
                  time: "08:30 AM",
                  isDone: true,
                ),
                const Divider(color: Color(AppConstants.cardBorder), height: 16),
                _buildReminderTile(
                  icon: Icons.phone,
                  color: Colors.purpleAccent,
                  title: "Evening Call with Daughter Priyanka",
                  time: "05:30 PM",
                  isDone: false,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildReminderTile({
    required IconData icon,
    required Color color,
    required String title,
    required String time,
    required bool isDone,
  }) {
    return Row(
      children: [
        Icon(icon, color: color, size: 24),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(title, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold)),
              Text(time, style: TextStyle(fontSize: 12, color: Colors.grey.shade400)),
            ],
          ),
        ),
        Icon(
          isDone ? Icons.check_circle : Icons.circle_outlined,
          color: isDone ? Colors.tealAccent : Colors.grey,
          size: 24,
        ),
      ],
    );
  }
}
