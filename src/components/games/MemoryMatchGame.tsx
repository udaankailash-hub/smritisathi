import React, { useState, useEffect } from 'react';
import { GameDifficulty, GameSessionResult } from '../../types';
import { sound } from '../../services/sound';
import { voice } from '../../services/voice';
import { gameEngine } from '../../services/gameEngine';
import { getLevelConfig } from '../../data/gameConfigurations';
import { GameControlStrip } from './GameControlStrip';
import { Sparkles, Eye, Lightbulb } from 'lucide-react';

interface MemoryCard {
  id: number;
  pairId: number;
  title: string;
  emoji: string;
  tag: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const NE_CULTURAL_ITEMS = [
  { pairId: 1, title: 'One-Horned Rhino', emoji: '🦏', tag: 'Kaziranga Symbol' },
  { pairId: 2, title: 'Mekhela Chador', emoji: '👗', tag: 'Assam Traditional' },
  { pairId: 3, title: 'Great Hornbill', emoji: '🪶', tag: 'State Bird & Pride' },
  { pairId: 4, title: 'Assam Tea Garden', emoji: '🍃', tag: 'Fresh Green Leaves' },
  { pairId: 5, title: 'Bamboo Japi Craft', emoji: '👒', tag: 'Traditional Hat' },
  { pairId: 6, title: 'Bihu Dhol Drum', emoji: '🪘', tag: 'Folk Rhythm' },
  { pairId: 7, title: 'Loktak Lake Hut', emoji: '🏞️', tag: 'Floating Phumdi' },
  { pairId: 8, title: 'Eri Silk Shawl', emoji: '🧣', tag: 'Warm Natural Fabric' },
];

interface MemoryMatchGameProps {
  difficulty: GameDifficulty;
  onComplete: (result: Omit<GameSessionResult, 'id' | 'patientId' | 'startedAt' | 'completedAt' | 'synced'>) => void;
  onExit?: () => void;
}

export const MemoryMatchGame: React.FC<MemoryMatchGameProps> = ({
  difficulty,
  onComplete,
  onExit,
}) => {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [totalPairs, setTotalPairs] = useState(2);
  const [isPaused, setIsPaused] = useState(false);
  const [isExposing, setIsExposing] = useState(true);
  const [exposureCountdown, setExposureCountdown] = useState(3);
  const [hintPairId, setHintPairId] = useState<number | null>(null);

  const levelNumber = difficulty === 'hard' ? 4 : difficulty === 'medium' ? 3 : 2;
  const levelConfig = getLevelConfig('game_memory_match', levelNumber);

  // Initialize deck based on configurable level
  useEffect(() => {
    gameEngine.startSession('p_abeni_01', 'game_memory_match', difficulty, levelNumber);
    const pairCount = levelConfig.itemCount; // e.g. 2, 3, 4, or 5 pairs
    setTotalPairs(pairCount);

    const selected = NE_CULTURAL_ITEMS.slice(0, pairCount);
    const deck: MemoryCard[] = [];

    selected.forEach((item, index) => {
      deck.push({
        id: index * 2,
        pairId: item.pairId,
        title: item.title,
        emoji: item.emoji,
        tag: item.tag,
        isFlipped: true, // Initially exposed for brief preview
        isMatched: false,
      });
      deck.push({
        id: index * 2 + 1,
        pairId: item.pairId,
        title: item.title,
        emoji: item.emoji,
        tag: item.tag,
        isFlipped: true,
        isMatched: false,
      });
    });

    const shuffled = deck.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedIndices([]);
    setMoves(0);
    setMatchedPairs(0);
    setIsExposing(true);
    setExposureCountdown(levelConfig.exposureTimeSeconds || 3);

    // Initial exposure timer
    const interval = setInterval(() => {
      setExposureCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsExposing(false);
          setCards((current) => current.map((c) => ({ ...c, isFlipped: false })));
          voice.speak('Now find the matching pairs of cards.', 'en');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [difficulty]);

  const handleCardClick = (index: number) => {
    if (isPaused || isExposing) return;
    if (cards[index].isFlipped || cards[index].isMatched) return;
    if (flippedIndices.length === 2) return;

    sound.playClick();
    const newFlipped = [...flippedIndices, index];
    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [firstIdx, secondIdx] = newFlipped;
      const firstCard = newCards[firstIdx];
      const secondCard = newCards[secondIdx];

      if (firstCard.pairId === secondCard.pairId) {
        // MATCH
        sound.playSuccess();
        gameEngine.recordAttempt(true);
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c, i) =>
              i === firstIdx || i === secondIdx ? { ...c, isMatched: true } : c
            )
          );
          setFlippedIndices([]);
          setMatchedPairs((mp) => {
            const nextMatched = mp + 1;
            if (nextMatched === totalPairs) {
              handleGameFinished();
            }
            return nextMatched;
          });
        }, 500);
      } else {
        // MISMATCH
        gameEngine.recordAttempt(false);
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c, i) =>
              i === firstIdx || i === secondIdx ? { ...c, isFlipped: false } : c
            )
          );
          setFlippedIndices([]);
        }, 1200);
      }
    }
  };

  const handleGameFinished = () => {
    const session = gameEngine.completeSession(
      'p_abeni_01',
      'game_memory_match',
      'Memory Cards (Cultural Match)',
      difficulty,
      levelNumber
    );

    onComplete({
      gameId: 'game_memory_match',
      gameTitle: 'Memory Cards (Cultural Match)',
      category: 'MEMORY',
      difficulty,
      durationSeconds: session.durationSeconds,
      score: session.performanceScore,
      accuracy: session.accuracy,
      attempts: session.attempts,
      responseTimeMs: session.responseTimeMs,
      notes: session.notes,
    });
  };

  const handleUseHint = () => {
    gameEngine.recordHintUsed('Highlighted matching pair');
    const unmatched = cards.filter((c) => !c.isMatched);
    if (unmatched.length >= 2) {
      const targetPairId = unmatched[0].pairId;
      setHintPairId(targetPairId);
      voice.speak('Look at the highlighted glowing cards.', 'en');
      setTimeout(() => setHintPairId(null), 3000);
    }
  };

  const handleRepeatInstruction = () => {
    gameEngine.recordInstructionRepeat();
    voice.speak('Tap on cards to flip them over. Find pairs that match.', 'en');
  };

  const handleNeedHelp = () => {
    gameEngine.recordHelpTriggered();
    handleUseHint();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Status Banner */}
      <div className="bg-[#101F31] border border-[#243A50] rounded-3xl p-5 shadow-xl flex flex-wrap items-center justify-between gap-4 text-[#F4F8FC]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-teal-500/20 text-teal-300 border border-teal-500/40 flex items-center justify-center font-black">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider font-bold text-[#38D9C5]">
              {levelConfig.label}
            </div>
            <div className="text-base font-black">
              Pairs Found: <span className="text-[#38D9C5]">{matchedPairs}</span> / {totalPairs}
            </div>
          </div>
        </div>

        {isExposing ? (
          <div className="px-4 py-2 bg-amber-500/20 border border-amber-500/40 text-amber-300 rounded-2xl font-black text-xs flex items-center gap-2 animate-pulse">
            <Eye className="w-4 h-4" />
            <span>Remembering Cards: {exposureCountdown}s</span>
          </div>
        ) : (
          <div className="text-xs font-bold text-[#7F91A6]">
            Turns Taken: <span className="text-[#F4F8FC] font-black">{moves}</span>
          </div>
        )}
      </div>

      {/* Cards Grid (Large Touch Targets: 100px+ height) */}
      <div
        className={`grid gap-4 ${
          totalPairs <= 2
            ? 'grid-cols-2 max-w-md mx-auto'
            : totalPairs === 3
            ? 'grid-cols-2 sm:grid-cols-3'
            : 'grid-cols-2 sm:grid-cols-4'
        }`}
      >
        {cards.map((card, idx) => {
          const isHighlighted = hintPairId === card.pairId;
          return (
            <button
              key={card.id}
              disabled={card.isMatched || isExposing || isPaused}
              onClick={() => handleCardClick(idx)}
              className={`min-h-[120px] sm:min-h-[140px] rounded-3xl p-4 flex flex-col items-center justify-center gap-2 border-2 transition-all duration-300 transform active:scale-95 cursor-pointer select-none ${
                card.isMatched
                  ? 'bg-emerald-950/40 border-emerald-500/50 opacity-50 scale-95'
                  : card.isFlipped
                  ? 'bg-[#14283D] border-[#19C3B1] shadow-lg shadow-teal-500/10'
                  : isHighlighted
                  ? 'bg-amber-950/60 border-amber-400 ring-4 ring-amber-400/40 animate-bounce'
                  : 'bg-[#101F31] hover:bg-[#14283D] border-[#243A50] hover:border-[#38D9C5]'
              }`}
            >
              {card.isFlipped || card.isMatched ? (
                <>
                  <span className="text-4xl sm:text-5xl">{card.emoji}</span>
                  <span className="text-xs font-black text-[#F4F8FC] text-center leading-tight">
                    {card.title}
                  </span>
                </>
              ) : (
                <div className="w-12 h-12 rounded-full bg-[#14283D] border border-[#243A50] flex items-center justify-center text-xl font-black text-[#38D9C5]">
                  ?
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Standardized Bottom Control Strip */}
      <GameControlStrip
        onRepeatInstruction={handleRepeatInstruction}
        onNeedHelp={handleNeedHelp}
        onTogglePause={() => setIsPaused(!isPaused)}
        onExit={onExit || (() => {})}
        onUseHint={handleUseHint}
        isPaused={isPaused}
        canUseHint={!isExposing && matchedPairs < totalPairs}
      />
    </div>
  );
};
