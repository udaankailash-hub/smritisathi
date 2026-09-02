-- =============================================================================
-- MEMENTOCARE AI — SIH 2026 SIH26003
-- PostgreSQL / Supabase Schema Definition & Row Level Security (RLS)
-- =============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    role VARCHAR(32) NOT NULL CHECK (role IN ('PATIENT', 'CAREGIVER', 'HEALTHCARE_WORKER', 'ADMIN')),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(32),
    language VARCHAR(16) NOT NULL DEFAULT 'en',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. PATIENTS TABLE
CREATE TABLE IF NOT EXISTS patients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    preferred_language VARCHAR(16) NOT NULL DEFAULT 'en',
    difficulty_level VARCHAR(16) NOT NULL DEFAULT 'easy' CHECK (difficulty_level IN ('easy', 'medium', 'hard')),
    consent_state VARCHAR(32) NOT NULL DEFAULT 'APPROVED' CHECK (consent_state IN ('PENDING', 'APPROVED', 'PAUSED', 'WITHDRAWN')),
    age INTEGER NOT NULL DEFAULT 72,
    gender VARCHAR(16) DEFAULT 'female',
    location VARCHAR(255) DEFAULT 'Guwahati, Assam',
    battery_level INTEGER DEFAULT 85,
    is_device_online BOOLEAN DEFAULT true,
    last_synced_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. CAREGIVERS TABLE
CREATE TABLE IF NOT EXISTS caregivers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    permission_scope VARCHAR(64) NOT NULL DEFAULT 'FULL_SUPPORT' CHECK (permission_scope IN ('FULL_SUPPORT', 'READ_ONLY', 'EMERGENCY_ONLY')),
    relationship VARCHAR(64) DEFAULT 'Daughter',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, patient_id)
);

