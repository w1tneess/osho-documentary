import { useState, useEffect, useRef } from 'react';
import { documentary } from '../../content/documentary';

interface ChapterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  chapterIndexRef: React.RefObject<number>;
}

/**
 * Apple HIG Compliant Table of Contents Drawer (Sheets / Sidebars)
 * 
 * Design Details:
 * - Liquid Glass regular variant backdrop blur panel
 * - Micro-typography: SF Pro stack, tabular figures for dates and chapter IDs
 * - Touch targets >= 44x44pt on mobile, >= 28x28pt on desktop
 * - Full accessibility: Esc to close, focus restoration, aria-modal="true"
 * - Direct jumping smoothly coordinates DOM scroll position and 3D camera
 */
export function ChapterDrawer({ isOpen, onClose, chapterIndexRef }: ChapterDrawerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      setActiveIndex(chapterIndexRef.current ?? 0);
    }
  }, [isOpen, chapterIndexRef]);

  // Close on Escape key and handle focus
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Focus close button on open
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Jump to chapter section
  const handleChapterClick = (index: number) => {
    onClose();
    setTimeout(() => {
      const sections = document.querySelectorAll(
        '.hero-spread, .chapter-container, .final-horizon-spread, .scholarly-references'
      );
      sections[index]?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  if (!isOpen) return null;

  return (
    <div
      className="drawer-backdrop"
      onClick={onClose}
      aria-hidden={!isOpen}
    >
      <div
        className="drawer-panel"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Table of Contents"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-header-meta">
            <span className="drawer-eyebrow">DOCUMENTARY INDEX</span>
            <h2 className="drawer-title">Chapters & Timeline</h2>
          </div>

          <button
            ref={closeButtonRef}
            className="drawer-close-btn"
            onClick={onClose}
            aria-label="Close table of contents"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M1 1L13 13M1 13L13 1"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="drawer-body">
          {/* Introduction item */}
          <button
            className={`drawer-row ${activeIndex === 0 ? 'is-active' : ''}`}
            onClick={() => handleChapterClick(0)}
            aria-current={activeIndex === 0 ? 'page' : undefined}
          >
            <span className="drawer-row-badge">INTRO</span>
            <div className="drawer-row-info">
              <span className="drawer-row-title">Prologue: An Investigation</span>
              <span className="drawer-row-sub">Philosophy, Outcomes & Paradox</span>
            </div>
            {activeIndex === 0 && <span className="drawer-active-dot" aria-hidden="true" />}
          </button>

          {/* 9 Chapters */}
          {documentary.chapters.map((ch, idx) => {
            const listIndex = idx + 1;
            const isCurrent = activeIndex === listIndex;
            return (
              <button
                key={ch.id}
                className={`drawer-row ${isCurrent ? 'is-active' : ''}`}
                onClick={() => handleChapterClick(listIndex)}
                aria-current={isCurrent ? 'page' : undefined}
              >
                <span className="drawer-row-badge">0{ch.index}</span>
                <div className="drawer-row-info">
                  <span className="drawer-row-title">{ch.title}</span>
                  <span className="drawer-row-sub">{ch.subtitle || `Chapter 0${ch.index}`}</span>
                </div>
                {isCurrent && <span className="drawer-active-dot" aria-hidden="true" />}
              </button>
            );
          })}

          {/* Epilogue */}
          <button
            className={`drawer-row ${activeIndex === 10 ? 'is-active' : ''}`}
            onClick={() => handleChapterClick(10)}
            aria-current={activeIndex === 10 ? 'page' : undefined}
          >
            <span className="drawer-row-badge">FINAL</span>
            <div className="drawer-row-info">
              <span className="drawer-row-title">Epilogue: The Dual Legacy</span>
              <span className="drawer-row-sub">Synthesis & Contemporary Assessment</span>
            </div>
            {activeIndex === 10 && <span className="drawer-active-dot" aria-hidden="true" />}
          </button>

          {/* References */}
          <button
            className={`drawer-row ${activeIndex === 11 ? 'is-active' : ''}`}
            onClick={() => handleChapterClick(11)}
            aria-current={activeIndex === 11 ? 'page' : undefined}
          >
            <span className="drawer-row-badge">SOURCES</span>
            <div className="drawer-row-info">
              <span className="drawer-row-title">Scholarly References</span>
              <span className="drawer-row-sub">Primary Historical & Academic Bibliography</span>
            </div>
            {activeIndex === 11 && <span className="drawer-active-dot" aria-hidden="true" />}
          </button>
        </div>

        {/* Drawer Footer Metadata */}
        <div className="drawer-footer">
          <span className="drawer-footer-text">
            9 Chapters • 1931–1990 • Documentary Analysis
          </span>
        </div>
      </div>
    </div>
  );
}
