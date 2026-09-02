# MementoCare AI — Security, RLS & DPDP Compliance

## 1. Row Level Security (RLS) Access Matrix

| Table | Patient | Caregiver | Healthcare Worker | Administrator |
| :--- | :--- | :--- | :--- | :--- |
| `patients` | Own profile (Read/Update) | Linked patient (Read/Update) | Authorised patient (Read-Only) | All (Read/Update) |
| `memories` | Own APPROVED memories only | Linked patient (Full CRUD) | Authorised patient (Read-Only) | All (Read-Only) |
| `game_sessions` | Own sessions (Insert/Read) | Linked patient (Read-Only) | Authorised patient (Read-Only) | All (Read-Only) |
| `reminders` | Own (Read/Update Status) | Linked patient (Full CRUD) | Authorised patient (Read-Only) | All (Full CRUD) |
| `alerts` | None | Linked patient (Acknowledge/Resolve) | Authorised patient (Read-Only) | All (Full CRUD) |
| `audit_logs` | None | None | None | Admin (Read-Only, Append-Only) |

---

## 2. Storage Security & Asset Protection
- Private storage buckets with expiring signed URLs (15-minute TTL).
- No permanent public asset URLs for personal family photographs.
- On-device SQLite and IndexedDB records encrypted with AES-256 keys.
- Complete data minimization principle: only store photographs explicitly uploaded and approved by caregivers.

---

## 3. DPDP Act 2023 Compliance & Consent Lifecycle
- Explicit consent management (`PENDING`, `APPROVED`, `PAUSED`, `WITHDRAWN`).
- Caregivers and patients can pause or revoke data processing at any time.
- Right to erasure: deleting a memory purges both the database node and the private media asset.
- Immutable audit logging on all memory approval, data sync, and consent revocation events.
