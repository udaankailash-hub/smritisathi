# MementoCare AI — Cognitive Games Data Model & Entities

## 1. Relational Entities (PostgreSQL / Supabase)

### Table: `games`
```sql
CREATE TABLE games (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type VARCHAR(64) NOT NULL UNIQUE,
    domain VARCHAR(64) NOT NULL,
    difficulty VARCHAR(16) NOT NULL DEFAULT 'easy',
    template_json JSONB,
    version VARCHAR(16) NOT NULL DEFAULT '1.0.0',
    active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### Table: `game_sessions` (Immutable Events)
```sql
CREATE TABLE game_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    game_id UUID NOT NULL REFERENCES games(id) ON DELETE CASCADE,
    event_id VARCHAR(128) UNIQUE NOT NULL,
    difficulty VARCHAR(16) NOT NULL DEFAULT 'easy',
    score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
    accuracy INTEGER NOT NULL CHECK (accuracy >= 0 AND accuracy <= 100),
    response_ms INTEGER NOT NULL CHECK (response_ms >= 0),
    attempts INTEGER NOT NULL DEFAULT 1 CHECK (attempts >= 1),
    correct_answers INTEGER DEFAULT 1,
    incorrect_answers INTEGER DEFAULT 0,
    hints_used INTEGER DEFAULT 0,
    repeat_instruction_count INTEGER DEFAULT 0,
    help_used BOOLEAN DEFAULT false,
    assistance_used VARCHAR(255),
    completion_status VARCHAR(32) NOT NULL DEFAULT 'COMPLETED' CHECK (completion_status IN ('COMPLETED', 'PAUSED_BY_USER', 'ABORTED')),
    offline_created BOOLEAN DEFAULT false,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### Table: `game_answers` (Optional Granular Question Telemetry)
```sql
CREATE TABLE game_answers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES game_sessions(id) ON DELETE CASCADE,
    question_index INTEGER NOT NULL,
    selected_answer TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL,
    response_time_ms INTEGER NOT NULL,
    assistance_used VARCHAR(64),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### Table: `sync_queue` (Outbox Queue)
```sql
CREATE TABLE sync_queue (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id VARCHAR(128) UNIQUE NOT NULL,
    entity_type VARCHAR(64) NOT NULL,
    payload JSONB NOT NULL,
    attempt_count INTEGER NOT NULL DEFAULT 0,
    sync_state VARCHAR(32) NOT NULL DEFAULT 'PENDING' CHECK (sync_state IN ('PENDING', 'SYNCING', 'SYNCED', 'FAILED')),
    last_error TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```
