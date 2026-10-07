'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, Clock, FileText, ArrowRight, X, Compass } from 'lucide-react';

interface SearchItem {
  id: string;
  title: string;
  category: 'Article' | 'Timeline' | 'Source' | 'Section';
  url: string;
  snippet: string;
}

const SEARCH_DATABASE: SearchItem[] = [
  // Sections
  { id: 'sec-life', title: 'The Life Arc (1931–1990)', category: 'Section', url: '/life', snippet: 'Biographical trajectory from Kuchwada to global recognition.' },
  { id: 'sec-teachings', title: 'Teachings & Philosophy', category: 'Section', url: '/teachings', snippet: 'Zorba the Buddha, dynamic meditation, and anti-asceticism.' },
  { id: 'sec-movement', title: 'The Global Movement', category: 'Section', url: '/movement', snippet: 'Pune ashram and the Oregon desert city of Rajneeshpuram.' },
  { id: 'sec-controversies', title: 'Controversies & Criminal Trials', category: 'Section', url: '/controversies', snippet: 'Bioterrorism attack, wiretaps, and FBI prosecutions.' },
  { id: 'sec-timeline', title: 'Interactive Master Timeline', category: 'Section', url: '/timeline', snippet: 'Chronological timeline mapping six decades of events.' },
  { id: 'sec-gallery', title: 'Archival Photography Vault (32 Curated Plates)', category: 'Section', url: '/gallery', snippet: 'Declassified historical photo gallery spanning six decades of records.' },
  { id: 'sec-sources', title: 'Primary Sources & Archives', category: 'Section', url: '/sources', snippet: 'Government files, CDC epidemiological reports, and books.' },
  { id: 'sec-method', title: 'Forensic Research Methodology', category: 'Section', url: '/method', snippet: 'How claims are graded: Established, Reported, Disputed, Alleged.' },
  { id: 'sec-map', title: 'Global Cartography & Places', category: 'Section', url: '/map', snippet: 'Interactive geo-spatial map of key historical sites.' },

  // Articles
  { id: 'art-bioterror', title: 'The 1984 Salmonella Bioterror Attack', category: 'Article', url: '/articles/controversies/bioterror-attack', snippet: 'Intentional contamination of salad bars in The Dalles, Oregon by commune leaders.' },
  { id: 'art-early', title: 'Early Years & Upbringing (1931–1953)', category: 'Article', url: '/articles/life/early-years', snippet: 'Childhood in Kuchwada, maternal grandparents, and 1953 enlightenment claim.' },
  { id: 'art-teaching', title: 'Teaching Career & Public Discourses', category: 'Article', url: '/articles/life/teaching-career', snippet: 'Philosophy professorship at Jabalpur and travel throughout India as Acharya.' },
  { id: 'art-pune', title: 'The Poona Ashram Phase (1974–1981)', category: 'Article', url: '/articles/movement/pune-1', snippet: 'Establishment of Koregaon Park center, therapy groups, and Western influx.' },
  { id: 'art-rajneeshpuram', title: 'Rajneeshpuram in Oregon (1981–1985)', category: 'Article', url: '/articles/movement/rajneeshpuram', snippet: 'The experimental city, Rolls-Royce collection, and conflict with state officials.' },
  { id: 'art-final', title: 'Final Years in Pune & Death (1986–1990)', category: 'Article', url: '/articles/life/final-years', snippet: 'Return to India, adoption of the name Osho, and final discourses.' },
  { id: 'art-overview', title: 'Core Teachings & Meditation Systems', category: 'Article', url: '/articles/teachings/overview', snippet: 'Synthesis of Western psychological catharsis and Eastern meditation.' },
  { id: 'art-therapies', title: 'Controversial Group Therapies & Encounter', category: 'Article', url: '/articles/controversies/group-therapies', snippet: 'Tantric encounter groups, physical aggression reports, and media scandal.' },
  { id: 'art-reception', title: 'Scholarly & Cultural Reception Post-1990', category: 'Article', url: '/articles/legacy/reception', snippet: 'Academic assessments, publishing enterprises, and Wild Wild Country impact.' },

  // Timeline events & sources
  { id: 'time-alford', title: 'Arrest in Charlotte & Alford Plea (1985)', category: 'Timeline', url: '/timeline', snippet: 'Guilty plea to immigration violations and immediate deportation from the US.' },
  { id: 'time-world-tour', title: 'World Tour & 21 Nations Denying Entry (1986)', category: 'Timeline', url: '/timeline', snippet: 'Expulsions and entry denials across Europe, the Americas, and Asia.' },
  { id: 'src-fbi', title: 'FBI Investigation Files (HQ 25-103300)', category: 'Source', url: '/sources', snippet: 'Official records on wiretaps, weapons caches, and biological agents.' },
  { id: 'src-cdc', title: 'CDC Epidemiological Report on Salmonella Outbreak', category: 'Source', url: '/sources', snippet: 'JAMA study confirming intentional contamination in Wasco County.' },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Global keydown listener for Ctrl+K / Cmd+K and custom event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      } else if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    };

    const handleCustomOpen = () => setOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-palette', handleCustomOpen);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleCustomOpen);
    };
  }, [open]);

  // Focus input on open
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
      setQuery('');
    }
  }, [open]);

  const filtered = SEARCH_DATABASE.filter((item) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      item.title.toLowerCase().includes(q) ||
      item.snippet.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  }).slice(0, 8);

  const handleSelect = useCallback(
    (item: SearchItem) => {
      setOpen(false);
      router.push(item.url);
    },
    [router],
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      e.preventDefault();
      handleSelect(filtered[selectedIndex]);
    }
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-4 sm:pt-20 px-3 sm:px-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="relative w-full max-w-2xl rounded-sm bg-[var(--color-bg-elevated)] border border-[var(--color-border)] overflow-hidden z-10 max-h-[85vh] flex flex-col shadow-2xl"
            >
              {/* Search Bar Input */}
              <div className="flex items-center px-4 py-3 border-b border-[var(--color-border)]">
                <Search className="w-5 h-5 text-[var(--color-text-muted)] mr-3 shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Search archives, dossiers, timeline events, or sources..."
                  className="w-full bg-transparent text-[var(--color-text)] placeholder-[var(--color-text-muted)] text-base sm:text-sm focus:outline-none"
                />
                <button
                  onClick={() => setOpen(false)}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text)] cursor-pointer -mr-2"
                  aria-label="Close search dialog"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Search Results List */}
              <div className="overflow-y-auto no-scrollbar p-2 space-y-1 flex-1">
                {filtered.length === 0 ? (
                  <div className="p-8 text-center text-sm font-mono text-[var(--color-text-muted)]">
                    No archival records matching &ldquo;{query}&rdquo;
                  </div>
                ) : (
                  filtered.map((item, idx) => {
                    const isSelected = idx === selectedIndex;
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleSelect(item)}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`px-3.5 py-3 rounded-sm cursor-pointer flex items-center justify-between transition-colors min-h-[48px] ${
                          isSelected
                            ? 'bg-amber-500/15 dark:bg-amber-400/20 text-[var(--color-text)]'
                            : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-inset)] hover:text-[var(--color-text)]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="p-2 rounded-sm bg-black/5 dark:bg-white/10 text-[var(--color-text-muted)] shrink-0">
                            {item.category === 'Article' && <BookOpen className="w-4 h-4" />}
                            {item.category === 'Timeline' && <Clock className="w-4 h-4" />}
                            {item.category === 'Source' && <FileText className="w-4 h-4" />}
                            {item.category === 'Section' && <Compass className="w-4 h-4 text-amber-500" />}
                          </span>

                          <div>
                            <div className="text-sm font-medium leading-snug">
                              {item.title}
                            </div>
                            <div className="text-xs text-[var(--color-text-muted)] line-clamp-1 font-sans">
                              {item.snippet}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-none bg-[var(--color-bg-inset)] text-[var(--color-text-secondary)] border border-[var(--color-border)]">
                            {item.category}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Modal Footer Hotkeys */}
              <div className="px-4 py-2.5 bg-[var(--color-bg-inset)] border-t border-[var(--color-border)] text-[11px] font-mono text-[var(--color-text-muted)] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span>↑↓ Navigate</span>
                  <span>↵ Select</span>
                  <span>ESC Close</span>
                </div>
                <div className="hidden sm:block">Press Ctrl+K anytime</div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
