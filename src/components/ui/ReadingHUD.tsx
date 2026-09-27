import { useState, useEffect } from 'react';

interface ReadingHUDProps {
  progressRef: React.RefObject<number>;
}

/**
 * Apple HIG Compliant Reading Progress HUD
 * 
 * Subservient to content (branding and stats defer to reading experience).
 * Shows tabular percentage progress in a compact Liquid Glass clear variant pill.
 */
export function ReadingHUD({ progressRef }: ReadingHUDProps) {
  const [percent, setPercent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const p = Math.min(100, Math.max(0, Math.round((progressRef.current ?? 0) * 100)));
      setPercent(p);
      setIsVisible(p > 1);
    }, 250);

    return () => clearInterval(interval);
  }, [progressRef]);

  if (!isVisible) return null;

  return (
    <aside
      className="reading-hud"
      aria-label="Reading progress"
    >
      <div className="reading-hud-glass">
        <span className="reading-hud-num">{percent}%</span>
        <span className="reading-hud-sep">·</span>
        <span className="reading-hud-label">READING</span>
      </div>
    </aside>
  );
}
