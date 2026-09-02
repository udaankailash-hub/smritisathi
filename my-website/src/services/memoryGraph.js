/**
 * MementoCare AI - Personal Memory Graph & Human-in-the-Loop Approval Service
 * Pillars: PEOPLE, PLACES, OBJECTS, EVENTS, ROUTINES, PREFERENCES
 */

const DEFAULT_MEMORIES = [
  {
    id: 'mem_01',
    patientId: 'p_abeni_01',
    category: 'PEOPLE',
    title: 'Daughter Priyanka',
    context: 'Sharing morning Assam tea together on the front veranda',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80',
    question: 'Who is sharing morning tea with you here?',
    options: ['Daughter Priyanka', 'Neighbor Rita', 'Sister Moni', 'Friend Maya'],
    correctAnswer: 'Daughter Priyanka',
    approvalStatus: 'APPROVED',
    approvedBy: 'Priyanka Borah',
    approvedAt: '2026-08-31T10:00:00.000Z',
    pillar: 'Family & Loved Ones',
  },
  {
    id: 'mem_02',
    patientId: 'p_abeni_01',
    category: 'PLACES',
    title: 'Guwahati Veranda & Garden',
    context: 'The quiet garden with potted orchids and morning breeze',
    imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&auto=format&fit=crop&q=80',
    question: 'Which familiar corner of our home is this?',
    options: ['Front Veranda & Orchid Garden', 'City Market', 'Railway Station', 'Old Town Hall'],
    correctAnswer: 'Front Veranda & Orchid Garden',
    approvalStatus: 'APPROVED',
    approvedBy: 'Priyanka Borah',
    approvedAt: '2026-08-31T10:30:00.000Z',
    pillar: 'Familiar Spaces',
  },
  {
    id: 'mem_03',
    patientId: 'p_abeni_01',
    category: 'EVENTS',
    title: 'Bihu Celebration Gathering',
    context: 'Spring festival celebration with family in traditional Muga silk',
    imageUrl: 'https://images.unsplash.com/photo-1609137144827-0131102e3b2e?w=600&auto=format&fit=crop&q=80',
    question: 'Which festival celebration were we enjoying together?',
    options: ['Rongali Bihu Gathering', 'New Year Dinner', 'Winter Picnic', 'Temple Visit'],
    correctAnswer: 'Rongali Bihu Gathering',
    approvalStatus: 'APPROVED',
    approvedBy: 'Priyanka Borah',
    approvedAt: '2026-08-31T11:00:00.000Z',
    pillar: 'Cultural Celebrations',
  },
  {
    id: 'mem_04',
    patientId: 'p_abeni_01',
    category: 'OBJECTS',
    title: 'Traditional Bell-Metal Banbati',
    context: 'The brass serving bowl from Sarthebari used for special meals',
    imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=80',
    question: 'What is this special traditional serving bowl called?',
    options: ['Banbati (Bell-Metal Bowl)', 'Clay Pot', 'Glass Cup', 'Steel Plate'],
    correctAnswer: 'Banbati (Bell-Metal Bowl)',
    approvalStatus: 'PENDING_REVIEW', // For Caregiver Approval Demo
    approvedBy: null,
    approvedAt: null,
    pillar: 'Domestic Objects',
  },
];

class MemoryGraphService {
  constructor() {
    this.memories = [...DEFAULT_MEMORIES];
  }

  getMemories(patientId = 'p_abeni_01') {
    return this.memories.filter((m) => m.patientId === patientId);
  }

  getApprovedMemories(patientId = 'p_abeni_01') {
    return this.memories.filter(
      (m) => m.patientId === patientId && m.approvalStatus === 'APPROVED'
    );
  }

  getPendingMemories(patientId = 'p_abeni_01') {
    return this.memories.filter(
      (m) => m.patientId === patientId && m.approvalStatus === 'PENDING_REVIEW'
    );
  }

  addMemory({ patientId = 'p_abeni_01', category, title, context, imageUrl, caregiverName = 'Priyanka Borah' }) {
    const newMemory = {
      id: `mem_${Date.now()}`,
      patientId,
      category,
      title,
      context,
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80',
      question: `Which familiar ${category.toLowerCase()} is shown here?`,
      options: [title, 'City Park', 'Old Market', 'Community Hall'],
      correctAnswer: title,
      approvalStatus: 'PENDING_REVIEW',
      approvedBy: null,
      approvedAt: null,
      pillar: category,
    };
    this.memories.unshift(newMemory);
    return newMemory;
  }

  approveMemory(memoryId, caregiverName = 'Priyanka Borah') {
    const memory = this.memories.find((m) => m.id === memoryId);
    if (memory) {
      memory.approvalStatus = 'APPROVED';
      memory.approvedBy = caregiverName;
      memory.approvedAt = new Date().toISOString();
      return memory;
    }
    return null;
  }
}

export const memoryGraphService = new MemoryGraphService();
