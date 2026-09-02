# MementoCare AI — System Architecture Specification

## Tagline
**"AI that remembers the person, not just the score."**

---

## 1. Architectural Philosophy

MementoCare AI is designed as a hybrid, offline-first cognitive engagement ecosystem tailored for elderly seniors across North East India. It connects the patient, personal memories, bounded adaptive AI, offline-first outbox synchronization, caregivers, and authorized healthcare workers in a secure, non-diagnostic feedback loop:

```text
PATIENT
   ↓
PERSONAL MEMORIES (People, Places, Events, Objects, Preferences, Routine)
   ↓
COGNITIVE ACTIVITIES (5 MVP Games)
   ↓
ADAPTIVE DIFFICULTY (Accuracy 45% + Speed 25% + Consistency 20% + Assistance 10%)
   ↓
VOICE / TOUCH INTERACTION (Web Speech STT / TTS with Tap & Type Fallback)
   ↓
OFFLINE CONTINUITY (Local SQLite/IndexedDB Outbox Queue)
   ↓
SYNC (Idempotent Server Acknowledged Replay)
   ↓
CAREGIVER (Memory Approvals, Reminders, Review Prompts)
   ↓
AUTHORISED HEALTHCARE WORKER (Longitudinal Activity Trends - Non-Diagnostic)
```

---

## 2. Multi-Tier Technology Stack

### Frontend & Dashboards
- **Patient Tablet & Web App:** React 19 + TypeScript + Vite + Tailwind CSS v4 + Web Speech API + Web Audio synthesizer.
- **Native Patient Application:** Flutter 3.x + Dart + Drift/SQLite + SpeechToText + FlutterTTS.
- **Caregiver & Healthcare Worker Portals:** React 19 + Lucide Icons + Recharts for non-diagnostic longitudinal engagement visualization.

### Backend & Cloud Infrastructure
- **Server:** Node.js Express + TypeScript.
- **Database & Auth:** PostgreSQL / Supabase with Row Level Security (RLS) and cryptographic UUID primary keys.
- **Outbox Sync Engine:** Event-sourced outbox with exponential backoff and idempotency protection (`evt_<timestamp>_<uuid>`).
- **AI Intelligence:** Bounded Google Gemini 2.5 Flash with strict deterministic rule-engine fallback.

---

## 3. Four User Roles & Permission Scopes

| Role | Interface | Permissions & Capabilities |
| :--- | :--- | :--- |
| **PATIENT** | Senior Tablet App | Extremely simple 3-tab UI (`Today`, `Memories`, `Help`). Large 64px touch targets, spoken instructions, voice answers, pause & help triggers. |
| **CAREGIVER** | Caregiver Portal | Patient linking, photo uploads, human labeling, approval of bounded AI activity drafts, reminder scheduling, engagement trend monitoring, review prompt acknowledgement. |
| **HEALTHCARE WORKER** | Clinician Dome | Restricted read-only access to authorized patients, longitudinal activity summaries, reminder adherence trends, conservative review prompts. Non-diagnostic disclaimer on all views. |
| **ADMINISTRATOR** | Admin Console | User/role management, language asset verification, template catalog, immutable audit logs, DPDP consent configuration, system health telemetry. |

---

## 4. Personal Memory Graph Workflow

The central innovation of MementoCare AI is grounding cognitive engagement in verified personal memories:

```text
Caregiver Uploads Photo
         ↓
Human-Approved Label & Category (People, Places, Events, Objects, Preferences, Routine)
         ↓
AI Generates Bounded Activity Draft (Strict JSON Schema, Zero Hallucinations)
         ↓
Caregiver Reviews & Approves Draft
         ↓
Added to Patient's Active Memory Game Catalog
         ↓
Patient Engages via Voice or Tap
         ↓
Explainable Adaptation Evaluates Interaction
```

---

## 5. Medical Safety Boundary & Statutory Compliance

MementoCare AI is strictly a non-diagnostic cognitive engagement and care coordination platform. It adheres to the Digital Personal Data Protection (DPDP) Act 2023.

```text
"MementoCare AI supports cognitive engagement, routine assistance, and caregiver visibility. It does not diagnose dementia, measure disease severity, prescribe medicines, change medication, or replace doctors or qualified healthcare workers."
```
