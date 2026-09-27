import { useState, useEffect } from 'react';
import { documentary } from '../../content/documentary';

interface ChapterIndicatorProps {
  chapterIndexRef: React.RefObject<number>;
}

/**
 * Apple HIG Compliant Chapter Rail Indicator
 * 
 * Design Elements:
 * - Liquid Glass vertical capsule docked to the right edge
 * - Micro-typography tooltips with chapter name on hover/focus
 * - Smooth physical interpolation of active state
 * - Touch targets >= 44x28pt with accessible ARIA labels
 * - Hides smoothly on ultra-narrow mobile viewports to prevent content occlusion
 */
export function ChapterIndicator({ chapterIndexRef }: ChapterIndicatorProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const totalChapters = documentary.chapters.length + 2; // +intro +epilogue

  useEffect(() => {
    const interval = setInterval(() => {
      const current = chapterIndexRef.current ?? 0;
      setActiveIndex(current);
    }, 250);

    return () => clearInterval(interval);
  }, [chapterIndexRef]);

  const getLabel = (i: number) => {
    if (i === 0) return 'Prologue: Introduction';
    if (i === totalChapters - 1) return 'Epilogue: Dual Legacy';
    const ch = documentary.chapters[i - 1];
    return ch ? `0${ch.index} · ${ch.title}` : `Chapter ${i}`;
  };

  return (
    <nav
      className="chapter-rail-container"
      aria-label="Documentary chapter progression"
    >
      <div className="chapter-rail-glass">
        {Array.from({ length: totalChapters }, (_, i) => {
          const isActive = i === activeIndex;
          const isHovered = i === hoveredIndex;
          const label = getLabel(i);

          return (
            <div key={i} className="rail-item-wrapper">
              <button
                className={`rail-step-btn ${isActive ? 'is-active' : ''}`}
                onClick={() => {
                  const sections = document.querySelectorAll(
                    '.hero-spread, .chapter-container, .final-horizon-spread, .scholarly-references'
                  );
                  sections[i]?.scrollIntoView({ behavior: 'smooth' });
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                onFocus={() => setHoveredIndex(i)}
                onBlur={() => setHoveredIndex(null)}
                aria-label={label}
                aria-current={isActive ? 'step' : undefined}
              >
                <span className="rail-step-pill" />
              </button>

              {/* Apple HIG Floating Tooltip */}
              {isHovered && (
                <div className="rail-tooltip" role="tooltip">
                  <span className="rail-tooltip-text">{label}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
