import { useEffect, useRef } from 'react';
import type { ClickFeedbackData } from '../../types/game';

interface Props {
  feedback: ClickFeedbackData;
  panelWidth: number;
  panelHeight: number;
  onDone: () => void;
}

export function ClickFeedback({ feedback, panelWidth, panelHeight, onDone }: Props) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(onDone, 700);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [feedback.id, onDone]);

  const left = feedback.x * panelWidth;
  const top = feedback.y * panelHeight;
  const isCorrect = feedback.type === 'correct';

  return (
    <div
      className={`click-feedback ${isCorrect ? 'click-feedback--correct' : 'click-feedback--wrong'}`}
      style={{
        position: 'absolute',
        left,
        top,
        width: 60,
        height: 60,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }}
    />
  );
}
