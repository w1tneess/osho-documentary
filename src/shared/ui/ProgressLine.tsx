import { useEffect, useRef } from 'react';
import { useAppStore } from '../../features/store';

/**
 * The reading-progress hairline.
 *
 * A 2px rule at the bottom edge of the viewport. It is a scaleX transform, so it
 * stays on the compositor and never triggers layout — and because React has
 * already rounded the value to whole percent, updating it costs nothing.
 */
export function ProgressLine() {
  const progress = useAppStore(s => s.readProgress);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (fillRef.current) {
      fillRef.current.style.transform = `scaleX(${Math.max(0, Math.min(1, progress))})`;
    }
  }, [progress]);

  return (
    <div
      className="progress"
      role="progressbar"
      aria-label="Reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
    >
      <div className="progress__fill" ref={fillRef} />
    </div>
  );
}
