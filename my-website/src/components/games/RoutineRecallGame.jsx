import React, { useState } from 'react';
import { ArrowUpDown, CheckCircle2, Volume2 } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { voice } from '../../services/voiceService';
import { offlineOutbox } from '../../services/offlineOutbox';

const DEFAULT_ROUTINE = [
  { id: '1', title: 'Wake up gently with morning sunlight', icon: '🌅' },
  { id: '2', title: 'Enjoy morning Assam tea on the front veranda', icon: '☕' },
  { id: '3', title: 'Take a calm stroll by the garden flowers', icon: '🌸' },
  { id: '4', title: 'Rest and listen to peaceful midday music', icon: '🎵' },
];

export function RoutineRecallGame({ currentLang = 'en', onBack, onComplete }) {
  // Start with shuffled steps
  const [items, setItems] = useState(() => [...DEFAULT_ROUTINE].sort(() => Math.random() - 0.5));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const moveUp = (index) => {
    if (index === 0 || isSubmitted) return;
    const newItems = [...items];
    const temp = newItems[index - 1];
    newItems[index - 1] = newItems[index];
    newItems[index] = temp;
    setItems(newItems);
  };

  const handleCheck = () => {
    const isOrdered = items.every((item, idx) => item.id === DEFAULT_ROUTINE[idx].id);
    setIsCorrect(isOrdered);
    setIsSubmitted(true);

    if (isOrdered) {
      voice.speak('Superb! Your daily morning routine is in perfect order.', currentLang);
    } else {
      voice.speak('A gentle try. Review the steps and try once more.', currentLang);
    }

    offlineOutbox.saveLocalSession({
      gameId: 'routine_recall',
      category: 'DAILY_ROUTINE',
      accuracy: isOrdered ? 100 : 70,
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Button onClick={onBack} variant="outline" size="sm">
          ← Back to Hub
        </Button>
        <Badge variant="teal" size="sm">Routine Sequence Recall</Badge>
      </div>

      <Card className="border-slate-800 bg-slate-900 shadow-xl">
        <CardContent className="p-6 sm:p-8 space-y-6">
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl font-black text-slate-100">
              Arrange your morning routine in order
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Tap steps to shift them from earliest morning to midday.
            </p>
          </div>

          <div className="space-y-3">
            {items.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => moveUp(idx)}
                className={`p-4 rounded-2xl border flex items-center justify-between transition-all cursor-pointer ${
                  isSubmitted
                    ? item.id === DEFAULT_ROUTINE[idx].id
                      ? 'bg-teal-500/10 border-teal-500/50 text-teal-300'
                      : 'bg-rose-500/10 border-rose-500/50 text-rose-300'
                    : 'bg-slate-800/80 border-slate-700 hover:border-teal-500/60 text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center font-bold text-xs text-slate-400">
                    {idx + 1}
                  </span>
                  <span className="text-2xl">{item.icon}</span>
                  <span className="font-semibold text-sm sm:text-base">{item.title}</span>
                </div>
                {!isSubmitted && idx > 0 && (
                  <span className="text-xs text-teal-400 font-semibold px-2 py-1 bg-teal-500/10 rounded-lg">
                    Tap to Move Up ↑
                  </span>
                )}
              </div>
            ))}
          </div>

          {!isSubmitted ? (
            <Button onClick={handleCheck} variant="primary" size="lg" className="w-full">
              Check Routine Order
            </Button>
          ) : (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-200">
                {isCorrect ? '✅ Perfect routine recall!' : '🌱 Helpful routine practice saved.'}
              </span>
              <Button onClick={onComplete} variant="primary" size="md">
                Complete
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
