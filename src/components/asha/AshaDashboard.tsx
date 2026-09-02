import React, { useState } from 'react';
import {
  Users,
  MapPin,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Clock,
  Phone,
  Wifi,
  WifiOff,
  RefreshCw,
  Plus,
  ChevronRight,
  Shield,
  FileText,
  Search,
  Filter,
  Send,
  Heart,
} from 'lucide-react';
import { AshaPatientItem, SupportedLanguage } from '../../types';
import { sound } from '../../services/sound';
import { offlineSync } from '../../services/offlineSync';

interface AshaDashboardProps {
  ashaName?: string;
  villageName?: string;
  currentLang: SupportedLanguage;
  onOpenPatientDemo?: (patientId: string) => void;
}

const DEMO_VILLAGE_PATIENTS: AshaPatientItem[] = [
  {
    id: 'p_abeni_01',
    name: 'Abeni',
    age: 72,
    gender: 'Female',
    village: 'Silpukhuri Ward 3, Guwahati',
    familyHead: 'Priyanka Borah (Daughter)',
    caregiverName: 'Priyanka Borah',
    caregiverPhone: '+91 94350 12345',
    priorityStatus: 'ROUTINE',
    priorityReason: 'Consistent daily activity completion (96%); reminders acknowledged on time.',
    lastVisitDate: '3 days ago',
    lastSessionScore: 94,
    reminderAdherence: 95,
    syncPending: false,
    notes: 'Abeni enjoyed morning tea memory game. Cheerful and responsive.',
  },
  {
    id: 'p_dhiren_01',
    name: 'Dhiren Borah',
    age: 78,
    gender: 'Male',
    village: 'Kahilipara Sector 4, Guwahati',
    familyHead: 'Raju Borah (Son)',
    caregiverName: 'Raju Borah',
    caregiverPhone: '+91 94350 67890',
    priorityStatus: 'CHECK_IN_RECOMMENDED',
    priorityReason: '2 missed evening hydration reminders; caregiver requested check-in.',
    lastVisitDate: '6 days ago',
    lastSessionScore: 78,
    reminderAdherence: 74,
    syncPending: true,
    notes: 'Family reports slight evening fatigue. Advised peaceful rain music before sleep.',
  },
  {
    id: 'p_mina_02',
    name: 'Mina Devi',
    age: 69,
    gender: 'Female',
    village: 'Uzanbazar Riverbank, Guwahati',
    familyHead: 'Kalyan Devi (Husband)',
    caregiverName: 'Kalyan Devi',
    caregiverPhone: '+91 94350 22222',
    priorityStatus: 'FOLLOW_UP',
    priorityReason: 'Completed routine sequence memory on Level 1; steady progression.',
    lastVisitDate: 'Yesterday',
    lastSessionScore: 88,
    reminderAdherence: 90,
    syncPending: false,
    notes: 'Very engaged with Bihu rhythm chimes.',
  },
  {
    id: 'p_biren_03',
    name: 'Biren Kalita',
    age: 81,
    gender: 'Male',
    village: 'Dispur Old Town, Guwahati',
    familyHead: 'Anamika Kalita (Daughter-in-law)',
    caregiverName: 'Anamika Kalita',
    caregiverPhone: '+91 94350 33333',
    priorityStatus: 'CHECK_IN_RECOMMENDED',
    priorityReason: 'Device offline for 48 hours during rain; pending local sync upload.',
    lastVisitDate: '8 days ago',
    lastSessionScore: 82,
    reminderAdherence: 80,
    syncPending: true,
    notes: 'Needs tablet Wi-Fi re-pairing or manual Bluetooth export during home visit.',
  },
];

