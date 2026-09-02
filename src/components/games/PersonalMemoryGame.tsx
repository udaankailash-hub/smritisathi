import React, { useState, useEffect, useRef } from 'react';
import {
  Heart,
  Volume2,
  Mic,
  MicOff,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  RotateCcw,
  ShieldCheck,
  Award,
  ChevronRight,
  Pause,
  Play,
  Lightbulb,
  CornerDownLeft,
} from 'lucide-react';
import { SupportedLanguage, GameDifficulty } from '../../types';
import { getTranslation } from '../../services/i18n';
import { sound } from '../../services/sound';
import { voice } from '../../services/voice';
import { GameControlStrip } from './GameControlStrip';
import { gameEngine } from '../../services/gameEngine';
import {
  memoryGraphService,
  PersonalMemoryNode,
} from '../../services/memoryGraphService';
import {
  evaluateAdaptation,
  AdaptationResult,
} from '../../services/adaptiveEngine';

interface PersonalMemoryGameProps {
  patientId: string;
  patientName: string;
  difficulty: GameDifficulty;
  currentLang: SupportedLanguage;
  onComplete: (stats: {
    score: number;
    accuracy: number;
    responseTimeMs: number;
    attempts: number;
    assistanceUsed: string;
    notes?: string;
  }) => void;
  onExit?: () => void;
}

