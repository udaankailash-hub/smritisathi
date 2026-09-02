import React, { useState, useEffect } from 'react';
import { GameDifficulty, GameSessionResult } from '../../types';
import { sound } from '../../services/sound';
import { voice } from '../../services/voice';
import { gameEngine } from '../../services/gameEngine';
import { getLevelConfig } from '../../data/gameConfigurations';
import { GameControlStrip } from './GameControlStrip';
import { Music, Play, RotateCcw, Volume2, Sparkles } from 'lucide-react';

interface ChimeItem {
  id: number;
  name: string;
  emoji: string;
  freq: number;
  color: string;
}

const CHIMES: ChimeItem[] = [
  { id: 0, name: 'Bihu Dhol (Low)', emoji: '🪘', freq: 261.63, color: 'from-teal-500 to-emerald-600' }, // C4
  { id: 1, name: 'Temple Bell (Mid)', emoji: '🔔', freq: 329.63, color: 'from-indigo-500 to-blue-600' },   // E4
  { id: 2, name: 'Bamboo Flute (High)', emoji: '🪈', freq: 392.0, color: 'from-amber-500 to-orange-600' }, // G4
  { id: 3, name: 'Brass Cymbal (Peak)', emoji: '✨', freq: 523.25, color: 'from-rose-500 to-pink-600' },    // C5
];

interface RhythmPatternGameProps {
  difficulty: GameDifficulty;
  onComplete: (result: Omit<GameSessionResult, 'id' | 'patientId' | 'startedAt' | 'completedAt' | 'synced'>) => void;
  onExit?: () => void;
}

