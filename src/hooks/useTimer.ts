import { useEffect, type Dispatch } from 'react';
import type { GameAction } from '../types/game';

export function useTimer(active: boolean, dispatch: Dispatch<GameAction>) {
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => dispatch({ type: 'TICK' }), 1000);
    return () => clearInterval(id);
  }, [active, dispatch]);
}
