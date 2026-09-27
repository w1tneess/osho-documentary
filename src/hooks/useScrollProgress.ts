import { useEffect, useRef, useCallback } from 'react';

/**
 * Lightweight scroll progress tracker using refs (no React re-renders).
 * Returns a mutable ref whose .current is always the normalized [0, 1]
 * scroll progress across the entire documentary.
 *
 * Also provides the current chapter index via a separate ref.
 */
export function useScrollProgress(totalChapters: number) {
  const progressRef = useRef(0);
  const chapterIndexRef = useRef(0);
  const rafRef = useRef<number>(0);

  const update = useCallback(() => {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) {
      progressRef.current = 0;
      chapterIndexRef.current = 0;
      return;
    }

    const raw = scrollY / maxScroll;
    progressRef.current = Math.max(0, Math.min(1, raw));
    chapterIndexRef.current = Math.min(
      totalChapters - 1,
      Math.floor(progressRef.current * totalChapters)
    );
  }, [totalChapters]);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return; // Already scheduled
      rafRef.current = requestAnimationFrame(() => {
        update();
        rafRef.current = 0;
      });
    };

    // Initial
    update();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [update]);

  return { progressRef, chapterIndexRef };
}
