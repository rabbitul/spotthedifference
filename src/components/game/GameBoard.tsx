import { useCallback } from 'react';
import type { Level, DifferenceZone } from '../../types/game';
import { ScenePanel } from './ScenePanel';

interface Props {
  level: Level;
  foundIds: string[];
  hintActiveId: string | null;
  onDifferenceFound: (diff: DifferenceZone) => void;
  onWrongClick: () => void;
  onHintExpire: () => void;
}

export function GameBoard({ level, foundIds, hintActiveId, onDifferenceFound, onWrongClick, onHintExpire }: Props) {
  const handlePanelClick = useCallback(
    (_nx: number, _ny: number, hit: DifferenceZone | null) => {
      if (hit) {
        if (!foundIds.includes(hit.id)) onDifferenceFound(hit);
      } else {
        onWrongClick();
      }
    },
    [foundIds, onDifferenceFound, onWrongClick]
  );

  const sharedProps = {
    differences: level.differences,
    foundIds,
    hintActiveId,
    onPanelClick: handlePanelClick,
    onHintExpire,
  };

  return (
    <div className="game-board">
      <ScenePanel Scene={level.OriginalScene} label="Original" {...sharedProps} />
      <ScenePanel Scene={level.ModifiedScene} label="Modified" {...sharedProps} />
    </div>
  );
}
