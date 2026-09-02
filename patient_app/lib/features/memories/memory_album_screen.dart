import 'package:flutter/material.dart';
import '../../core/constants.dart';
import '../../models/patient_model.dart';

class MemoryAlbumScreen extends StatelessWidget {
  final PatientModel patient;

  const MemoryAlbumScreen({super.key, required this.patient});

  @override
  Widget build(BuildContext context) {
    final List<Map<String, String>> memories = [
      {
        'title': 'Daughter Priyanka with Assam Tea',
        'subtitle': 'Morning tea and smiles on the family veranda',
        'category': 'FAMILY',
        'photoUrl': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800',
      },
      {
        'title': 'Guwahati Ancestral Garden',
        'subtitle': 'Peaceful orchid garden planted in 1984',
        'category': 'PLACES',
        'photoUrl': 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
      },
      {
        'title': 'Rongali Bihu Spring Celebration',
        'subtitle': 'Family celebration with traditional pitha sweets',
        'category': 'EVENTS',
        'photoUrl': 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=800',
      },
    ];

    return ListView(
      padding: const EdgeInsets.all(20),
      children: [
        const Text(
          "Personal Memory Album",
          style: TextStyle(fontSize: 24, fontWeight: FontWeight.w900),
        ),
        const SizedBox(height: 6),
        Text(
          "Caregiver-verified memories to cherish, remember, and enjoy.",
          style: TextStyle(fontSize: 14, color: Colors.grey.shade400),
        ),
        const SizedBox(height: 20),
        ...memories.map((m) => Container(
              margin: const EdgeInsets.only(bottom: 20),
              decoration: BoxDecoration(
                color: const Color(AppConstants.surfaceDark),
                borderRadius: BorderRadius.circular(24),
                border: Border.all(color: const Color(AppConstants.cardBorder)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  ClipRRect(
                    borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
                    child: Image.network(
                      m['photoUrl']!,
                      height: 180,
                      width: double.infinity,
                      fit: BoxFit.cover,
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                          decoration: BoxDecoration(
                            color: const Color(AppConstants.tealAccent).withOpacity(0.2),
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Text(
                            m['category']!,
                            style: const TextStyle(
                              fontSize: 10,
                              fontWeight: FontWeight.bold,
                              color: Color(AppConstants.tealAccent),
                            ),
                          ),
                        ),
                        const SizedBox(height: 8),
                        Text(
                          m['title']!,
                          style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          m['subtitle']!,
                          style: TextStyle(fontSize: 13, color: Colors.grey.shade300),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            )),
      ],
    );
  }
}
