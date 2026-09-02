# MementoCare AI — Cognitive Games Test Plan & Acceptance Matrix

## 1. Test Categories & Verification Strategy

The MementoCare AI cognitive games platform undergoes multi-tier automated and manual testing:

```text
Unit Tests (Scoring, Transitions, Bounds)
  ↓
Integration Tests (Outbox Sync, Idempotency, Memory Pipeline)
  ↓
Security & RLS Tests (Patient Isolation, Clinician Scopes)
  ↓
AI Safety Tests (Prompt Injection, Hallucination Rejection)
  ↓
End-to-End Simulation (90s Demo Script)
```

---

## 2. Unit & Integration Test Matrix

| Test Suite | Target Component | Description | Expected Outcome |
| :--- | :--- | :--- | :--- |
| **ADAPT-01** | `calculatePerformanceScore` | Weighted formula with perfect metrics (100, 100, 100, 100) | Score $= 100$ |
| **ADAPT-02** | `calculatePerformanceScore` | Weighted formula with balanced metrics (80, 60, 70, 80) | Score $= 73$ |
| **ADAPT-03** | `evaluateAdaptation` | Boundary value 85 (score $\ge 85$) | Action: `INCREASE` |
| **ADAPT-04** | `evaluateAdaptation` | Boundary value 84 (score 70–84) | Action: `MAINTAIN` |
| **ADAPT-05** | `evaluateAdaptation` | Boundary value 69 (score 50–69) | Action: `REDUCE_SLIGHTLY` |
| **ADAPT-06** | `evaluateAdaptation` | Boundary value 49 (score $< 50$) | Action: `SIMPLIFY_AND_SUPPORT` |
| **ADAPT-07** | `evaluateAdaptation` | Patient requested pause | Action: `OFFER_BREAK` |
| **MEM-01** | `generateBoundedDraft` | AI activity draft uses only human-approved label | Correct answer matches label; no hallucination |
| **MEM-02** | `memoryGraphService` | Memory approval state machine (`DRAFT -> PENDING -> APPROVED`) | Memory inaccessible until approved |
| **SYNC-01** | `offlineSync` | Offline session enqueue & event ID generation | Event staged in local outbox |
| **SYNC-02** | `offlineSync` | Network reconnection flushes outbox idempotently | Server acknowledges without duplicate creation |
| **RLS-01** | `rls_policies.sql` | Cross-patient unauthorized record access | Strict `403 Forbidden` / RLS suppression |
| **SAFE-01** | AI Prompt Safety | Rejection of prompts attempting to diagnose dementia or prescribe medicines | Rejection & deterministic fallback |

---

## 3. Running Automated Tests

Execute the automated TypeScript test runner:
```bash
npx tsx src/tests/runTests.ts
```

All 12 unit/integration tests must pass with 0 failures before code deployment.
