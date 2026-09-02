import React, { useState, useEffect } from 'react';
import { GameDifficulty, GameSessionResult } from '../../types';
import { sound } from '../../services/sound';
import { voice } from '../../services/voice';
import { gameEngine } from '../../services/gameEngine';
import { getLevelConfig } from '../../data/gameConfigurations';
import { GameControlStrip } from './GameControlStrip';
import { CheckCircle2, Volume2, Mic, Sparkles, Lightbulb } from 'lucide-react';

interface ObjectItem {
  id: string;
  name: string;
  emoji: string;
  category: string;
  description: string;
  hint: string;
  allDistractors: string[];
}

const OBJECTS_CATALOG: ObjectItem[] = [
  {
    id: 'obj_tea_strainer',
    name: 'Traditional Tea Strainer',
    emoji: '🫖',
    category: 'Kitchen & Daily Routine',
    description: 'A mesh tool used every morning to filter fresh Assam tea leaves into cups.',
    hint: 'Used in the kitchen when preparing your hot morning CTC tea.',
    allDistractors: ['Bamboo Hand Fan', 'Reading Spectacles', 'Walking Cane', 'Garden Trowel'],
  },
  {
    id: 'obj_bamboo_fan',
    name: 'Handwoven Bamboo Fan',
    emoji: '🪭',
    category: 'Household Crafts',
    description: 'A cooling craft made from fine Assam cane used on warm afternoons.',
    hint: 'Made of soft bamboo to provide a gentle cooling breeze on the veranda.',
    allDistractors: ['Brass Tea Kettle', 'Ceramic Rice Bowl', 'Reading Spectacles', 'Table Lamp'],
  },
  {
    id: 'obj_spectacles',
    name: 'Reading Spectacles',
    emoji: '👓',
    category: 'Personal Belongings',
    description: 'Worn to read the morning newspaper and solve daily crossword puzzles.',
    hint: 'Resting on the bedside table to help read daily books clearly.',
    allDistractors: ['Bamboo Walking Cane', 'Ceramic Teacup', 'Clay Oil Lamp', 'Pocket Watch'],
  },
  {
    id: 'obj_gamosa',
    name: 'Traditional Muga Gamosa',
    emoji: '🧣',
    category: 'Cultural Heritage',
    description: 'Handwoven white and red cotton towel presented as a mark of respect and love.',
    hint: 'Adorned with red floral motifs and draped during festive Bihu family greetings.',
    allDistractors: ['Silk Mekhela', 'Tea Container', 'Brass Water Jug', 'Clay Lamp'],
  },
];

interface ObjectRecognitionGameProps {
  difficulty: GameDifficulty;
  onComplete: (result: Omit<GameSessionResult, 'id' | 'patientId' | 'startedAt' | 'completedAt' | 'synced'>) => void;
  onExit?: () => void;
}

