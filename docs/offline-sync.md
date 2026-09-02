# MementoCare AI — Offline-First & Outbox Synchronisation Engine

## 1. Zero-Network Architecture

In the mountainous, flood-prone regions of North East India (e.g. Dima Hasao, Upper Subansiri, Tamenglong), cellular connectivity is frequently intermittent. MementoCare AI provides 100% offline continuity:

```text
[Local SQLite / IndexedDB]
       ↓ (enqueue event)
[Outbox Queue (PENDING)]
       ↓ (detect network)
[Sync Worker with Exponential Backoff]
       ↓ (idempotent POST /api/sync)
[Server PostgreSQL / Supabase]
       ↓ (200 OK Ack)
[Outbox Queue (SYNCED)]
```

---

## 2. Outbox Event Schema & Idempotency
Every offline action receives an immutable event structure:
```json
{
  "eventId": "evt_1725080000000_a1b2c3",
  "entityType": "GAME_SESSION",
  "payload": {
    "patientId": "p_abeni_01",
    "gameId": "game_memory_match",
    "score": 94,
    "accuracy": 94,
    "responseMs": 1850,
    "attempts": 1
  },
  "attemptCount": 1,
  "syncState": "SYNCED",
  "createdAt": "2026-08-31T05:10:00Z"
}
```

- **Conflict Policy:** Patient-completed sessions are immutable fact events. Server-approved memory metadata takes precedence in concurrent edits.
- **Deduplication:** Server ignores events with previously acknowledged `event_id` keys, preventing duplicate session insertion.
