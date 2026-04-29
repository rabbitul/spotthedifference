import { useCallback, useEffect, type Dispatch } from 'react';
import type { GameState, GameAction, DifferenceZone } from '../../types/game';
import { LEVELS } from '../../data/levels';
import { useTimer } from '../../hooks/useTimer';
import { calculateScore } from '../../utils/scoring';
import { GameBoard } from '../game/GameBoard';
import { TimerBar } from '../hud/TimerBar';
import { ScoreDisplay } from '../hud/ScoreDisplay';
import { HintButton } from '../hud/HintButton';
import { DifferencesFound } from '../hud/DifferencesFound';
import { Confetti } from '../effects/Confetti';

interface Props {
  state: GameState;
  dispatch: Dispatch<GameAction>;
}

export function GameScreen({ state, dispatch }: Props) {
  const level = LEVELS[state.levelIndex];
  const isActive = state.screen === 'game' && !state.finished && state.timeRemaining > 0;

  useTimer(isActive, dispatch);

  const score = calculateScore(level.timeLimit, state.timeRemaining, state.hintsUsed);

  const handleDifferenceFound = useCallback((diff: DifferenceZone) => {
    dispatch({ type: 'CLICK_CORRECT', diffId: diff.id });
  }, [dispatch]);

  const handleWrongClick = useCallback(() => {}, []);

  const handleHint = useCallback(() => {
    if (state.hintsUsed >= level.maxHints) return;
    const unfound = level.differences.find(d => !state.foundIds.includes(d.id));
    if (unfound) dispatch({ type: 'USE_HINT', diffId: unfound.id });
  }, [dispatch, level, state.foundIds, state.hintsUsed]);

  const handleHintExpire = useCallback(() => {
    dispatch({ type: 'CLEAR_HINT' });
  }, [dispatch]);

  const allFound = state.foundIds.length >= level.differences.length;

  useEffect(() => {
    if (allFound && state.screen === 'game') {
      const id = setTimeout(() => dispatch({ type: 'LEVEL_COMPLETE' }), 2800);
      return () => clearTimeout(id);
    }
  }, [allFound, state.screen, dispatch]);

  return (
    <div className="game-screen">
      {allFound && <Confetti />}

      <div className="hud">
        <div className="hud__left">
          <button className="hud__back-btn" onClick={() => dispatch({ type: 'GO_TO_MENU' })}>
            ← Menu
          </button>
          <span className="hud__level-title">{level.emoji} {level.title}</span>
        </div>
        <div className="hud__right">
          <DifferencesFound found={state.foundIds.length} total={level.differences.length} />
          <ScoreDisplay score={score} />
          <HintButton
            hintsUsed={state.hintsUsed}
            maxHints={level.maxHints}
            onHint={handleHint}
            disabled={state.hintsUsed >= level.maxHints || allFound}
          />
        </div>
      </div>

      <TimerBar timeRemaining={state.timeRemaining} timeLimit={level.timeLimit} />

      <GameBoard
        level={level}
        foundIds={state.foundIds}
        hintActiveId={state.hintActiveId}
        onDifferenceFound={handleDifferenceFound}
        onWrongClick={handleWrongClick}
        onHintExpire={handleHintExpire}
      />

      {allFound && (
        <div className="level-complete-overlay">
          <div className="level-complete-card">
            <div className="level-complete-card__icon">🎉</div>
            <h2>Level Complete!</h2>
            <p>You found all {level.differences.length} differences!</p>
            <p className="level-complete-card__score">Score: <strong>{score}</strong> pts</p>
          </div>
        </div>
      )}
    </div>
  );
}
