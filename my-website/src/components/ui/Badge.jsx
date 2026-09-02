import React from 'react';

export function Badge({ children, variant = 'slate', size = 'sm', className = '' }) {
  const variants = {
    teal: 'bg-teal-500/10 text-teal-300 border-teal-500/30',
    sky: 'bg-sky-500/10 text-sky-300 border-sky-500/30',
    amber: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    rose: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
    purple: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
    slate: 'bg-slate-800 text-slate-300 border-slate-700',
  };

  const sizes = {
    xs: 'px-2 py-0.5 text-[10px] font-semibold',
    sm: 'px-2.5 py-1 text-xs font-semibold',
    md: 'px-3 py-1.5 text-sm font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg border uppercase tracking-wider ${variants[variant] || variants.slate} ${sizes[size] || sizes.sm} ${className}`}
    >
      {children}
    </span>
  );
}
