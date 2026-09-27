import { useState, useEffect } from 'react';
import { documentary } from '../../content/documentary';

interface ChapterIndicatorProps {
  chapterIndexRef: React.RefObject<number>;
}

/**
 * Minimal chapter progress indicator — a thin strip on the right edge.
 * Updates at low frequency via interval (not scroll listener) to avoid
 * unnecessary re-renders while still showing the user where they are.
 */
export function ChapterIndicator({ chapterIndexRef }: ChapterIndicatorProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalChapters = documentary.chapters.length + 2; // +intro +epilogue

  useEffect(() => {
    const interval = setInterval(() => {
      const current = chapterIndexRef.current ?? 0;
      setActiveIndex(current);
    }, 300);

    return () => clearInterval(interval);
  }, [chapterIndexRef]);

  return (
    <nav
      className="chapter-indicator"
      aria-label="Chapter progress"
      style={{
        position: 'fixed',
        right: 'var(--space-4)',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 'var(--z-nav)',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        alignItems: 'center',
      }}
    >
      {Array.from({ length: totalChapters }, (_, i) => (
        <button
          key={i}
          onClick={() => {
            const sections = document.querySelectorAll('.chapter-section');
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
            width: i === activeIndex ? '3px' : '2px',
            height: i === activeIndex ? '24px' : '12px',
            background: i === activeIndex
              ? 'var(--color-terracotta)'
              : 'var(--color-earth-warm)',
            border: 'none',
            borderRadius: '1px',
            cursor: 'pointer',
            padding: 0,
            transition: 'height 500ms var(--ease-move), background 300ms var(--ease-enter), width 300ms var(--ease-enter)',
            opacity: i === activeIndex ? 1 : 0.4,
          }}
        />
      ))}
    </nav>
  );
}
