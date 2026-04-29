import { useEffect, useRef, type Dispatch } from 'react';
import type { GameState, GameAction } from '../../types/game';
import { LEVELS } from '../../data/levels';
import { calculateScore, BASE_SCORE, TIME_PENALTY_PER_SEC, HINT_PENALTY } from '../../utils/scoring';
import { useHighScore } from '../../hooks/useHighScore';

interface Props {
  state: GameState;
  dispatch: Dispatch<GameAction>;
}

export function EndScreen({ state, dispatch }: Props) {
  const level = LEVELS[state.levelIndex];
  const score = state.finished
    ? calculateScore(level.timeLimit, state.timeRemaining, state.hintsUsed)
    : 0;

  const { highScore, saveScore } = useHighScore(level.id);
  const savedRef = useRef(false);
  const isNewBest = useRef(false);

  useEffect(() => {
    if (state.finished && !savedRef.current) {
      savedRef.current = true;
      isNewBest.current = saveScore(score);
    }
  }, [score, saveScore, state.finished]);

  const hasNextLevel = state.levelIndex < LEVELS.length - 1;
  const timeElapsed = level.timeLimit - state.timeRemaining;

  return (
    <div className="end-screen">
      <div className="end-screen__card">
        {state.finished ? (
          <>
            <div className="end-screen__icon">🏆</div>
            <h1 className="end-screen__title">Congratulations!</h1>
            <p className="end-screen__subtitle">You completed {level.emoji} {level.title}</p>
          </>
        ) : (
          <>
            <div className="end-screen__icon">⌛</div>
            <h1 className="end-screen__title">Time's Up!</h1>
            <p className="end-screen__subtitle">
              You found {state.foundIds.length} of {level.differences.length} differences
            </p>
          </>
        )}

        {state.finished && (
          <div className="end-screen__breakdown">
            <div className="end-screen__row">
              <span>Base score</span><span>+{BASE_SCORE}</span>
            </div>
            <div className="end-screen__row end-screen__row--neg">
              <span>Time penalty ({timeElapsed}s)</span>
              <span>-{timeElapsed * TIME_PENALTY_PER_SEC}</span>
            </div>
            {state.hintsUsed > 0 && (
              <div className="end-screen__row end-screen__row--neg">
                <span>Hints used ({state.hintsUsed})</span>
                <span>-{state.hintsUsed * HINT_PENALTY}</span>
              </div>
            )}
            <div className="end-screen__row end-screen__row--total">
              <span>Final Score</span><span>{score}</span>
            </div>
          </div>
        )}

        {isNewBest.current && (
          <div className="end-screen__new-best">🌟 New best: {score} pts!</div>
        )}
        {!isNewBest.current && highScore > 0 && state.finished && (
          <div className="end-screen__best">Best: {highScore} pts</div>
        )}

        <div className="end-screen__actions">
          {hasNextLevel && state.finished && (
            <button className="btn btn--primary" onClick={() => dispatch({ type: 'START_GAME', levelIndex: state.levelIndex + 1 })}>
              Next Level →
            </button>
          )}
          <button className="btn btn--secondary" onClick={() => dispatch({ type: 'START_GAME', levelIndex: state.levelIndex })}>
            Try Again
          </button>
          <button className="btn btn--ghost" onClick={() => dispatch({ type: 'GO_TO_MENU' })}>
            Main Menu
          </button>
        </div>
      </div>
    </div>
  );
}
