import { useEffect } from 'react';
import type { DifferenceZone } from '../../types/game';

interface Props {
  diff: DifferenceZone;
  panelWidth: number;
  panelHeight: number;
  onExpire: () => void;
}

export function HintHighlight({ diff, panelWidth, panelHeight, onExpire }: Props) {
  useEffect(() => {
    const id = setTimeout(onExpire, 3000);
    return () => clearTimeout(id);
  }, [diff.id, onExpire]);

  const left = diff.cx * panelWidth;
  const top = diff.cy * panelHeight;
  const diameter = diff.r * 2 * panelWidth * 1.4;

  return (
    <div
      className="hint-highlight"
      style={{
        position: 'absolute',
        left,
        top,
        width: diameter,
        height: diameter,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }}
    />
  );
}
