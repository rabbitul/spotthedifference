import { useReducer } from 'react';
import type { GameState, GameAction } from '../types/game';
import { LEVELS } from '../data/levels';

const initialState: GameState = {
  screen: 'start',
  levelIndex: 0,
  foundIds: [],
  hintsUsed: 0,
  timeRemaining: LEVELS[0].timeLimit,
  clickFeedback: null,
  hintActiveId: null,
  finished: false,
};

let feedbackCounter = 0;

function reducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME': {
      const level = LEVELS[action.levelIndex];
      return {
        ...initialState,
        screen: 'game',
        levelIndex: action.levelIndex,
        timeRemaining: level.timeLimit,
      };
    }
    case 'CLICK_CORRECT': {
      const next = [...state.foundIds, action.diffId];
      const level = LEVELS[state.levelIndex];
      if (next.length >= level.differences.length) {
        return { ...state, foundIds: next, finished: true, screen: 'end', clickFeedback: null };
      }
      return { ...state, foundIds: next };
    }
    case 'CLICK_WRONG':
      return {
        ...state,
        clickFeedback: { x: action.x, y: action.y, type: 'wrong', id: ++feedbackCounter },
      };
    case 'USE_HINT':
      return { ...state, hintsUsed: state.hintsUsed + 1, hintActiveId: action.diffId };
    case 'CLEAR_HINT':
      return { ...state, hintActiveId: null };
    case 'CLEAR_FEEDBACK':
      return { ...state, clickFeedback: null };
    case 'TICK': {
      const newTime = state.timeRemaining - 1;
      if (newTime <= 0) {
        return { ...state, timeRemaining: 0, screen: 'end', finished: false };
      }
      return { ...state, timeRemaining: newTime };
    }
    case 'LEVEL_COMPLETE':
      return { ...state, screen: 'end', finished: true };
    case 'GO_TO_MENU':
      return { ...initialState };
    default:
      return state;
  }
}

export function useGameState() {
  return useReducer(reducer, initialState);
}
