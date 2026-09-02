# MementoCare AI — Data Synchronisation & Outbox Protocol

## Tagline
**"AI that remembers the person, not just the score."**

---

## 1. Outbox Queue Architecture

To ensure zero data loss during prolonged connectivity outages, all patient activities, reminder acknowledgments, and emotional check-ins are recorded into an **Idempotent Outbox Sync Queue**:

```text
User Completes Activity / Acknowledges Reminder
                      ↓
Saved to Local Database (IndexedDB / SQLite)
                      ↓
Enqueued in Outbox with Unique event_id: evt_<timestamp>_<uuid>
                      ↓
Network Listener Detects Online State
                      ↓
POST /api/sync/batch Payload with Array of Events
                      ↓
Server Validates, Stores, and Deduplicates (idempotency by event_id)
                      ↓
Server Returns HTTP 200 with Synced Event IDs
                      ↓
Client Marks Local Records as synced = true
```

---

## 2. Exactly-Once Event Delivery & Deduplication

Each sync payload item contains:
```typescript
export interface SyncQueueItem {
  id: string; // evt_<timestamp>_<uuid>
  patientId: string;
  deviceId: string;
  entityType: 'GAME_SESSION' | 'REMINDER_STATUS' | 'HYDRATION_LOG' | 'SETTINGS' | 'EMOTION_LOG' | 'MEMORY_ITEM';
  entityId: string;
  operation: 'CREATE' | 'UPDATE' | 'DELETE';
  payload: any;
  status: 'PENDING' | 'SYNCING' | 'SYNCED' | 'FAILED';
  createdAt: string;
  syncedAt?: string;
  retryCount: number;
}
```

- **Server-Side Idempotency:** The database enforces a `UNIQUE(event_id)` constraint. If a network timeout causes a retry of an already processed event, the server gracefully ignores the duplicate and acknowledges the event ID.
- **Exponential Backoff:** If the sync fails due to network unsteadiness, retries are scheduled with exponential backoff (2s, 5s, 15s, 60s) without blocking the user interface.

---

## 3. Local Device-to-Device Transfer & Fallback

In remote villages without cellular coverage, ASHA health workers can sync data locally with the patient's tablet:
1. **QR / Encrypted Local Transfer:** Exporting a lightweight encrypted session packet via offline local transport or Wi-Fi hotspot.
2. **Offline Package Export/Import:** Authorised JSON encrypted capsule that can be imported to the ASHA worker's device and uploaded once network connectivity is re-established.
