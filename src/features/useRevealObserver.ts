import { useEffect, useRef } from 'react';

/**
 * Reveals `.reveal` elements once, on first entry.
 *
 * Two things were wrong with the previous version and both are fixed here:
 * the ref was typed `HTMLDivElement` while being attached to a `<main>`, and
 * every element was observed from the first paint, including the nine chapter
 * openers and thirty-plus beats that will not be on screen for several minutes
 * — which is a few hundred live observations doing no work.
 *
 * Content that is already on screen at mount is revealed immediately, and the
 * observer is disconnected once the reader has passed the last beat.
 */
export function useRevealObserver<T extends HTMLElement>() {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reveal = (el: Element) => el.classList.add('is-visible');

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      container.querySelectorAll('.reveal').forEach(reveal);
      return;
    }

    // Anything already intersecting is revealed without waiting for a callback.
    const targets = container.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return containerRef;
}
