type ProgressBarProps = {
  value: number;
  max?: number;
  className?: string;
  color?: string;
};

function ProgressBar({ value, max = 100, className = '', color = 'bg-primary-600' }: ProgressBarProps) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className={`w-full h-2 bg-neutral-100 rounded-full overflow-hidden ${className}`}>
      <div className={`h-full ${color} rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
    </div>
  );
}

export default ProgressBar;
