import type { DifferenceZone } from '../types/game';

const ASPECT = 600 / 800;

export function hitTest(
  nx: number,
  ny: number,
  differences: DifferenceZone[],
  foundIds: string[]
): DifferenceZone | null {
  for (const diff of differences) {
    if (foundIds.includes(diff.id)) continue;
    const dx = nx - diff.cx;
    const dy = (ny - diff.cy) / ASPECT;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist <= diff.r) return diff;
  }
  return null;
}
