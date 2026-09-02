import React from 'react';
import { Eye, Type, Sparkles, Volume2, MoveHorizontal } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

export function AccessibilityDrawer({ isOpen, onClose, highContrast, onToggleContrast, fontSize, onFontSizeChange, reducedMotion, onToggleReducedMotion }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Senior Accessibility Controls"
      subtitle="Tailored for elderly vision, vestibular comfort, and touch ergonomics"
      maxWidth="max-w-md"
    >
      <div className="space-y-5 text-xs text-slate-300">
        {/* Font Size Selector */}
        <div className="space-y-2">
          <label className="font-bold text-white text-sm flex items-center gap-2">
            <Type className="w-4 h-4 text-teal-400" />
            <span>Typography Size</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['normal', 'large', 'extra-large'].map((size) => (
              <button
                key={size}
                onClick={() => onFontSizeChange?.(size)}
                className={`py-2 px-3 rounded-xl border font-bold text-xs capitalize transition-all cursor-pointer ${
                  fontSize === size
                    ? 'bg-teal-600 border-teal-500 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* High Contrast Mode Toggle */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4">
          <div>
            <h5 className="font-bold text-white text-sm">High Contrast Mode</h5>
            <p className="text-slate-400 mt-0.5">Deep solid blacks with high-contrast text.</p>
          </div>
          <button
            onClick={onToggleContrast}
            className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all cursor-pointer ${
              highContrast ? 'bg-teal-600 text-white' : 'bg-slate-800 text-slate-400'
            }`}
          >
            {highContrast ? 'Enabled' : 'Disabled'}
          </button>
        </div>

        {/* Reduced Motion Toggle */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4">
          <div>
            <h5 className="font-bold text-white text-sm">Reduced Motion</h5>
            <p className="text-slate-400 mt-0.5">Disable transitions for vestibular safety.</p>
          </div>
          <button
            onClick={onToggleReducedMotion}
            className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all cursor-pointer ${
              reducedMotion ? 'bg-teal-600 text-white' : 'bg-slate-800 text-slate-400'
            }`}
          >
            {reducedMotion ? 'Enabled' : 'Disabled'}
          </button>
        </div>

        <div className="flex justify-end pt-2">
          <Button onClick={onClose} variant="primary" size="sm">
            Save & Apply
          </Button>
        </div>
      </div>
    </Modal>
  );
}
