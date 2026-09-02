import React, { useState } from 'react';
import { Mic, MicOff, Volume2, Sparkles, PhoneCall, Heart } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { voice } from '../../services/voiceService';

export function VoiceAssistantModal({ isOpen, onClose, currentLang = 'en' }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState(
    'Good morning, Abeni! I am here to assist you. You can ask for today\'s activity, hear music, or call your caregiver.'
  );

  const startListening = () => {
    setIsListening(true);
    setTranscript('Listening to your spoken voice...');
    voice.speak('Listening. How can I help you today?', currentLang);

    setTimeout(() => {
      setIsListening(false);
      setTranscript('"Play morning family memories"');
      setResponse('Starting your morning memory session with Priyanka on the veranda.');
      voice.speak('Starting your morning memory session with Priyanka on the veranda.', currentLang);
    }, 2200);
  };

  const handleQuickCommand = (text, reply) => {
    setTranscript(`"${text}"`);
    setResponse(reply);
    voice.speak(reply, currentLang);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Voice Assistant & Guide"
      subtitle="Large, accessible speech interface designed for seniors"
      maxWidth="max-w-xl"
    >
      <div className="space-y-6 text-center">
        {/* Large Senior Microphone Button */}
        <div className="py-4">
          <button
            onClick={startListening}
            className={`w-28 h-28 rounded-full border-4 flex items-center justify-center mx-auto transition-all shadow-xl cursor-pointer ${
              isListening
                ? 'bg-amber-500/20 border-amber-500 text-amber-300 animate-pulse scale-105'
                : 'bg-teal-500/10 border-teal-500 text-teal-400 hover:bg-teal-500/20 hover:scale-105'
            }`}
          >
            {isListening ? <Mic className="w-12 h-12" /> : <Mic className="w-12 h-12" />}
          </button>
          <p className="text-sm font-bold text-slate-200 mt-4">
            {isListening ? 'Listening... speak now' : 'Tap microphone and speak'}
          </p>
        </div>

        {/* Live Spoken Feedback Box */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-left space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>You said:</span>
            <span className="text-teal-400 font-semibold">{transcript ? 'Detected' : 'Waiting'}</span>
          </div>
          <p className="text-sm sm:text-base font-semibold text-slate-100 italic">
            {transcript || 'Say "Start today\'s activity" or "Call Priyanka"'}
          </p>
          <div className="pt-3 border-t border-slate-800/80">
            <span className="text-xs text-slate-400 block mb-1">MementoCare AI Voice:</span>
            <p className="text-sm text-teal-300 font-medium">{response}</p>
          </div>
        </div>

        {/* Quick Voice Shortcuts */}
        <div className="space-y-2 text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Quick Senior Commands:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              onClick={() =>
                handleQuickCommand(
                  "What is today's activity?",
                  'Your morning activity is Family Photo Recall with veranda memories.'
                )
              }
              className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 text-left transition-all cursor-pointer"
            >
              "What is today's activity?"
            </button>
            <button
              onClick={() =>
                handleQuickCommand(
                  'Play soothing flute music',
                  'Playing Assam River Flute and soothing Brahmaputra streams.'
                )
              }
              className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 text-left transition-all cursor-pointer"
            >
              "Play soothing flute music"
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
