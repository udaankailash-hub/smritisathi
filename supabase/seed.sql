-- =============================================================================
-- MEMENTOCARE AI — SEED DATA
-- Fictional Demo Patient: Abeni (72 yrs old, Guwahati, Assam)
-- =============================================================================

-- 1. USERS
INSERT INTO users (id, role, name, email, phone, language) VALUES
('11111111-1111-1111-1111-111111111111', 'PATIENT', 'Abeni', 'abeni@mementocare.ai', '+91 94350 11111', 'en'),
('22222222-2222-2222-2222-222222222222', 'CAREGIVER', 'Priyanka Borah', 'priyanka.borah@mementocare.ai', '+91 94350 12345', 'en'),
('33333333-3333-3333-3333-333333333333', 'HEALTHCARE_WORKER', 'Dr. Ananya Sharma', 'ananya.sharma@gmch.gov.in', '+91 94350 33333', 'en'),
('44444444-4444-4444-4444-444444444444', 'ADMIN', 'MementoCare System Admin', 'admin@mementocare.ai', '+91 94350 99999', 'en')
ON CONFLICT (id) DO NOTHING;

-- 2. PATIENTS
INSERT INTO patients (id, user_id, preferred_language, difficulty_level, consent_state, age, gender, location, battery_level, is_device_online) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'en', 'easy', 'APPROVED', 72, 'female', 'Guwahati, Assam', 85, true)
ON CONFLICT (id) DO NOTHING;

-- 3. CAREGIVER LINKING
INSERT INTO caregivers (id, user_id, patient_id, permission_scope, relationship) VALUES
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'FULL_SUPPORT', 'Daughter')
ON CONFLICT (id) DO NOTHING;

-- 4. HEALTHCARE WORKER & AUTHORISATION
INSERT INTO healthcare_workers (id, user_id, organisation, authorisation_state) VALUES
('cccccccc-cccc-cccc-cccc-cccccccccccc', '33333333-3333-3333-3333-333333333333', 'Gauhati Medical College & Hospital (GMCH)', 'AUTHORISED')
ON CONFLICT (id) DO NOTHING;

INSERT INTO healthcare_patient_access (id, healthcare_worker_id, patient_id, granted_by) VALUES
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '22222222-2222-2222-2222-222222222222')
ON CONFLICT (id) DO NOTHING;

-- 5. FIVE MVP GAMES
INSERT INTO games (id, type, domain, difficulty, template_json, version, active) VALUES
('g1111111-1111-1111-1111-111111111111', 'game_personal_memory', 'FAMILY_MEMORY', 'easy', '{"title": "Personal Memory Engagement", "target": "Episodic Recall"}'::jsonb, '1.0.0', true),
('g2222222-2222-2222-2222-222222222222', 'game_memory_match', 'MEMORY', 'easy', '{"title": "Memory Cards", "target": "Visual Working Memory"}'::jsonb, '1.0.0', true),
('g3333333-3333-3333-3333-333333333333', 'game_object_recognition', 'OBJECT_RECOGNITION', 'easy', '{"title": "Familiar Object Recognition", "target": "Semantic Memory"}'::jsonb, '1.0.0', true),
('g4444444-4444-4444-4444-444444444444', 'game_pattern_rhythm', 'PATTERN', 'easy', '{"title": "Sequence Memory & Rhythm", "target": "Sequential Processing"}'::jsonb, '1.0.0', true),
('g5555555-5555-5555-5555-555555555555', 'game_daily_routine_recall', 'DAILY_RECALL', 'easy', '{"title": "Daily Routine Story Sequencing", "target": "Temporal Orientation"}'::jsonb, '1.0.0', true)
ON CONFLICT (id) DO NOTHING;

