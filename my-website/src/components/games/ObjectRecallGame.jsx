import React, { useState } from 'react';
import { Volume2, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { voice } from '../../services/voiceService';
import { offlineOutbox } from '../../services/offlineOutbox';

const OBJECTS_DATA = [
  {
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80',
    name: 'Traditional Bell-Metal Tea Cup (Kahi-Bati)',
    options: ['Bell-Metal Tea Cup', 'Glass Tumbler', 'Clay Jug', 'Wooden Spoon'],
    correct: 'Bell-Metal Tea Cup',
    hint: 'Used for serving hot Assam tea in traditional households.',
  },
];

export function ObjectRecallGame({ currentLang = 'en', onBack, onComplete }) {
  const [selected, setSelected] = useState(null);
  const current = OBJECTS_DATA[0];

  const handleSelect = (opt) => {
    if (selected) return;
    setSelected(opt);
    const isCorrect = opt === current.correct;

    if (isCorrect) {
      voice.speak('Correct! That is a traditional bell-metal cup.', currentLang);
    } else {
      voice.speak(`Nice try. This is a ${current.correct}.`, currentLang);
    }

    offlineOutbox.saveLocalSession({
      gameId: 'object_recall',
      category: 'OBJECT_RECOGNITION',
      accuracy: isCorrect ? 100 : 50,
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Button onClick={onBack} variant="outline" size="sm">
          ← Back to Hub
        </Button>
        <Badge variant="teal" size="sm">Domestic Object Recall</Badge>
      </div>

      <Card className="border-slate-800 bg-slate-900 shadow-xl overflow-hidden">
        <div className="h-64 bg-slate-950">
          <img src={current.image} alt="Domestic Object" className="w-full h-full object-cover" />
        </div>

        <CardContent className="p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-100">
              What domestic object is this?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">Hint: {current.hint}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {current.options.map((opt, i) => (
              <button
                key={i}
                disabled={!!selected}
                onClick={() => handleSelect(opt)}
                className={`p-4 rounded-xl border text-left font-bold text-sm sm:text-base transition-all cursor-pointer ${
                  selected
                    ? opt === current.correct
                      ? 'bg-teal-500/20 border-teal-500 text-teal-300'
                      : opt === selected
                      ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                      : 'opacity-40 bg-slate-900 border-slate-800'
                    : 'bg-slate-800 border-slate-700 hover:border-teal-500 text-slate-200'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          {selected && (
            <div className="pt-2 flex justify-end">
              <Button onClick={onComplete} variant="primary" size="md">
                Complete Activity
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
