import React, { useState } from 'react';
import {
  Sparkles,
  Heart,
  Grid,
  ListOrdered,
  Package,
  Music,
  Bell,
  Mic,
  Volume2,
  PhoneCall,
  CheckCircle2,
} from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { PersonalMemoryGame } from '../games/PersonalMemoryGame';
import { MemoryMatchGame } from '../games/MemoryMatchGame';
import { RoutineRecallGame } from '../games/RoutineRecallGame';
import { ObjectRecallGame } from '../games/ObjectRecallGame';
import { MusicPlayer } from './MusicPlayer';
import { DailyReminders } from './DailyReminders';
import { voice } from '../../services/voiceService';
import { getTranslation } from '../../services/i18n';

export function SeniorTabletDashboard({ currentLang = 'en', onOpenVoiceAssistant }) {
  const [activeTab, setActiveTab] = useState('hub'); // hub, game_personal, game_match, game_routine, game_object, music, reminders
  const [completedToday, setCompletedToday] = useState(false);

  const handleStartToday = () => {
    voice.speak("Let's start your morning family memory session.", currentLang);
    setActiveTab('game_personal');
  };

  const handleCallCaregiver = () => {
    voice.speak('Connecting to caregiver Priyanka Borah...', currentLang);
    alert('Calling Caregiver: Priyanka Borah (+91 94350 12345)');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Greeting Banner for Elderly Senior */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-teal-950/60 to-slate-900 border border-teal-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-teal-400 animate-pulse" />
            <Badge variant="teal" size="sm">Senior Tablet Workspace</Badge>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-100 mt-2">
            {getTranslation(currentLang, 'welcomeGreeting')}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-1">
            {getTranslation(currentLang, 'dailySummaryReady')}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={handleCallCaregiver}
            variant="outline"
            size="md"
            icon={PhoneCall}
            className="border-teal-500/40 text-teal-300"
          >
            {getTranslation(currentLang, 'contactCaregiver')}
          </Button>
          <Button
            onClick={onOpenVoiceAssistant}
            variant="secondary"
            size="md"
            icon={Mic}
          >
            Voice Guide
          </Button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab('hub')}
          className={`px-4 py-2.5 rounded-2xl font-bold text-sm transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'hub'
              ? 'bg-teal-600 text-white shadow-sm'
              : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
          }`}
        >
          🏠 Today's Hub
        </button>
        <button
          onClick={() => setActiveTab('game_personal')}
          className={`px-4 py-2.5 rounded-2xl font-bold text-sm transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'game_personal'
              ? 'bg-teal-600 text-white shadow-sm'
              : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
          }`}
        >
          ❤️ Family Memories
        </button>
        <button
          onClick={() => setActiveTab('game_match')}
          className={`px-4 py-2.5 rounded-2xl font-bold text-sm transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'game_match'
              ? 'bg-teal-600 text-white shadow-sm'
              : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
          }`}
        >
          🧩 Memory Match
        </button>
        <button
          onClick={() => setActiveTab('game_routine')}
          className={`px-4 py-2.5 rounded-2xl font-bold text-sm transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'game_routine'
              ? 'bg-teal-600 text-white shadow-sm'
              : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
          }`}
        >
          🌅 Daily Routine
        </button>
        <button
          onClick={() => setActiveTab('music')}
          className={`px-4 py-2.5 rounded-2xl font-bold text-sm transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'music'
              ? 'bg-teal-600 text-white shadow-sm'
              : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
          }`}
        >
          🎵 Peaceful Music
        </button>
        <button
          onClick={() => setActiveTab('reminders')}
          className={`px-4 py-2.5 rounded-2xl font-bold text-sm transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'reminders'
              ? 'bg-teal-600 text-white shadow-sm'
              : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
          }`}
        >
          💊 Daily Schedule
        </button>
      </div>

      {/* Main Content Area */}
      {activeTab === 'hub' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Primary Action Card: 1 Large Button to start */}
          <Card className="md:col-span-8 border-teal-500/40 bg-slate-900/90 shadow-xl">
            <CardContent className="p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                  TODAY'S HIGHLIGHT
                </span>
                <Badge variant="teal" size="sm">Morning Routine</Badge>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-100">
                  Morning Family Memory & Tea Recall
                </h2>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                  Relaxing session with approved photos of your family veranda and festival memories.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center gap-2 text-teal-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>3 Approved Family Memories Ready</span>
                </div>
                <div className="flex items-center gap-2 text-teal-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Voice input and large touch buttons active</span>
                </div>
              </div>

              <Button
                onClick={handleStartToday}
                variant="senior"
                size="senior"
                className="w-full shadow-teal-500/20 shadow-lg"
              >
                {getTranslation(currentLang, 'startTodayActivity')} →
              </Button>
            </CardContent>
          </Card>

          {/* Quick Support & Music Widget */}
          <div className="md:col-span-4 space-y-4">
            <Card className="border-slate-800 bg-slate-900">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <Music className="w-4 h-4 text-sky-400" />
                  <h4 className="text-sm font-bold text-slate-200">Peaceful Melody</h4>
                </div>
                <p className="text-xs text-slate-400">
                  Assam Tea Garden Breeze & River Flute
                </p>
                <Button
                  onClick={() => setActiveTab('music')}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  Listen Now 🎵
                </Button>
              </CardContent>
            </Card>

            <Card className="border-slate-800 bg-slate-900">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-amber-400" />
                  <h4 className="text-sm font-bold text-slate-200">Schedule & Hydration</h4>
                </div>
                <p className="text-xs text-slate-400">
                  Morning tea acknowledged • Hydration reminder at 11:30 AM
                </p>
                <Button
                  onClick={() => setActiveTab('reminders')}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  View Schedule 💊
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Game Views */}
      {activeTab === 'game_personal' && (
        <PersonalMemoryGame
          currentLang={currentLang}
          onBack={() => setActiveTab('hub')}
          onComplete={() => {
            setCompletedToday(true);
            setActiveTab('hub');
          }}
        />
      )}

      {activeTab === 'game_match' && (
        <MemoryMatchGame
          currentLang={currentLang}
          onBack={() => setActiveTab('hub')}
          onComplete={() => setActiveTab('hub')}
        />
      )}

      {activeTab === 'game_routine' && (
        <RoutineRecallGame
          currentLang={currentLang}
          onBack={() => setActiveTab('hub')}
          onComplete={() => setActiveTab('hub')}
        />
      )}

      {activeTab === 'music' && (
        <MusicPlayer currentLang={currentLang} onBack={() => setActiveTab('hub')} />
      )}

      {activeTab === 'reminders' && (
        <DailyReminders currentLang={currentLang} onBack={() => setActiveTab('hub')} />
      )}
    </div>
  );
}
