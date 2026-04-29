import { formatTime } from '../../utils/scoring';

interface Props {
  timeRemaining: number;
  timeLimit: number;
}

export function TimerBar({ timeRemaining, timeLimit }: Props) {
  const pct = (timeRemaining / timeLimit) * 100;
  const urgent = pct < 25;
  const warning = pct < 50;

  return (
    <div className="timer-bar">
      <span className={`timer-bar__time ${urgent ? 'timer-bar__time--urgent' : ''}`}>
        ⏱ {formatTime(timeRemaining)}
      </span>
      <div className="timer-bar__track">
        <div
          className={`timer-bar__fill ${urgent ? 'timer-bar__fill--urgent' : warning ? 'timer-bar__fill--warning' : ''}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
