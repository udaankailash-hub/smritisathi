import React from 'react';

export function Table({ children, className = '' }) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60">
      <table className={`w-full text-left text-sm text-slate-300 border-collapse ${className}`}>{children}</table>
    </div>
  );
}

export function TableHeader({ children }) {
  return <thead className="bg-slate-950/60 text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800">{children}</thead>;
}

export function TableBody({ children }) {
  return <tbody className="divide-y divide-slate-800/60">{children}</tbody>;
}

export function TableRow({ children, className = '', ...props }) {
  return (
    <tr className={`hover:bg-slate-800/40 transition-colors ${className}`} {...props}>
      {children}
    </tr>
  );
}

export function TableHead({ children, className = '' }) {
  return <th className={`px-4 py-3.5 font-semibold text-slate-200 ${className}`}>{children}</th>;
}

export function TableCell({ children, className = '' }) {
  return <td className={`px-4 py-3 text-slate-300 ${className}`}>{children}</td>;
}
