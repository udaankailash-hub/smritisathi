/**
 * MementoCare AI - Voice Synthesis and Recognition Service
 * Voice-first senior interface with graceful browser fallback.
 */

class VoiceService {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
  }

  speak(text, lang = 'en') {
    if (!this.synth || !text) return;
    try {
      this.synth.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85; // Slightly slower, calm cadence for elderly comprehension
      utterance.pitch = 1.0;
      
      const langMap = {
        en: 'en-US',
        hi: 'hi-IN',
        bn: 'bn-IN',
        as: 'as-IN',
        mni: 'hi-IN',
        lus: 'en-IN',
        kha: 'en-IN',
      };
      utterance.lang = langMap[lang] || 'en-US';
      this.synth.speak(utterance);
    } catch {}
  }

  stop() {
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch {}
    }
  }
}

export const voice = new VoiceService();
