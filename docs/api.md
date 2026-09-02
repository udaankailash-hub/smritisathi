# MementoCare AI — API Reference

## Base URL
`/api`

---

## Endpoints

### Health Check
- `GET /api/health`
  - Response: Server status, version, uptime, and timestamp.

### Patient & Profile
- `GET /api/patients/:id`
  - Retrieve patient profile (e.g. `p_abeni_01`).
- `PATCH /api/patients/:id`
  - Update patient settings or accessibility preferences.

### Cognitive Games & Sessions
- `GET /api/games`
  - Get catalog of approved cognitive activities.
- `POST /api/games/session`
  - Record completed cognitive session result with score, accuracy, response latency, and attempts.
- `GET /api/games/history/:patientId`
  - Retrieve longitudinal session records for a patient.

### Personal Memory Graph
- `GET /api/memories/:patientId`
  - Retrieve personal memories (filtered by approval state and consent).
- `POST /api/memories`
  - Caregiver uploads a new memory photo, category, and human label.
- `POST /api/memories/:id/approve`
  - Caregiver approves bounded AI activity draft.
- `DELETE /api/memories/:id`
  - Delete memory node and purge asset.

### Adaptive Recommendations
- `GET /api/recommendations/:patientId`
  - Computes explainable adaptive difficulty transition using performance formula.

### Reminders & Routine
- `GET /api/reminders`
  - Get scheduled daily reminders.
- `POST /api/reminders`
  - Caregiver creates routine reminder.
- `PATCH /api/reminders/:id/status`
  - Mark reminder as completed, snoozed, or missed.

### Review Prompts & Telemetry
- `GET /api/alerts`
  - Retrieve caregiver review prompts with reason codes.
- `POST /api/caregiver/alerts/:id/acknowledge`
  - Acknowledge a review prompt.

### Outbox Synchronisation
- `POST /api/sync`
  - Batch synchronisation endpoint for idempotent replay of queued offline events.
