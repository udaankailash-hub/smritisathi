import React, { useState, useEffect } from 'react';
import { RotateCcw, CheckCircle2, Volume2 } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { voice } from '../../services/voiceService';
import { offlineOutbox } from '../../services/offlineOutbox';

const CULTURAL_CARDS = [
  { id: '1', name: 'Assam Tea Leaf', icon: '🌿', pair: 'tea' },
  { id: '2', name: 'Assam Tea Leaf', icon: '🌿', pair: 'tea' },
  { id: '3', name: 'Hornbill Motif', icon: '🦤', pair: 'hornbill' },
  { id: '4', name: 'Hornbill Motif', icon: '🦤', pair: 'hornbill' },
  { id: '5', name: 'Bamboo Craft', icon: '🎋', pair: 'bamboo' },
  { id: '6', name: 'Bamboo Craft', icon: '🎋', pair: 'bamboo' },
];

export function MemoryMatchGame({ currentLang = 'en', onBack, onComplete }) {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    // Shuffle cards
    const shuffled = [...CULTURAL_CARDS].sort(() => Math.random() - 0.5);
    setCards(shuffled);
  }, []);

  const handleCardClick = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [firstIdx, secondIdx] = newFlipped;
      if (cards[firstIdx].pair === cards[secondIdx].pair) {
        setMatched((prev) => {
          const next = [...prev, firstIdx, secondIdx];
          if (next.length === cards.length) {
            voice.speak('Excellent memory! You matched all regional symbols.', currentLang);
            // Save offline session
            offlineOutbox.saveLocalSession({
              gameId: 'memory_match',
              category: 'WORKING_MEMORY',
              accuracy: 100,
              moves: moves + 1,
            });
          }
          return next;
        });
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  const handleRestart = () => {
    setCards([...CULTURAL_CARDS].sort(() => Math.random() - 0.5));
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  };

  const isCompleted = matched.length === cards.length && cards.length > 0;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Button onClick={onBack} variant="outline" size="sm">
          ← Back to Hub
        </Button>
        <div className="flex items-center gap-2">
          <Badge variant="teal" size="sm">Cultural Working Memory</Badge>
          <span className="text-xs text-slate-400 font-semibold">Moves: {moves}</span>
        </div>
      </div>

      <Card className="border-slate-800 bg-slate-900 shadow-xl">
        <CardContent className="p-6 sm:p-8 space-y-6">
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl font-black text-slate-100">
              Find the matching regional pairs
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Tap cards to reveal traditional North Eastern symbols.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-lg mx-auto">
            {cards.map((card, idx) => {
              const isRevealed = flipped.includes(idx) || matched.includes(idx);
              return (
                <button
                  key={idx}
                  onClick={() => handleCardClick(idx)}
                  className={`h-28 sm:h-32 rounded-2xl border-2 font-black text-3xl sm:text-4xl flex flex-col items-center justify-center transition-all cursor-pointer select-none ${
                    isRevealed
                      ? 'bg-teal-500/20 border-teal-500 text-teal-300'
                      : 'bg-slate-800 border-slate-700 hover:border-slate-600 text-slate-500'
                  }`}
                >
                  {isRevealed ? (
                    <>
                      <span>{card.icon}</span>
                      <span className="text-[10px] font-semibold text-slate-300 mt-1">
                        {card.name}
                      </span>
                    </>
                  ) : (
                    <span>?</span>
                  )}
                </button>
              );
            })}
          </div>

          {isCompleted && (
            <div className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-teal-400" />
                <span className="text-sm font-bold text-teal-300">All pairs matched!</span>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleRestart} variant="outline" size="sm" icon={RotateCcw}>
                  Play Again
                </Button>
                <Button onClick={onComplete} variant="primary" size="sm">
                  Finish
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
