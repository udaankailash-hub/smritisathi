import { SupportedLanguage } from '../types';

export type MemoryCategory =
  | 'PEOPLE'
  | 'PLACES'
  | 'EVENTS'
  | 'OBJECTS'
  | 'PREFERENCES'
  | 'DAILY_ROUTINE';

export type MemorySubcategory =
  | 'Family'
  | 'Friends'
  | 'Trusted contacts'
  | 'Home'
  | 'Village'
  | 'School'
  | 'Workplace'
  | 'Familiar routes'
  | 'Festivals'
  | 'Weddings'
  | 'Milestones'
  | 'Community events'
  | 'Household objects'
  | 'Tools'
  | 'Clothing'
  | 'Personal belongings'
  | 'Food'
  | 'Music'
  | 'Hobbies'
  | 'Activities'
  | 'Morning'
  | 'Afternoon'
  | 'Evening';

export type MemoryApprovalStatus = 'DRAFT' | 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED';
export type ConsentStatus = 'PENDING' | 'APPROVED' | 'PAUSED' | 'WITHDRAWN';

export interface BoundedActivityDraft {
  activityType: 'RECOGNITION' | 'MULTIPLE_CHOICE_RECALL' | 'ORDERING' | 'REMINISCENCE_PROMPT';
  question: string;
  options: string[];
  correctAnswer: string;
  hint: string;
  spokenPrompt: string;
  difficulty: number; // 1 (easy), 2 (medium), 3 (hard)
}

