import React from 'react';

export function FormField({ label, error, helperText, required = false, children, className = '' }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-xs sm:text-sm font-semibold text-slate-200">
          {label}
          {required && <span className="text-rose-400 ml-1">*</span>}
        </label>
      )}
      {children}
      {error && <p className="text-xs text-rose-400 font-medium">{error}</p>}
      {helperText && !error && <p className="text-xs text-slate-400">{helperText}</p>}
    </div>
  );
}

export function Input({ error, className = '', ...props }) {
  return (
    <input
      className={`w-full px-3.5 py-2.5 bg-slate-950/60 border rounded-xl text-slate-100 placeholder:text-slate-500 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-teal-500 ${
        error ? 'border-rose-500' : 'border-slate-700 hover:border-slate-600'
      } ${className}`}
      {...props}
    />
  );
}

export function Textarea({ error, rows = 3, className = '', ...props }) {
  return (
    <textarea
      rows={rows}
      className={`w-full px-3.5 py-2.5 bg-slate-950/60 border rounded-xl text-slate-100 placeholder:text-slate-500 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-teal-500 ${
        error ? 'border-rose-500' : 'border-slate-700 hover:border-slate-600'
      } ${className}`}
      {...props}
    />
  );
}

export function Select({ options = [], error, className = '', ...props }) {
  return (
    <select
      className={`w-full px-3.5 py-2.5 bg-slate-950/60 border rounded-xl text-slate-100 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-teal-500 ${
        error ? 'border-rose-500' : 'border-slate-700 hover:border-slate-600'
      } ${className}`}
      {...props}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} className="bg-slate-900 text-slate-100">
          {opt.label}
        </option>
      ))}
    </select>
  );
}
