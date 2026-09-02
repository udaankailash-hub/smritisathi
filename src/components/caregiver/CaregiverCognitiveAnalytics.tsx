import React, { useState } from 'react';
import {
  BarChart2,
  TrendingUp,
  Clock,
  HelpCircle,
  Sparkles,
  Calendar,
  Layers,
  CheckCircle2,
  AlertCircle,
  Activity,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

interface CaregiverCognitiveAnalyticsProps {
  patientName: string;
}

type TimeframeOption = '7d' | '30d' | '90d';

export const CaregiverCognitiveAnalytics: React.FC<CaregiverCognitiveAnalyticsProps> = ({
  patientName,
}) => {
  const [timeframe, setTimeframe] = useState<TimeframeOption>('7d');
  const [activeTab, setActiveTab] = useState<'PERFORMANCE' | 'ASSISTANCE' | 'LATENCY' | 'DIFFICULTY'>('PERFORMANCE');

  // Realistic historical interaction trend data for Abeni (7d / 30d / 90d)
  const data7d = [
    { day: 'Mon', completion: 100, performance: 92, assistanceHints: 0, responseMs: 1650, difficultyLevel: 2, frequency: 3 },
    { day: 'Tue', completion: 100, performance: 88, assistanceHints: 1, responseMs: 1800, difficultyLevel: 2, frequency: 2 },
    { day: 'Wed', completion: 100, performance: 95, assistanceHints: 0, responseMs: 1420, difficultyLevel: 3, frequency: 3 },
    { day: 'Thu', completion: 75, performance: 84, assistanceHints: 2, responseMs: 2100, difficultyLevel: 2, frequency: 2 },
    { day: 'Fri', completion: 100, performance: 90, assistanceHints: 0, responseMs: 1550, difficultyLevel: 2, frequency: 3 },
    { day: 'Sat', completion: 100, performance: 94, assistanceHints: 0, responseMs: 1390, difficultyLevel: 3, frequency: 4 },
    { day: 'Sun', completion: 100, performance: 96, assistanceHints: 0, responseMs: 1300, difficultyLevel: 3, frequency: 3 },
  ];

  const data30d = [
    { day: 'Week 1', completion: 95, performance: 86, assistanceHints: 3, responseMs: 1950, difficultyLevel: 1.8, frequency: 18 },
    { day: 'Week 2', completion: 100, performance: 90, assistanceHints: 2, responseMs: 1720, difficultyLevel: 2.2, frequency: 21 },
    { day: 'Week 3', completion: 92, performance: 89, assistanceHints: 2, responseMs: 1680, difficultyLevel: 2.4, frequency: 19 },
    { day: 'Week 4', completion: 100, performance: 93, assistanceHints: 1, responseMs: 1510, difficultyLevel: 2.8, frequency: 23 },
  ];

  const data90d = [
    { day: 'Month 1', completion: 88, performance: 82, assistanceHints: 8, responseMs: 2200, difficultyLevel: 1.5, frequency: 72 },
    { day: 'Month 2', completion: 94, performance: 88, assistanceHints: 5, responseMs: 1850, difficultyLevel: 2.2, frequency: 84 },
    { day: 'Month 3', completion: 98, performance: 92, assistanceHints: 3, responseMs: 1540, difficultyLevel: 2.7, frequency: 91 },
  ];

  const activeData = timeframe === '7d' ? data7d : timeframe === '30d' ? data30d : data90d;

  return (
    <div className="bg-[#101F31] border border-[#243A50] rounded-3xl p-6 shadow-xl space-y-6 text-[#F4F8FC]">
      {/* Header with Title and Timeframe Filter */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-teal-500/20 text-teal-300 border border-teal-500/40 flex items-center justify-center font-black">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white">
              Cognitive Interaction Analytics
            </h3>
            <p className="text-xs text-[#B7C5D6]">
              Longitudinal application performance & engagement metrics for {patientName}
            </p>
          </div>
        </div>

        {/* 7d / 30d / 90d Filter */}
        <div className="flex items-center gap-1 bg-[#14283D] p-1 rounded-2xl border border-[#243A50]">
          {(['7d', '30d', '90d'] as TimeframeOption[]).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3.5 py-1.5 rounded-xl font-black text-xs transition cursor-pointer ${
                timeframe === tf
                  ? 'bg-[#19C3B1] text-[#07111F] shadow-sm'
                  : 'text-[#7F91A6] hover:text-[#F4F8FC]'
              }`}
            >
              {tf === '7d' ? '7 Days' : tf === '30d' ? '30 Days' : '90 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Quick Stat Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#14283D] p-4 rounded-2xl border border-[#243A50]">
          <span className="text-[11px] font-bold text-[#7F91A6] uppercase block">Completion Rate</span>
          <span className="text-2xl font-black text-teal-400">97.4%</span>
          <span className="text-[10px] text-teal-300 block mt-0.5">High consistency</span>
        </div>

        <div className="bg-[#14283D] p-4 rounded-2xl border border-[#243A50]">
          <span className="text-[11px] font-bold text-[#7F91A6] uppercase block">Interaction Score</span>
          <span className="text-2xl font-black text-white">91 / 100</span>
          <span className="text-[10px] text-[#7F91A6] block mt-0.5">Weighted formula</span>
        </div>

        <div className="bg-[#14283D] p-4 rounded-2xl border border-[#243A50]">
          <span className="text-[11px] font-bold text-[#7F91A6] uppercase block">Assistance Used</span>
          <span className="text-2xl font-black text-amber-300">0.3 avg</span>
          <span className="text-[10px] text-amber-200 block mt-0.5">Minimal hints requested</span>
        </div>

        <div className="bg-[#14283D] p-4 rounded-2xl border border-[#243A50]">
          <span className="text-[11px] font-bold text-[#7F91A6] uppercase block">Avg Response Latency</span>
          <span className="text-2xl font-black text-indigo-300">1.5s</span>
          <span className="text-[10px] text-indigo-200 block mt-0.5">Fluid recognition</span>
        </div>
      </div>

      {/* Metric Selector Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#243A50] pb-3">
        {[
          { id: 'PERFORMANCE', label: 'Performance & Accuracy', icon: TrendingUp },
          { id: 'ASSISTANCE', label: 'Assistance & Hints', icon: HelpCircle },
          { id: 'LATENCY', label: 'Response Latency', icon: Clock },
          { id: 'DIFFICULTY', label: 'Difficulty Progression', icon: Layers },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer ${
                isActive
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                  : 'bg-[#14283D] text-[#7F91A6] hover:text-white border border-[#243A50]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Recharts Visual Container */}
      <div className="h-64 sm:h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          {activeTab === 'PERFORMANCE' ? (
            <AreaChart data={activeData}>
              <defs>
                <linearGradient id="perfGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#19C3B1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#19C3B1" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#243A50" />
              <XAxis dataKey="day" stroke="#7F91A6" fontSize={12} />
              <YAxis domain={[50, 100]} stroke="#7F91A6" fontSize={12} unit="%" />
              <Tooltip
                contentStyle={{ backgroundColor: '#101F31', borderColor: '#243A50', borderRadius: '12px' }}
                labelStyle={{ color: '#38D9C5', fontWeight: 'bold' }}
              />
              <Area type="monotone" dataKey="performance" stroke="#19C3B1" strokeWidth={3} fill="url(#perfGrad)" name="Performance Score" />
              <Line type="monotone" dataKey="completion" stroke="#8B7CFF" strokeWidth={2} strokeDasharray="4 4" name="Completion Rate %" />
            </AreaChart>
          ) : activeTab === 'ASSISTANCE' ? (
            <BarChart data={activeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#243A50" />
              <XAxis dataKey="day" stroke="#7F91A6" fontSize={12} />
              <YAxis stroke="#7F91A6" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: '#101F31', borderColor: '#243A50', borderRadius: '12px' }}
                labelStyle={{ color: '#F4B740', fontWeight: 'bold' }}
              />
              <Bar dataKey="assistanceHints" fill="#F4B740" radius={[8, 8, 0, 0]} name="Hints & Prompts Used" />
            </BarChart>
          ) : activeTab === 'LATENCY' ? (
            <LineChart data={activeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#243A50" />
              <XAxis dataKey="day" stroke="#7F91A6" fontSize={12} />
              <YAxis stroke="#7F91A6" fontSize={12} unit="ms" />
              <Tooltip
                contentStyle={{ backgroundColor: '#101F31', borderColor: '#243A50', borderRadius: '12px' }}
                labelStyle={{ color: '#8B7CFF', fontWeight: 'bold' }}
              />
              <Line type="monotone" dataKey="responseMs" stroke="#8B7CFF" strokeWidth={3} dot={{ r: 5 }} name="Response Time (ms)" />
            </LineChart>
          ) : (
            <AreaChart data={activeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#243A50" />
              <XAxis dataKey="day" stroke="#7F91A6" fontSize={12} />
              <YAxis domain={[1, 4]} stroke="#7F91A6" fontSize={12} ticks={[1, 2, 3, 4]} />
              <Tooltip
                contentStyle={{ backgroundColor: '#101F31', borderColor: '#243A50', borderRadius: '12px' }}
                labelStyle={{ color: '#10B981', fontWeight: 'bold' }}
              />
              <Area type="stepAfter" dataKey="difficultyLevel" stroke="#10B981" fill="#10B981" fillOpacity={0.2} name="Adaptive Difficulty Level (1-4)" />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Mandatory Statutory Medical Disclaimer */}
      <div className="bg-[#07111F] border border-[#243A50] p-3.5 rounded-2xl flex items-center gap-3 text-xs text-[#7F91A6]">
        <AlertCircle className="w-4 h-4 text-teal-400 shrink-0" />
        <span>
          <strong className="text-white">Non-Diagnostic Notice:</strong> Application interaction information only. This is not a clinical diagnosis or measure of disease severity.
        </span>
      </div>
    </div>
  );
};
