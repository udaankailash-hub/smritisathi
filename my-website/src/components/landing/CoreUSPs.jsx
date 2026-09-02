import React from 'react';
import { Sparkles, Brain, Mic, WifiOff, Users } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

export function CoreUSPs() {
  const usps = [
    {
      icon: Sparkles,
      title: '1. Personal Memory Graph',
      tag: 'FLAGSHIP USP',
      color: 'teal',
      desc: 'Cognitive activities are generated from caregiver-approved photographs of family, domestic spaces, and cultural festivals—anchoring sessions in familiar warmth.',
    },
    {
      icon: Brain,
      title: '2. Transparent Adaptive AI',
      tag: 'EXPLAINABLE',
      color: 'sky',
      desc: 'Activity pacing adapts using deterministic weighted accuracy and response speed. Never predicts disease progression or issues automated severity labels.',
    },
    {
      icon: Mic,
      title: '3. Voice-First & 7 NER Languages',
      tag: 'ACCESSIBLE',
      color: 'amber',
      desc: 'Seniors can speak naturally or tap large 60px buttons. Supports Assamese, Bengali, Manipuri, Mizo, Khasi, Hindi, and English with audio instructions.',
    },
    {
      icon: WifiOff,
      title: '4. 100% Offline Outbox Engine',
      tag: 'RELIABLE',
      color: 'teal',
      desc: 'Edge-persisted outbox queue with unique event_id deduplication. Complete full game sessions and reminders offline, with automatic idempotent sync.',
    },
    {
      icon: Users,
      title: '5. Connected Caregiver Loop',
      tag: 'CONNECTED CARE',
      color: 'sky',
      desc: 'Caregivers receive daily reassurance cards; ASHA workers get lightweight multi-family triage priorities; clinicians review non-diagnostic summaries.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
            Built around the person, not just a score.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            Five core innovations that differentiate MementoCare AI from generic brain-game apps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {usps.map((u, i) => {
            const Icon = u.icon;
            return (
              <Card key={i} className={`hover:border-slate-700 transition-all ${i === 0 ? 'md:col-span-2 lg:col-span-1 border-teal-500/40 bg-slate-900/90' : ''}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-teal-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                      {u.tag}
                    </span>
                  </div>
                  <CardTitle className="text-base font-bold text-slate-100">{u.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{u.desc}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
