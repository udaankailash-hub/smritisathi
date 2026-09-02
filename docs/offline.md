# MementoCare AI — Offline-First Architecture

## Tagline
**"AI that remembers the person, not just the score."**

## SIH Problem Statement Reference
**SIH26003 — AI-Based Cognitive Gaming and Memory Assistance Platform for Elderly Dementia Patients in North Eastern Region**

---

## 1. Offline-First Necessity in North East India

In hilly and rural areas of Assam, Arunachal Pradesh, Meghalaya, and Nagaland, mobile networks and electricity are frequently disrupted by monsoon rains, landslides, and infrastructure constraints. A cognitive care platform that requires constant internet connectivity would fail at the exact moment a senior needs reassurance.

**MementoCare AI is built offline-first from the ground up.**

---

## 2. Architectural Components

```text
+-------------------------------------------------------------+
|                      PATIENT TABLET / PWA                   |
|                                                             |
|   [ UI Components (React 19 / HTML5) ]                     |
|                   │                                         |
|                   ▼                                         |
|   [ Service Worker App Shell Cache (Static Assets & Audio) ]|
|                   │                                         |
|                   ▼                                         |
|   [ Local IndexedDB / Dexie / SQLite Storage Engine ]        |
|     ├── Cached Approved Memories                            |
|     ├── Cognitive Game Templates (5+ Activities)            |
|     ├── Daily Activity Schedules                            |
|     ├── Language Dictionaries & Synthesis Prompts           |
|     └── Outbox Sync Queue (Pending Events)                  |
+-------------------------------------------------------------+
```

---

## 3. Offline Capabilities Matrix

| Feature | Offline Behavior |
| :--- | :--- |
| **Cognitive Games (All 5 Activities)** | 100% playable offline using cached templates and approved memory graphs. |
| **Voice Interaction & Prompts** | Operates offline using browser Web Speech API / synthesized lexicon audio assets. |
| **Smart Reminders & Hydration** | Local device timers trigger audio and visual alerts independently of the cloud. |
| **Personal Memory Game** | All caregiver-approved photos and text drafts are stored in device storage. |
| **Performance Tracking** | Activity metrics (accuracy, speed, assistance) are logged to local outbox queue. |
| **Reassurance Audio & Music** | High-quality compressed audio items cached locally for continuous playback. |

---

## 4. Visual Offline Indicators

The UI provides clear, calming status indicators:
- 🟢 **Online:** Cloud synchronised.
- 🟡 **Syncing:** Transferring local session outbox.
- ⚫ **Offline Mode:** *"You're offline. Your activity continues normally. We will sync automatically when the connection returns."*