export interface PersonalMemoryNode {
  id: string;
  patientId: string;
  category: MemoryCategory;
  subcategory: MemorySubcategory;
  humanLabel: string;
  description: string;
  language: SupportedLanguage;
  assetPath: string; // Private storage or sample asset URL
  source: 'CAREGIVER_UPLOAD' | 'FAMILY_ARCHIVE' | 'CLINICIAN_ENTRY';
  owner: string; // Caregiver Name
  consentStatus: ConsentStatus;
  approvalStatus: MemoryApprovalStatus;
  confidence: number; // 1.0 for human-approved
  reviewStatus: 'NEEDS_REVIEW' | 'REVIEWED_OK' | 'ARCHIVED';
  activityDraft?: BoundedActivityDraft;
  approvedAt?: string;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = 'mementocare_personal_memories';

// Seeded approved memories for Demo Persona: Abeni
export const SEED_MEMORIES_ABENI: PersonalMemoryNode[] = [
  {
    id: 'mem_abeni_01',
    patientId: 'p_abeni_01',
    category: 'PEOPLE',
    subcategory: 'Family',
    humanLabel: 'Daughter Priyanka with Assam Tea',
    description: 'Priyanka sitting on the sunny veranda sharing morning green tea and warm smiles.',
    language: 'en',
    assetPath: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80',
    source: 'CAREGIVER_UPLOAD',
    owner: 'Priyanka (Daughter)',
    consentStatus: 'APPROVED',
    approvalStatus: 'APPROVED',
    confidence: 1.0,
    reviewStatus: 'REVIEWED_OK',
    activityDraft: {
      activityType: 'RECOGNITION',
      question: 'Who is sharing warm Assam morning tea with you on the veranda?',
      options: ['Your Daughter Priyanka', 'Your Doctor Ananya', 'Your Niece Rumi', 'Your Neighbor Mina'],
      correctAnswer: 'Your Daughter Priyanka',
      hint: 'She comes over every morning with fresh garden tea leaves.',
      spokenPrompt: 'Abeni, look at this warm photo. Who is smiling with you?',
      difficulty: 1,
    },
    approvedAt: '2026-08-01T08:00:00Z',
    createdAt: '2026-08-01T07:30:00Z',
    updatedAt: '2026-08-01T08:00:00Z',
  },
  {
    id: 'mem_abeni_02',
    patientId: 'p_abeni_01',
    category: 'PLACES',
    subcategory: 'Home',
    humanLabel: 'Guwahati Veranda & Garden',
    description: 'The ancestral garden in Guwahati with orchid blooms and Assam tea bushes planted in 1984.',
    language: 'en',
    assetPath: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80',
    source: 'CAREGIVER_UPLOAD',
    owner: 'Priyanka (Daughter)',
    consentStatus: 'APPROVED',
    approvalStatus: 'APPROVED',
    confidence: 1.0,
    reviewStatus: 'REVIEWED_OK',
    activityDraft: {
      activityType: 'MULTIPLE_CHOICE_RECALL',
      question: 'Where is this peaceful garden where you planted orchids?',
      options: ['Silpukhuri Home, Guwahati', 'Shillong Peak', 'Kaziranga Forest', 'Dibrugarh Estate'],
      correctAnswer: 'Silpukhuri Home, Guwahati',
      hint: 'It is your family home garden near the lake.',
      spokenPrompt: 'Where is this peaceful home garden where the morning birds sing?',
      difficulty: 1,
    },
    approvedAt: '2026-08-05T09:00:00Z',
    createdAt: '2026-08-05T08:45:00Z',
    updatedAt: '2026-08-05T09:00:00Z',
  },
  {
    id: 'mem_abeni_03',
    patientId: 'p_abeni_01',
    category: 'EVENTS',
    subcategory: 'Festivals',
    humanLabel: 'Rongali Bihu Spring Celebration',
    description: 'Traditional Bihu family gathering wearing muga silk gamosa and sharing pitha sweets.',
    language: 'en',
    assetPath: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=800&auto=format&fit=crop&q=80',
    source: 'CAREGIVER_UPLOAD',
    owner: 'Priyanka (Daughter)',
    consentStatus: 'APPROVED',
    approvalStatus: 'APPROVED',
    confidence: 1.0,
    reviewStatus: 'REVIEWED_OK',
    activityDraft: {
      activityType: 'RECOGNITION',
      question: 'Which joyous spring festival was celebrated in this family photo?',
      options: ['Rongali Bihu Festival', 'Autumn Durga Puja', 'Diwali Festival of Lights', 'New Year Feast'],
      correctAnswer: 'Rongali Bihu Festival',
      hint: 'The springtime festival where dhol drums and muga gamosas are shared.',
      spokenPrompt: 'Which spring festival brought the family together with pitha sweets?',
      difficulty: 1,
    },
    approvedAt: '2026-08-10T10:00:00Z',
    createdAt: '2026-08-10T09:30:00Z',
    updatedAt: '2026-08-10T10:00:00Z',
  },
  {
    id: 'mem_abeni_04',
    patientId: 'p_abeni_01',
    category: 'OBJECTS',
    subcategory: 'Household objects',
    humanLabel: 'Brass Assam Tea Kettle & Cups',
    description: 'Cherished heirloom brass tea kettle used for brewing morning CTC Assam tea.',
    language: 'en',
    assetPath: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&auto=format&fit=crop&q=80',
    source: 'CAREGIVER_UPLOAD',
    owner: 'Priyanka (Daughter)',
    consentStatus: 'APPROVED',
    approvalStatus: 'APPROVED',
    confidence: 1.0,
    reviewStatus: 'REVIEWED_OK',
    activityDraft: {
      activityType: 'RECOGNITION',
      question: 'What is this cherished brass heirloom on the kitchen counter?',
      options: ['Brass Assam Tea Kettle', 'Ceramic Rice Bowl', 'Bamboo Fan', 'Weaving Shuttle'],
      correctAnswer: 'Brass Assam Tea Kettle',
      hint: 'Used every morning for your hot CTC Assam tea.',
      spokenPrompt: 'What traditional kitchen tool is this used for morning tea?',
      difficulty: 1,
    },
    approvedAt: '2026-08-15T11:00:00Z',
    createdAt: '2026-08-15T10:30:00Z',
    updatedAt: '2026-08-15T11:00:00Z',
  },
  {
    id: 'mem_abeni_05',
    patientId: 'p_abeni_01',
    category: 'DAILY_ROUTINE',
    subcategory: 'Morning',
    humanLabel: 'Morning Garden Walk & Water',
    description: 'Walking gently across the garden path at 7:30 AM and drinking a warm glass of water.',
    language: 'en',
    assetPath: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
    source: 'CAREGIVER_UPLOAD',
    owner: 'Priyanka (Daughter)',
    consentStatus: 'APPROVED',
    approvalStatus: 'APPROVED',
    confidence: 1.0,
    reviewStatus: 'REVIEWED_OK',
    activityDraft: {
      activityType: 'ORDERING',
      question: 'What is your relaxing morning routine after waking up?',
      options: ['Drink warm water, then walk in the garden', 'Go to market first', 'Cook dinner', 'Read late at night'],
      correctAnswer: 'Drink warm water, then walk in the garden',
      hint: 'Starting the day refreshed with hydration and garden air.',
      spokenPrompt: 'What pleasant routine do you enjoy first thing in the morning?',
      difficulty: 1,
    },
    approvedAt: '2026-08-20T08:00:00Z',
    createdAt: '2026-08-20T07:30:00Z',
    updatedAt: '2026-08-20T08:00:00Z',
  }
];

class MemoryGraphService {
  private listeners: Array<() => void> = [];

