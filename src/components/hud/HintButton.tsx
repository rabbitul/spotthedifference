interface Props {
  hintsUsed: number;
  maxHints: number;
  onHint: () => void;
  disabled: boolean;
}

export function HintButton({ hintsUsed, maxHints, onHint, disabled }: Props) {
  const remaining = maxHints - hintsUsed;
  return (
    <button
      className={`hint-btn ${disabled ? 'hint-btn--disabled' : ''}`}
      onClick={onHint}
      disabled={disabled}
    >
      <span>💡 Hint</span>
      <span className="hint-btn__badge">{remaining}</span>
    </button>
  );
}
