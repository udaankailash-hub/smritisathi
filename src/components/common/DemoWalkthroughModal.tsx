import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Wifi,
  WifiOff,
  Sparkles,
  Heart,
  Volume2,
  ShieldCheck,
  TrendingUp,
  X,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { sound } from '../../services/sound';
import { voice } from '../../services/voice';
import { offlineSync } from '../../services/offlineSync';
import { UserRole } from '../../types';

interface DemoWalkthroughModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRole: (role: UserRole) => void;
  onSelectGame: (gameId: string) => void;
  onToggleOffline: (offline: boolean) => void;
}

interface DemoStep {
  id: number;
  timeRange: string;
  title: string;
  narration: string;
  actionText: string;
  roleTarget: UserRole;
  gameTarget?: string;
  networkState?: 'ONLINE' | 'OFFLINE';
  keyHighlights: string[];
}

const DEMO_STEPS: DemoStep[] = [
  {
    id: 1,
    timeRange: '0–8s',
    title: 'Patient Profile: Abeni & Today Overview',
    narration:
      'This is Abeni, a 72-year-old living in the North Eastern region where specialized cognitive support can be difficult to reach.',
    actionText: 'View Abeni’s Today Hub',
    roleTarget: 'PATIENT',
    keyHighlights: [
      'Simple, high-contrast, clutter-free patient screen',
      'One primary action per screen with large touch targets',
      'Clear temporal & daily orientation banner',
    ],
  },
  {
    id: 2,
    timeRange: '8–16s',
    title: 'Voice Greeting & Large Today Cards',
    narration:
      'A warm voice greeting welcomes Abeni in her familiar language, orienting her to the day and scheduled routines.',
    actionText: 'Play Voice Greeting & Inspect Reminders',
    roleTarget: 'PATIENT',
    keyHighlights: [
      'Natural speech orientation with local greeting',
      'Gentle hydration & daily routine prompt cards',
      'One-tap caregiver contact always visible',
    ],
  },
  {
    id: 3,
    timeRange: '16–28s',
    title: 'Caregiver-Approved Personal Memory Album',
    narration:
      'Instead of generic brain puzzles, Abeni connects with verified photographs of daughter Priyanka and the Guwahati ancestral veranda.',
    actionText: 'Open Approved Personal Memory',
    roleTarget: 'PATIENT',
    gameTarget: 'game_personal_memory',
    keyHighlights: [
      'Verified personal memory graph (Family, Places, Events)',
      'Strict DRAFT → CAREGIVER APPROVAL → PATIENT safety boundary',
      'Zero AI hallucinations or inferred identities',
    ],
  },
  {
    id: 4,
    timeRange: '28–40s',
    title: 'Personal Memory Engagement with Voice Input',
    narration:
      'Abeni interacts using her voice or large tactile buttons, answering gentle questions about her cherished memories.',
    actionText: 'Demonstrate Voice Answer',
    roleTarget: 'PATIENT',
    gameTarget: 'game_personal_memory',
    keyHighlights: [
      'Live Web Speech STT & phonetic answer normalization',
      'Audio prompt repetitions and gentle hints',
      'Relaxed, unhurried pacing with pause support',
    ],
  },
  {
    id: 5,
    timeRange: '40–50s',
    title: 'Explainable Answer Evaluation & Performance',
    narration:
      'The platform evaluates interaction speed, accuracy, and assistance used without intimidating scores or diagnostic labels.',
    actionText: 'Inspect Performance Breakdown',
    roleTarget: 'PATIENT',
    gameTarget: 'game_personal_memory',
    keyHighlights: [
      'Formula: Accuracy (45%) + Speed (25%) + Consistency (20%) + Assistance (10%)',
      'Non-diagnostic terminology used throughout',
      'Supportive feedback with comforting chime audio',
    ],
  },
  {
    id: 6,
    timeRange: '50–57s',
    title: 'Adaptive Difficulty Progression (+1 Level)',
    narration:
      'Because Abeni demonstrated strong, unassisted interaction, the deterministic rules engine adapts by +1 level with full explanation.',
    actionText: 'View Adaptive Engine Transition',
    roleTarget: 'PATIENT',
    keyHighlights: [
      'Explainable deterministic rules engine (85–100 → +1 difficulty)',
      'Human-readable explanation stored for caregiver review',
      'Distress/pause signal gracefully halts progression',
    ],
  },
  {
    id: 7,
    timeRange: '57–68s',
    title: 'Monsoon Outage Simulation (Offline Edge Mode)',
    narration:
      'Simulating a remote hill cellular blackout: Internet is toggled OFF. Abeni plays Memory Cards and results save locally in SQLite/IndexedDB.',
    actionText: 'Toggle Offline & Play Locally',
    roleTarget: 'PATIENT',
    gameTarget: 'game_memory_match',
    networkState: 'OFFLINE',
    keyHighlights: [
      '100% offline continuity — zero freezing or crashing',
      'Outbox queue records immutable event ID',
      'Banner clearly confirms: "Offline Mode — Result saved locally"',
    ],
  },
  {
    id: 8,
    timeRange: '68–77s',
    title: 'Network Reconnection & Outbox Sync',
    narration:
      'Internet returns. One tap synchronizes queued outbox sessions with exponential backoff and idempotency protection.',
    actionText: 'Reconnect & Synchronize',
    roleTarget: 'PATIENT',
    networkState: 'ONLINE',
    keyHighlights: [
      'Idempotent server sync prevents duplicate records',
      'Visual sync indicator turns green ("Synchronised successfully")',
      'Caregiver outbox automatically updated',
    ],
  },
  {
    id: 9,
    timeRange: '77–86s',
    title: 'Caregiver Dashboard & Engagement Trends',
    narration:
      'Caregiver Priyanka reviews longitudinal engagement consistency, assistance usage, and approves new memory photographs.',
    actionText: 'Switch to Caregiver Dashboard',
    roleTarget: 'CAREGIVER',
    keyHighlights: [
      'Non-diagnostic Engagement Trend charts (Recharts)',
      'Memory approval queue & bounded AI drafts',
      'Review prompt management with auditable reason codes',
    ],
  },
  {
    id: 10,
    timeRange: '86–90s',
    title: 'Statutory Medical Safety Statement',
    narration:
      'MementoCare AI supports cognitive engagement and care coordination. It does not replace doctors or diagnose dementia.',
    actionText: 'Review Medical Safety Boundary',
    roleTarget: 'CAREGIVER',
    keyHighlights: [
      'Mandatory DPDP Act & Medical Safety Boundary disclaimer',
      'Clear separation of supportive engagement from clinical diagnosis',
      'AI that remembers the person, not just the score.',
    ],
  },
];

