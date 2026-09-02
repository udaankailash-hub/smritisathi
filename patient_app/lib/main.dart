import 'package:flutter/material.dart';
import 'core/constants.dart';
import 'core/safety_disclaimer.dart';
import 'models/patient_model.dart';
import 'features/home/today_screen.dart';
import 'features/memories/memory_album_screen.dart';
import 'features/help/help_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const MementoCareApp());
}

class MementoCareApp extends StatelessWidget {
  const MementoCareApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'MementoCare AI',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        brightness: Brightness.dark,
        scaffoldBackgroundColor: const Color(AppConstants.primaryDarkBg),
        colorScheme: const ColorScheme.dark(
          primary: Color(AppConstants.tealAccent),
          surface: Color(AppConstants.surfaceDark),
        ),
        fontFamily: 'Inter',
        useMaterial3: true,
      ),
      home: const MainNavigationScreen(),
    );
  }
}

class MainNavigationScreen extends StatefulWidget {
  const MainNavigationScreen({super.key});

  @override
  State<MainNavigationScreen> createState() => _MainNavigationScreenState();
}

class _MainNavigationScreenState extends State<MainNavigationScreen> {
  int _currentIndex = 0;
  final PatientModel _patient = PatientModel.demoAbeni();

  @override
  Widget build(BuildContext context) {
    final List<Widget> screens = [
      TodayScreen(patient: _patient),
      MemoryAlbumScreen(patient: _patient),
      HelpScreen(patient: _patient),
    ];

    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(AppConstants.primaryDarkBg),
        elevation: 0,
        title: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: const Color(AppConstants.tealAccent).withOpacity(0.2),
                borderRadius: BorderRadius.circular(12),
              ),
              child: const Icon(Icons.psychology, color: Color(AppConstants.tealAccent), size: 24),
            ),
            const SizedBox(width: 12),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  AppConstants.appName,
                  style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 18),
                ),
                Text(
                  _patient.name,
                  style: TextStyle(fontSize: 12, color: Colors.grey.shade400),
                ),
              ],
            ),
          ],
        ),
        actions: [
          Container(
            margin: const EdgeInsets.only(right: 16),
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
            decoration: BoxDecoration(
              color: const Color(AppConstants.surfaceDark),
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: const Color(AppConstants.cardBorder)),
            ),
            child: Row(
              children: [
                Icon(
                  _patient.isDeviceOnline ? Icons.wifi : Icons.wifi_off,
                  color: _patient.isDeviceOnline ? Colors.tealAccent : Colors.amber,
                  size: 16,
                ),
                const SizedBox(width: 6),
                Text(
                  _patient.isDeviceOnline ? "Online" : "Offline",
                  style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold),
                ),
              ],
            ),
          ),
        ],
      ),
      body: Column(
        children: [
          Expanded(child: screens[_currentIndex]),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            color: const Color(AppConstants.primaryDarkBg),
            child: Text(
              SafetyDisclaimer.shortNotice,
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 10, color: Colors.grey.shade500),
            ),
          ),
        ],
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _currentIndex,
        onDestinationSelected: (index) => setState(() => _currentIndex = index),
        backgroundColor: const Color(AppConstants.surfaceDark),
        indicatorColor: const Color(AppConstants.tealAccent),
        height: 75,
        destinations: const [
          NavigationDestination(
            icon: Icon(Icons.wb_sunny_outlined, size: 28),
            selectedIcon: Icon(Icons.wb_sunny, color: Colors.black, size: 28),
            label: 'Today',
          ),
          NavigationDestination(
            icon: Icon(Icons.favorite_outline, size: 28),
            selectedIcon: Icon(Icons.favorite, color: Colors.black, size: 28),
            label: 'Memories',
          ),
          NavigationDestination(
            icon: Icon(Icons.help_outline, size: 28),
            selectedIcon: Icon(Icons.help, color: Colors.black, size: 28),
            label: 'Help',
          ),
        ],
      ),
    );
  }
}
