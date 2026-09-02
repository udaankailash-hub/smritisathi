# MementoCare AI — Database & Schema Specification

## 1. Relational Entities (PostgreSQL / Supabase)

### Table: `users`
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique user identifier |
| `role` | VARCHAR(32) | NOT NULL, CHECK in (PATIENT, CAREGIVER, HEALTHCARE_WORKER, ADMIN) | Role assignment |
| `name` | VARCHAR(255) | NOT NULL | Full user name |
| `email` | VARCHAR(255) | UNIQUE | Authentication email |
| `phone` | VARCHAR(32) | | Contact phone |
| `language` | VARCHAR(16) | NOT NULL DEFAULT 'en' | Preferred locale |
| `created_at` | TIMESTAMPTZ | NOT NULL DEFAULT NOW() | Registration timestamp |
| `updated_at` | TIMESTAMPTZ | NOT NULL DEFAULT NOW() | Last update timestamp |

### Table: `patients`
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PRIMARY KEY | Unique patient record |
| `user_id` | UUID | REFERENCES users(id) | Linked user account |
| `preferred_language` | VARCHAR(16) | NOT NULL DEFAULT 'en' | Primary spoken dialect |
| `difficulty_level` | VARCHAR(16) | CHECK in (easy, medium, hard) | Adaptive difficulty level |
| `consent_state` | VARCHAR(32) | CHECK in (PENDING, APPROVED, PAUSED, WITHDRAWN) | DPDP Consent state |
| `age` | INTEGER | NOT NULL DEFAULT 72 | Age |
| `gender` | VARCHAR(16) | | Gender |
| `location` | VARCHAR(255) | | Region (e.g. Guwahati, Assam) |
| `battery_level` | INTEGER | DEFAULT 85 | Tablet battery telemetry |
| `is_device_online` | BOOLEAN | DEFAULT true | Edge connectivity state |
| `last_synced_at` | TIMESTAMPTZ | | Last outbox sync time |

### Table: `caregivers`
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PRIMARY KEY | Caregiver link ID |
| `user_id` | UUID | REFERENCES users(id) | Caregiver user record |
| `patient_id` | UUID | REFERENCES patients(id) | Linked senior patient |
| `permission_scope` | VARCHAR(64) | CHECK in (FULL_SUPPORT, READ_ONLY, EMERGENCY_ONLY) | Granular permission |
| `relationship` | VARCHAR(64) | | Relationship (e.g. Daughter) |

### Table: `memories` (Personal Memory Graph)
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PRIMARY KEY | Memory node ID |
| `patient_id` | UUID | REFERENCES patients(id) | Senior recipient |
| `category` | VARCHAR(32) | CHECK in (PEOPLE, PLACES, EVENTS, OBJECTS, PREFERENCES, DAILY_ROUTINE) | High-level pillar |
| `subcategory` | VARCHAR(64) | NOT NULL | Detailed subcategory |
| `asset_path` | VARCHAR(1024)| NOT NULL | Private encrypted photo path |
| `human_label` | VARCHAR(255) | NOT NULL | Verified human description |
| `language` | VARCHAR(16) | DEFAULT 'en' | Language code |
| `approval_state` | VARCHAR(32) | CHECK in (DRAFT, PENDING_REVIEW, APPROVED, REJECTED) | Caregiver review state |
| `consent_state` | VARCHAR(32) | CHECK in (PENDING, APPROVED, PAUSED, WITHDRAWN) | DPDP Consent status |
| `source` | VARCHAR(64) | DEFAULT 'CAREGIVER_UPLOAD' | Memory origin |
| `activity_draft_json` | JSONB | | Bounded question & options |
| `approved_at` | TIMESTAMPTZ | | Approval timestamp |

### Table: `game_sessions` (Immutable Events)
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PRIMARY KEY | Session ID |
| `patient_id` | UUID | REFERENCES patients(id) | Patient |
| `game_id` | UUID | REFERENCES games(id) | Cognitive activity played |
| `event_id` | VARCHAR(128) | UNIQUE, NOT NULL | Idempotent event identifier |
| `score` | INTEGER | CHECK (0 to 100) | Activity performance score |
| `accuracy` | INTEGER | CHECK (0 to 100) | Interaction accuracy |
| `response_ms` | INTEGER | NOT NULL | Response latency in ms |
| `attempts` | INTEGER | NOT NULL DEFAULT 1 | Total attempts |
| `assistance_used`| VARCHAR(255)| | Hints or audio repeats used |
| `completion_status`| VARCHAR(32)| CHECK in (COMPLETED, PAUSED_BY_USER, ABORTED) | Status |

### Table: `sync_queue` (Outbox Pattern)
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PRIMARY KEY | Outbox entry ID |
| `event_id` | VARCHAR(128) | UNIQUE, NOT NULL | Idempotent event identifier |
| `entity_type`| VARCHAR(64) | NOT NULL | Entity (e.g. GAME_SESSION) |
| `payload` | JSONB | NOT NULL | Event data payload |
| `attempts` | INTEGER | DEFAULT 0 | Retry attempt counter |
| `sync_state` | VARCHAR(32) | CHECK in (PENDING, SYNCING, SYNCED, FAILED) | Outbox sync state |
