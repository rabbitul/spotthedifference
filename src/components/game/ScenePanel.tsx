import React, { useRef, useCallback, useState, useEffect } from 'react';
import type { DifferenceZone, ClickFeedbackData } from '../../types/game';
import { hitTest } from '../../utils/hitTest';
import { DifferenceMarker } from './DifferenceMarker';
import { ClickFeedback } from './ClickFeedback';
import { HintHighlight } from './HintHighlight';

interface Props {
  Scene: React.FC;
  label: string;
  differences: DifferenceZone[];
  foundIds: string[];
  hintActiveId: string | null;
  onPanelClick: (normX: number, normY: number, hit: DifferenceZone | null) => void;
  onHintExpire: () => void;
}

export function ScenePanel({ Scene, label, differences, foundIds, hintActiveId, onPanelClick, onHintExpire }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 1, h: 1 });
  const [localFeedback, setLocalFeedback] = useState<ClickFeedbackData | null>(null);
  const feedbackCounter = useRef(0);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setDims({ w: el.offsetWidth, h: el.offsetHeight });
    });
    ro.observe(el);
    setDims({ w: el.offsetWidth, h: el.offsetHeight });
    return () => ro.disconnect();
  }, []);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    const hit = hitTest(nx, ny, differences, foundIds);

    setLocalFeedback({
      x: nx, y: ny,
      type: hit ? 'correct' : 'wrong',
      id: ++feedbackCounter.current,
    });
    onPanelClick(nx, ny, hit);
  }, [differences, foundIds, onPanelClick]);

  const hintDiff = hintActiveId ? differences.find(d => d.id === hintActiveId) : null;

  return (
    <div className="scene-panel">
      <div className="scene-panel__label">{label}</div>
      <div ref={wrapperRef} style={{ position: 'relative' }}>
        <div style={{ pointerEvents: 'none' }}>
          <Scene />
        </div>
        {/* Click overlay */}
        <div
          className="scene-panel__overlay"
          onClick={handleClick}
          style={{ position: 'absolute', inset: 0, cursor: 'crosshair', touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
        />
        {/* Found difference markers */}
        {differences.filter(d => foundIds.includes(d.id)).map(d => (
          <DifferenceMarker key={d.id} diff={d} panelWidth={dims.w} panelHeight={dims.h} />
        ))}
        {/* Hint highlight */}
        {hintDiff && !foundIds.includes(hintDiff.id) && (
          <HintHighlight diff={hintDiff} panelWidth={dims.w} panelHeight={dims.h} onExpire={onHintExpire} />
        )}
        {/* Click feedback */}
        {localFeedback && (
          <ClickFeedback
            feedback={localFeedback}
            panelWidth={dims.w}
            panelHeight={dims.h}
            onDone={() => setLocalFeedback(null)}
          />
        )}
      </div>
    </div>
  );
}
