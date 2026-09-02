# MementoCare AI — AI Safety Boundary & Prompting Policy

## 1. Statutory Medical Safety Boundary

MementoCare AI strictly enforces a non-diagnostic safety boundary across all system layers.

### Strict Prohibitions
The AI and deterministic engine **MUST NOT**:
1. Diagnose dementia or any neurodegenerative condition.
2. Predict disease progression or estimate dementia stages.
3. Infer sensitive facts, identities, or emotions from photographs.
4. Prescribe or alter medication dosages or schedules autonomously.
5. Generate automated clinical alarms that bypass professional human review.
6. Present prototype interaction metrics as clinical scores.

---

## 2. Non-Diagnostic Terminology Mapping

| Prohibited Clinical Term | Approved Non-Diagnostic Term |
| :--- | :--- |
| "Dementia score" | **"Activity performance"** |
| "Cognitive decline" / "Disease progression" | **"Engagement trend"** |
| "Clinical risk alert" | **"Review prompt"** |
| "Patient failure rate" | **"Assistance used"** |
| "MMSE / MoCA Clinical Diagnosis" | **"Longitudinal Interaction Consistency"** |

---

## 3. Bounded AI Generation Policy

When generating activity drafts from caregiver photographs:
1. Context is strictly limited to human-approved labels and categories.
2. AI is prohibited from guessing family relationships, names, dates, or emotional histories not explicitly provided by the caregiver.
3. Output must adhere to deterministic JSON schemas.
4. The workflow is strictly: `DRAFT -> CAREGIVER REVIEW -> APPROVED -> PATIENT`.
