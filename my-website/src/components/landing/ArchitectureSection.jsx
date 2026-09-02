import React from 'react';
import { Database, Smartphone, ShieldCheck, ArrowDown, RefreshCw, Cpu, Layers } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';

export function ArchitectureSection() {
  return (
    <section className="py-16 sm:py-24 border-b border-slate-800/80 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
            Technical Architecture & Outbox Data Flow
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            Engineered for high resilience, edge continuity, and strict non-diagnostic telemetry.
          </p>
        </div>

        {/* Visual Architecture Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {/* Step 1 */}
          <Card className="border-slate-800 bg-slate-900/80">
            <CardContent className="p-5 text-center">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 mx-auto mb-3">
                <Smartphone className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black text-teal-400 uppercase tracking-widest">LAYER 01</span>
              <h4 className="text-sm font-bold text-slate-200 mt-1 mb-2">Senior Tablet PWA</h4>
              <p className="text-xs text-slate-400">Large touch targets, voice synthesis, audio prompts, and 7 NER regional languages.</p>
            </CardContent>
          </Card>

          {/* Step 2 */}
          <Card className="border-slate-800 bg-slate-900/80">
            <CardContent className="p-5 text-center">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto mb-3">
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">LAYER 02</span>
              <h4 className="text-sm font-bold text-slate-200 mt-1 mb-2">Offline Outbox (Edge)</h4>
              <p className="text-xs text-slate-400">Local IndexedDB queue storing sessions with unique event_id for 100% offline continuity.</p>
            </CardContent>
          </Card>

          {/* Step 3 */}
          <Card className="border-slate-800 bg-slate-900/80">
            <CardContent className="p-5 text-center">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 mx-auto mb-3">
                <RefreshCw className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black text-sky-400 uppercase tracking-widest">LAYER 03</span>
              <h4 className="text-sm font-bold text-slate-200 mt-1 mb-2">Idempotent Sync</h4>
              <p className="text-xs text-slate-400">Deduplicated event replay with automatic network detection and retry backoff.</p>
            </CardContent>
          </Card>

          {/* Step 4 */}
          <Card className="border-slate-800 bg-slate-900/80">
            <CardContent className="p-5 text-center">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 mx-auto mb-3">
                <Database className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black text-teal-400 uppercase tracking-widest">LAYER 04</span>
              <h4 className="text-sm font-bold text-slate-200 mt-1 mb-2">PostgreSQL & RLS</h4>
              <p className="text-xs text-slate-400">Encrypted multi-tenant store feeding caregiver reassurance and ASHA triage lists.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
