import { useEffect, useRef } from 'react';
import type { ChapterContent } from '../../entities/content/types';

import { useAppStore } from '../../features/store';

interface IndexDrawerProps {
  open: boolean;
  onClose: () => void;
  chapters: ChapterContent[];
  beatCount: number;
}

interface Row {
  id: string;
  index: string;
  title: string;
  sub: string;
}

/**
 * The contents drawer.
 *
 * Treated as a contents page rather than a menu: numbered, ruled, and readable
 * at a glance, with the current position marked. It is a real dialog — focus
 * moves into it on open, is trapped while it is open, Escape closes it, and
 * focus returns to the control that opened it.
 */
export function IndexDrawer({
  open,
  onClose,
  chapters,
  beatCount,
}: IndexDrawerProps) {
  const activeIndex = useAppStore(s => s.sectionIndex);
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  const rows: Row[] = [
    { id: 'hero', index: '00', title: 'Opening', sub: 'Title page' },
    { id: 'prologue', index: '—', title: 'Prologue', sub: 'Who was Osho?' },
    ...chapters.map((c) => ({
      id: `chapter-${c.slug}`,
      index: String(c.index).padStart(2, '0'),
      title: c.title,
      sub: c.subtitle ?? `${c.beats.length} sequences`,
    })),
    { id: 'epilogue', index: '—', title: 'The Paradox of Osho', sub: 'Conclusion' },
    { id: 'references', index: '—', title: 'References', sub: 'Archival & legal' },
  ];

  // Focus management: in on open, trapped while open, restored on close.
  useEffect(() => {
    if (!open) return;

    restoreRef.current = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    const first = panel?.querySelector<HTMLElement>('button, [href]');
    first?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panel) return;

      const focusables = panel.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const firstEl = focusables[0];
      const lastEl = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      restoreRef.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="drawer"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="drawer__panel"
        id="index-drawer"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="index-title"
      >
        <div className="drawer__head">
          <div>
            <span className="drawer__eyebrow">Contents</span>
            <h2 className="drawer__title" id="index-title">
              The Documentary
            </h2>
          </div>
          <button type="button" className="drawer__close" onClick={onClose} aria-label="Close contents">
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
              <path
                d="M1 1l12 12M13 1L1 13"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <nav className="drawer__list" aria-label="Chapters">
          {rows.map((row, i) => (
            <button
              key={row.id}
              type="button"
              className="drawer__row"
              aria-current={i === activeIndex ? 'true' : undefined}
              onClick={() => {
                const el = document.getElementById(row.id);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                onClose();
              }}
            >
              <span className="drawer__row-index">{row.index}</span>
              <span>
                <span className="drawer__row-title">{row.title}</span>
                <span className="drawer__row-sub">{row.sub}</span>
              </span>
            </button>
          ))}
        </nav>

        <div className="drawer__foot">
          <span>Osho Rajneesh, 1931–1990</span>
          <span>{beatCount} sequences</span>
        </div>
      </div>
    </div>
  );
}