-- 4. HEALTHCARE WORKERS TABLE
CREATE TABLE IF NOT EXISTS healthcare_workers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    organisation VARCHAR(255) NOT NULL DEFAULT 'Gauhati Medical College & Hospital (GMCH)',
    authorisation_state VARCHAR(32) NOT NULL DEFAULT 'AUTHORISED' CHECK (authorisation_state IN ('PENDING', 'AUTHORISED', 'REVOKED')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- HEALTHCARE WORKER PATIENT ASSIGNMENTS (Strict RLS Linking)
CREATE TABLE IF NOT EXISTS healthcare_patient_access (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    healthcare_worker_id UUID NOT NULL REFERENCES healthcare_workers(id) ON DELETE CASCADE,
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    granted_by UUID REFERENCES users(id),
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(healthcare_worker_id, patient_id)
);

-- 5. GAMES TABLE
CREATE TABLE IF NOT EXISTS games (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type VARCHAR(64) NOT NULL,
    domain VARCHAR(64) NOT NULL CHECK (domain IN ('MEMORY', 'ATTENTION', 'PATTERN', 'DAILY_RECALL', 'OBJECT_RECOGNITION', 'SOUND_RECOGNITION', 'FAMILY_MEMORY', 'STORY_MODE')),
    difficulty VARCHAR(16) NOT NULL DEFAULT 'easy' CHECK (difficulty IN ('easy', 'medium', 'hard')),
    template_json JSONB NOT NULL DEFAULT '{}'::jsonb,
    version VARCHAR(32) NOT NULL DEFAULT '1.0.0',
    active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. GAME SESSIONS TABLE (Immutable Events)
CREATE TABLE IF NOT EXISTS game_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    game_id UUID REFERENCES games(id),
    event_id VARCHAR(128) NOT NULL UNIQUE,
    score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
    accuracy INTEGER NOT NULL CHECK (accuracy >= 0 AND accuracy <= 100),
    response_ms INTEGER NOT NULL DEFAULT 1500,
    attempts INTEGER NOT NULL DEFAULT 1,
    assistance_used VARCHAR(255) DEFAULT 'None',
    completion_status VARCHAR(32) NOT NULL DEFAULT 'COMPLETED' CHECK (completion_status IN ('COMPLETED', 'PAUSED_BY_USER', 'ABORTED')),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. COGNITIVE METRICS TABLE (Longitudinal Engagement Summaries - Non-Diagnostic)
CREATE TABLE IF NOT EXISTS cognitive_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    domain VARCHAR(64) NOT NULL,
    period_start TIMESTAMPTZ NOT NULL,
    period_end TIMESTAMPTZ NOT NULL,
    engagement_summary JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. REMINDERS TABLE (Local & Caregiver Managed - No Autonomous AI Medication)
CREATE TABLE IF NOT EXISTS reminders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    type VARCHAR(32) NOT NULL CHECK (type IN ('MEDICINE', 'HYDRATION', 'DAILY_ROUTINE', 'APPOINTMENT', 'FAMILY_CALL', 'COGNITIVE_GAME')),
    schedule VARCHAR(64) NOT NULL DEFAULT '08:00 AM',
    label VARCHAR(255) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT true,
    status VARCHAR(32) NOT NULL DEFAULT 'UPCOMING' CHECK (status IN ('UPCOMING', 'COMPLETED', 'SNOOZED', 'MISSED')),
    completed_at TIMESTAMPTZ,
    created_by UUID REFERENCES users(id),
    approved_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. MEMORIES TABLE (Personal Memory Graph Nodes)
CREATE TABLE IF NOT EXISTS memories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    category VARCHAR(32) NOT NULL CHECK (category IN ('PEOPLE', 'PLACES', 'EVENTS', 'OBJECTS', 'PREFERENCES', 'DAILY_ROUTINE')),
    subcategory VARCHAR(64) NOT NULL,
    asset_path VARCHAR(1024) NOT NULL,
    human_label VARCHAR(255) NOT NULL,
    language VARCHAR(16) NOT NULL DEFAULT 'en',
    approval_state VARCHAR(32) NOT NULL DEFAULT 'PENDING_REVIEW' CHECK (approval_state IN ('DRAFT', 'PENDING_REVIEW', 'APPROVED', 'REJECTED')),
    consent_state VARCHAR(32) NOT NULL DEFAULT 'APPROVED' CHECK (consent_state IN ('PENDING', 'APPROVED', 'PAUSED', 'WITHDRAWN')),
    source VARCHAR(64) NOT NULL DEFAULT 'CAREGIVER_UPLOAD',
    activity_draft_json JSONB DEFAULT '{}'::jsonb,
    approved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. MEMORY ENTITIES TABLE
CREATE TABLE IF NOT EXISTS memory_entities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    memory_id UUID NOT NULL REFERENCES memories(id) ON DELETE CASCADE,
    entity_type VARCHAR(64) NOT NULL,
    label VARCHAR(255) NOT NULL,
    source VARCHAR(64) NOT NULL DEFAULT 'HUMAN_ENTERED',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. ALERTS TABLE (Review Prompts in UI)
CREATE TABLE IF NOT EXISTS alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    type VARCHAR(64) NOT NULL,
    severity VARCHAR(16) NOT NULL DEFAULT 'low' CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    reason_code VARCHAR(64) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'UNREAD' CHECK (status IN ('UNREAD', 'ACKNOWLEDGED', 'RESOLVED', 'DISMISSED')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    acknowledged_at TIMESTAMPTZ,
    resolved_at TIMESTAMPTZ,
    resolved_by UUID REFERENCES users(id)
);

-- 12. SYNC QUEUE TABLE (Outbox Pattern)
CREATE TABLE IF NOT EXISTS sync_queue (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id VARCHAR(128) NOT NULL UNIQUE,
    entity_type VARCHAR(64) NOT NULL,
    payload JSONB NOT NULL,
    attempts INTEGER NOT NULL DEFAULT 0,
    sync_state VARCHAR(32) NOT NULL DEFAULT 'PENDING' CHECK (sync_state IN ('PENDING', 'SYNCING', 'SYNCED', 'FAILED')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 13. AUDIT LOGS TABLE (Immutable Trail)
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_id UUID REFERENCES users(id),
    action VARCHAR(128) NOT NULL,
    resource VARCHAR(128) NOT NULL,
    resource_id VARCHAR(128),
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Create Indexes for High Performance Querying
CREATE INDEX IF NOT EXISTS idx_patients_user_id ON patients(user_id);
CREATE INDEX IF NOT EXISTS idx_caregivers_patient_id ON caregivers(patient_id);
CREATE INDEX IF NOT EXISTS idx_game_sessions_patient ON game_sessions(patient_id);
CREATE INDEX IF NOT EXISTS idx_game_sessions_event ON game_sessions(event_id);
CREATE INDEX IF NOT EXISTS idx_memories_patient ON memories(patient_id);
CREATE INDEX IF NOT EXISTS idx_reminders_patient ON reminders(patient_id);
CREATE INDEX IF NOT EXISTS idx_alerts_patient ON alerts(patient_id);
CREATE INDEX IF NOT EXISTS idx_audit_actor ON audit_logs(actor_id);
