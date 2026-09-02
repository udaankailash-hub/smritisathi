-- =============================================================================
-- MEMENTOCARE AI — ROW LEVEL SECURITY (RLS) POLICIES
-- Strict least-privilege security model
-- =============================================================================

-- Enable RLS across all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE caregivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE healthcare_workers ENABLE ROW LEVEL SECURITY;
ALTER TABLE healthcare_patient_access ENABLE ROW LEVEL SECURITY;
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE cognitive_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE memories ENABLE ROW LEVEL SECURITY;
ALTER TABLE memory_entities ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE sync_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- -----------------------------------------------------------------------------
-- Helper Functions for Role Checking
-- -----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION auth_uid() RETURNS UUID AS $$
    SELECT NULLIF(current_setting('request.jwt.claim.sub', true), '')::uuid;
$$ LANGUAGE SQL STABLE;

CREATE OR REPLACE FUNCTION get_user_role(user_uuid UUID) RETURNS VARCHAR AS $$
    SELECT role FROM users WHERE id = user_uuid;
$$ LANGUAGE SQL STABLE;

-- -----------------------------------------------------------------------------
-- 1. USERS POLICIES
-- -----------------------------------------------------------------------------
CREATE POLICY users_view_own ON users
    FOR SELECT USING (id = auth_uid() OR get_user_role(auth_uid()) = 'ADMIN');

CREATE POLICY users_update_own ON users
    FOR UPDATE USING (id = auth_uid());

-- -----------------------------------------------------------------------------
-- 2. PATIENTS POLICIES
-- Patient can read own; Caregiver can read linked; Healthcare worker can read authorised; Admin can read all.
-- -----------------------------------------------------------------------------
CREATE POLICY patient_self_access ON patients
    FOR SELECT USING (
        user_id = auth_uid()
        OR EXISTS (SELECT 1 FROM caregivers WHERE user_id = auth_uid() AND patient_id = patients.id)
        OR EXISTS (
            SELECT 1 FROM healthcare_workers hw
            JOIN healthcare_patient_access hpa ON hpa.healthcare_worker_id = hw.id
            WHERE hw.user_id = auth_uid() AND hpa.patient_id = patients.id AND hw.authorisation_state = 'AUTHORISED'
        )
        OR get_user_role(auth_uid()) = 'ADMIN'
    );

CREATE POLICY patient_update_policy ON patients
    FOR UPDATE USING (
        user_id = auth_uid()
        OR EXISTS (SELECT 1 FROM caregivers WHERE user_id = auth_uid() AND patient_id = patients.id AND permission_scope = 'FULL_SUPPORT')
        OR get_user_role(auth_uid()) = 'ADMIN'
    );

-- -----------------------------------------------------------------------------
-- 3. CAREGIVERS POLICIES
-- -----------------------------------------------------------------------------
CREATE POLICY caregiver_view_linked ON caregivers
    FOR SELECT USING (
        user_id = auth_uid()
        OR EXISTS (SELECT 1 FROM patients WHERE id = caregivers.patient_id AND user_id = auth_uid())
        OR get_user_role(auth_uid()) = 'ADMIN'
    );

-- -----------------------------------------------------------------------------
-- 4. MEMORIES POLICIES (Personal Memory Graph)
-- Patient can access only own APPROVED memories with APPROVED consent.
-- Caregiver can access, create, edit, and approve own linked patient memories.
-- -----------------------------------------------------------------------------
CREATE POLICY patient_view_approved_memories ON memories
    FOR SELECT USING (
        (EXISTS (SELECT 1 FROM patients WHERE id = memories.patient_id AND user_id = auth_uid())
         AND approval_state = 'APPROVED' AND consent_state = 'APPROVED')
        OR EXISTS (SELECT 1 FROM caregivers WHERE user_id = auth_uid() AND patient_id = memories.patient_id)
        OR get_user_role(auth_uid()) = 'ADMIN'
    );

