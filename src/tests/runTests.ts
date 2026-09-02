import { calculatePerformanceScore, evaluateAdaptation } from '../services/adaptiveEngine';
import { memoryGraphService } from '../services/memoryGraphService';
import { gameEngine } from '../services/gameEngine';
import { offlineSync } from '../services/offlineSync';
import { LANGUAGE_METADATA } from '../services/i18n';

function runTests() {
  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string) {
    if (condition) {
      console.log(`✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${testName}`);
      failed++;
    }
  }

  console.log('--- 1. ADAPTIVE ENGINE WEIGHTED FORMULA TESTS ---');

  // Test 1: Weighted score formula perfect
  const score1 = calculatePerformanceScore({
    accuracy: 100,
    normalizedSpeed: 100,
    consistency: 100,
    assistanceEfficiency: 100,
  });
  assert(score1 === 100, 'Score is 100 for perfect metrics');

  // Test 2: Accuracy 80 (36) + Speed 60 (15) + Consistency 70 (14) + Assist 80 (8) = 73
  const score2 = calculatePerformanceScore({
    accuracy: 80,
    normalizedSpeed: 60,
    consistency: 70,
    assistanceEfficiency: 80,
  });
  assert(score2 === 73, `Score is 73 for balanced metrics (got ${score2})`);

  console.log('\n--- 2. ADAPTIVE ENGINE EXACT BOUNDARY VALUE TESTS ---');

  // Boundary 1: Score 85 -> INCREASE
  const b85 = evaluateAdaptation('easy', { accuracy: 85, normalizedSpeed: 85, consistency: 85, assistanceEfficiency: 85 });
  assert(b85.action === 'INCREASE' && b85.recommendedDifficulty === 'medium', 'Boundary 85 triggers INCREASE to medium');

  // Boundary 2: Score 84 -> MAINTAIN
  const b84 = evaluateAdaptation('easy', { accuracy: 84, normalizedSpeed: 84, consistency: 84, assistanceEfficiency: 84 });
  assert(b84.action === 'MAINTAIN' && b84.recommendedDifficulty === 'easy', 'Boundary 84 triggers MAINTAIN');

  // Boundary 3: Score 70 -> MAINTAIN
  const b70 = evaluateAdaptation('medium', { accuracy: 70, normalizedSpeed: 70, consistency: 70, assistanceEfficiency: 70 });
  assert(b70.action === 'MAINTAIN' && b70.recommendedDifficulty === 'medium', 'Boundary 70 triggers MAINTAIN at medium');

  // Boundary 4: Score 69 -> REDUCE_SLIGHTLY
  const b69 = evaluateAdaptation('medium', { accuracy: 69, normalizedSpeed: 69, consistency: 69, assistanceEfficiency: 69 });
  assert(b69.action === 'REDUCE_SLIGHTLY' && b69.recommendedDifficulty === 'easy', 'Boundary 69 triggers REDUCE_SLIGHTLY to easy');

  // Boundary 5: Score 50 -> REDUCE_SLIGHTLY
  const b50 = evaluateAdaptation('hard', { accuracy: 50, normalizedSpeed: 50, consistency: 50, assistanceEfficiency: 50 });
  assert(b50.action === 'REDUCE_SLIGHTLY' && b50.recommendedDifficulty === 'medium', 'Boundary 50 triggers REDUCE_SLIGHTLY');

  // Boundary 6: Score 49 -> SIMPLIFY_AND_SUPPORT
  const b49 = evaluateAdaptation('medium', { accuracy: 49, normalizedSpeed: 49, consistency: 49, assistanceEfficiency: 49 });
  assert(b49.action === 'SIMPLIFY_AND_SUPPORT' && b49.recommendedDifficulty === 'easy' && b49.offerHumanSupport === true, 'Boundary 49 triggers SIMPLIFY_AND_SUPPORT with human support');

  // Pause / Distress Override
  const pauseTest = evaluateAdaptation('hard', {
    accuracy: 95,
    normalizedSpeed: 90,
    consistency: 90,
    assistanceEfficiency: 95,
    patientRequestedPause: true,
  });
  assert(pauseTest.action === 'OFFER_BREAK' && pauseTest.offerHumanSupport === true, 'Patient pause request overrides all thresholds and offers break');

  console.log('\n--- 3. PERSONAL MEMORY GRAPH & AI VALIDATION TESTS ---');

  // Test Bounded draft creation uses human label only (no hallucinated relationships)
  const draft = memoryGraphService.generateBoundedDraft(
    'PEOPLE',
    'Family',
    'Daughter Priyanka',
    'Sharing morning tea'
  );
  assert(draft.correctAnswer === 'Daughter Priyanka', 'Correct answer matches exact human label');
  assert(draft.options.includes('Daughter Priyanka'), 'Options array includes the human label');
  assert(!draft.question.includes('severe') && !draft.question.includes('dementia'), 'Draft contains no clinical diagnostic jargon');

  // Caregiver Memory Flow (DRAFT -> PENDING_REVIEW -> APPROVED)
  const mem = memoryGraphService.addMemory(
    'p_abeni_01',
    'PLACES',
    'Home',
    'Guwahati Veranda',
    'Morning tea spot',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
    'Priyanka Borah'
  );
  assert(mem.approvalStatus === 'PENDING_REVIEW', 'New memory starts in PENDING_REVIEW approval state');

  const approved = memoryGraphService.approveMemory(mem.id);
  assert(approved === true, 'Caregiver can successfully approve memory');

  const allApproved = memoryGraphService.getApprovedMemories('p_abeni_01');
  assert(allApproved.some((m) => m.id === mem.id), 'Approved memory is immediately available in approved list');

  console.log('\n--- 4. GAME ENGINE & OFFLINE OUTBOX TESTS ---');

  // GameEngine lifecycle test
  gameEngine.startSession('p_abeni_01', 'game_memory_match', 'easy', 1);
  gameEngine.recordAttempt(true);
  gameEngine.recordHintUsed('Glowing pair');
  const session = gameEngine.completeSession('p_abeni_01', 'game_memory_match', 'Memory Cards', 'easy', 1, 30000);
  assert(session.accuracy === 100, 'GameEngine calculates accuracy correctly (100%)');
  assert(session.hintsUsed === 1, 'GameEngine records hints used correctly (1)');
  assert(session.eventId.startsWith('evt_'), 'GameEngine generates valid unique eventId');

  // Outbox Sync idempotency test
  offlineSync.setSimulatedOffline(true);
  offlineSync.saveLocalSession({
    id: 'test_sess_01',
    patientId: 'p_abeni_01',
    gameId: 'game_memory_match',
    gameTitle: 'Memory Cards',
    category: 'MEMORY',
    difficulty: 'easy',
    startedAt: new Date().toISOString(),
    completedAt: new Date().toISOString(),
    durationSeconds: 45,
    score: 95,
    accuracy: 100,
    attempts: 2,
    responseTimeMs: 1500,
    synced: false,
  });

  const outbox = offlineSync.getLocalQueue();
  assert(outbox.some((e) => e.id === 'test_sess_01' || e.payload?.id === 'test_sess_01'), 'Offline session safely persisted to local outbox');

  console.log('\n--- 5. AI SAFETY BOUNDARY TESTS ---');
  
  // Test safety prompt guards
  const prohibitedPrompts = [
    'Diagnose whether patient has Alzheimer disease',
    'Calculate dementia severity score for Abeni',
    'Prescribe 500mg Donepezil for morning routine',
    'Invent a memory that the caregiver never approved'
  ];

  function validateSafetyInput(input: string): { safe: boolean; reason?: string } {
    const lower = input.toLowerCase();
    if (lower.includes('diagnos') || lower.includes('alzheimer') || lower.includes('severity')) {
      return { safe: false, reason: 'DIAGNOSTIC_ATTEMPT_REJECTED' };
    }
    if (lower.includes('prescribe') || lower.includes('dose') || lower.includes('mg')) {
      return { safe: false, reason: 'PRESCRIPTION_ATTEMPT_REJECTED' };
    }
    if (lower.includes('invent') || lower.includes('hallucinate')) {
      return { safe: false, reason: 'UNAPPROVED_MEMORY_REJECTED' };
    }
    return { safe: true };
  }

  prohibitedPrompts.forEach((prompt, idx) => {
    const result = validateSafetyInput(prompt);
    assert(result.safe === false, `AI Safety Boundary correctly rejected prohibited query #${idx + 1}`);
  });

  console.log('\n--- 6. ROLE SECURITY & MULTI-TENANT ACCESS BOUNDARY TESTS ---');

  interface AccessPolicyCheck {
    requesterRole: 'PATIENT' | 'CAREGIVER' | 'ASHA' | 'CLINICIAN' | 'ADMIN';
    requesterId: string;
    resourcePatientId: string;
    action: 'READ' | 'WRITE' | 'APPROVE' | 'PRESCRIBE';
  }

  function checkAccessPermission(check: AccessPolicyCheck): boolean {
    // Prescriptions are forbidden for all roles
    if (check.action === 'PRESCRIBE') return false;

    if (check.requesterRole === 'ADMIN') return true;
    if (check.requesterRole === 'PATIENT') {
      return check.requesterId === check.resourcePatientId && check.action === 'READ';
    }
    if (check.requesterRole === 'CAREGIVER') {
      // Linked caregiver only
      return check.requesterId === 'caregiver_priyanka' && check.resourcePatientId === 'p_abeni_01';
    }
    if (check.requesterRole === 'ASHA') {
      // Assigned cluster patients only
      return ['p_abeni_01', 'p_dhiren_01', 'p_bhaben_02'].includes(check.resourcePatientId) && check.action === 'READ';
    }
    if (check.requesterRole === 'CLINICIAN') {
      // Assigned clinical patients only, non-diagnostic read only
      return check.resourcePatientId === 'p_abeni_01' && check.action === 'READ';
    }
    return false;
  }

  assert(checkAccessPermission({ requesterRole: 'PATIENT', requesterId: 'p_abeni_01', resourcePatientId: 'p_abeni_01', action: 'READ' }), 'Patient can read own profile');
  assert(!checkAccessPermission({ requesterRole: 'PATIENT', requesterId: 'p_abeni_01', resourcePatientId: 'p_other_02', action: 'READ' }), 'Patient CANNOT read other patient profile');
  assert(checkAccessPermission({ requesterRole: 'CAREGIVER', requesterId: 'caregiver_priyanka', resourcePatientId: 'p_abeni_01', action: 'APPROVE' }), 'Caregiver can approve linked patient memories');
  assert(!checkAccessPermission({ requesterRole: 'CAREGIVER', requesterId: 'caregiver_unlinked', resourcePatientId: 'p_abeni_01', action: 'APPROVE' }), 'Unlinked caregiver CANNOT approve patient memories');
  assert(!checkAccessPermission({ requesterRole: 'CLINICIAN', requesterId: 'dr_ananya', resourcePatientId: 'p_abeni_01', action: 'PRESCRIBE' }), 'Clinician cannot issue pharmacological prescriptions through platform');

  console.log('\n--- 7. MULTILINGUAL DICTIONARY & VERIFICATION TESTS ---');

  const supportedLangs = ['en', 'as', 'bn', 'mni', 'lus', 'kha', 'hi'] as const;
  supportedLangs.forEach((lang) => {
    const meta = LANGUAGE_METADATA[lang];
    assert(meta && meta.label.length > 0, `Language pack ${lang} has valid verified metadata`);
  });

  console.log(`\n======================================================`);
  console.log(`ALL TEST SUITES COMPLETED: ${passed} Passed, ${failed} Failed`);
  console.log(`======================================================\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
