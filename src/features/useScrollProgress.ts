import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { SCORE_LENGTH } from '../entities/chapter/chapters';
import { useAppStore } from './store';

/**
 * The scroll engine.
 *
 * • Section offsets are MEASURED ONCE per layout change.
 * • Offsets are invalidated by a ResizeObserver on the document.
 * 
 * Writes directly to the Zustand store, avoiding prop drilling and manual ref passing.
 */

const READING_LINE = 0.35;

interface SectionBounds {
  top: number;
  bottom: number;
  /** Index into the score this section is anchored to. */
  score: number;
}

/** Absolute document offset of an element, independent of offsetParent. */
function documentTop(el: HTMLElement): number {
  let top = 0;
  let node: HTMLElement | null = el;
  while (node) {
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return top;
}

export function useScrollEngine(chapterCount: number): void {
  /** The reader's position, kept so a resize can restore it. */
  const narrativeRef = useRef({ index: 0, local: 0 });
  const bounds = useRef<SectionBounds[]>([]);

  const measure = useCallback(() => {
    const nodes = document.querySelectorAll<HTMLElement>('[data-section]');
    const scrollY = window.scrollY;
    const next: SectionBounds[] = [];

    for (let i = 0; i < nodes.length; i++) {
      const top = documentTop(nodes[i]) + scrollY;
      next.push({
        top,
        bottom: top + nodes[i].offsetHeight,
        score: Number(nodes[i].dataset.score ?? i),
      });
    }
    bounds.current = next;
  }, []);

  const read = useCallback(() => {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const rawReadProgress = maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0;

    const list = bounds.current;
    if (list.length === 0) return;

    const probeY = scrollY + window.innerHeight * READING_LINE;

    let index = 0;
    for (let i = 0; i < list.length; i++) {
      if (probeY >= list[i].top) index = i;
      else break;
    }

    const span = list[index];
    const local = Math.max(0, Math.min(1, (probeY - span.top) / Math.max(1, span.bottom - span.top)));

    narrativeRef.current = { index, local };

    const here = span.score;
    const there = list[Math.min(index + 1, list.length - 1)].score;
    const scoreT = (here + local * (there - here)) / (SCORE_LENGTH - 1);
    const scrollProgress = Math.max(0, Math.min(1, scoreT));

    const chapterIndex = Math.max(-1, Math.min(chapterCount - 1, index - 2));
    const readProgress = Math.round(rawReadProgress * 100) / 100;

    // Dispatch to Zustand
    const store = useAppStore.getState();
    if (store.scrollProgress !== scrollProgress) {
        store.setScrollProgress(scrollProgress);
    }
    store.setSectionState(index, chapterIndex, readProgress);
  }, [chapterCount]);

  useLayoutEffect(() => {
    measure();
    read();
  }, [measure, read]);

  useEffect(() => {
    let raf = 0;

    const schedule = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        read();
      });
    };

    const remeasure = () => {
      const saved = { ...narrativeRef.current };
      measure();

      const target = bounds.current[saved.index];
      if (target) {
        const probeY = target.top + saved.local * (target.bottom - target.top);
        const wantScrollY = probeY - window.innerHeight * READING_LINE;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo({
          top: Math.max(0, Math.min(maxScroll, wantScrollY)),
          behavior: 'instant' as ScrollBehavior,
        });
      }
      read();
    };

    let timer: number | undefined;
    const debounced = (delay: number) => () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(remeasure, delay);
    };
    const onResize = debounced(90);
    const onContentShift = debounced(120);

    const observer = new ResizeObserver(onContentShift);
    observer.observe(document.body);

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    document.fonts?.ready.then(remeasure).catch(() => {});

    schedule();

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', onResize);
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
      if (timer) window.clearTimeout(timer);
    };
  }, [measure, read]);
}
