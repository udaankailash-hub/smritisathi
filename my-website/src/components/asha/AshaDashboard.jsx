import React, { useState } from 'react';
import {
  Users,
  AlertCircle,
  Clock,
  CheckCircle2,
  MapPin,
  FileText,
  RefreshCw,
  Plus,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';
import { FormField, Textarea, Select } from '../ui/Form';
import { offlineOutbox } from '../../services/offlineOutbox';

const VILLAGE_PATIENTS = [
  {
    id: 'p_abeni_01',
    name: 'Abeni',
    age: 72,
    village: 'Haflong Hill Cluster',
    caregiver: 'Priyanka Borah',
    status: 'ROUTINE',
    lastSession: 'Today 08:30 AM',
    note: 'Active morning session with tea & orchid memories. Well engaged.',
  },
  {
    id: 'p_dhiren_02',
    name: 'Dhiren Gogoi',
    age: 78,
    village: 'Sarthebari Ward 2',
    caregiver: 'Biman Gogoi',
    status: 'CHECK_IN_RECOMMENDED',
    lastSession: 'Yesterday (Incomplete)',
    note: 'Missed evening hydration and afternoon rhythm recall.',
  },
  {
    id: 'p_maya_03',
    name: 'Maya Devi',
    age: 70,
    village: 'Guwahati Ward 4',
    caregiver: 'Sunil Sharma',
    status: 'FOLLOW_UP',
    lastSession: '2 days ago',
    note: 'Slow response time on sequence recall. Follow-up during village visit.',
  },
];

export function AshaDashboard({ onSelectPatient }) {
  const [patients, setPatients] = useState(VILLAGE_PATIENTS);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [visitNotes, setVisitNotes] = useState('');
  const [visitStatus, setVisitStatus] = useState('ROUTINE');
  const [syncStatus, setSyncStatus] = useState('IDLE');

  const handleOpenLog = (patient) => {
    setSelectedPatient(patient);
    setVisitNotes('');
    setIsLogModalOpen(true);
  };

  const handleSaveObservation = (e) => {
    e.preventDefault();
    if (!selectedPatient) return;

    offlineOutbox.saveLocalSession({
      type: 'ASHA_VISIT_OBSERVATION',
      patientId: selectedPatient.id,
      notes: visitNotes,
      status: visitStatus,
      recordedBy: 'Rimjim Saikia (ASHA)',
    });

    setPatients((prev) =>
      prev.map((p) =>
        p.id === selectedPatient.id ? { ...p, status: visitStatus, note: visitNotes || p.note } : p
      )
    );

    setIsLogModalOpen(false);
  };

  const handleSyncAll = () => {
    setSyncStatus('SYNCING');
    setTimeout(() => {
      const res = offlineOutbox.syncNow();
      setSyncStatus('SYNCED');
      setTimeout(() => setSyncStatus('IDLE'), 2000);
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* ASHA Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="purple" size="sm">ASHA Worker Dashboard</Badge>
            <span className="text-xs text-slate-400 font-semibold">
              Worker: Rimjim Saikia (Assam Cluster #4)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100">
            Today's Village Visit & Multi-Family Triage
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Rapid overview of 20 assigned village households. Focus on prioritized check-ins.
          </p>
        </div>

        <Button
          onClick={handleSyncAll}
          variant="primary"
          size="md"
          icon={RefreshCw}
          className="bg-purple-600 hover:bg-purple-500 border-purple-400/40"
        >
          {syncStatus === 'SYNCING' ? 'Syncing Outbox...' : syncStatus === 'SYNCED' ? 'All Synced ✓' : 'Batch Sync Village Data'}
        </Button>
      </div>

      {/* Triage Priority Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-rose-500/40 bg-slate-900/80">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider">
                🔴 Check-in Recommended
              </span>
              <h4 className="text-2xl font-black text-slate-100 mt-1">1 Patient</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Dhiren Gogoi (Incomplete routine)</p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <AlertCircle className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-500/40 bg-slate-900/80">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                🟡 Follow-up During Round
              </span>
              <h4 className="text-2xl font-black text-slate-100 mt-1">1 Patient</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Maya Devi (Response time check)</p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Clock className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-teal-500/40 bg-slate-900/80">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider">
                🟢 Routine Stable
              </span>
              <h4 className="text-2xl font-black text-slate-100 mt-1">18 Households</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Abeni & other community elders</p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Patient Cluster Table / List */}
      <Card className="border-slate-800 bg-slate-900">
        <CardHeader>
          <CardTitle className="text-base">Assigned Village Patients</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-800/80">
            {patients.map((p) => {
              const statusBadges = {
                CHECK_IN_RECOMMENDED: <Badge variant="rose" size="xs">🔴 Check-in Recommended</Badge>,
                FOLLOW_UP: <Badge variant="amber" size="xs">🟡 Follow-up</Badge>,
                ROUTINE: <Badge variant="teal" size="xs">🟢 Routine Stable</Badge>,
              };

              return (
                <div
                  key={p.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-800/30 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h4 className="font-bold text-base text-white">{p.name}, {p.age}</h4>
                      {statusBadges[p.status]}
                    </div>
                    <p className="text-xs text-slate-400 flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span>{p.village}</span>
                      <span>• Caregiver: {p.caregiver}</span>
                    </p>
                    <p className="text-xs text-slate-300 italic pt-1">"{p.note}"</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      onClick={() => handleOpenLog(p)}
                      variant="outline"
                      size="sm"
                      icon={FileText}
                    >
                      Record Visit
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Visit Logger Modal */}
      {selectedPatient && (
        <Modal
          isOpen={isLogModalOpen}
          onClose={() => setIsLogModalOpen(false)}
          title={`Record Home Visit: ${selectedPatient.name}`}
          subtitle="Quick 30-second ASHA observation recorder"
          maxWidth="max-w-lg"
        >
          <form onSubmit={handleSaveObservation} className="space-y-4">
            <FormField label="Visit Triage Assessment" required>
              <Select
                value={visitStatus}
                onChange={(e) => setVisitStatus(e.target.value)}
                options={[
                  { value: 'ROUTINE', label: '🟢 Routine Stable - Well Engaged' },
                  { value: 'FOLLOW_UP', label: '🟡 Follow-up - Needs Gentle Assistance' },
                  { value: 'CHECK_IN_RECOMMENDED', label: '🔴 Check-in - Escalate to Clinician Review' },
                ]}
              />
            </FormField>

            <FormField label="Observation Notes" helperText="Record mood, routine adherence, or family context">
              <Textarea
                placeholder="e.g. Visited in morning. Abeni was cheerful and listening to flute music on veranda..."
                value={visitNotes}
                onChange={(e) => setVisitNotes(e.target.value)}
              />
            </FormField>

            <div className="flex justify-end gap-3 pt-2">
              <Button onClick={() => setIsLogModalOpen(false)} variant="outline" size="sm">
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" icon={CheckCircle2}>
                Save Observation
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