CREATE POLICY caregiver_manage_memories ON memories
    FOR ALL USING (
        EXISTS (SELECT 1 FROM caregivers WHERE user_id = auth_uid() AND patient_id = memories.patient_id)
        OR get_user_role(auth_uid()) = 'ADMIN'
    );

-- -----------------------------------------------------------------------------
-- 5. GAME SESSIONS POLICIES (Immutable Events)
-- Patient can insert own sessions and view own.
-- Caregiver & Authorised Clinician can view.
-- Sessions cannot be deleted or updated (immutability).
-- -----------------------------------------------------------------------------
CREATE POLICY session_insert_patient ON game_sessions
    FOR INSERT WITH CHECK (
        EXISTS (SELECT 1 FROM patients WHERE id = game_sessions.patient_id AND user_id = auth_uid())
        OR EXISTS (SELECT 1 FROM caregivers WHERE user_id = auth_uid() AND patient_id = game_sessions.patient_id)
        OR get_user_role(auth_uid()) = 'ADMIN'
    );

CREATE POLICY session_view_policy ON game_sessions
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM patients WHERE id = game_sessions.patient_id AND user_id = auth_uid())
        OR EXISTS (SELECT 1 FROM caregivers WHERE user_id = auth_uid() AND patient_id = game_sessions.patient_id)
        OR EXISTS (
            SELECT 1 FROM healthcare_workers hw
            JOIN healthcare_patient_access hpa ON hpa.healthcare_worker_id = hw.id
            WHERE hw.user_id = auth_uid() AND hpa.patient_id = game_sessions.patient_id
        )
        OR get_user_role(auth_uid()) = 'ADMIN'
    );

-- -----------------------------------------------------------------------------
-- 6. REMINDERS POLICIES
-- -----------------------------------------------------------------------------
CREATE POLICY reminders_select_policy ON reminders
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM patients WHERE id = reminders.patient_id AND user_id = auth_uid())
        OR EXISTS (SELECT 1 FROM caregivers WHERE user_id = auth_uid() AND patient_id = reminders.patient_id)
        OR get_user_role(auth_uid()) = 'ADMIN'
    );

CREATE POLICY reminders_update_patient ON reminders
    FOR UPDATE USING (
        EXISTS (SELECT 1 FROM patients WHERE id = reminders.patient_id AND user_id = auth_uid())
        OR EXISTS (SELECT 1 FROM caregivers WHERE user_id = auth_uid() AND patient_id = reminders.patient_id)
    );

CREATE POLICY reminders_insert_caregiver ON reminders
    FOR INSERT WITH CHECK (
        EXISTS (SELECT 1 FROM caregivers WHERE user_id = auth_uid() AND patient_id = reminders.patient_id)
        OR get_user_role(auth_uid()) = 'ADMIN'
    );

-- -----------------------------------------------------------------------------
-- 7. ALERTS (Review Prompts) POLICIES
-- -----------------------------------------------------------------------------
CREATE POLICY alerts_view_policy ON alerts
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM caregivers WHERE user_id = auth_uid() AND patient_id = alerts.patient_id)
        OR EXISTS (
            SELECT 1 FROM healthcare_workers hw
            JOIN healthcare_patient_access hpa ON hpa.healthcare_worker_id = hw.id
            WHERE hw.user_id = auth_uid() AND hpa.patient_id = alerts.patient_id
        )
        OR get_user_role(auth_uid()) = 'ADMIN'
    );

CREATE POLICY alerts_update_caregiver ON alerts
    FOR UPDATE USING (
        EXISTS (SELECT 1 FROM caregivers WHERE user_id = auth_uid() AND patient_id = alerts.patient_id)
        OR get_user_role(auth_uid()) = 'ADMIN'
    );

-- -----------------------------------------------------------------------------
-- 8. AUDIT LOGS POLICIES (Append Only / Admin Read-Only)
-- -----------------------------------------------------------------------------
CREATE POLICY audit_insert_all ON audit_logs
    FOR INSERT WITH CHECK (true);

CREATE POLICY audit_select_admin ON audit_logs
    FOR SELECT USING (get_user_role(auth_uid()) = 'ADMIN');
