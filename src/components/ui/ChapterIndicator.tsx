import { useState, useEffect } from 'react';
import { documentary } from '../../content/documentary';

interface ChapterIndicatorProps {
  chapterIndexRef: React.RefObject<number>;
}

/**
 * Minimal chapter progress indicator — a thin strip on the right edge.
 * Updates at low frequency via interval (not scroll listener) to avoid
 * unnecessary re-renders while still showing the user where they are.
 *
 * Fluid accessibility:
 * - Large 40px touch targets with a 2px visual bar
 * - Respects safe area insets
 * - Keyboard accessible
 */
export function ChapterIndicator({ chapterIndexRef }: ChapterIndicatorProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalChapters = documentary.chapters.length + 2; // +intro +epilogue

  useEffect(() => {
    const interval = setInterval(() => {
      const current = chapterIndexRef.current ?? 0;
      setActiveIndex(current);
    }, 250);

    return () => clearInterval(interval);
  }, [chapterIndexRef]);

  return (
    <nav
      className="chapter-indicator"
      aria-label="Chapter progress"
      style={{
        position: 'fixed',
        right: 'max(var(--space-2), env(safe-area-inset-right))',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 'var(--z-nav)',
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
        alignItems: 'center',
      }}
    >
      {Array.from({ length: totalChapters }, (_, i) => (
        <button
          key={i}
          onClick={() => {
            const sections = document.querySelectorAll(
              '.hero-spread, .chapter-container, .final-horizon-spread'
            );
            sections[i]?.scrollIntoView({ behavior: 'smooth' });
          }}
          aria-label={
            i === 0
              ? 'Introduction'
              : i === totalChapters - 1
              ? 'Conclusion'
              : `Chapter ${i}`
          }
          aria-current={i === activeIndex ? 'step' : undefined}
          style={{
            background: 'transparent',
            border: 'none',
            padding: '4px 6px',
            minWidth: '24px',
            minHeight: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <span
            style={{
              display: 'block',
              width: i === activeIndex ? '3px' : '2px',
              height: i === activeIndex ? '24px' : '12px',
              background:
                i === activeIndex
                  ? 'var(--color-terracotta)'
                  : 'var(--color-earth-warm)',
              borderRadius: '1px',
              transition:
                'height 400ms var(--ease-move), background 300ms var(--ease-enter), width 300ms var(--ease-enter), opacity 300ms var(--ease-enter)',
              opacity: i === activeIndex ? 1 : 0.45,
            }}
          />
        </button>
      ))}
    </nav>
  );
}
