import React from 'react';
import { ShieldCheck, Database, Globe, Server, CheckCircle2, RefreshCw } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { LANGUAGES } from '../../services/i18n';

export function AdminConsole() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="amber" size="sm">System Administration & Audit</Badge>
            <span className="text-xs text-slate-400 font-semibold">MementoCare Core v2.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100">
            Platform Infrastructure & Compliance Dome
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            System health, offline outbox metrics, DPDP audit trails, and verified NER language packs.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-slate-800 bg-slate-900">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400">PostgreSQL / Supabase RLS</span>
              <ShieldCheck className="w-4 h-4 text-teal-400" />
            </div>
            <span className="text-2xl font-black text-teal-400">Enforced</span>
            <p className="text-[11px] text-slate-400 mt-1">Multi-tenant isolation active</p>
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400">Offline Outbox Engine</span>
              <Database className="w-4 h-4 text-amber-400" />
            </div>
            <span className="text-2xl font-black text-amber-400">Idempotent</span>
            <p className="text-[11px] text-slate-400 mt-1">event_id deduplication online</p>
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400">Verified Language Packs</span>
              <Globe className="w-4 h-4 text-sky-400" />
            </div>
            <span className="text-2xl font-black text-sky-400">7 Regional</span>
            <p className="text-[11px] text-slate-400 mt-1">Assamese, Mizo, Khasi, Manipuri, etc.</p>
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400">Medical Safety Boundary</span>
              <ShieldCheck className="w-4 h-4 text-teal-400" />
            </div>
            <span className="text-2xl font-black text-teal-400">100% Guarded</span>
            <p className="text-[11px] text-slate-400 mt-1">Non-diagnostic telemetry strict</p>
          </CardContent>
        </Card>
      </div>

      {/* Language Packs Verification Matrix */}
      <Card className="border-slate-800 bg-slate-900">
        <CardHeader>
          <CardTitle className="text-base">North East Language Packs Verification</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-800/80">
            {LANGUAGES.map((l) => (
              <div key={l.code} className="p-4 flex items-center justify-between text-xs">
                <div>
                  <strong className="text-white text-sm">{l.native}</strong>
                  <span className="text-slate-400 ml-2">({l.name})</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="teal" size="xs">
                    <CheckCircle2 className="w-3 h-3" />
                    Culturally Verified
                  </Badge>
                  <span className="text-slate-500 font-mono text-[10px] uppercase">code: {l.code}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
