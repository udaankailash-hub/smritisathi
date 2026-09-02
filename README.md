# MementoCare AI — Cognitive Support Platform

> **"AI that remembers the person, not just the score."**  
> *Personal. Adaptive. Voice-enabled. Offline. Connected to care.*

---

## 🌟 Executive Summary & Core USP

MementoCare AI is a personalized cognitive engagement and memory-support ecosystem engineered specifically for elderly seniors across North East India. Unlike generic brain-game platforms with arbitrary scores, MementoCare AI transforms **caregiver-approved personal memories** into meaningful, culturally familiar cognitive activities that adapt transparently, operate 100% offline, and maintain a secure non-diagnostic visibility loop for caregivers, ASHA workers, and clinicians.

```text
PERSON
  ↓
PERSONAL MEMORIES (Family photos, domestic spaces, regional festivals, tea routines)
  ↓
COGNITIVE ACTIVITIES (5+ Adaptive Games + Reminiscence)
  ↓
VOICE / TOUCH INTERACTION (7 Regional Languages + Voice Synthesizer & Speech Recognition)
  ↓
ADAPTIVE DIFFICULTY (Deterministic Weighted Formula + Explainable Adjustments)
  ↓
OFFLINE CONTINUITY (Local IndexedDB / SQLite Outbox Engine)
  ↓
SAFE SYNCHRONISATION (Idempotent Event-Sourced Replay with event_id deduplication)
  ↓
CAREGIVER (Memory Approvals, Reminders, Reassurance Trends)
  ↓
ASHA / HEALTH WORKER (Multi-Family Village Prioritisation & Fast Visit Reviews)
  ↓
AUTHORISED CLINICIAN (Non-Diagnostic Longitudinal Interaction Summaries)
```

---

## ⚖️ Critical Medical Safety Boundary

MementoCare AI is a **cognitive engagement, memory assistance, routine support, and caregiver visibility platform**.

### Strict Prohibitions:
- 🚫 **NOT a diagnostic system** — Never claims to detect dementia or determine disease severity.
- 🚫 **NOT a disease progression predictor** — Never outputs phrases like *"Your dementia is worsening"*.
- 🚫 **NOT a medical treatment system** — Never prescribes medicines or alters dosages.
- 🚫 **NOT a replacement for doctors** or qualified healthcare professionals.

### Standardized Non-Diagnostic Terminology:
- Use: **"Activity performance"**, **"Interaction trend"**, **"Engagement consistency"**, **"Reminder acknowledgement"**, **"Review recommended"**.
- Always displayed:
  > **Statutory Medical Safety Disclaimer:** *"MementoCare AI provides cognitive engagement, routine assistance, and caregiver visibility. It does not diagnose dementia, measure disease severity, prescribe medicines, change medication, or replace doctors or qualified healthcare workers."*

---

## 🚀 Key Features & Capabilities

1. **🧠 Cognitive Game Suite:**
   - **Game 1 — Memory Match:** Visual working memory with cultural motifs (Assam silk, Rhinoceros, Tea leaves, Bamboo crafts).
   - **Game 2 — Attention & Odd One Out:** Visual discrimination and attention focus.
   - **Game 3 — Pattern Recognition:** Sequence prediction with regional nature motifs.
   - **Game 4 — Object Recognition:** Everyday domestic objects with caregiver-approved hints.
   - **Game 5 — Daily Routine Recall:** Chronological sequence ordering for daily routines (Wake up → Tea → Walk → Rest).
   - **Flagship — Personal Memory Game:** Caregiver-uploaded, verified family photographs with structured AI activity generation.
   - **Familiar Sound & Rhythm:** Acoustic recall with regional instruments (Pepa, Dhol, Gogona, Khasi Flute).

2. **🌳 Personal Memory Graph & Human-in-the-Loop Approval:**
   - 6 Pillars: `People`, `Places`, `Events`, `Objects`, `Routines`, `Preferences`.
   - Pipeline: `Caregiver Uploads Photo & Context → Bounded AI Prepares Activity → Caregiver Reviews & Approves → Added to Patient Catalog`.

3. **⚙️ Transparent Explainable Adaptive AI Engine:**
   - Weighted scoring formula: $\text{Performance Score} = \text{Accuracy} \times 0.45 + \text{Speed} \times 0.25 + \text{Consistency} \times 0.20 + \text{Assistance} \times 0.10$.
   - Transparent explanations: *"The next activity has been adjusted based on recent interaction performance."*
   - Distress / Pause Override: If patient indicates fatigue or confusion, triggers break mode and caregiver contact option.

4. **🗣️ Voice-First Multilingual Interaction:**
   - Speech-to-text, voice prompts, repeat button, and typing/tap fallbacks.
   - Regional language architecture: English, Assamese, Bengali, Manipuri, Mizo, Khasi, Hindi.

