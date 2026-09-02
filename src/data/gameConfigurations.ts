export interface LevelConfig {
  level: number;
  label: string;
  itemCount: number; // e.g. pairs for memory, options for recognition, steps for routine
  exposureTimeSeconds?: number;
  allowHints: boolean;
  maxHints: number;
  distractorDifficulty?: 'low' | 'medium' | 'high';
}

export interface GameConfig {
  gameId: string;
  gameTitle: string;
  domain: string;
  description: string;
  levels: Record<number, LevelConfig>;
}

export const GAME_CONFIGURATIONS: Record<string, GameConfig> = {
  game_memory_match: {
    gameId: 'game_memory_match',
    gameTitle: 'Memory Cards (Cultural Match)',
    domain: 'MEMORY',
    description: 'Visual matching game designed around short-term memory and recognition.',
    levels: {
      1: { level: 1, label: 'Level 1 (Gentle)', itemCount: 2, exposureTimeSeconds: 4, allowHints: true, maxHints: 3 },
      2: { level: 2, label: 'Level 2 (Comfort)', itemCount: 3, exposureTimeSeconds: 3, allowHints: true, maxHints: 2 },
      3: { level: 3, label: 'Level 3 (Active)', itemCount: 4, exposureTimeSeconds: 2, allowHints: true, maxHints: 1 },
      4: { level: 4, label: 'Level 4 (Challenge)', itemCount: 5, exposureTimeSeconds: 1, allowHints: true, maxHints: 1 },
    },
  },
  game_object_recognition: {
    gameId: 'game_object_recognition',
    gameTitle: 'Familiar Object Recognition',
    domain: 'OBJECT_RECOGNITION',
    description: 'Recognition activity using familiar household and cultural objects with gentle hints.',
    levels: {
      1: { level: 1, label: 'Level 1 (2 Options)', itemCount: 2, allowHints: true, maxHints: 3, distractorDifficulty: 'low' },
      2: { level: 2, label: 'Level 2 (3 Options)', itemCount: 3, allowHints: true, maxHints: 2, distractorDifficulty: 'medium' },
      3: { level: 3, label: 'Level 3 (4 Options)', itemCount: 4, allowHints: true, maxHints: 2, distractorDifficulty: 'medium' },
      4: { level: 4, label: 'Level 4 (5 Options)', itemCount: 5, allowHints: true, maxHints: 1, distractorDifficulty: 'high' },
    },
  },
  game_pattern_rhythm: {
    gameId: 'game_pattern_rhythm',
    gameTitle: 'Sequence Memory & Rhythm',
    domain: 'PATTERN',
    description: 'Sequential working memory engagement with soothing melody and rhythm chime cues.',
    levels: {
      1: { level: 1, label: 'Level 1 (2 Items)', itemCount: 2, allowHints: true, maxHints: 3 },
      2: { level: 2, label: 'Level 2 (3 Items)', itemCount: 3, allowHints: true, maxHints: 2 },
      3: { level: 3, label: 'Level 3 (4 Items)', itemCount: 4, allowHints: true, maxHints: 1 },
      4: { level: 4, label: 'Level 4 (5 Items)', itemCount: 5, allowHints: true, maxHints: 1 },
    },
  },
  game_daily_routine_recall: {
    gameId: 'game_daily_routine_recall',
    gameTitle: 'Daily Routine Story Sequencing',
    domain: 'DAILY_RECALL',
    description: 'Arranging chronological daily steps to maintain temporal orientation and executive routine.',
    levels: {
      1: { level: 1, label: 'Level 1 (2 Steps)', itemCount: 2, allowHints: true, maxHints: 3 },
      2: { level: 2, label: 'Level 2 (3 Steps)', itemCount: 3, allowHints: true, maxHints: 2 },
      3: { level: 3, label: 'Level 3 (4 Steps)', itemCount: 4, allowHints: true, maxHints: 1 },
      4: { level: 4, label: 'Level 4 (5 Steps)', itemCount: 5, allowHints: true, maxHints: 1 },
    },
  },
  game_personal_memory: {
    gameId: 'game_personal_memory',
    gameTitle: 'Personal Memory Engagement (Showcase)',
    domain: 'FAMILY_MEMORY',
    description: 'Engage with private photos of loved ones, familiar places, and caregiver-approved milestones.',
    levels: {
      1: { level: 1, label: 'Level 1 (Gentle 2 Options)', itemCount: 2, allowHints: true, maxHints: 3 },
      2: { level: 2, label: 'Level 2 (Standard 3 Options)', itemCount: 3, allowHints: true, maxHints: 2 },
      3: { level: 3, label: 'Level 3 (Full 4 Options)', itemCount: 4, allowHints: true, maxHints: 1 },
      4: { level: 4, label: 'Level 4 (Multi-Recall)', itemCount: 5, allowHints: true, maxHints: 1 },
    },
  },
};

export function getGameConfig(gameId: string): GameConfig {
  return GAME_CONFIGURATIONS[gameId] || GAME_CONFIGURATIONS.game_memory_match;
}

export function getLevelConfig(gameId: string, level: number = 1): LevelConfig {
  const config = getGameConfig(gameId);
  return config.levels[level] || config.levels[1];
}
