# MementoCare AI — Cognitive Games Framework Specification

## SIH Problem Statement Reference
**SIH26003 — AI-Based Cognitive Gaming and Memory Assistance Platform for Elderly Dementia Patients in the North Eastern Region**

---

## 1. Overview & Objective

The MementoCare AI Cognitive Games Engine is designed specifically for elderly seniors living with cognitive decline and mild-to-moderate dementia. Unlike generic brain training apps, it combines:
- **Personalized Reminiscence:** Rooted in caregiver-verified memories, familiar regional motifs, and daily life routines.
- **Explainable Adaptation:** Transparent rules-based performance formulas that adjust difficulty without black-box clinical scoring.
- **Multimodal Accessibility:** Voice playback, speech-to-text answers, large touch targets (64px+), and high-contrast color palettes.
- **Resilient Offline Architecture:** 100% playable without cellular connectivity during North Eastern monsoonal blackouts.
- **Non-Diagnostic Safety Boundary:** Clear separation between cognitive engagement activities and clinical medical diagnosis.

---

## 2. Standardized Game Lifecycle

Every cognitive activity adheres to the unified `GameEngine` lifecycle:

```text
READY
  ↓
INSTRUCTION (Spoken voice + visual icon)
  ↓
PLAYING (Active interaction via voice, touch, or drag)
  ↓
PAUSED (Rest break offered without time penalty)
  ↓
COMPLETED (All objectives met)
  ↓
EVALUATED (Deterministic weighted performance score computed)
  ↓
SAVED (Persisted to on-device SQLite / IndexedDB)
  ↓
SYNCED (Synchronized idempotently when network is available)
```

---

## 3. The Five (5) MVP Cognitive Activities

### Game 1: Memory Cards (Cultural Match)
- **Domain:** Visual Working Memory & Cultural Familiarity
- **Motifs:** Assam Muga silk, Kaziranga Rhino, Great Hornbill, Tea Garden, Bamboo Japi, Bihu Dhol.
- **Levels:**
  - Level 1: 2 Pairs (4 Cards) — 4s Initial Exposure Preview
  - Level 2: 3 Pairs (6 Cards) — 3s Initial Exposure Preview
  - Level 3: 4 Pairs (8 Cards) — 2s Initial Exposure Preview
  - Level 4: 5 Pairs (10 Cards) — 1s Initial Exposure Preview
- **Accessibility:** Large cards (120px+), gentle highlight hints, no penalty for wrong attempts.

### Game 2: Familiar Object Recognition
- **Domain:** Semantic Memory & Everyday Object Recall
- **Objects:** Traditional Tea Strainer, Handwoven Bamboo Fan, Reading Spectacles, Muga Gamosa.
- **Levels:**
  - Level 1: 2 Options (Low distractor similarity)
  - Level 2: 3 Options (Medium distractor similarity)
  - Level 3: 4 Options (Medium distractor similarity)
  - Level 4: 5 Options (High distractor similarity)
- **Input:** Voice speech recognition or large tactile touch buttons with gentle semantic hints.

### Game 3: Sequence Memory & Rhythm
- **Domain:** Auditory-Visual Sequential Processing
- **Chimes:** Low Bihu Dhol (C4), Mid Temple Bell (E4), High Bamboo Flute (G4), Peak Brass Cymbal (C5).
- **Levels:**
  - Level 1: 2 Item Sequence
  - Level 2: 3 Item Sequence
  - Level 3: 4 Item Sequence
  - Level 4: 5 Item Sequence
- **Assistance:** Replay button, slow sequence playback, visual flash cues.

### Game 4: Daily Routine Story Sequencing
- **Domain:** Temporal Orientation & Executive Routine Maintenance
- **Steps:** Wake Up & Drink Water $\rightarrow$ Morning Garden Walk $\rightarrow$ Brew Assam Tea $\rightarrow$ Read Newspaper $\rightarrow$ Family Call.
- **Levels:**
  - Level 1: 2 Chronological Steps
  - Level 2: 3 Chronological Steps
  - Level 3: 4 Chronological Steps
  - Level 4: 5 Chronological Steps
- **Controls:** Up / Down reordering buttons and drag-and-drop tiles.

### Game 5: Personal Memory Game (Showcase)
- **Domain:** Episodic Recall & Family Reminiscence
- **Content:** Caregiver-uploaded photographs across 6 pillars (`People`, `Places`, `Events`, `Objects`, `Preferences`, `Routine`).
- **Safety Pipeline:** `Caregiver Photo -> Human Label -> Bounded AI Draft -> Caregiver Approval -> Patient Play`.
- **Interaction:** Spoken prompt, Web Speech STT answer parsing, and typing fallback.

---

## 4. Reusable Assistance Engine

Every game includes a standardized bottom control strip:
1. **🔊 Repeat:** Replays slow, calm spoken instructions.
2. **💡 Hint:** Highlights correct pairs, reduces distractors, or gives semantic hints without failure penalty.
3. **❓ Help:** Pauses activity and offers supportive guidance.
4. **⏸ Pause / Resume:** Allows seniors to rest at their own pace without time pressure.
5. **🚪 Exit:** Returns safely to the Today hub or activities catalog.

---

## 5. Non-Diagnostic Medical Boundary

> **Statutory Disclaimer:** *"MementoCare AI supports cognitive engagement, routine assistance, and caregiver visibility. It does not diagnose dementia, measure disease severity, prescribe medicines, change medication, or replace doctors or qualified healthcare workers."*
