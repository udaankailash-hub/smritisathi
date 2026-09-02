import React, { useState } from 'react';
import {
  PlayCircle,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  HeartHandshake,
  WifiOff,
  RefreshCw,
  Layers,
  Users,
} from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { memoryGraphService } from '../../services/memoryGraph';
import { offlineOutbox } from '../../services/offlineOutbox';
import { voice } from '../../services/voiceService';

const DEMO_STEPS = [
  {
    step: 1,
    title: '1. Caregiver Approves Personal Memory',
    actor: 'Priyanka (Caregiver)',
    desc: 'Caregiver uploads a photograph of Abeni with tea on their front veranda and adds context. Only caregiver-approved memories are generated as activities for the senior.',
    actionText: 'Simulate Memory Approval',
    badge: 'Human-in-the-Loop',
  },
  {
    step: 2,
    title: '2. Senior Plays with Voice Guidance',
    actor: 'Abeni (Senior, 72)',
    desc: 'Abeni opens her morning tablet. The approved veranda photo is presented with voice instructions in Assamese and English. Abeni speaks her answer naturally.',
    actionText: 'Simulate Voice Interaction',
    badge: 'Voice-First & Multilingual',
  },
  {
    step: 3,
    title: '3. Transparent Adaptive AI Engine',
    actor: 'Adaptive Engine',
    desc: 'The weighted accuracy and response time signals are evaluated. The engine adjusts the pace without clinical diagnostic labeling, maintaining comforting pacing.',
    actionText: 'Apply Adaptive Tuning',
    badge: 'Explainable AI',
  },
  {
    step: 4,
    title: '4. 100% Offline Edge Outbox',
    actor: 'Edge Engine',
    desc: 'Cellular connectivity drops in Haflong hills. The session continues uninterrupted, safely persisting the interaction event in the local IndexedDB outbox.',
    actionText: 'Simulate Offline Outbox Save',
    badge: '100% Offline Continuity',
  },
  {
    step: 5,
    title: '5. Idempotent Synchronization',
    actor: 'Sync Service',
    desc: 'Internet returns. The system replays queued events with unique event_id deduplication, guaranteeing exactly-once processing with zero duplicate entries.',
    actionText: 'Execute Idempotent Sync',
    badge: 'Zero-Data-Loss Sync',
  },
  {
    step: 6,
    title: '6. Multi-Stakeholder Care Loop',
    actor: 'Caregiver, ASHA & Clinician',
    desc: 'Caregiver Priyanka receives a daily reassurance card; ASHA worker Rimjim updates village triage; Clinician Dr. Sharma reviews non-diagnostic longitudinal trends.',
    actionText: 'Complete Interactive Journey',
    badge: 'Connected Care',
  },
];

export function PlatformDemoModal({ isOpen, onClose, onSelectRole, onToggleOffline }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepActionDone, setStepActionDone] = useState(false);

  const step = DEMO_STEPS[currentStepIndex];

  const handleExecuteAction = () => {
    setStepActionDone(true);
    if (step.step === 1) {
      memoryGraphService.approveMemory('mem_04', 'Priyanka Borah');
      voice.speak('Caregiver approval pipeline verified: Bell-metal tea memory approved.', 'en');
    } else if (step.step === 2) {
      voice.speak('Voice assistant simulated: Abeni spoke answer in Assamese.', 'as');
    } else if (step.step === 4) {
      onToggleOffline(true);
      offlineOutbox.saveLocalSession({
        gameId: 'demo_session',
        category: 'PERSONAL_MEMORY',
        accuracy: 100,
        demoSimulated: true,
      });
      voice.speak('Offline mode active. Interaction saved to local outbox.', 'en');
    } else if (step.step === 5) {
      onToggleOffline(false);
      offlineOutbox.syncNow();
      voice.speak('Network restored. Outbox synchronized successfully.', 'en');
    }
  };

  const handleNext = () => {
    if (currentStepIndex < DEMO_STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      setStepActionDone(false);
    } else {
      onClose();
      onSelectRole('CAREGIVER');
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      setStepActionDone(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Interactive Platform Demonstration"
      subtitle="The Signature MementoCare AI End-to-End Vertical Journey"
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6">
        {/* Progress Dots */}
        <div className="flex items-center justify-between gap-1 pb-2 border-b border-slate-800">
          {DEMO_STEPS.map((s, idx) => (
            <div
              key={idx}
              className={`h-1.5 flex-1 rounded-full transition-all ${
                idx <= currentStepIndex ? 'bg-teal-500' : 'bg-slate-800'
              }`}
            />
          ))}
        </div>

        {/* Step Content */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
              {step.actor}
            </span>
            <Badge variant="teal" size="xs">{step.badge}</Badge>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white">{step.title}</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{step.desc}</p>

          <div className="pt-2">
            <Button
              onClick={handleExecuteAction}
              variant={stepActionDone ? 'outline' : 'primary'}
              size="md"
              className={stepActionDone ? 'border-teal-500 text-teal-300' : 'bg-teal-600 hover:bg-teal-500'}
              icon={stepActionDone ? CheckCircle2 : Sparkles}
            >
              {stepActionDone ? 'Simulated Action Complete ✓' : step.actionText}
            </Button>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between pt-2">
          <Button
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            variant="ghost"
            size="sm"
            icon={ArrowLeft}
          >
            Previous
          </Button>

          <div className="flex gap-2">
            <Button onClick={onClose} variant="outline" size="sm">
              Exit Demo
            </Button>
            <Button
              onClick={handleNext}
              variant="primary"
              size="sm"
              icon={ArrowRight}
            >
              {currentStepIndex < DEMO_STEPS.length - 1 ? 'Next Step' : 'View Caregiver Dashboard'}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
