import React from 'react';
import { Heart, Sparkles, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';

export function AbeniStory({ onTryDemo }) {
  return (
    <section className="py-16 sm:py-24 border-b border-slate-800/80 bg-slate-950/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Persona Card Left */}
          <div className="lg:col-span-5">
            <Card className="border-teal-500/30 bg-slate-900/90 shadow-xl overflow-hidden">
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80"
                  alt="Abeni (Fictional Demonstration Persona)"
                  className="w-full h-full object-cover object-top opacity-90 hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-black text-white">Abeni, 72</h3>
                      <p className="text-xs text-teal-300 font-medium">Guwahati & Haflong, Assam</p>
                    </div>
                    <Badge variant="teal" size="xs">
                      Demo Persona
                    </Badge>
                  </div>
                </div>
              </div>

              <CardContent className="p-5 sm:p-6 space-y-3">
                <div className="flex items-center justify-between text-xs py-2 border-b border-slate-800">
                  <span className="text-slate-400">Primary Language</span>
                  <span className="font-semibold text-slate-200">Assamese & English</span>
                </div>
                <div className="flex items-center justify-between text-xs py-2 border-b border-slate-800">
                  <span className="text-slate-400">Caregiver</span>
                  <span className="font-semibold text-slate-200">Priyanka Borah (Daughter)</span>
                </div>
                <div className="flex items-center justify-between text-xs py-2 border-b border-slate-800">
                  <span className="text-slate-400">Assigned ASHA</span>
                  <span className="font-semibold text-slate-200">Rimjim Saikia (Ward 4)</span>
                </div>
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-400">Preferred Interaction</span>
                  <span className="font-semibold text-teal-400">Large Touch + Voice</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Persona Narrative Right */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-semibold">
              <Heart className="w-3.5 h-3.5" />
              <span>The Human-Centred Journey</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-slate-100 tracking-tight leading-tight">
              A familiar photograph feels comforting. <br />
              <span className="text-teal-400">An unfamiliar app feels intimidating.</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Abeni lives in a hilly community where cellular connection is intermittent. Her daughter Priyanka wants to keep her active with uplifting morning routines.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-300">
                  <strong>Approved Family Memories:</strong> Activities use real family photographs approved by Priyanka—like morning tea on their front veranda.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-300">
                  <strong>Voice or Touch:</strong> Abeni answers in Assamese or English simply by speaking or tapping large buttons.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-300">
                  <strong>Works Without Internet:</strong> The morning routine continues smoothly when the network drops, synchronising silently when reconnected.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
