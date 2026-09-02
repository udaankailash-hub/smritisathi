# MementoCare AI — Security, Privacy & Statutory Compliance

## 1. Compliance Architecture

### India Digital Personal Data Protection (DPDP) Act 2023
- **Purpose Limitation:** Cognitive activity data and memory tags are stored solely to drive patient engagement and caregiver coordination.
- **Explicit Consent Logging:** Timestamps and caregiver authorization records are tracked in the database.
- **Data Minimization:** No biometric, financial, or unneeded demographic information is requested.
- **Right to Erasure:** Complete profile and memory graph purge available via the Admin Console.

---

## 2. Statutory Medical Safety Boundary

> [!IMPORTANT]
> **MementoCare AI supports cognitive engagement, routine assistance, and caregiver visibility. It does not diagnose dementia, measure disease severity, prescribe medicines, change medication, or replace doctors or qualified healthcare workers.**

1. **Non-Diagnostic Posture:** Cognitive engagement scores and response latencies are labeled as "Activity Consistency" and "Engagement Trajectories" — never diagnostic scores.
2. **Review Prompts:** Telemetry triggers conservative "Consider checking in" recommendations rather than clinical diagnoses.

---

## 3. Data Protection & Network Security
1. **Edge-First Processing:** In offline mode, voice interactions and games run strictly on-device without network transmission.
2. **Strict Sanitization:** Input validation on all Express API routes and parameterized database queries.
3. **No Hardcoded Secrets:** All private keys and tokens are loaded via environment variables (`.env`).
4. **Audit Trails:** Administrative access and telemetry exports are immutably logged to `audit_logs`.