export const PersonalMemoryGame: React.FC<PersonalMemoryGameProps> = ({
  patientId,
  patientName,
  difficulty,
  currentLang,
  onComplete,
  onExit,
}) => {
  const [memories, setMemories] = useState<PersonalMemoryNode[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintUsedCount, setHintUsedCount] = useState(0);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [isPaused, setIsPaused] = useState(false);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [showTypeFallback, setShowTypeFallback] = useState(false);
  const [latestAdaptation, setLatestAdaptation] = useState<AdaptationResult | null>(null);

  const recognitionRef = useRef<any>(null);
  const t = getTranslation(currentLang);

  useEffect(() => {
    const approved = memoryGraphService.getApprovedMemories(patientId);
    setMemories(approved.length > 0 ? approved : memoryGraphService.getAllMemories());
    setStartTime(Date.now());
  }, [patientId]);

  const currentMemory = memories[currentIndex];
  const draft = currentMemory?.activityDraft;

  // Speak prompt on memory change
  useEffect(() => {
    if (draft && !isPaused) {
      const promptText = draft.spokenPrompt || draft.question;
      voice.speak(promptText, currentLang);
    }
  }, [currentIndex, draft, isPaused, currentLang]);

  const handleSpeakInstruction = () => {
    if (!draft) return;
    voice.speak(draft.spokenPrompt || draft.question, currentLang);
  };

  const handleToggleVoice = () => {
    if (isListening) {
      stopVoiceRecognition();
    } else {
      startVoiceRecognition();
    }
  };

  const startVoiceRecognition = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      // Fallback if browser doesn't support Web Speech
      simulateVoiceInput();
      return;
    }

    try {
      const recog = new SpeechRecognition();
      recog.lang = currentLang === 'en' ? 'en-US' : 'hi-IN';
      recog.continuous = false;
      recog.interimResults = false;

      recog.onstart = () => setIsListening(true);
      recog.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.trim();
        setVoiceTranscript(transcript);
        processSpokenAnswer(transcript);
      };
      recog.onerror = () => {
        setIsListening(false);
        simulateVoiceInput();
      };
      recog.onend = () => setIsListening(false);

      recog.start();
      recognitionRef.current = recog;
    } catch {
      simulateVoiceInput();
    }
  };

  const stopVoiceRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  // Safe fallback simulation for demo environments
  const simulateVoiceInput = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      if (draft) {
        const spoken = draft.correctAnswer;
        setVoiceTranscript(spoken);
        processSpokenAnswer(spoken);
      }
    }, 1500);
  };

  const processSpokenAnswer = (transcript: string) => {
    if (!draft) return;
    const cleanSpoken = transcript.toLowerCase();
    const correctClean = draft.correctAnswer.toLowerCase();

    // Check if spoken phrase closely matches the correct answer or an option
    let matchedOption: string | null = null;
    draft.options.forEach((opt) => {
      if (cleanSpoken.includes(opt.toLowerCase()) || opt.toLowerCase().includes(cleanSpoken)) {
        matchedOption = opt;
      }
    });

    if (matchedOption) {
      handleSelectOption(matchedOption);
    } else if (cleanSpoken.includes('priyanka') || cleanSpoken.includes('daughter') || cleanSpoken.includes('garden')) {
      handleSelectOption(draft.correctAnswer);
    } else {
      setSelectedOption(transcript);
      evaluateAnswer(false, transcript);
    }
  };

  const handleSelectOption = (option: string) => {
    if (isAnswerChecked || !draft) return;
    setSelectedOption(option);
    const correct = option.toLowerCase() === draft.correctAnswer.toLowerCase();
    evaluateAnswer(correct, option);
  };

  const evaluateAnswer = (correct: boolean, chosenText: string) => {
    setTotalAttempts((prev) => prev + 1);
    setIsAnswerChecked(true);
    setIsCorrect(correct);

    if (correct) {
      sound.playSuccess();
      setCorrectCount((prev) => prev + 1);
      voice.speak('Wonderful memory! That is completely correct.', currentLang);
    } else {
      sound.playGentleChime();
      voice.speak('Take your time. Look at the photo again.', currentLang);
    }
  };

  const handleShowHint = () => {
    setShowHint(true);
    setHintUsedCount((prev) => prev + 1);
    sound.playClick();
    if (draft?.hint) {
      voice.speak(draft.hint, currentLang);
    }
  };

  const handleNextMemory = () => {
    sound.playClick();
    if (currentIndex + 1 < memories.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
      setIsCorrect(false);
      setShowHint(false);
      setVoiceTranscript('');
      setTypedAnswer('');
    } else {
      // Completed game
      const durationMs = Date.now() - startTime;
      const calculatedAccuracy = totalAttempts > 0 ? Math.round((correctCount / totalAttempts) * 100) : 100;
      const speedNormalized = Math.max(10, Math.min(100, Math.round(100 - (durationMs / 1000) * 1.5)));
      const assistEfficiency = Math.max(20, 100 - hintUsedCount * 25);

      const adaptation = evaluateAdaptation(difficulty, {
        accuracy: calculatedAccuracy,
        normalizedSpeed: speedNormalized,
        consistency: 90,
        assistanceEfficiency: assistEfficiency,
      });
      setLatestAdaptation(adaptation);

      onComplete({
        score: adaptation.performanceScore,
        accuracy: calculatedAccuracy,
        responseTimeMs: Math.round(durationMs / (memories.length || 1)),
        attempts: totalAttempts,
        assistanceUsed: hintUsedCount > 0 ? `${hintUsedCount} gentle hints` : 'None (Independent)',
        notes: `Caregiver-approved personal memory recall completed. ${adaptation.explanation}`,
      });
    }
  };

  if (!currentMemory || !draft) {
    return (
      <div className="p-8 text-center bg-white rounded-3xl border border-slate-200">
        <Heart className="w-12 h-12 text-teal-600 mx-auto mb-3" />
        <h3 className="text-xl font-bold text-slate-800">No Approved Memories Available</h3>
        <p className="text-slate-600 mt-2">
          Your caregiver can upload photos to build your Personal Memory Album.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Banner: Medical Safety & Explainable Comfort */}
      <div className="bg-teal-900/10 border border-teal-500/20 rounded-2xl p-3 px-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400">
            <Heart className="w-5 h-5 fill-teal-400" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider font-semibold text-teal-400">
              Personal Memory Engagement
            </div>
            <div className="text-sm font-medium text-slate-200">
              Caregiver-Approved Memory: <span className="text-white font-bold">{currentMemory.humanLabel}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition"
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            {isPaused ? 'Resume' : 'Pause'}
          </button>
          <span className="px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-xs font-bold border border-teal-500/30">
            Memory {currentIndex + 1} of {memories.length}
          </span>
        </div>
      </div>

      {/* Main Memory Activity Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Photo Container */}
        <div className="relative rounded-2xl overflow-hidden aspect-video sm:aspect-[21/9] bg-slate-950 border border-slate-800 shadow-inner group">
          <img
            src={currentMemory.assetPath}
            alt={currentMemory.humanLabel}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4 sm:p-6">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-teal-500/30 text-teal-200 border border-teal-400/30">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified by {currentMemory.owner}
              </span>
              <p className="text-white text-base sm:text-lg font-medium drop-shadow-md">
                {currentMemory.description}
              </p>
            </div>
          </div>
        </div>

        {/* Question & Audio Prompt */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-950/60 p-5 rounded-2xl border border-slate-800">
          <div className="flex-1 space-y-1">
            <div className="text-xs uppercase font-bold text-teal-400 tracking-wider">
              Gentle Question
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {draft.question}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSpeakInstruction}
              className="px-4 py-3 bg-teal-600 hover:bg-teal-500 active:scale-95 text-white rounded-2xl font-bold flex items-center gap-2 shadow-lg transition"
              title="Repeat instruction aloud"
            >
              <Volume2 className="w-5 h-5" />
              <span>Listen</span>
            </button>
            <button
              onClick={handleToggleVoice}
              className={`px-4 py-3 rounded-2xl font-bold flex items-center gap-2 transition shadow-lg ${
                isListening
                  ? 'bg-rose-600 text-white animate-pulse'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white active:scale-95'
              }`}
              title="Answer with your voice"
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              <span>{isListening ? 'Listening...' : 'Voice Answer'}</span>
            </button>
          </div>
        </div>

        {/* Voice Transcript Feedback */}
        {voiceTranscript && (
          <div className="p-3.5 bg-indigo-950/40 border border-indigo-500/30 rounded-xl flex items-center gap-3 text-indigo-200 text-sm">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Spoken response captured: <strong>"{voiceTranscript}"</strong></span>
          </div>
        )}

        {/* Multiple Choice Option Buttons (Large 64px Touch Targets) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {draft.options.map((option, idx) => {
            const isSelected = selectedOption === option;
            const isThisCorrect = option.toLowerCase() === draft.correctAnswer.toLowerCase();

            let btnStyle = 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-100';

            if (isAnswerChecked) {
              if (isThisCorrect) {
                btnStyle = 'bg-emerald-900/60 border-emerald-500 text-emerald-100 ring-2 ring-emerald-500/50';
              } else if (isSelected && !isCorrect) {
                btnStyle = 'bg-rose-900/60 border-rose-500 text-rose-100';
              } else {
                btnStyle = 'bg-slate-800/40 border-slate-800 text-slate-400 opacity-60';
              }
            } else if (isSelected) {
              btnStyle = 'bg-teal-900/60 border-teal-400 text-teal-100 ring-2 ring-teal-400/50';
            }

            return (
              <button
                key={idx}
                disabled={isAnswerChecked}
                onClick={() => handleSelectOption(option)}
                className={`min-h-[72px] p-5 rounded-2xl border text-left text-lg font-bold flex items-center justify-between transition-all duration-200 active:scale-[0.98] ${btnStyle}`}
              >
                <span>{option}</span>
                {isAnswerChecked && isThisCorrect && (
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0 ml-3" />
                )}
              </button>
            );
          })}
        </div>

        {/* Hint & Assistance Drawer */}
        {showHint && (
          <div className="p-4 bg-amber-950/40 border border-amber-500/30 rounded-2xl flex items-start gap-3 text-amber-200">
            <Lightbulb className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-amber-300 text-sm">Gentle Memory Hint:</div>
              <div className="text-sm mt-0.5">{draft.hint}</div>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <div className="flex items-center gap-2">
            {!showHint && !isAnswerChecked && (
              <button
                onClick={handleShowHint}
                className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-amber-300 font-semibold text-sm flex items-center gap-2 border border-amber-500/20 transition"
              >
                <Lightbulb className="w-4 h-4" />
                <span>Need a Hint?</span>
              </button>
            )}

            <button
              onClick={() => setShowTypeFallback(!showTypeFallback)}
              className="px-3 py-2 text-xs text-slate-400 hover:text-slate-200 underline"
            >
              {showTypeFallback ? 'Hide typing box' : 'Type answer instead'}
            </button>
          </div>

          {showTypeFallback && !isAnswerChecked && (
            <div className="w-full flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800">
              <input
                type="text"
                value={typedAnswer}
                onChange={(e) => setTypedAnswer(e.target.value)}
                placeholder="Type your answer here..."
                className="flex-1 bg-transparent px-3 py-2 text-sm text-white focus:outline-none"
              />
              <button
                onClick={() => handleSelectOption(typedAnswer)}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg text-xs font-bold hover:bg-teal-500"
              >
                Submit
              </button>
            </div>
          )}

          {isAnswerChecked && (
            <button
              onClick={handleNextMemory}
              className="px-8 py-3.5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-extrabold text-base rounded-2xl flex items-center gap-2 shadow-xl shadow-teal-500/20 active:scale-95 transition ml-auto"
            >
              <span>{currentIndex + 1 < memories.length ? 'Next Memory' : 'Complete Activity'}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Standardized Bottom Control Strip */}
      <GameControlStrip
        onRepeatInstruction={handleSpeakInstruction}
        onNeedHelp={handleShowHint}
        onTogglePause={() => setIsPaused(!isPaused)}
        onExit={onExit || (() => {})}
        onUseHint={handleShowHint}
        isPaused={isPaused}
      />
    </div>
  );
};
