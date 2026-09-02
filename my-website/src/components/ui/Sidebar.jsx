import React from 'react';
import {
  Home,
  Heart,
  Grid,
  ListOrdered,
  Music,
  Bell,
  Activity,
  Users,
  ShieldCheck,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { Badge } from './Badge';

export function Sidebar({ currentRole, currentTab, onSelectTab, onRoleChange, onCloseMobile }) {
  const roleNavConfigs = {
    PATIENT: [
      { id: 'hub', label: "Today's Hub", icon: Home },
      { id: 'game_personal', label: 'Family Memories', icon: Heart, badge: 'Flagship' },
      { id: 'game_match', label: 'Memory Match', icon: Grid },
      { id: 'game_routine', label: 'Daily Routine', icon: ListOrdered },
      { id: 'music', label: 'Peaceful Music', icon: Music },
      { id: 'reminders', label: 'Daily Schedule', icon: Bell },
    ],
    CAREGIVER: [
      { id: 'overview', label: 'Daily Overview', icon: Home },
      { id: 'memories', label: 'Memory Approvals', icon: Heart, badge: 'Needs Action' },
      { id: 'trends', label: 'Interaction Trends', icon: Activity },
    ],
    ASHA: [
      { id: 'village_cluster', label: 'Village Cluster', icon: Users },
      { id: 'triage', label: 'Triage Priority', icon: Activity, badge: '1 Check-in' },
    ],
    CLINICIAN: [
      { id: 'telemetry', label: 'Patient Telemetry', icon: Activity },
      { id: 'reports', label: 'Reports & Review', icon: ShieldCheck },
    ],
    ADMIN: [
      { id: 'system', label: 'System Health', icon: ShieldCheck },
      { id: 'audit', label: 'Audit Trail', icon: Activity },
    ],
  };

  const navItems = roleNavConfigs[currentRole] || [];

  if (currentRole === 'LANDING') return null;

  return (
    <aside className="w-64 shrink-0 hidden md:flex flex-col justify-between bg-slate-900/90 border-r border-slate-800 p-4 rounded-2xl">
      <div className="space-y-4">
        {/* Workspace Label */}
        <div className="px-3 py-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-teal-400 block">
            WORKSPACE
          </span>
          <h4 className="text-sm font-bold text-slate-100 capitalize">
            {currentRole.toLowerCase().replace('_', ' ')} Workspace
          </h4>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab?.(item.id);
                  onCloseMobile?.();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold text-xs transition-all cursor-pointer ${
                  isActive
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </div>
                {item.badge ? (
                  <Badge variant={isActive ? 'slate' : 'teal'} size="xs">
                    {item.badge}
                  </Badge>
                ) : (
                  <ChevronRight className={`w-3.5 h-3.5 opacity-50 ${isActive ? 'text-white' : ''}`} />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Switch Portal or Back to Landing */}
      <div className="pt-4 border-t border-slate-800 space-y-2">
        <button
          onClick={() => onRoleChange('LANDING')}
          className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-all cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>Back to Landing Page</span>
        </button>
      </div>
    </aside>
  );
}