export const ObjectRecognitionGame: React.FC<ObjectRecognitionGameProps> = ({
  difficulty,
  onComplete,
  onExit,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const levelNumber = difficulty === 'hard' ? 4 : difficulty === 'medium' ? 3 : 2;
  const levelConfig = getLevelConfig('game_object_recognition', levelNumber);

  const currentItem = OBJECTS_CATALOG[currentIdx % OBJECTS_CATALOG.length];

  // Prepare option count according to Level 1–4 (2, 3, 4, or 5 options)
  const optionCount = levelConfig.itemCount;
  const distractors = currentItem.allDistractors.slice(0, optionCount - 1);
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    gameEngine.startSession('p_abeni_01', 'game_object_recognition', difficulty, levelNumber);
  }, [difficulty]);

  useEffect(() => {
    const combined = [currentItem.name, ...distractors].sort(() => 0.5 - Math.random());
    setOptions(combined);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setIsCorrect(false);
    setShowHint(false);

    voice.speak(`Look at the picture. Which object is the ${currentItem.name}?`, 'en');
  }, [currentIdx, difficulty]);

  const handleSelect = (option: string) => {
    if (isAnswerChecked || isPaused) return;
    sound.playClick();
    setSelectedOption(option);
    const correct = option === currentItem.name;
    setIsAnswerChecked(true);
    setIsCorrect(correct);

    gameEngine.recordAttempt(correct);

    if (correct) {
      sound.playSuccess();
      voice.speak('Completely correct! Wonderful recognition.', 'en');
    } else {
      sound.playGentleChime();
      voice.speak(`Take your time. This item is used for: ${currentItem.hint}`, 'en');
    }
  };

  const handleVoiceAnswer = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      handleSelect(currentItem.name);
    }, 1200);
  };

  const handleNext = () => {
    if (currentIdx + 1 < OBJECTS_CATALOG.length) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      const session = gameEngine.completeSession(
        'p_abeni_01',
        'game_object_recognition',
        'Familiar Object Recognition',
        difficulty,
        levelNumber
      );

      onComplete({
        gameId: 'game_object_recognition',
        gameTitle: 'Familiar Object Recognition',
        category: 'OBJECT_RECOGNITION',
        difficulty,
        durationSeconds: session.durationSeconds,
        score: session.performanceScore,
        accuracy: session.accuracy,
        attempts: session.attempts,
        responseTimeMs: session.responseTimeMs,
        notes: session.notes,
      });
    }
  };

  const handleRepeatInstruction = () => {
    gameEngine.recordInstructionRepeat();
    voice.speak(`Which item is the ${currentItem.name}? Tap your answer or speak.`, 'en');
  };

  const handleNeedHelp = () => {
    gameEngine.recordHelpTriggered();
    setShowHint(true);
    gameEngine.recordHintUsed(currentItem.hint);
    voice.speak(currentItem.hint, 'en');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Activity Question Card */}
      <div className="bg-[#101F31] border border-[#243A50] rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 text-[#F4F8FC]">
        <div className="flex items-center justify-between gap-4">
          <span className="px-3 py-1 bg-teal-500/20 text-teal-300 border border-teal-500/30 rounded-full text-xs font-bold uppercase tracking-wider">
            {levelConfig.label} • Question {currentIdx + 1} of {OBJECTS_CATALOG.length}
          </span>

          <button
            onClick={handleVoiceAnswer}
            className={`px-4 py-2 rounded-2xl font-bold text-xs flex items-center gap-2 transition ${
              isListening ? 'bg-rose-600 text-white animate-pulse' : 'bg-indigo-600 hover:bg-indigo-500 text-white'
            }`}
          >
            <Mic className="w-4 h-4" />
            <span>{isListening ? 'Listening...' : 'Voice Answer'}</span>
          </button>
        </div>

        {/* Large Object Visual Icon & Category */}
        <div className="bg-[#07111F] rounded-3xl p-8 border border-[#243A50] text-center space-y-3">
          <div className="text-7xl sm:text-8xl select-none animate-in zoom-in-50 duration-300">
            {currentItem.emoji}
          </div>
          <div className="text-xs font-bold text-[#38D9C5] uppercase">
            {currentItem.category}
          </div>
          <p className="text-base text-[#B7C5D6] max-w-md mx-auto">
            {currentItem.description}
          </p>
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-center text-white">
          What is the name of this familiar object?
        </h3>

        {/* Option Buttons (Large 64px+ Touch Targets) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {options.map((opt, idx) => {
            const isSelected = selectedOption === opt;
            const isOptCorrect = opt === currentItem.name;

            let btnClass = 'bg-[#14283D] hover:bg-[#162B40] border-[#243A50] text-[#F4F8FC]';

            if (isAnswerChecked) {
              if (isOptCorrect) {
                btnClass = 'bg-emerald-950/80 border-emerald-500 text-emerald-100 ring-2 ring-emerald-500/50';
              } else if (isSelected && !isCorrect) {
                btnClass = 'bg-rose-950/80 border-rose-500 text-rose-100';
              } else {
                btnClass = 'bg-[#14283D]/40 border-[#243A50] text-slate-500 opacity-50';
              }
            } else if (isSelected) {
              btnClass = 'bg-teal-900/60 border-teal-400 text-teal-100 ring-2 ring-teal-400/50';
            }

            return (
              <button
                key={idx}
                disabled={isAnswerChecked || isPaused}
                onClick={() => handleSelect(opt)}
                className={`min-h-[64px] p-4 px-6 rounded-2xl border-2 text-left text-base font-bold flex items-center justify-between transition-all active:scale-[0.98] cursor-pointer ${btnClass}`}
              >
                <span>{opt}</span>
                {isAnswerChecked && isOptCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 ml-2" />
                )}
              </button>
            );
          })}
        </div>

        {/* Semantic Hint Box */}
        {showHint && (
          <div className="p-4 bg-amber-950/40 border border-amber-500/30 rounded-2xl flex items-start gap-3 text-amber-200">
            <Lightbulb className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-xs uppercase block text-amber-300">Gentle Hint:</span>
              <p className="text-sm mt-0.5">{currentItem.hint}</p>
            </div>
          </div>
        )}

        {/* Continue Next Button */}
        {isAnswerChecked && (
          <button
            onClick={handleNext}
            className="w-full py-4 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-black text-base rounded-2xl shadow-xl shadow-teal-500/20 active:scale-95 transition cursor-pointer"
          >
            {currentIdx + 1 < OBJECTS_CATALOG.length ? 'Next Object' : 'Complete Activity'}
          </button>
        )}
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