-- 6. APPROVED MEMORIES (Personal Memory Graph)
INSERT INTO memories (id, patient_id, category, subcategory, asset_path, human_label, language, approval_state, consent_state, source, activity_draft_json, approved_at) VALUES
('m1111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'PEOPLE', 'Family', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800', 'Daughter Priyanka with Assam Tea', 'en', 'APPROVED', 'APPROVED', 'CAREGIVER_UPLOAD', '{"question": "Who is sharing warm Assam morning tea with you on the veranda?", "correctAnswer": "Your Daughter Priyanka", "options": ["Your Daughter Priyanka", "Your Doctor Ananya", "Your Niece Rumi", "Your Neighbor Mina"], "hint": "She comes over every morning with fresh garden tea leaves."}'::jsonb, NOW()),
('m2222222-2222-2222-2222-222222222222', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'PLACES', 'Home', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800', 'Guwahati Veranda & Garden', 'en', 'APPROVED', 'APPROVED', 'CAREGIVER_UPLOAD', '{"question": "Where is this peaceful garden where you planted orchids?", "correctAnswer": "Silpukhuri Home, Guwahati", "options": ["Silpukhuri Home, Guwahati", "Shillong Peak", "Kaziranga Forest", "Dibrugarh Estate"], "hint": "It is your family home garden near the lake."}'::jsonb, NOW()),
('m3333333-3333-3333-3333-333333333333', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'EVENTS', 'Festivals', 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=800', 'Rongali Bihu Spring Celebration', 'en', 'APPROVED', 'APPROVED', 'CAREGIVER_UPLOAD', '{"question": "Which joyous spring festival was celebrated in this family photo?", "correctAnswer": "Rongali Bihu Festival", "options": ["Rongali Bihu Festival", "Autumn Durga Puja", "Diwali Festival of Lights", "New Year Feast"], "hint": "The springtime festival where dhol drums and muga gamosas are shared."}'::jsonb, NOW())
ON CONFLICT (id) DO NOTHING;

-- 7. REMINDERS (Local Caregiver-Configured)
INSERT INTO reminders (id, patient_id, type, schedule, label, active, status) VALUES
('r1111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'HYDRATION', '08:00 AM', 'Drink 1 Glass of Warm Water', true, 'COMPLETED'),
('r2222222-2222-2222-2222-222222222222', 'MEDICINE', '08:30 AM', 'Blood Pressure & Heart Health Tablet', true, 'COMPLETED'),
('r3333333-3333-3333-3333-333333333333', 'COGNITIVE_GAME', '10:00 AM', 'Morning Personal Memory Engagement', true, 'UPCOMING'),
('r4444444-4444-4444-4444-444444444444', 'FAMILY_CALL', '05:30 PM', 'Evening Video Call with Daughter Priyanka', true, 'UPCOMING')
ON CONFLICT (id) DO NOTHING;

-- 8. RECENT SESSIONS (Deterministic for 90s Demo)
INSERT INTO game_sessions (id, patient_id, game_id, event_id, score, accuracy, response_ms, attempts, assistance_used, completion_status, notes) VALUES
('s1111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'g1111111-1111-1111-1111-111111111111', 'evt_demo_01', 94, 94, 1850, 1, 'None', 'COMPLETED', 'Personal Memory recall completed with high recognition accuracy and voice interaction.'),
('s2222222-2222-2222-2222-222222222222', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'g2222222-2222-2222-2222-222222222222', 'evt_demo_02', 88, 90, 2100, 2, 'None', 'COMPLETED', 'Memory Cards completed smoothly; steady response time.')
ON CONFLICT (id) DO NOTHING;

-- 9. REVIEW PROMPTS (Non-Diagnostic Alerts with Reason Codes)
INSERT INTO alerts (id, patient_id, type, severity, reason_code, title, description, status) VALUES
('a1111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'ACTIVITY_ENGAGEMENT_CONSISTENCY', 'low', 'ENGAGEMENT_STABLE_POSITIVE', 'Consistent Morning Engagement', 'Patient has completed morning memory activities for 5 consecutive days.', 'UNREAD')
ON CONFLICT (id) DO NOTHING;

-- 10. AUDIT LOG INITIALIZATION
INSERT INTO audit_logs (id, actor_id, action, resource, resource_id, metadata) VALUES
('l1111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'APPROVE_MEMORY', 'memories', 'm1111111-1111-1111-1111-111111111111', '{"approver": "Priyanka Borah", "patient": "Abeni"}'::jsonb)
ON CONFLICT (id) DO NOTHING;
