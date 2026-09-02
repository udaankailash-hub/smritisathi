import 'package:flutter/material.dart';
import '../../core/constants.dart';
import '../../models/patient_model.dart';

class HelpScreen extends StatelessWidget {
  final PatientModel patient;

  const HelpScreen({super.key, required this.patient});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const Text(
            "Help & Assistance",
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.w900),
          ),
          const SizedBox(height: 6),
          Text(
            "You are always safe and supported. One tap connects you to daughter Priyanka.",
            style: TextStyle(fontSize: 14, color: Colors.grey.shade400),
          ),
          const SizedBox(height: 24),

          // Primary Emergency / Caregiver SOS Button (Large 72px Target)
          SizedBox(
            height: 72,
            child: ElevatedButton.icon(
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(AppConstants.roseSos),
                foregroundColor: Colors.black,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                elevation: 4,
              ),
              onPressed: () {
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(
                    content: Text("Calling ${patient.caregiverName} (${patient.caregiverPhone})..."),
                    backgroundColor: Colors.teal,
                  ),
                );
              },
              icon: const Icon(Icons.phone_in_talk, size: 30),
              label: Text(
                "Call Daughter ${patient.caregiverName}",
                style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w900),
              ),
            ),
          ),
          const SizedBox(height: 20),

          // Voice Assistance Button
          SizedBox(
            height: 64,
            child: ElevatedButton.icon(
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(AppConstants.surfaceDark),
                foregroundColor: const Color(AppConstants.tealAccent),
                side: const BorderSide(color: Color(AppConstants.tealAccent)),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
              ),
              onPressed: () {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text("Listening for your voice instructions...")),
                );
              },
              icon: const Icon(Icons.mic, size: 28),
              label: const Text(
                "Talk to Voice Assistant",
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
              ),
            ),
          ),
          const SizedBox(height: 24),

          // Comfort & Guidance Cards
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
                  "HELPFUL ACTIONS",
                  style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Colors.grey),
                ),
                const SizedBox(height: 12),
                ListTile(
                  contentPadding: EdgeInsets.zero,
                  leading: const Icon(Icons.refresh, color: Colors.tealAccent),
                  title: const Text("Repeat Current Instructions", style: TextStyle(fontWeight: FontWeight.bold)),
                  subtitle: const Text("Hear spoken directions again slowly"),
                  onTap: () {},
                ),
                const Divider(color: Color(AppConstants.cardBorder)),
                ListTile(
                  contentPadding: EdgeInsets.zero,
                  leading: const Icon(Icons.pause_circle_outline, color: Colors.amberAccent),
                  title: const Text("Take a Rest Break", style: TextStyle(fontWeight: FontWeight.bold)),
                  subtitle: const Text("Pause all activities with no time pressure"),
                  onTap: () {},
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