5. **📡 100% Offline-First Outbox Synchronization:**
   - Local IndexedDB / SQLite outbox storing completed sessions, reminders, and emotional check-ins.
   - Exactly-once synchronization with unique `event_id` deduplication and exponential retry backoff.
   - Visual network indicator: 🟢 Online | 🟡 Syncing | ⚫ Offline.

6. **👥 Four Specialized User Experiences:**
   - **Patient:** Large 64px touch targets, warm spoken greetings, high contrast, voice-first mode, reduced motion.
   - **Caregiver:** Memory approval hub, routine reminder setup, daily reassurance cards, 7/30/90-day interaction trends, PDF reports.
   - **ASHA Worker:** Multi-family village cluster dashboard, triage priorities (🔴 Check-in recommended, 🟡 Follow-up, 🟢 Routine), fast visit review.
   - **Clinician:** Non-diagnostic telemetry dome, reminder adherence, caregiver notes, review prompts, PDF export.

---

## 🛠️ Technology Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4, Lucide Icons, Recharts, Framer Motion.
- **Backend:** Node.js Express, TypeScript REST API, Google Gemini 2.5 Flash (bounded activity generation).
- **Database & Auth:** PostgreSQL / Supabase, Row Level Security (RLS), DPDP Consent Management.
- **Offline Engine:** PWA, Service Worker, IndexedDB, Event-Sourced Outbox Queue.
- **Mobile Native (Complementary):** Flutter 3.x, Dart, SQLite (Drift), SpeechToText, FlutterTTS.

---

## 📦 Quick Start & Installation

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/guruprasanth4059-alt/Mindcare-NER.git
cd Mindcare-NER
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Key configuration values:
- `PORT=3000`
- `GEMINI_API_KEY=your_google_gemini_api_key`
- `VITE_SUPABASE_URL=your_supabase_url`
- `VITE_SUPABASE_ANON_KEY=your_supabase_anon_key`

### 3. Run Development Server
```bash
npm run dev
```
Open **`http://localhost:3000`** in your browser.

### 4. Run Automated Test Suite
```bash
npx tsx src/tests/runTests.ts
```

### 5. Production Build & Start
```bash
npm run build
npm run start
```

---

## 🎬 Interactive Platform Demonstration Flow

The live application includes an **Interactive Platform Demonstration Walkthrough**:
1. **Caregiver Login:** Select Abeni (72, Guwahati).
2. **Add Personal Memory:** Upload veranda morning tea photo and enter context.
3. **Caregiver Approval:** Approve the memory draft.
4. **Patient Today View:** Open Today hub and launch Personal Memory Activity.
5. **Voice Interaction:** Patient answers via voice ("Daughter Priyanka").
6. **Adaptive Difficulty:** Rule engine calculates score and adapts transparently.
7. **Simulate Offline:** Disable internet connectivity; continue game uninterrupted; save to local outbox.
8. **Simulate Online & Sync:** Reconnect; outbox synchronises idempotently.
9. **Caregiver & ASHA Updates:** Caregiver dashboard reflects completed session; ASHA triage updates instantly; Clinician views non-diagnostic summary.

---

## 📚 Complete Technical Documentation Directory

- [1. System Architecture](docs/architecture.md)
- [2. Product Specification](docs/product.md)
- [3. Patient Experience & Accessibility](docs/patient-experience.md)
- [4. Caregiver Portal & Workflow](docs/caregiver.md)
- [5. ASHA Community Health Worker Module](docs/asha.md)
- [6. Clinician Telemetry Dome](docs/clinician.md)
- [7. Cognitive Games Specification](docs/cognitive-games.md)
- [8. Personal Memory Graph & Safety Pipeline](docs/personal-memory.md)
- [9. Adaptive AI & Weighted Scoring](docs/adaptive-ai.md)
- [10. Voice-First Architecture](docs/voice.md)
- [11. Multilingual Architecture](docs/languages.md)
- [12. Music & Acoustic Reminiscence](docs/music.md)
- [13. Reminiscence & Cultural Heritage](docs/reminiscence.md)
- [14. Smart Reminders & Routine Support](docs/reminders.md)
- [15. Offline-First Architecture](docs/offline.md)
- [16. Data Synchronisation & Outbox Protocol](docs/synchronization.md)
- [17. Database Schema & Models](docs/database.md)
- [18. Security & Row Level Security (RLS)](docs/security.md)
- [19. Privacy & DPDP Consent](docs/privacy.md)
- [20. Accessibility Guidelines](docs/accessibility.md)
- [21. Quality Assurance & Test Suite](docs/testing.md)
- [22. Production Deployment Guide](docs/deployment.md)
- [23. Platform Demo Script & Presentation Guide](docs/demo.md)

---

## ⚖️ Statutory Notice
*MementoCare AI is designed for cognitive engagement, routine assistance, and caregiver visibility. All demo personas (Abeni, Priyanka, Rimjim, Dr. Ananya) and clinical data are fictional and created strictly for demonstration purposes.*
# smritisathi
