import React, { useState } from 'react';
import {
  Heart,
  CheckCircle2,
  Bell,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Calendar,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { MemoryApprovalHub } from './MemoryApprovalHub';

export function CaregiverDashboard({ onSelectSeniorView }) {
  const [activeTab, setActiveTab] = useState('overview'); // overview, memories, reminders, trends

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Reassuring Caregiver Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="teal" size="sm">Caregiver Portal</Badge>
            <span className="text-xs text-slate-400 font-semibold">Caring for: Abeni (Mother)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100">
            Good morning, Priyanka
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Abeni had a peaceful morning session. Routine reminders are active.
          </p>
        </div>

        <Button
          onClick={onSelectSeniorView}
          variant="outline"
          size="md"
          className="border-teal-500/30 text-teal-300"
        >
          View Senior Tablet →
        </Button>
      </div>

      {/* Reassurance Snapshot Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-teal-500/30 bg-slate-900/80">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-400">Today's Activity</span>
              <h4 className="text-base font-bold text-slate-100">Morning Session Done</h4>
              <p className="text-[11px] text-teal-400 font-medium mt-0.5">3 Memories Recalled (100% accuracy)</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-500/30 bg-slate-900/80">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-400">Schedule & Routine</span>
              <h4 className="text-base font-bold text-slate-100">Tea & Med Acknowledged</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Next: Midday Hydration at 11:30 AM</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-sky-500/30 bg-slate-900/80">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-400">Engagement Stability</span>
              <h4 className="text-base font-bold text-slate-100">Steady & Reassuring</h4>
              <p className="text-[11px] text-sky-300 mt-0.5">No clinical review prompt required</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'overview'
              ? 'bg-teal-600 text-white'
              : 'bg-slate-900 text-slate-300 border border-slate-800'
          }`}
        >
          Daily Overview
        </button>
        <button
          onClick={() => setActiveTab('memories')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'memories'
              ? 'bg-teal-600 text-white'
              : 'bg-slate-900 text-slate-300 border border-slate-800'
          }`}
        >
          Memory Approvals & Photos
        </button>
        <button
          onClick={() => setActiveTab('trends')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'trends'
              ? 'bg-teal-600 text-white'
              : 'bg-slate-900 text-slate-300 border border-slate-800'
          }`}
        >
          Non-Diagnostic Interaction Trends
        </button>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <Card className="border-slate-800 bg-slate-900">
            <CardHeader>
              <CardTitle className="text-base">Abeni's Routine Summary (Last 7 Days)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-2xl font-black text-teal-400">7 / 7</span>
                  <p className="text-xs text-slate-400 mt-1">Days Engaged</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-2xl font-black text-sky-400">94%</span>
                  <p className="text-xs text-slate-400 mt-1">Reminder Adherence</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-2xl font-black text-amber-400">12</span>
                  <p className="text-xs text-slate-400 mt-1">Approved Memories</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-2xl font-black text-teal-400">100%</span>
                  <p className="text-xs text-slate-400 mt-1">Offline Continuity</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <MemoryApprovalHub />
        </div>
      )}

      {/* Tab 2: Memory Approvals */}
      {activeTab === 'memories' && <MemoryApprovalHub />}

      {/* Tab 3: Trends */}
      {activeTab === 'trends' && (
        <Card className="border-slate-800 bg-slate-900">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">30-Day Interaction & Engagement Trends</CardTitle>
              <Badge variant="teal" size="xs">Interaction Telemetry Only</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-semibold">Morning Session Completion Rate</span>
                <span className="text-teal-400 font-bold">96%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-teal-500 h-full rounded-full" style={{ width: '96%' }} />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-semibold">Voice Instruction Utilisation</span>
                <span className="text-sky-400 font-bold">82%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-sky-500 h-full rounded-full" style={{ width: '82%' }} />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 leading-relaxed">
              <strong className="text-teal-300">Non-Diagnostic Note:</strong> These statistics represent application usage, routine adherence, and touch/voice interactions. They do not constitute a clinical score or measure disease severity.
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
