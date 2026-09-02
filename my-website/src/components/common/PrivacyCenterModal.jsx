import React, { useState } from 'react';
import { ShieldCheck, Lock, Eye, Trash2, CheckCircle2 } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export function PrivacyCenterModal({ isOpen, onClose }) {
  const [voiceConsent, setVoiceConsent] = useState(true);
  const [photoConsent, setPhotoConsent] = useState(true);
  const [ashaSharing, setAshaSharing] = useState(true);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Privacy & DPDP Consent Centre"
      subtitle="Complete human-in-the-loop control over personal memories and voice telemetry"
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6 text-xs text-slate-300">
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-teal-400" />
            <h4 className="font-bold text-white text-sm">Strict Least-Privilege & Private Storage</h4>
          </div>
          <p className="leading-relaxed text-slate-400">
            All personal photographs, audio prompts, and memory context are stored in private encrypted storage buckets with temporary signed URLs. Row Level Security (RLS) guarantees data is accessible strictly to authorized caregivers and assigned health workers.
          </p>
        </div>

        {/* Consent Switches */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Active Consent Preferences
          </h4>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4">
            <div>
              <h5 className="font-bold text-white text-sm">Personal Photograph Activities</h5>
              <p className="text-slate-400 mt-0.5">
                Permit approved family photos to be used in cognitive recall activities.
              </p>
            </div>
            <button
              onClick={() => setPhotoConsent(!photoConsent)}
              className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                photoConsent ? 'bg-teal-600 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {photoConsent ? 'Granted ✓' : 'Revoked ✗'}
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4">
            <div>
              <h5 className="font-bold text-white text-sm">Voice Processing on Device</h5>
              <p className="text-slate-400 mt-0.5">
                Process voice input locally on senior tablet with zero persistent cloud audio recording.
              </p>
            </div>
            <button
              onClick={() => setVoiceConsent(!voiceConsent)}
              className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                voiceConsent ? 'bg-teal-600 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {voiceConsent ? 'Granted ✓' : 'Revoked ✗'}
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4">
            <div>
              <h5 className="font-bold text-white text-sm">ASHA Community Health Sharing</h5>
              <p className="text-slate-400 mt-0.5">
                Allow assigned village ASHA worker to view routine adherence triage during home rounds.
              </p>
            </div>
            <button
              onClick={() => setAshaSharing(!ashaSharing)}
              className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                ashaSharing ? 'bg-teal-600 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {ashaSharing ? 'Granted ✓' : 'Revoked ✗'}
            </button>
          </div>
        </div>

        {/* Audit Log snippet */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            Immutable Audit Trail Snippet
          </span>
          <div className="space-y-1 font-mono text-[11px] text-slate-400">
            <div>• [2026-08-31 10:00] MEMORY_APPROVED (Daughter Priyanka) by Caregiver Priyanka</div>
            <div>• [2026-09-01 08:30] SESSION_COMPLETED (Abeni, 72) offline saved via outbox</div>
            <div>• [2026-09-01 09:15] IDEMPOTENT_SYNC (Event deduplication event_id: evt_091a) OK</div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button onClick={onClose} variant="primary" size="sm">
            Save Preferences & Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}
