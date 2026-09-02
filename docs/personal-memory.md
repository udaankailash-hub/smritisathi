# MementoCare AI — Personal Memory Graph & Bounded Pipeline

## 1. Core Architecture

The Personal Memory Graph is the cornerstone of MementoCare AI, rooting cognitive activities in verified, emotionally meaningful recollections rather than generic shapes.

### The 6 Memory Pillars
1. **People:** Immediate family, daughters, sons, grandchildren, lifelong friends.
2. **Places:** Ancestral home, tea estate, Assam veranda garden, village pond.
3. **Events:** Bihu festivals, weddings, milestone anniversaries, retirement journeys.
4. **Objects:** Traditional brass kettle, muga silk mekhela, reading glasses, hand fan.
5. **Preferences:** Favorite garden flowers (orchids), morning tea type (Assam green tea).
6. **Daily Routine:** Morning water, veranda walk, news reading, evening family calls.

---

## 2. Strict Human-in-the-Loop Safety Pipeline

```text
Caregiver Uploads Photo
          ↓
Caregiver Inputs Human-Approved Label & Category
          ↓
AI Generates Bounded Activity Draft (Strict JSON Schema)
          ↓
Validation Engine (Rejects hallucinations, unverified names, clinical claims)
          ↓
Caregiver Reviews & Approves Draft
          ↓
Activity Appears in Patient's Memory Album & Game Catalog
          ↓
Patient Plays via Voice or Tactile Touch
```

---

## 3. Bounded Draft Validation Rules

The validation engine rejects AI drafts if any of the following occur:
1. **Invented Facts:** AI includes names, places, or dates not explicitly supplied by the caregiver.
2. **Identity Inference:** AI attempts to guess the identity of people in photographs.
3. **Medical or Diagnostic Jargon:** Words such as *"dementia"*, *"Alzheimer's"*, *"severe"*, *"stage"*, or *"decline"* are strictly prohibited.
4. **Medication Generation:** AI must never invent medication names or dosages.
5. **Option Completeness:** Correct answer must be among the options and must exactly match the caregiver-approved label.
