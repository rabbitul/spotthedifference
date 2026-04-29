import { useState } from 'react';

const key = (levelId: number) => `std_highscore_level_${levelId}`;

export function useHighScore(levelId: number) {
  const [highScore, setHS] = useState<number>(() => {
    const stored = localStorage.getItem(key(levelId));
    return stored ? parseInt(stored, 10) : 0;
  });

  const saveScore = (score: number) => {
    if (score > highScore) {
      localStorage.setItem(key(levelId), String(score));
      setHS(score);
      return true;
    }
    return false;
  };

  return { highScore, saveScore };
}

export function getAllHighScores(levelCount: number): number[] {
  return Array.from({ length: levelCount }, (_, i) => {
    const stored = localStorage.getItem(key(i + 1));
    return stored ? parseInt(stored, 10) : 0;
  });
}
