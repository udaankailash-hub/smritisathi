class VoiceService {
  static bool _isSpeaking = false;
  static bool _isListening = false;

  static bool get isSpeaking => _isSpeaking;
  static bool get isListening => _isListening;

  static Future<void> speak(String text, {String language = 'en'}) async {
    _isSpeaking = true;
    // In production Flutter app, calls FlutterTts instance
    await Future.delayed(const Duration(milliseconds: 300));
    _isSpeaking = false;
  }

  static Future<String> listenForAnswer({String language = 'en'}) async {
    _isListening = true;
    // In production Flutter app, triggers SpeechToText recognition with tap fallback
    await Future.delayed(const Duration(milliseconds: 1000));
    _isListening = false;
    return "Your Daughter Priyanka";
  }

  static void stop() {
    _isSpeaking = false;
    _isListening = false;
  }
}
