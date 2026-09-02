import React, { useState } from 'react';
import { Bell, CheckCircle2, Clock, Volume2, ShieldCheck } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { voice } from '../../services/voiceService';
import { offlineOutbox } from '../../services/offlineOutbox';

const REMINDERS = [
  {
    id: 'rem_1',
    title: 'Morning Routine & Heart Medicine',
    time: '08:30 AM',
    note: 'Scheduled by Priyanka Borah. Remember to drink a warm glass of water first.',
    acknowledged: true,
  },
  {
    id: 'rem_2',
    title: 'Midday Hydration & Garden Stroll',
    time: '11:30 AM',
    note: 'Enjoy a glass of fresh water and step into the front veranda garden.',
    acknowledged: false,
  },
  {
    id: 'rem_3',
    title: 'Afternoon Memory Activity Session',
    time: '03:00 PM',
    note: '10-minute relaxing session with Bihu and orchid memories.',
    acknowledged: false,
  },
];

export function DailyReminders({ currentLang = 'en', onBack }) {
  const [reminders, setReminders] = useState(REMINDERS);

  const handleAcknowledge = (id) => {
    setReminders((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          voice.speak(`Reminder acknowledged for ${r.title}.`, currentLang);
          offlineOutbox.saveLocalSession({
            type: 'REMINDER_ACK',
            reminderId: id,
            title: r.title,
          });
          return { ...r, acknowledged: true };
        }
        return r;
      })
    );
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Button onClick={onBack} variant="outline" size="sm">
          ← Back to Hub
        </Button>
        <Badge variant="amber" size="sm">
          <Bell className="w-3.5 h-3.5 mr-1" />
          Smart Routine Assistance
        </Badge>
      </div>

      <Card className="border-amber-500/30 bg-slate-900 shadow-xl">
        <CardContent className="p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-100">
              Today's Caregiver-Set Routine
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Assistance schedule configured by daughter Priyanka.
            </p>
          </div>

          <div className="space-y-3">
            {reminders.map((r) => (
              <div
                key={r.id}
                className={`p-5 rounded-2xl border transition-all ${
                  r.acknowledged
                    ? 'bg-slate-950/60 border-slate-800'
                    : 'bg-amber-500/10 border-amber-500/30'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-amber-300 font-black text-xs">
                        {r.time}
                      </span>
                      <h4 className="font-bold text-base text-slate-100">{r.title}</h4>
                    </div>
                    <p className="text-xs text-slate-400 pl-1">{r.note}</p>
                  </div>

                  <div>
                    {r.acknowledged ? (
                      <div className="flex items-center gap-1.5 text-teal-400 font-bold text-xs">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Acknowledged</span>
                      </div>
                    ) : (
                      <Button
                        onClick={() => handleAcknowledge(r.id)}
                        variant="primary"
                        size="md"
                        className="bg-amber-600 hover:bg-amber-500 border-amber-400/40 text-slate-950 font-black min-h-[48px]"
                      >
                        ✓ I Have Done This
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Safety note */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
            <span>
              <strong>Medication Safety Note:</strong> Reminders display timings configured by your authorized caregiver. The app does not prescribe or adjust dosages.
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