export const RhythmPatternGame: React.FC<RhythmPatternGameProps> = ({
  difficulty,
  onComplete,
  onExit,
}) => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerInput, setPlayerInput] = useState<number[]>([]);
  const [isPlayingSeq, setIsPlayingSeq] = useState(false);
  const [activeHighlight, setActiveHighlight] = useState<number | null>(null);
  const [round, setRound] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const levelNumber = difficulty === 'hard' ? 4 : difficulty === 'medium' ? 3 : 2;
  const levelConfig = getLevelConfig('game_pattern_rhythm', levelNumber);
  const targetSequenceLength = levelConfig.itemCount; // e.g. 2, 3, 4, or 5 items

  useEffect(() => {
    gameEngine.startSession('p_abeni_01', 'game_pattern_rhythm', difficulty, levelNumber);
    startNewRound(1);
  }, [difficulty]);

  const startNewRound = (currentRound: number) => {
    setPlayerInput([]);
    setIsPlayingSeq(true);

    // Generate sequence of length according to current round up to targetSequenceLength
    const length = Math.min(targetSequenceLength, currentRound + 1);
    const newSeq: number[] = [];
    for (let i = 0; i < length; i++) {
      newSeq.push(Math.floor(Math.random() * 4));
    }
    setSequence(newSeq);

    // Playback sequence with chimes
    setTimeout(() => {
      playSequenceToUser(newSeq);
    }, 600);
  };

  const playSequenceToUser = async (seq: number[]) => {
    setIsPlayingSeq(true);
    for (let i = 0; i < seq.length; i++) {
      const chimeIdx = seq[i];
      setActiveHighlight(chimeIdx);
      playChimeTone(CHIMES[chimeIdx].freq);
      await new Promise((r) => setTimeout(r, 600));
      setActiveHighlight(null);
      await new Promise((r) => setTimeout(r, 200));
    }
    setIsPlayingSeq(false);
    voice.speak('Now repeat the sequence in order.', 'en');
  };

  const playChimeTone = (freq: number) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.52);
    } catch {}
  };

  const handleChimeClick = (chimeIdx: number) => {
    if (isPlayingSeq || isPaused) return;

    sound.playClick();
    playChimeTone(CHIMES[chimeIdx].freq);
    setActiveHighlight(chimeIdx);
    setTimeout(() => setActiveHighlight(null), 300);

    const nextInput = [...playerInput, chimeIdx];
    setPlayerInput(nextInput);

    const stepIndex = nextInput.length - 1;
    if (nextInput[stepIndex] !== sequence[stepIndex]) {
      // Mistake
      sound.playGentleChime();
      gameEngine.recordAttempt(false);
      voice.speak('Take your time. Listen to the rhythm again.', 'en');
      setTimeout(() => {
        setPlayerInput([]);
        playSequenceToUser(sequence);
      }, 1000);
      return;
    }

    if (nextInput.length === sequence.length) {
      // Completed current round sequence
      sound.playSuccess();
      gameEngine.recordAttempt(true);

      if (sequence.length >= targetSequenceLength) {
        // Game Finished
        setTimeout(() => {
          const session = gameEngine.completeSession(
            'p_abeni_01',
            'game_pattern_rhythm',
            'Sequence Memory & Rhythm',
            difficulty,
            levelNumber
          );

          onComplete({
            gameId: 'game_pattern_rhythm',
            gameTitle: 'Sequence Memory & Rhythm',
            category: 'PATTERN',
            difficulty,
            durationSeconds: session.durationSeconds,
            score: session.performanceScore,
            accuracy: session.accuracy,
            attempts: session.attempts,
            responseTimeMs: session.responseTimeMs,
            notes: session.notes,
          });
        }, 800);
      } else {
        setRound((r) => r + 1);
        setTimeout(() => startNewRound(round + 1), 1200);
      }
    }
  };

  const handleRepeatInstruction = () => {
    gameEngine.recordInstructionRepeat();
    playSequenceToUser(sequence);
  };

  const handleNeedHelp = () => {
    gameEngine.recordHelpTriggered();
    gameEngine.recordHintUsed('Slowed down sequence replay');
    playSequenceToUser(sequence);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-[#101F31] border border-[#243A50] rounded-3xl p-5 shadow-xl flex flex-wrap items-center justify-between gap-4 text-[#F4F8FC]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 flex items-center justify-center">
            <Music className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider font-bold text-[#38D9C5]">
              {levelConfig.label}
            </div>
            <div className="text-base font-black">
              Sequence Length: <span className="text-[#38D9C5]">{sequence.length}</span> items
            </div>
          </div>
        </div>

        <button
          disabled={isPlayingSeq}
          onClick={() => playSequenceToUser(sequence)}
          className="px-4 py-2 bg-[#14283D] hover:bg-[#162B40] text-[#38D9C5] border border-[#243A50] rounded-2xl text-xs font-bold flex items-center gap-1.5 transition disabled:opacity-50 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Replay Sequence</span>
        </button>
      </div>

      {/* 4 Large Chime Buttons (72px+ Height) */}
      <div className="grid grid-cols-2 gap-4">
        {CHIMES.map((chime) => {
          const isGlowing = activeHighlight === chime.id;
          return (
            <button
              key={chime.id}
              disabled={isPlayingSeq || isPaused}
              onClick={() => handleChimeClick(chime.id)}
              className={`min-h-[140px] rounded-3xl p-6 border-2 flex flex-col items-center justify-center gap-3 transition-all duration-200 transform active:scale-95 cursor-pointer select-none ${
                isGlowing
                  ? 'bg-gradient-to-br ' + chime.color + ' border-white ring-4 ring-white/50 scale-105 shadow-2xl'
                  : 'bg-[#101F31] hover:bg-[#14283D] border-[#243A50] hover:border-[#38D9C5]'
              }`}
            >
              <span className="text-5xl">{chime.emoji}</span>
              <span className="text-sm font-black text-white">{chime.name}</span>
            </button>
          );
        })}
      </div>

      {/* Progress Dots */}
      <div className="flex items-center justify-center gap-2 py-2">
        {sequence.map((_, idx) => (
          <div
            key={idx}
            className={`w-3.5 h-3.5 rounded-full transition-all ${
              idx < playerInput.length
                ? 'bg-[#19C3B1] ring-2 ring-teal-400/40 scale-110'
                : 'bg-[#243A50]'
            }`}
          />
        ))}
      </div>

      {/* Standardized Bottom Control Strip */}
      <GameControlStrip
        onRepeatInstruction={handleRepeatInstruction}
        onNeedHelp={handleNeedHelp}
        onTogglePause={() => setIsPaused(!isPaused)}
        onExit={onExit || (() => {})}
        onUseHint={handleNeedHelp}
        isPaused={isPaused}
      />
    </div>
  );
};
