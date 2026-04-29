interface Props {
  found: number;
  total: number;
}

export function DifferencesFound({ found, total }: Props) {
  return (
    <div className="diff-found">
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className={`diff-found__dot ${i < found ? 'diff-found__dot--found' : ''}`} />
      ))}
      <span className="diff-found__text">{found}/{total}</span>
    </div>
  );
}
