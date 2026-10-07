'use client';

import React, { useEffect, useState } from 'react';
import { List, ChevronDown, ChevronUp } from 'lucide-react';

export interface TocHeading {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  headings: TocHeading[];
  variant?: 'mobile' | 'desktop' | 'auto';
}

export function TableOfContents({ headings, variant = 'auto' }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -60% 0px' }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  const showMobile = variant === 'mobile' || variant === 'auto';
  const showDesktop = variant === 'desktop' || variant === 'auto';

  return (
    <>
      {/* Mobile Collapsible Drawer */}
      {showMobile && (
        <div className={`${variant === 'auto' ? 'lg:hidden' : ''} mb-8 border border-neutral-200 dark:border-neutral-800 rounded-sm bg-neutral-100/60 dark:bg-neutral-900/60 overflow-hidden`}>
          <button
            onClick={() => setIsOpenMobile(!isOpenMobile)}
            className="w-full px-4 py-3.5 min-h-[48px] flex items-center justify-between text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 font-semibold cursor-pointer active:bg-neutral-200/50 dark:active:bg-neutral-800/50"
          >
            <span className="flex items-center gap-2">
              <List className="w-4 h-4 text-amber-600 dark:text-amber-400" /> Contents ({headings.length} sections)
            </span>
            {isOpenMobile ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {isOpenMobile && (
            <nav className="p-3 pt-0 border-t border-neutral-200 dark:border-neutral-800 text-sm">
              <ul className="space-y-1">
                {headings.map((h) => (
                  <li key={h.id} style={{ paddingLeft: `${(h.level - 2) * 12}px` }}>
                    <a
                      href={`#${h.id}`}
                      onClick={() => setIsOpenMobile(false)}
                      className={`block py-2.5 px-2 text-xs transition-colors no-underline rounded-sm min-h-[40px] flex items-center ${
                        activeId === h.id
                          ? 'text-amber-600 dark:text-amber-400 font-semibold bg-amber-500/10'
                          : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 active:bg-neutral-200/40'
                      }`}
                    >
                      {h.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      )}

      {/* Desktop Sticky Sidebar */}
      {showDesktop && (
        <nav
          aria-label="Table of contents"
          className={`${variant === 'auto' ? 'hidden lg:block' : ''} sticky top-28 max-h-[calc(100vh-140px)] overflow-y-auto pr-4 text-xs font-sans`}
        >
          <div className="flex items-center gap-2 mb-3 font-mono uppercase tracking-widest text-[11px] font-semibold text-neutral-400 dark:text-neutral-500">
            <List className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            Contents
          </div>
          <ul className="space-y-1.5 border-l border-neutral-200 dark:border-neutral-800 pl-3">
            {headings.map((h) => (
              <li key={h.id} style={{ paddingLeft: `${(h.level - 2) * 8}px` }}>
                <a
                  href={`#${h.id}`}
                  className={`block py-1 transition-all no-underline ${
                    activeId === h.id
                      ? 'text-amber-600 dark:text-amber-400 font-medium translate-x-1'
                      : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100'
                  }`}
                >
                  {h.title}
                </a>
              </li>
            ))}
            <li className="pt-2 border-t border-neutral-200/60 dark:border-neutral-800/60">
              <a
                href="#references-section"
                className="text-neutral-500 hover:text-amber-600 dark:text-neutral-400 dark:hover:text-amber-400 font-mono text-[11px] no-underline block py-1"
              >
                § Archival References
              </a>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}
