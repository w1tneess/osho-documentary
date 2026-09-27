import { useEffect, useRef } from 'react';

/**
 * Observes elements with the `.reveal` class and adds `.is-visible`
 * when they enter the viewport. Runs once per element (no re-animate on
 * scroll-up, per the ui-animation skill anti-pattern guidance).
 */
export function useRevealObserver() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Respect reduced motion: make everything visible immediately
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      container.querySelectorAll('.reveal').forEach((el) => {
        el.classList.add('is-visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // Run once
          }
        });
      },
      {
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1,
      }
    );

    const elements = container.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return containerRef;
}
