import React, { useState, useEffect } from 'react';
import { Navbar } from './components/ui/Navbar';
import { Hero } from './components/landing/Hero';
import { ProblemSection } from './components/landing/ProblemSection';
import { AbeniStory } from './components/landing/AbeniStory';
import { CoreUSPs } from './components/landing/CoreUSPs';
import { ArchitectureSection } from './components/landing/ArchitectureSection';
import { SafetyDisclaimer } from './components/landing/SafetyDisclaimer';
import { SeniorTabletDashboard } from './components/patient/SeniorTabletDashboard';
import { CaregiverDashboard } from './components/caregiver/CaregiverDashboard';
import { AshaDashboard } from './components/asha/AshaDashboard';
import { ClinicianDashboard } from './components/clinician/ClinicianDashboard';
import { AdminConsole } from './components/admin/AdminConsole';
import { PlatformDemoModal } from './components/demo/PlatformDemoModal';
import { PrivacyCenterModal } from './components/common/PrivacyCenterModal';
import { AccessibilityDrawer } from './components/common/AccessibilityDrawer';
import { VoiceAssistantModal } from './components/patient/VoiceAssistantModal';
import { offlineOutbox } from './services/offlineOutbox';
import { Toast } from './components/ui/Toast';

export default function App() {
  const [currentRole, setCurrentRole] = useState('LANDING'); // LANDING, PATIENT, CAREGIVER, ASHA, CLINICIAN, ADMIN
  const [currentLang, setCurrentLang] = useState('en');
  const [isOffline, setIsOffline] = useState(false);
  const [pendingSyncCount, setPendingSyncCount] = useState(0);

  // Modals
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isAccessibilityModalOpen, setIsAccessibilityModalOpen] = useState(false);
  const [isVoiceAssistantOpen, setIsVoiceAssistantOpen] = useState(false);

  // Accessibility State
  const [fontSize, setFontSize] = useState('large');
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Toast
  const [toastMessage, setToastMessage] = useState(null);

  // Sync listener
  useEffect(() => {
    setPendingSyncCount(offlineOutbox.getPendingCount());
    const cleanup = offlineOutbox.subscribe((count) => {
      setPendingSyncCount(count);
    });
    return cleanup;
  }, []);

  const handleToggleOffline = () => {
    const next = !isOffline;
    setIsOffline(next);
    if (!next) {
      const res = offlineOutbox.syncNow();
      setToastMessage(`Network restored. Replayed ${res.count} outbox events with exactly-once deduplication.`);
    } else {
      setToastMessage('Offline mode active. All sessions are saved locally to edge outbox.');
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-150 ${
        highContrast ? 'bg-black text-amber-300' : 'bg-[#0B132B] text-[#F8FAFC]'
      } ${
        fontSize === 'extra-large'
          ? 'text-lg'
          : fontSize === 'large'
          ? 'text-base'
          : 'text-sm'
      }`}
    >
      {/* Universal Top Application Navbar */}
      <Navbar
        currentRole={currentRole}
        onRoleChange={(role) => {
          setCurrentRole(role);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        isOffline={isOffline}
        onToggleOffline={handleToggleOffline}
        pendingSyncCount={pendingSyncCount}
        onOpenDemo={() => setIsDemoModalOpen(true)}
        onOpenPrivacy={() => setIsPrivacyModalOpen(true)}
        onOpenAccessibility={() => setIsAccessibilityModalOpen(true)}
      />

      {/* Main Workspace Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {/* VIEW 1: PUBLIC LANDING & STORY */}
        {currentRole === 'LANDING' && (
          <div className="space-y-4">
            <Hero
              onSelectRole={(role) => setCurrentRole(role)}
              onOpenDemo={() => setIsDemoModalOpen(true)}
            />
            <ProblemSection />
            <AbeniStory
              onTryDemo={() => {
                setCurrentRole('PATIENT');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
            <CoreUSPs />
            <ArchitectureSection />
          </div>
        )}

        {/* VIEW 2: SENIOR TABLET WORKSPACE */}
        {currentRole === 'PATIENT' && (
          <SeniorTabletDashboard
            currentLang={currentLang}
            onOpenVoiceAssistant={() => setIsVoiceAssistantOpen(true)}
          />
        )}

        {/* VIEW 3: CAREGIVER WORKSPACE */}
        {currentRole === 'CAREGIVER' && (
          <CaregiverDashboard
            onSelectSeniorView={() => {
              setCurrentRole('PATIENT');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* VIEW 4: ASHA COMMUNITY WORKSPACE */}
        {currentRole === 'ASHA' && (
          <AshaDashboard
            onSelectPatient={(pId) => {
              setCurrentRole('PATIENT');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* VIEW 5: CLINICIAN TELEMETRY */}
        {currentRole === 'CLINICIAN' && <ClinicianDashboard />}

        {/* VIEW 6: ADMIN & COMPLIANCE */}
        {currentRole === 'ADMIN' && <AdminConsole />}
      </main>

      {/* Statutory Medical Safety Disclaimer */}
      <SafetyDisclaimer currentLang={currentLang} />

      {/* Footer */}
      <footer className="mt-8 py-6 px-4 bg-slate-950 border-t border-slate-800/80 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-medium">
            <strong>MementoCare AI</strong> — AI that remembers the person, not just the score.
          </p>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <button
              onClick={() => setIsPrivacyModalOpen(true)}
              className="hover:text-teal-300 transition-colors cursor-pointer"
            >
              Privacy & Consent
            </button>
            <button
              onClick={() => setIsAccessibilityModalOpen(true)}
              className="hover:text-teal-300 transition-colors cursor-pointer"
            >
              Accessibility
            </button>
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="hover:text-teal-300 transition-colors cursor-pointer text-teal-400"
            >
              Start Interactive Demo
            </button>
          </div>
        </div>
      </footer>

      {/* Modals & Dialogs */}
      <PlatformDemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onSelectRole={(role) => setCurrentRole(role)}
        onToggleOffline={(offline) => setIsOffline(offline)}
      />

      <PrivacyCenterModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />

      <AccessibilityDrawer
        isOpen={isAccessibilityModalOpen}
        onClose={() => setIsAccessibilityModalOpen(false)}
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
        highContrast={highContrast}
        onToggleContrast={() => setHighContrast(!highContrast)}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={() => setReducedMotion(!reducedMotion)}
      />

      <VoiceAssistantModal
        isOpen={isVoiceAssistantOpen}
        onClose={() => setIsVoiceAssistantOpen(false)}
        currentLang={currentLang}
      />

      {/* Alert Toasts */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
