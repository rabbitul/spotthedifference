import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export function Confetti() {
  useEffect(() => {
    const duration = 2500;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#22C55E', '#3B82F6', '#F59E0B', '#EF4444', '#A78BFA'],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#22C55E', '#3B82F6', '#F59E0B', '#EF4444', '#A78BFA'],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  return null;
}
