export interface DifferenceZone {
  id: string;
  cx: number;
  cy: number;
  r: number;
  label: string;
}

export type Category = 'sports' | 'nature' | 'space' | 'celebrities' | 'anime' | 'fantasy';
export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Level {
  id: number;
  title: string;
  description: string;
  category: Category;
  difficulty: Difficulty;
  emoji: string;
  popular?: boolean;
  timeLimit: number;
  maxHints: number;
  differences: DifferenceZone[];
  OriginalScene: React.FC;
  ModifiedScene: React.FC;
}

export type ClickResult = 'correct' | 'wrong' | 'already-found';

export interface ClickFeedbackData {
  x: number;
  y: number;
  type: ClickResult;
  id: number;
}

export interface GameState {
  screen: 'start' | 'game' | 'end';
  levelIndex: number;
  foundIds: string[];
  hintsUsed: number;
  timeRemaining: number;
  clickFeedback: ClickFeedbackData | null;
  hintActiveId: string | null;
  finished: boolean;
}

export type GameAction =
  | { type: 'START_GAME'; levelIndex: number }
  | { type: 'CLICK_CORRECT'; diffId: string }
  | { type: 'CLICK_WRONG'; x: number; y: number }
  | { type: 'USE_HINT'; diffId: string }
  | { type: 'CLEAR_HINT' }
  | { type: 'CLEAR_FEEDBACK' }
  | { type: 'TICK' }
  | { type: 'LEVEL_COMPLETE' }
  | { type: 'GO_TO_MENU' };

export interface HighScoreEntry {
  score: number;
  date: string;
}
