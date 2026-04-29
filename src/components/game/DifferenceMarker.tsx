import type { DifferenceZone } from '../../types/game';

interface Props {
  diff: DifferenceZone;
  panelWidth: number;
  panelHeight: number;
}

export function DifferenceMarker({ diff, panelWidth, panelHeight }: Props) {
  const left = diff.cx * panelWidth;
  const top = diff.cy * panelHeight;
  const diameter = diff.r * 2 * panelWidth;

  return (
    <div
      className="difference-marker"
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
