import React, { useState } from 'react';
import { Volume2, Mic, CheckCircle2, RotateCcw, ArrowRight, Heart } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { voice } from '../../services/voiceService';
import { memoryGraphService } from '../../services/memoryGraph';
import { evaluateAdaptation } from '../../services/adaptiveEngine';
import { offlineOutbox } from '../../services/offlineOutbox';

export function PersonalMemoryGame({ currentLang = 'en', onComplete, onBack }) {
  const memories = memoryGraphService.getApprovedMemories();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const currentMemory = memories[currentIndex] || memories[0];

  const handleSpeak = (text) => {
    voice.speak(text, currentLang);
  };

  const handleSelectAnswer = (option) => {
    if (isAnswered) return;
    setSelectedAnswer(option);
    setIsAnswered(true);
    const correct = option === currentMemory.correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      voice.speak('Wonderful! That is correct.', currentLang);
    } else {
      voice.speak(`That was a gentle guess. The answer is ${currentMemory.correctAnswer}.`, currentLang);
    }

    // Save offline session
    offlineOutbox.saveLocalSession({
      gameId: 'personal_memory',
      category: 'PERSONAL_MEMORY',
      title: currentMemory.title,
      accuracy: correct ? 100 : 60,
      responseTimeMs: 2400,
      correctAnswer: currentMemory.correctAnswer,
      userAnswer: option,
    });
  };

  const handleNext = () => {
    if (currentIndex < memories.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setIsCorrect(false);
    } else {
      onComplete?.();
    }
  };

  const handleSimulateVoice = () => {
    setIsListening(true);
    voice.speak('Listening to your voice...', currentLang);
    setTimeout(() => {
      setIsListening(false);
      handleSelectAnswer(currentMemory.correctAnswer);
    }, 1800);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top Controls Strip */}
      <div className="flex items-center justify-between">
        <Button onClick={onBack} variant="outline" size="sm">
          ← Back to Hub
        </Button>
        <div className="flex items-center gap-2">
          <Badge variant="teal" size="sm">
            <Heart className="w-3.5 h-3.5 fill-teal-400 text-teal-400" />
            Caregiver-Approved Memory
          </Badge>
          <span className="text-xs font-semibold text-slate-400">
            {currentIndex + 1} of {memories.length}
          </span>
        </div>
      </div>

      <Card className="border-teal-500/30 bg-slate-900 shadow-xl overflow-hidden">
        {/* Large Senior Image */}
        <div className="relative h-64 sm:h-80 w-full bg-slate-950 overflow-hidden">
          <img
            src={currentMemory.imageUrl}
            alt={currentMemory.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-slate-950/70 backdrop-blur-xs px-3 py-1 rounded-xl border border-slate-800 text-xs font-semibold text-slate-300">
            Approved by {currentMemory.approvedBy || 'Priyanka'}
          </div>
        </div>

        <CardContent className="p-6 sm:p-8 space-y-6">
          {/* Question & Audio Speak Button */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                {currentMemory.pillar}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-100 mt-1">
                {currentMemory.question}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 italic">
                Context: "{currentMemory.context}"
              </p>
            </div>
            <button
              onClick={() => handleSpeak(currentMemory.question)}
              className="p-3 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-400 hover:bg-teal-500/20 transition-all shrink-0 cursor-pointer"
              title="Read Question Aloud"
            >
              <Volume2 className="w-6 h-6" />
            </button>
          </div>

          {/* Large Senior-Friendly Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {currentMemory.options.map((opt, i) => {
              const isChosen = selectedAnswer === opt;
              let btnStyle = 'bg-slate-800/90 border-slate-700 text-slate-200 hover:border-teal-500/60';

              if (isAnswered) {
                if (opt === currentMemory.correctAnswer) {
                  btnStyle = 'bg-teal-500/20 border-teal-500 text-teal-300 font-bold';
                } else if (isChosen) {
                  btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-300';
                } else {
                  btnStyle = 'opacity-40 bg-slate-900 border-slate-800';
                }
              }

              return (
                <button
                  key={i}
                  disabled={isAnswered}
                  onClick={() => handleSelectAnswer(opt)}
                  className={`p-4 sm:p-5 rounded-2xl border text-left font-bold text-base sm:text-lg transition-all min-h-[64px] flex items-center justify-between cursor-pointer ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {isAnswered && opt === currentMemory.correctAnswer && (
                    <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Voice Input Action Button */}
          {!isAnswered && (
            <div className="pt-2 flex items-center justify-center">
              <Button
                onClick={handleSimulateVoice}
                variant="outline"
                size="lg"
                icon={Mic}
                className={isListening ? 'border-amber-500 text-amber-400 animate-pulse' : ''}
              >
                {isListening ? 'Listening to voice...' : 'Speak Your Answer'}
              </Button>
            </div>
          )}

          {/* Feedback & Next Button */}
          {isAnswered && (
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-200">
                  {isCorrect ? '✅ Well done, Abeni!' : '🌱 Activity saved to local review.'}
                </span>
              </div>
              <Button onClick={handleNext} variant="primary" size="md" icon={ArrowRight}>
                {currentIndex < memories.length - 1 ? 'Next Memory' : 'Complete Session'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
