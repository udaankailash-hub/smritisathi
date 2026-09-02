import React from 'react';
import { Mountain, WifiOff, Languages, Users, FileQuestion, Activity } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';

export function ProblemSection() {
  const challenges = [
    {
      icon: Mountain,
      title: 'Geographic Barriers',
      desc: 'Remote hilly terrain across North East India makes access to specialised memory clinics and daily clinical supervision difficult.',
    },
    {
      icon: WifiOff,
      title: 'Connectivity Blackspots',
      desc: 'Frequent cellular and broadband outages in rural villages require true edge offline storage, not web page caches.',
    },
    {
      icon: Languages,
      title: 'Linguistic Diversity',
      desc: 'Elderly seniors communicate most naturally in their native mother tongues (Assamese, Manipuri, Khasi, Mizo, Bengali).',
    },
    {
      icon: Users,
      title: 'Caregiver Anxiety & Fatigue',
      desc: 'Family members need simple daily reassurance and non-alarming routines, not complicated clinical charts.',
    },
    {
      icon: FileQuestion,
      title: 'Generic Irrelevant Brain Games',
      desc: 'Standard apps use abstract shapes and foreign concepts that confuse seniors instead of familiar domestic memories.',
    },
    {
      icon: Activity,
      title: 'Community Health Worker Workload',
      desc: 'ASHA workers manage dozens of families and require lightweight triage priorities to identify who needs follow-up.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
            The challenge is bigger than memory alone.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            Addressing cognitive wellbeing in the North East requires overcoming unique geographic, linguistic, and connectivity realities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((c, i) => {
            const Icon = c.icon;
            return (
              <Card key={i} className="hover:border-slate-700 transition-colors">
                <CardContent className="p-6">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-teal-400 mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-200 mb-2">{c.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{c.desc}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
