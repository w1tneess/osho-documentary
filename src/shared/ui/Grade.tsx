import { useEffect, useRef } from 'react';
import { sampleScore } from '../../entities/chapter/chapters';
import { useAppStore } from '../../features/store';

/**
 * The frame grade: a score-driven vignette, in CSS.
 *
 * This used to be a post-processing pass, which was the wrong tool twice over.
 * A post pass costs a framebuffer and a dependency to darken the render, and it
 * can only darken the render — the vignette is supposed to sit over the whole
 * frame, DOM included, or the text sits outside the picture the reader is
 * looking at. And the chapters that close in (the collapse, the exile) need
 * their vignette to move with the scroll, not at a fixed strength.
 *
 * It is a single compositor-only opacity write per frame on one element, which
 * is cheaper than a full-screen render pass and affects the DOM and the canvas
 * identically.
 */
export function Grade() {
  const ref = useRef<HTMLDivElement>(null);
  const current = useRef(0.4);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const tick = () => {
      const { lower, upper, mix } = sampleScore(useAppStore.getState().scrollProgress);
      const target = lower.vignette + (upper.vignette - lower.vignette) * mix;
      // Frame-rate independent, like the camera.
      current.current += (target - current.current) * 0.08;
      el.style.opacity = current.current.toFixed(3);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="grade" ref={ref} aria-hidden="true">
      <div className="grade__vignette" />
      <div className="grade__grain" />
    </div>
  );
}
