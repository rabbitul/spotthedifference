interface Props {
  score: number;
}

export function ScoreDisplay({ score }: Props) {
  return (
    <div className="score-display">
      <span className="score-display__label">SCOR</span>
      <span className="score-display__value">{score}</span>
    </div>
  );
}
