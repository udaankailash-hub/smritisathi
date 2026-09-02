import React, { useState } from 'react';
import {
  Activity,
  FileText,
  Download,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';

export function ClinicianDashboard() {
  const [isReportOpen, setIsReportOpen] = useState(false);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Clinician Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="sky" size="sm">Clinician Telemetry Dome</Badge>
            <span className="text-xs text-slate-400 font-semibold">
              Authorized Clinician: Dr. Ananya Sharma (GMCH)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100">
            Patient Longitudinal Telemetry & Review
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Non-diagnostic application telemetry, routine adherence, and caregiver observations.
          </p>
        </div>

        <Button
          onClick={() => setIsReportOpen(true)}
          variant="primary"
          size="md"
          icon={Download}
          className="bg-sky-600 hover:bg-sky-500 border-sky-400/40"
        >
          Generate Telemetry Report
        </Button>
      </div>

      {/* Patient Profile Card (Abeni) */}
      <Card className="border-slate-800 bg-slate-900">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Patient Profile: Abeni, 72 (Guwahati / Haflong)</CardTitle>
            <Badge variant="teal" size="xs">Interaction Stable</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-2xl font-black text-teal-400">18 / 20</span>
              <p className="text-xs text-slate-400 mt-1">Sessions Completed</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-2xl font-black text-sky-400">92%</span>
              <p className="text-xs text-slate-400 mt-1">Routine Adherence</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-2xl font-black text-amber-400">0</span>
              <p className="text-xs text-slate-400 mt-1">Escalation Prompts</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-2xl font-black text-teal-400">100%</span>
              <p className="text-xs text-slate-400 mt-1">Sync Integrity</p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Recent Multi-Stakeholder Observations
            </h4>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-teal-300">Caregiver (Priyanka Borah):</span>
                <span className="text-slate-500">Yesterday 06:30 PM</span>
              </div>
              <p className="text-xs text-slate-300">
                "Mother was delighted to see the Bihu family photograph and recalled the tea garden routine with ease."
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-purple-300">ASHA Worker (Rimjim Saikia):</span>
                <span className="text-slate-500">Today 10:15 AM</span>
              </div>
              <p className="text-xs text-slate-300">
                "Home visit completed. Blood pressure routine checked. Abeni continues daily morning memory activities."
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Non-Diagnostic Statutory Warning */}
      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400 flex items-center gap-3">
        <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0" />
        <span>
          <strong>Statutory Medical Safety Boundary:</strong> MementoCare AI provides application interaction information and routine assistance. It does not diagnose dementia, measure disease severity, or replace professional clinical judgment.
        </span>
      </div>

      {/* Printable Non-Diagnostic PDF Modal */}
      <Modal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        title="MementoCare AI — Non-Diagnostic Interaction Summary"
        subtitle="For continuity and multi-disciplinary care support"
        maxWidth="max-w-2xl"
      >
        <div className="space-y-6 text-xs text-slate-300">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 grid grid-cols-2 gap-4">
            <div>
              <span className="text-slate-500 block">Patient Name:</span>
              <strong className="text-white text-sm">Abeni, 72 Y / F</strong>
              <span className="text-slate-400 block mt-1">Location: Haflong & Guwahati, Assam</span>
            </div>
            <div>
              <span className="text-slate-500 block">Care Period:</span>
              <strong className="text-white text-sm">Last 30 Days (August 2026)</strong>
              <span className="text-slate-400 block mt-1">Caregiver: Priyanka Borah</span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white text-sm uppercase">1. Interaction & Activity Overview</h4>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
                <span className="font-bold text-teal-400 text-base">18</span>
                <p className="text-[10px] text-slate-400">Total Sessions</p>
              </div>
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
                <span className="font-bold text-sky-400 text-base">92%</span>
                <p className="text-[10px] text-slate-400">Routine Adherence</p>
              </div>
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
                <span className="font-bold text-amber-400 text-base">6</span>
                <p className="text-[10px] text-slate-400">Offline Sessions</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white text-sm uppercase">2. Caregiver & ASHA Notes</h4>
            <p className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-slate-300">
              Patient consistently completes morning memory activities using voice guidance in Assamese and English. No fatigue or confusion escalation events recorded.
            </p>
          </div>

          <div className="p-3 bg-slate-950 border border-teal-500/40 rounded-lg text-teal-300 text-[11px] leading-relaxed">
            <strong>Mandatory Medical Disclaimer:</strong> This summary is generated from software interaction telemetry and caregiver notes for routine continuity only. It does not constitute a clinical score, neurological evaluation, or medical diagnosis.
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button onClick={() => setIsReportOpen(false)} variant="outline" size="sm">
              Close Preview
            </Button>
            <Button
              onClick={() => {
                alert('Telemetry Report PDF downloaded successfully (Demo Simulation).');
                setIsReportOpen(false);
              }}
              variant="primary"
              size="sm"
              icon={Download}
            >
              Export PDF
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
