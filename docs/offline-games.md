# MementoCare AI — Offline Cognitive Games & Outbox Synchronization

## 1. Context & Rationale

In the North Eastern Region of India (NER), landslides, heavy monsoonal rains, and remote hilly terrain frequently cause prolonged power outages and cellular network blackouts.

MementoCare AI guarantees **100% offline gameplay continuity**:
- All 5 cognitive games run entirely within local JavaScript / Flutter runtime.
- Card assets, audio chimes, routine templates, and approved family memories are cached on-device in SQLite / IndexedDB.
- Game completion, adaptive difficulty calculation, and score evaluations happen locally without requiring an active network connection.

---

## 2. The Outbox Sync Pattern

```text
Patient Plays Game Offline
           ↓
Game Engine Evaluates Interaction
           ↓
Session Created with Unique Event ID: evt_<timestamp>_<random>
           ↓
Enqueued to Local Outbox Queue (State: PENDING)
           ↓
Network Monitor Detects Connectivity
           ↓
Sync Engine Flushes Outbox via Batch API (POST /api/sync)
           ↓
Server Acknowledges Events (State: SYNCED)
           ↓
Caregiver Dashboard Displays Updated Longitudinal Trends
```

---

## 3. Idempotency & Deduplication

To prevent duplicate session creation when mobile connections fluctuate during upload:
- Every session is keyed by an immutable, client-generated `event_id`.
- The database table `game_sessions` enforces a `UNIQUE(event_id)` constraint.
- Re-transmissions of previously acknowledged event IDs return `200 OK (DUPLICATE_ACK)` without creating duplicate records.
