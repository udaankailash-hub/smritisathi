import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { getTranslation } from '../../services/i18n';

export function SafetyDisclaimer({ currentLang = 'en' }) {
  return (
    <section className="py-8 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="p-4 sm:p-5 rounded-2xl border border-teal-500/30 bg-slate-900/90 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs text-slate-400">
        <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 shrink-0">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <strong className="text-teal-300 font-semibold block sm:inline mr-2">
            {getTranslation(currentLang, 'disclaimerTitle')}:
          </strong>
          <span>{getTranslation(currentLang, 'disclaimerText')}</span>
        </div>
      </div>
    </section>
  );
}
