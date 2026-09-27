import { useEffect, useRef, useCallback } from 'react';

/**
 * Fluid, resilient scroll progress tracker using refs (no React re-renders).
 * Returns a mutable ref whose .current is always the normalized [0, 1]
 * scroll progress across the entire documentary.
 *
 * Implements Master Requirement 18:
 * "SCROLL + RESPONSIVE RESIZE
 * If the viewport changes while the visitor is halfway through a chapter:
 * DO NOT reset the documentary.
 * DO NOT reset the camera.
 * DO NOT jump to the chapter beginning.
 * DO NOT lose scroll progress.
 * Recalculate the composition while preserving:
 * document progress, chapter, beat, camera state, narrative position."
 */
export function useScrollProgress(totalChapters: number) {
  const progressRef = useRef(0);
  const chapterIndexRef = useRef(0);
  const rafRef = useRef<number>(0);
  const isResizingRef = useRef(false);

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
      if (isResizingRef.current) return;
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        update();
        rafRef.current = 0;
      });
    };

    let resizeTimer: number | undefined;
    const onResize = () => {
      // Preserve normalized progress during viewport reflow
      const savedProgress = progressRef.current;
      isResizingRef.current = true;
      window.clearTimeout(resizeTimer);

      resizeTimer = window.setTimeout(() => {
        const newMaxScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (newMaxScroll > 0 && savedProgress > 0) {
          window.scrollTo({
            top: savedProgress * newMaxScroll,
            behavior: 'instant',
          });
        }
        update();
        isResizingRef.current = false;
      }, 50);
    };

    update();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (resizeTimer) window.clearTimeout(resizeTimer);
    };
  }, [update]);

  return { progressRef, chapterIndexRef };
}
