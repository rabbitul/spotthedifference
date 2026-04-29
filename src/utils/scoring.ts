export const BASE_SCORE = 1000;
export const TIME_PENALTY_PER_SEC = 10;
export const HINT_PENALTY = 50;

export function calculateScore(timeLimit: number, timeRemaining: number, hintsUsed: number): number {
  const timeElapsed = timeLimit - timeRemaining;
  const raw = BASE_SCORE - timeElapsed * TIME_PENALTY_PER_SEC - hintsUsed * HINT_PENALTY;
  return Math.max(0, raw);
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}
