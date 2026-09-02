import React from 'react';
import { PlayCircle, ArrowRight, ShieldCheck, HeartHandshake, WifiOff, Sparkles, Mic } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export function Hero({ onSelectRole, onOpenDemo }) {
  return (
    <section className="relative pt-12 pb-16 sm:pt-16 sm:pb-24 overflow-hidden border-b border-slate-800/80">
      {/* Background Subtle Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10 px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Regional Cognitive Support & Engagement Platform</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-slate-100 tracking-tight leading-[1.1] mb-6">
          AI that remembers the person, <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-sky-400">
            not just the score.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
          A personalized, voice-enabled, and 100% offline-first cognitive engagement platform designed for elderly seniors, caregivers, and community ASHA workers across North East India.
        </p>

        {/* Primary Call to Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12">
          <Button
            onClick={() => onSelectRole('PATIENT')}
            variant="senior"
            size="senior"
            className="shadow-lg shadow-teal-500/20"
          >
            Senior Tablet Experience
          </Button>
          <Button
            onClick={onOpenDemo}
            variant="outline"
            size="lg"
            icon={PlayCircle}
            className="min-h-[58px]"
          >
            Start Interactive Demo
          </Button>
        </div>

        {/* Value Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-6 border-t border-slate-800/80">
          <div className="flex items-center justify-center gap-2 p-3 bg-slate-900/60 border border-slate-800 rounded-xl">
            <HeartHandshake className="w-4 h-4 text-teal-400" />
            <span className="text-xs font-semibold text-slate-300">Caregiver Approved</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-3 bg-slate-900/60 border border-slate-800 rounded-xl">
            <Mic className="w-4 h-4 text-sky-400" />
            <span className="text-xs font-semibold text-slate-300">Voice-First & 7 Languages</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-3 bg-slate-900/60 border border-slate-800 rounded-xl">
            <WifiOff className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-semibold text-slate-300">100% Offline Outbox</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-3 bg-slate-900/60 border border-slate-800 rounded-xl">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span className="text-xs font-semibold text-slate-300">Non-Diagnostic Safety</span>
          </div>
        </div>
      </div>
    </section>
  );
}
