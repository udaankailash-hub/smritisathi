import React from 'react';
import {
  Brain,
  Wifi,
  WifiOff,
  Globe,
  PlayCircle,
  ShieldCheck,
  Eye,
  Menu,
  X,
} from 'lucide-react';
import { LANGUAGES } from '../../services/i18n';
import { Badge } from './Badge';
import { Button } from './Button';

export function Navbar({
  currentRole,
  onRoleChange,
  currentLang,
  onLanguageChange,
  isOffline,
  onToggleOffline,
  pendingSyncCount = 0,
  onOpenDemo,
  onOpenPrivacy,
  onOpenAccessibility,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const roles = [
    { id: 'LANDING', label: 'Platform Home' },
    { id: 'PATIENT', label: 'Senior Tablet' },
    { id: 'CAREGIVER', label: 'Caregiver Portal' },
    { id: 'ASHA', label: 'ASHA Cluster' },
    { id: 'CLINICIAN', label: 'Clinician' },
    { id: 'ADMIN', label: 'Admin' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div
          onClick={() => onRoleChange('LANDING')}
          className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 group-hover:bg-teal-500/20 transition-all shadow-sm">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-white">
                MementoCare <span className="text-teal-400">AI</span>
              </span>
              <Badge variant="teal" size="xs">
                SIH26003
              </Badge>
            </div>
            <p className="text-[10px] text-slate-400 font-medium hidden sm:block">
              MDoNER • North East Region Cognitive Support
            </p>
          </div>
        </div>

        {/* Desktop Role Switcher Tabs */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/90 border border-slate-800 p-1 rounded-xl">
          {roles.map((r) => {
            const isActive = currentRole === r.id;
            return (
              <button
                key={r.id}
                onClick={() => onRoleChange(r.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {r.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls & Utilities */}
        <div className="flex items-center gap-2">
          {/* Offline / Online Network Simulator */}
          <button
            onClick={onToggleOffline}
            title="Toggle Network Connectivity for Offline Testing"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
              isOffline
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 animate-pulse'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            {isOffline ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5 text-teal-400" />}
            <span className="hidden sm:inline">{isOffline ? 'Offline' : 'Online'}</span>
            {pendingSyncCount > 0 && (
              <span className="w-5 h-5 bg-amber-500 text-slate-950 rounded-full text-[10px] font-black flex items-center justify-center">
                {pendingSyncCount}
              </span>
            )}
          </button>

          {/* Multilingual Selector */}
          <div className="relative flex items-center">
            <select
              value={currentLang}
              onChange={(e) => onLanguageChange(e.target.value)}
              className="appearance-none bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold rounded-xl pl-7 pr-3 py-1.5 hover:border-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-500 cursor-pointer"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code} className="bg-slate-900 text-white">
                  {l.native} ({l.name})
                </option>
              ))}
            </select>
            <Globe className="w-3.5 h-3.5 text-slate-400 absolute left-2 pointer-events-none" />
          </div>

          {/* 90-Second SIH Presentation Demo Button */}
          <Button
            onClick={onOpenDemo}
            variant="primary"
            size="sm"
            icon={PlayCircle}
            className="hidden sm:inline-flex bg-gradient-to-r from-teal-600 to-teal-500 shadow-teal-500/20 shadow-md"
          >
            SIH 90s Demo
          </Button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950 p-4 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {roles.map((r) => (
              <button
                key={r.id}
                onClick={() => {
                  onRoleChange(r.id);
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-2 rounded-xl text-xs font-semibold text-left transition-all ${
                  currentRole === r.id
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-900 text-slate-300 border border-slate-800'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
          <div className="pt-2 flex items-center justify-between">
            <Button
              onClick={() => {
                onOpenDemo();
                setMobileMenuOpen(false);
              }}
              variant="primary"
              size="sm"
              icon={PlayCircle}
              className="w-full"
            >
              Start 90s SIH Demo
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
