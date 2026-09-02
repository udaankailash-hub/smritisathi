import React from 'react';
import { Volume2, HelpCircle, Pause, Play, LogOut, Lightbulb } from 'lucide-react';
import { sound } from '../../services/sound';

interface GameControlStripProps {
  onRepeatInstruction: () => void;
  onNeedHelp: () => void;
  onTogglePause: () => void;
  onExit: () => void;
  onUseHint?: () => void;
  isPaused: boolean;
  canUseHint?: boolean;
}

export const GameControlStrip: React.FC<GameControlStripProps> = ({
  onRepeatInstruction,
  onNeedHelp,
  onTogglePause,
  onExit,
  onUseHint,
  isPaused,
  canUseHint = true,
}) => {
  return (
    <div className="bg-[#101F31] border border-[#243A50] rounded-3xl p-4 sm:p-5 shadow-2xl flex flex-wrap items-center justify-between gap-3 text-[#F4F8FC]">
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Repeat Voice Instructions */}
        <button
          id="repeat-instruction-btn"
          onClick={() => {
            sound.playClick();
            onRepeatInstruction();
          }}
          className="min-h-[52px] px-4 sm:px-5 rounded-2xl bg-[#14283D] hover:bg-[#162B40] text-[#38D9C5] border border-[#243A50] font-black text-sm flex items-center gap-2 transition active:scale-95 cursor-pointer shadow-xs"
          title="Repeat spoken instructions"
        >
          <Volume2 className="w-5 h-5" />
          <span>Repeat</span>
        </button>

        {/* Gentle Hint Trigger */}
        {onUseHint && canUseHint && (
          <button
            id="game-hint-btn"
            onClick={() => {
              sound.playClick();
              onUseHint();
            }}
            className="min-h-[52px] px-4 sm:px-5 rounded-2xl bg-amber-950/40 hover:bg-amber-900/60 text-amber-300 border border-amber-500/30 font-black text-sm flex items-center gap-2 transition active:scale-95 cursor-pointer shadow-xs"
            title="Show gentle hint"
          >
            <Lightbulb className="w-5 h-5 text-amber-400" />
            <span>Hint</span>
          </button>
        )}

        {/* Help Button */}
        <button
          id="game-help-btn"
          onClick={() => {
            sound.playClick();
            onNeedHelp();
          }}
          className="min-h-[52px] px-4 sm:px-5 rounded-2xl bg-[#14283D] hover:bg-[#162B40] text-[#8B7CFF] border border-[#243A50] font-black text-sm flex items-center gap-2 transition active:scale-95 cursor-pointer shadow-xs"
          title="Assistance and guidance"
        >
          <HelpCircle className="w-5 h-5" />
          <span>Help</span>
        </button>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Pause / Resume */}
        <button
          id="game-pause-btn"
          onClick={() => {
            sound.playClick();
            onTogglePause();
          }}
          className="min-h-[52px] px-4 sm:px-5 rounded-2xl bg-[#14283D] hover:bg-[#162B40] text-slate-200 border border-[#243A50] font-black text-sm flex items-center gap-2 transition active:scale-95 cursor-pointer shadow-xs"
        >
          {isPaused ? <Play className="w-5 h-5 text-emerald-400" /> : <Pause className="w-5 h-5" />}
          <span>{isPaused ? 'Resume' : 'Pause'}</span>
        </button>

        {/* Exit Button */}
        <button
          id="game-exit-btn"
          onClick={() => {
            sound.playClick();
            onExit();
          }}
          className="min-h-[52px] px-4 sm:px-5 rounded-2xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/40 font-black text-sm flex items-center gap-2 transition active:scale-95 cursor-pointer shadow-xs"
          title="Return to activities catalog"
        >
          <LogOut className="w-5 h-5" />
          <span>Exit</span>
        </button>
      </div>
    </div>
  );
};