export const DemoWalkthroughModal: React.FC<DemoWalkthroughModalProps> = ({
  isOpen,
  onClose,
  onSelectRole,
  onSelectGame,
  onToggleOffline,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlayingAuto, setIsPlayingAuto] = useState(false);

  const step = DEMO_STEPS[currentStepIndex];

  useEffect(() => {
    if (!isOpen) {
      setIsPlayingAuto(false);
      return;
    }
  }, [isOpen]);

  useEffect(() => {
    let timer: any;
    if (isPlayingAuto && isOpen) {
      voice.speak(step.narration, 'en');
      timer = setTimeout(() => {
        if (currentStepIndex < DEMO_STEPS.length - 1) {
          executeStep(currentStepIndex + 1);
        } else {
          setIsPlayingAuto(false);
        }
      }, 8500);
    }
    return () => clearTimeout(timer);
  }, [isPlayingAuto, currentStepIndex, isOpen]);

  const executeStep = (index: number) => {
    const targetStep = DEMO_STEPS[index];
    setCurrentStepIndex(index);
    sound.playClick();

    // Apply role change
    onSelectRole(targetStep.roleTarget);

    // Apply game if specified
    if (targetStep.gameTarget) {
      onSelectGame(targetStep.gameTarget);
    }

    // Apply network toggle
    if (targetStep.networkState === 'OFFLINE') {
      onToggleOffline(true);
      offlineSync.setSimulatedOffline(true);
    } else if (targetStep.networkState === 'ONLINE') {
      onToggleOffline(false);
      offlineSync.setSimulatedOffline(false);
    }

    voice.speak(targetStep.narration, 'en');
  };

  const handleNext = () => {
    if (currentStepIndex < DEMO_STEPS.length - 1) {
      executeStep(currentStepIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      executeStep(currentStepIndex - 1);
    }
  };

  const handleRestart = () => {
    executeStep(0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-teal-500/30 rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-teal-950 via-slate-900 to-indigo-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/20 text-teal-300 border border-teal-500/40 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white">
                  MementoCare AI — 90-Second SIH Demonstration
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  SIH26003
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Step {step.id} of {DEMO_STEPS.length} ({step.timeRange}) • Persona: Abeni
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progression Bar */}
        <div className="grid grid-cols-10 gap-1 p-2 bg-slate-950/80 border-b border-slate-800">
          {DEMO_STEPS.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => executeStep(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentStepIndex
                  ? 'bg-teal-400 ring-2 ring-teal-400/40'
                  : idx < currentStepIndex
                  ? 'bg-emerald-600'
                  : 'bg-slate-800'
              }`}
              title={`${s.timeRange}: ${s.title}`}
            />
          ))}
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-left">
          {/* Step Title & Time Badge */}
          <div className="flex items-center justify-between gap-4">
            <span className="px-3 py-1 rounded-xl text-xs font-extrabold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {step.timeRange} Script Target
            </span>

            <div className="flex items-center gap-2">
              {step.networkState === 'OFFLINE' ? (
                <span className="px-3 py-1 rounded-xl text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
                  <WifiOff className="w-3.5 h-3.5" /> Offline Mode Active
                </span>
              ) : (
                <span className="px-3 py-1 rounded-xl text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                  <Wifi className="w-3.5 h-3.5" /> Online Mode Active
                </span>
              )}
            </div>
          </div>

          <h2 className="text-2xl font-black text-white">
            {step.title}
          </h2>

          {/* Narration Box */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-teal-400 uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <Volume2 className="w-4 h-4" /> Spoken Presentation Script
              </span>
              <button
                onClick={() => voice.speak(step.narration, 'en')}
                className="text-slate-400 hover:text-white underline text-[11px]"
              >
                Replay Voice
              </button>
            </div>
            <p className="text-slate-200 text-base leading-relaxed italic">
              "{step.narration}"
            </p>
          </div>

          {/* Key Architectural Highlights */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">
              SIH26003 Requirement & Technical Capabilities Demonstrated:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {step.keyHighlights.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-slate-300 font-medium"
                >
                  <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Controls */}
        <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlayingAuto(!isPlayingAuto)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition ${
                isPlayingAuto
                  ? 'bg-rose-600 hover:bg-rose-500 text-white'
                  : 'bg-teal-600 hover:bg-teal-500 text-white'
              }`}
            >
              {isPlayingAuto ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlayingAuto ? 'Pause Auto Demo' : 'Auto Play 90s Demo'}</span>
            </button>

            <button
              onClick={handleRestart}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
              title="Restart Demo"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={currentStepIndex === 0}
              onClick={handlePrev}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1 disabled:opacity-40 transition"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={() => {
                if (currentStepIndex < DEMO_STEPS.length - 1) {
                  handleNext();
                } else {
                  onClose();
                }
              }}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-md shadow-teal-500/20 transition active:scale-95"
            >
              <span>
                {currentStepIndex < DEMO_STEPS.length - 1
                  ? `Next Step (${DEMO_STEPS[currentStepIndex + 1].timeRange})`
                  : 'Finish Demo'}
              </span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
