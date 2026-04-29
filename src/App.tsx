import { useGameState } from './hooks/useGameState';
import { StartScreen } from './components/screens/StartScreen';
import { GameScreen } from './components/screens/GameScreen';
import { EndScreen } from './components/screens/EndScreen';

export default function App() {
  const [state, dispatch] = useGameState();

  return (
    <div className="app">
      {state.screen === 'start' && (
        <StartScreen onStart={levelIndex => dispatch({ type: 'START_GAME', levelIndex })} />
      )}
      {state.screen === 'game' && (
        <GameScreen state={state} dispatch={dispatch} />
      )}
      {state.screen === 'end' && (
        <EndScreen state={state} dispatch={dispatch} />
      )}
    </div>
  );
}
