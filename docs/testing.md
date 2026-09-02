# MementoCare AI — Quality Assurance & Test Specifications

## Tagline
**"AI that remembers the person, not just the score."**

---

## 1. Test Suite Architecture

MementoCare AI employs an automated test suite covering:
1. **Adaptive Engine Math & Boundaries:** Verification of the 45/25/20/10 weighted formula and transition boundaries.
2. **Personal Memory Graph & AI Validation:** Schema adherence, zero hallucinations, absence of clinical diagnostic jargon, approval state machine (`PENDING_REVIEW` -> `APPROVED`).
3. **Cognitive Game Engines & Scoring:** Accuracy calculation, hint usage tracking, eventId generation.
4. **Offline Outbox & Idempotency:** Local storage persistence, duplicate replay rejection.
5. **AI Safety Boundaries:** Rejection of diagnostic queries, medical prescriptions, and unauthorized memory modifications.
6. **Role Security & Access Boundaries:** Verification that caregivers access only linked patients, ASHA workers access assigned clusters, and clinicians view non-diagnostic summaries.

---

## 2. Running Automated Tests

```bash
# Run the automated TypeScript test suite
npx tsx src/tests/runTests.ts

# Run static type verification
npm run lint
```

---

## 3. Key Test Scenarios & Expectations

| Test Category | Input / Scenario | Expected Output |
| :--- | :--- | :--- |
| **Adaptation Formula** | Perfect metrics (100, 100, 100, 100) | Performance Score = 100 |
| **Adaptation Formula** | Balanced metrics (80, 60, 70, 80) | Performance Score = 73 |
| **Adaptation Boundary** | Score = 85 on `easy` | Action = `INCREASE` to `medium` |
| **Adaptation Boundary** | Score = 49 on `medium` | Action = `SIMPLIFY_AND_SUPPORT` with human support offer |
| **Distress Override** | Patient requests pause | Action = `OFFER_BREAK`, triggers caregiver option |
| **AI Draft Generation** | Caregiver submits photo + label | Draft contains exact label, no clinical jargon |
| **Approval Flow** | New memory created | Initial status = `PENDING_REVIEW`; not playable until approved |
| **Offline Idempotency** | Event submitted twice with same `event_id` | Server ignores duplicate, acknowledges once |