export const AshaDashboard: React.FC<AshaDashboardProps> = ({
  ashaName = 'Rimjim Phukan',
  villageName = 'Kamrup Metro Cluster (Guwahati Sector 2)',
  currentLang,
  onOpenPatientDemo,
}) => {
  const [patients, setPatients] = useState<AshaPatientItem[]>(DEMO_VILLAGE_PATIENTS);
  const [selectedPatient, setSelectedPatient] = useState<AshaPatientItem | null>(DEMO_VILLAGE_PATIENTS[0]);
  const [filterPriority, setFilterPriority] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [visitNote, setVisitNote] = useState<string>('');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [showVisitModal, setShowVisitModal] = useState<boolean>(false);

  const checkInCount = patients.filter((p) => p.priorityStatus === 'CHECK_IN_RECOMMENDED').length;
  const followUpCount = patients.filter((p) => p.priorityStatus === 'FOLLOW_UP').length;
  const routineCount = patients.filter((p) => p.priorityStatus === 'ROUTINE').length;
  const syncPendingCount = patients.filter((p) => p.syncPending).length;

  const filteredPatients = patients.filter((p) => {
    const matchesPriority = filterPriority === 'ALL' || p.priorityStatus === filterPriority;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.village.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.caregiverName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPriority && matchesSearch;
  });

  const handleSyncAll = async () => {
    sound.playClick();
    setIsSyncing(true);
    await new Promise((r) => setTimeout(r, 1200));
    setPatients((prev) => prev.map((p) => ({ ...p, syncPending: false })));
    setIsSyncing(false);
    sound.playSuccess();
  };

  const handleSaveVisitNote = () => {
    if (!selectedPatient || !visitNote.trim()) return;
    sound.playClick();
    const updated = patients.map((p) =>
      p.id === selectedPatient.id
        ? { ...p, notes: visitNote, lastVisitDate: 'Just now', priorityStatus: 'ROUTINE' as const }
        : p
    );
    setPatients(updated);
    setSelectedPatient({ ...selectedPatient, notes: visitNote, lastVisitDate: 'Just now', priorityStatus: 'ROUTINE' });
    setVisitNote('');
    setShowVisitModal(false);
    sound.playSuccess();
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 text-[#F4F8FC]">
      {/* Top Banner: ASHA Identity, Village Area, and Quick Sync */}
      <div className="bg-[#101F31] border border-[#243A50] rounded-3xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-500 text-[#07111F] flex items-center justify-center font-black text-2xl shadow-lg shadow-teal-500/20">
            👩‍⚕️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-teal-500/20 text-[#38D9C5] border border-teal-500/40 rounded-full text-xs font-bold uppercase tracking-wider">
                Community Health Worker Portal
              </span>
              <span className="text-xs font-bold text-[#7F91A6] flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#38D9C5]" /> {villageName}
              </span>
            </div>
            <h1 className="text-2xl font-black text-white mt-1">
              Welcome, ASHA Worker {ashaName}
            </h1>
            <p className="text-xs text-[#B7C5D6] mt-0.5">
              Empowering North Eastern families with localized, non-diagnostic cognitive routine support.
            </p>
          </div>
        </div>

        {/* Sync Station Status Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSyncAll}
            disabled={isSyncing}
            className="px-5 py-3 bg-[#14283D] hover:bg-[#162B40] border border-[#243A50] rounded-2xl text-xs font-black text-[#38D9C5] flex items-center gap-2 transition cursor-pointer active:scale-95 shadow-sm"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Synchronizing Cluster...' : `Sync All (${syncPendingCount} Pending)`}</span>
          </button>
        </div>
      </div>

      {/* 3 Workflow Priority Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div
          onClick={() => setFilterPriority('CHECK_IN_RECOMMENDED')}
          className={`p-4 rounded-3xl border transition cursor-pointer ${
            filterPriority === 'CHECK_IN_RECOMMENDED'
              ? 'bg-rose-950/60 border-rose-500 ring-2 ring-rose-500/40'
              : 'bg-[#101F31] border-[#243A50] hover:border-rose-500/50'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-300 uppercase tracking-wider">
              🔴 Check-In Priority
            </span>
            <span className="text-2xl font-black text-rose-400">{checkInCount}</span>
          </div>
          <p className="text-[11px] text-[#B7C5D6] mt-1">Families requesting home visit</p>
        </div>

        <div
          onClick={() => setFilterPriority('FOLLOW_UP')}
          className={`p-4 rounded-3xl border transition cursor-pointer ${
            filterPriority === 'FOLLOW_UP'
              ? 'bg-amber-950/60 border-amber-500 ring-2 ring-amber-500/40'
              : 'bg-[#101F31] border-[#243A50] hover:border-amber-500/50'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              🟡 Scheduled Follow-Up
            </span>
            <span className="text-2xl font-black text-amber-400">{followUpCount}</span>
          </div>
          <p className="text-[11px] text-[#B7C5D6] mt-1">Progressing steady routine</p>
        </div>

        <div
          onClick={() => setFilterPriority('ROUTINE')}
          className={`p-4 rounded-3xl border transition cursor-pointer ${
            filterPriority === 'ROUTINE'
              ? 'bg-emerald-950/60 border-emerald-500 ring-2 ring-emerald-500/40'
              : 'bg-[#101F31] border-[#243A50] hover:border-emerald-500/50'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
              🟢 Stable & Active
            </span>
            <span className="text-2xl font-black text-emerald-400">{routineCount}</span>
          </div>
          <p className="text-[11px] text-[#B7C5D6] mt-1">High engagement consistency</p>
        </div>

        <div
          onClick={() => setFilterPriority('ALL')}
          className={`p-4 rounded-3xl border transition cursor-pointer ${
            filterPriority === 'ALL'
              ? 'bg-teal-950/60 border-[#19C3B1] ring-2 ring-[#19C3B1]/40'
              : 'bg-[#101F31] border-[#243A50] hover:border-[#19C3B1]/50'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#38D9C5] uppercase tracking-wider">
              📋 Total Families
            </span>
            <span className="text-2xl font-black text-white">{patients.length}</span>
          </div>
          <p className="text-[11px] text-[#B7C5D6] mt-1">Assigned cluster caseload</p>
        </div>
      </div>

      {/* Main 2-Column Caseload & Quick-Visit Console */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Patient List with Search & Filter */}
        <div className="lg:col-span-2 space-y-4">
          {/* Search & Filter Bar */}
          <div className="bg-[#101F31] border border-[#243A50] rounded-2xl p-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-1 min-w-[200px]">
              <Search className="w-4 h-4 text-[#7F91A6] ml-2" />
              <input
                type="text"
                placeholder="Search patient, village ward, or caregiver..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-white placeholder-[#7F91A6] focus:outline-none"
              />
            </div>
            <div className="text-xs font-bold text-[#7F91A6] pr-2">
              Showing <span className="text-white font-black">{filteredPatients.length}</span> patients
            </div>
          </div>

          {/* Patient Cards List */}
          <div className="space-y-3">
            {filteredPatients.map((p) => {
              const isSelected = selectedPatient?.id === p.id;
              const isRed = p.priorityStatus === 'CHECK_IN_RECOMMENDED';
              const isYellow = p.priorityStatus === 'FOLLOW_UP';

              return (
                <div
                  key={p.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedPatient(p);
                  }}
                  className={`p-5 rounded-3xl border-2 transition-all cursor-pointer flex flex-wrap items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-[#14283D] border-[#19C3B1] shadow-lg shadow-teal-500/10'
                      : 'bg-[#101F31] border-[#243A50] hover:border-[#38D9C5]/60'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-base ${
                        isRed
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          : isYellow
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      }`}
                    >
                      {p.name.charAt(0)}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-black text-white">{p.name}</h3>
                        <span className="text-xs text-[#7F91A6]">({p.age} yrs • {p.gender})</span>
                        {p.syncPending && (
                          <span className="px-2 py-0.5 bg-blue-950 text-blue-300 border border-blue-800 rounded-full text-[10px] font-bold">
                            Sync Queued
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#B7C5D6] flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#38D9C5]" /> {p.village}
                      </p>
                      <p className="text-[11px] text-[#7F91A6] mt-1">
                        Caregiver: <strong className="text-white">{p.caregiverName}</strong> ({p.caregiverPhone})
                      </p>
                    </div>
                  </div>

                  <div className="text-right space-y-1">
                    <div
                      className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                        isRed
                          ? 'bg-rose-950 text-rose-300 border border-rose-800'
                          : isYellow
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      }`}
                    >
                      {p.priorityStatus.replace('_', ' ')}
                    </div>
                    <div className="text-[11px] text-[#7F91A6]">
                      Last Visited: <span className="text-white font-bold">{p.lastVisitDate}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Patient Quick Action & Home-Visit Logger */}
        {selectedPatient && (
          <div className="space-y-4">
            <div className="bg-[#101F31] border border-[#243A50] rounded-3xl p-6 shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-[#243A50] pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase text-[#38D9C5] tracking-wider">
                    Quick Visit Workflow
                  </span>
                  <h3 className="text-xl font-black text-white">{selectedPatient.name}</h3>
                </div>
                <button
                  onClick={() => setShowVisitModal(true)}
                  className="px-4 py-2 bg-[#19C3B1] hover:bg-[#38D9C5] text-[#07111F] rounded-xl text-xs font-black transition cursor-pointer shadow-xs"
                >
                  Log Home Visit
                </button>
              </div>

              {/* Triage Reason & Observations */}
              <div className="bg-[#14283D] p-4 rounded-2xl border border-[#243A50] space-y-2">
                <span className="text-xs font-bold text-[#7F91A6] uppercase block">
                  Cluster Triage Reason
                </span>
                <p className="text-xs text-[#F4F8FC] font-medium leading-relaxed">
                  {selectedPatient.priorityReason}
                </p>
              </div>

              {/* Telemetry Metrics */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#14283D] p-3.5 rounded-2xl border border-[#243A50]">
                  <span className="text-[10px] font-bold text-[#7F91A6] uppercase block">
                    Routine Adherence
                  </span>
                  <span className="text-xl font-black text-teal-400">
                    {selectedPatient.reminderAdherence}%
                  </span>
                </div>
                <div className="bg-[#14283D] p-3.5 rounded-2xl border border-[#243A50]">
                  <span className="text-[10px] font-bold text-[#7F91A6] uppercase block">
                    Recent Activity Score
                  </span>
                  <span className="text-xl font-black text-indigo-300">
                    {selectedPatient.lastSessionScore} / 100
                  </span>
                </div>
              </div>

              {/* Recent ASHA Note */}
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#7F91A6] uppercase block">
                  Latest Village Field Observation
                </span>
                <p className="text-xs text-[#B7C5D6] bg-[#07111F] p-3 rounded-xl border border-[#243A50] italic">
                  "{selectedPatient.notes}"
                </p>
              </div>

              {/* Direct Caregiver Speed Call */}
              <a
                href={`tel:${selectedPatient.caregiverPhone}`}
                className="w-full py-3.5 bg-[#14283D] hover:bg-[#162B40] text-[#38D9C5] border border-[#243A50] rounded-2xl text-xs font-black flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Call Caregiver ({selectedPatient.caregiverName})</span>
              </a>

              {/* Escalate to GMCH Clinician Link */}
              <div className="pt-2 border-t border-[#243A50] text-center">
                <span className="text-[11px] text-[#7F91A6] block">
                  Assigned Clinician: <strong>Dr. Ananya Sharma (GMCH)</strong>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mandatory Non-Diagnostic Statutory Notice */}
      <div className="bg-[#07111F] border border-[#243A50] p-4 rounded-3xl flex items-center gap-3 text-xs text-[#7F91A6]">
        <Shield className="w-5 h-5 text-teal-400 shrink-0" />
        <span>
          <strong className="text-white">ASHA Workflow Disclaimer:</strong> MementoCare AI provides non-diagnostic community coordination, routine engagement tracking, and reminder verification. It does not diagnose dementia, measure disease severity, prescribe medication, or replace qualified medical professionals.
        </span>
      </div>

      {/* Log Visit Modal */}
      {showVisitModal && selectedPatient && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#101F31] border border-[#243A50] rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 text-[#F4F8FC]">
            <div className="flex items-center justify-between border-b border-[#243A50] pb-3">
              <h3 className="text-lg font-black text-white">
                Log Field Visit for {selectedPatient.name}
              </h3>
              <button
                onClick={() => setShowVisitModal(false)}
                className="text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[#7F91A6] uppercase">
                Field Observations (Mood, Hydration, Familiar Memory Engagement):
              </label>
              <textarea
                rows={3}
                value={visitNote}
                onChange={(e) => setVisitNote(e.target.value)}
                placeholder="Observed senior completing morning Assam tea memory game. Cheerful mood, good appetite, hydration acknowledged."
                className="w-full p-3 bg-[#14283D] border border-[#243A50] rounded-2xl text-xs text-white placeholder-[#7F91A6] focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowVisitModal(false)}
                className="px-4 py-2 bg-[#14283D] text-slate-300 rounded-xl text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveVisitNote}
                className="px-5 py-2 bg-[#19C3B1] hover:bg-[#38D9C5] text-[#07111F] font-black rounded-xl text-xs shadow-md"
              >
                Save Observation & Mark Visited
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