  constructor() {
    if (typeof window !== 'undefined') {
      const existing = localStorage.getItem(STORAGE_KEY);
      if (!existing) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_MEMORIES_ABENI));
      }
    }
  }

  public subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }

  public getAllMemories(): PersonalMemoryNode[] {
    if (typeof window === 'undefined') return SEED_MEMORIES_ABENI;
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : SEED_MEMORIES_ABENI;
    } catch {
      return SEED_MEMORIES_ABENI;
    }
  }

  public getApprovedMemories(patientId: string): PersonalMemoryNode[] {
    return this.getAllMemories().filter(
      (m) => (m.patientId === patientId || m.patientId === 'p_abeni_01' || m.patientId === 'p_dhiren_01') &&
             m.approvalStatus === 'APPROVED' &&
             m.consentStatus === 'APPROVED'
    );
  }

  public getPendingMemories(patientId: string): PersonalMemoryNode[] {
    return this.getAllMemories().filter(
      (m) => (m.patientId === patientId || m.patientId === 'p_abeni_01' || m.patientId === 'p_dhiren_01') &&
             m.approvalStatus === 'PENDING_REVIEW'
    );
  }

  /**
   * Bounded AI Activity Draft Generator
   * STRICT SAFETY BOUNDARY: Uses only caregiver-provided label and subcategory.
   * NEVER infers identities, relationships, emotions, or sensitive facts.
   */
  public generateBoundedDraft(
    category: MemoryCategory,
    subcategory: MemorySubcategory,
    humanLabel: string,
    description: string,
    language: SupportedLanguage = 'en'
  ): BoundedActivityDraft {
    let question = `Do you recognize this ${subcategory.toLowerCase()}?`;
    let hint = `Associated with: ${humanLabel}`;
    let spokenPrompt = `Look closely at this familiar memory: ${humanLabel}.`;

    if (category === 'PEOPLE') {
      question = `Who is shown in this photo with ${humanLabel}?`;
      hint = `This is someone close to you: ${humanLabel}`;
      spokenPrompt = `Take a gentle look. Do you recognize ${humanLabel}?`;
    } else if (category === 'PLACES') {
      question = `Where was this photo taken (${humanLabel})?`;
      hint = `A cherished place in your memory: ${humanLabel}`;
      spokenPrompt = `Look at this place. Where is ${humanLabel}?`;
    } else if (category === 'EVENTS') {
      question = `Which special occasion was celebrated (${humanLabel})?`;
      hint = `A festive gathering: ${humanLabel}`;
      spokenPrompt = `Remember this joyous day: ${humanLabel}.`;
    } else if (category === 'OBJECTS') {
      question = `What familiar item is shown here (${humanLabel})?`;
      hint = `An everyday item you know well: ${humanLabel}`;
      spokenPrompt = `What is this object you know so well?`;
    } else if (category === 'DAILY_ROUTINE') {
      question = `When do you typically enjoy this routine (${humanLabel})?`;
      hint = `Part of your daily rhythm: ${humanLabel}`;
      spokenPrompt = `When do you enjoy this daily activity?`;
    }

    const distractors = this.generateSafeDistractors(category, humanLabel);
    const options = [humanLabel, ...distractors].sort(() => 0.5 - Math.random());

    return {
      activityType: category === 'DAILY_ROUTINE' ? 'ORDERING' : 'RECOGNITION',
      question,
      options,
      correctAnswer: humanLabel,
      hint,
      spokenPrompt,
      difficulty: 1,
    };
  }

  private generateSafeDistractors(category: MemoryCategory, correctLabel: string): string[] {
    const pools: Record<MemoryCategory, string[]> = {
      PEOPLE: ['Family Friend', 'Community Neighbor', 'Visiting Relative', 'Healthcare Assistant'],
      PLACES: ['Shillong Hillside', 'Guwahati Garden', 'Kaziranga Meadow', 'Brahmaputra Riverside'],
      EVENTS: ['Spring Bihu Gathering', 'Autumn Harvest Fair', 'Family Tea Gathering', 'Anniversary Celebration'],
      OBJECTS: ['Traditional Brass Kettle', 'Bamboo Hand Fan', 'Handwoven Gamosa', 'Reading Spectacles'],
      PREFERENCES: ['Morning Green Tea', 'Classical Flute Music', 'Gardening Orchids', 'Evening Walk'],
      DAILY_ROUTINE: ['Morning Garden Walk', 'Afternoon Resting Hour', 'Evening Family Tea', 'Bedtime Reading'],
    };

    const pool = pools[category] || pools.OBJECTS;
    return pool.filter((item) => item.toLowerCase() !== correctLabel.toLowerCase()).slice(0, 3);
  }

  /**
   * Caregiver Adds Memory (creates DRAFT / PENDING_REVIEW)
   */
  public addMemory(
    patientId: string,
    category: MemoryCategory,
    subcategory: MemorySubcategory,
    humanLabel: string,
    description: string,
    assetPath: string,
    owner: string,
    language: SupportedLanguage = 'en'
  ): PersonalMemoryNode {
    const draft = this.generateBoundedDraft(category, subcategory, humanLabel, description, language);
    const newNode: PersonalMemoryNode = {
      id: `mem_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      patientId,
      category,
      subcategory,
      humanLabel,
      description,
      language,
      assetPath: assetPath || 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&auto=format&fit=crop&q=80',
      source: 'CAREGIVER_UPLOAD',
      owner,
      consentStatus: 'APPROVED',
      approvalStatus: 'PENDING_REVIEW', // DRAFT -> PENDING_REVIEW -> APPROVED
      confidence: 1.0,
      reviewStatus: 'NEEDS_REVIEW',
      activityDraft: draft,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const memories = this.getAllMemories();
    memories.unshift(newNode);
    this.saveMemories(memories);
    return newNode;
  }

  public approveMemory(memoryId: string): boolean {
    const memories = this.getAllMemories();
    const index = memories.findIndex((m) => m.id === memoryId);
    if (index !== -1) {
      memories[index].approvalStatus = 'APPROVED';
      memories[index].reviewStatus = 'REVIEWED_OK';
      memories[index].approvedAt = new Date().toISOString();
      memories[index].updatedAt = new Date().toISOString();
      this.saveMemories(memories);
      return true;
    }
    return false;
  }

  public rejectMemory(memoryId: string): boolean {
    const memories = this.getAllMemories();
    const index = memories.findIndex((m) => m.id === memoryId);
    if (index !== -1) {
      memories[index].approvalStatus = 'REJECTED';
      memories[index].reviewStatus = 'ARCHIVED';
      memories[index].updatedAt = new Date().toISOString();
      this.saveMemories(memories);
      return true;
    }
    return false;
  }

  public deleteMemory(memoryId: string): boolean {
    let memories = this.getAllMemories();
    const beforeCount = memories.length;
    memories = memories.filter((m) => m.id !== memoryId);
    if (memories.length < beforeCount) {
      this.saveMemories(memories);
      return true;
    }
    return false;
  }

  private saveMemories(memories: PersonalMemoryNode[]) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(memories));
    }
    this.notify();
  }
}

export const memoryGraphService = new MemoryGraphService();
