'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookA, ExternalLink, ArrowRight, Bookmark, Hash } from 'lucide-react';
import type { GlossaryItem } from '@/lib/types';

interface GlossaryDirectoryProps {
  items: GlossaryItem[];
}

export function GlossaryDirectory({ items }: GlossaryDirectoryProps) {
  const [search, setSearch] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string>('ALL');
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  // Available unique initial letters sorted
  const availableLetters = useMemo(() => {
    const letters = new Set<string>();
    items.forEach((item) => {
      letters.add(item.term.charAt(0).toUpperCase());
    });
    return Array.from(letters).sort();
  }, [items]);

  // Deep anchor linking handling from hash
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setHighlightedId(hash);
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      const timer = setTimeout(() => setHighlightedId(null), 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return items.filter((item) => {
      const matchesLetter =
        selectedLetter === 'ALL' ||
        item.term.charAt(0).toUpperCase() === selectedLetter;

      const matchesQuery =
        !q ||
        item.term.toLowerCase().includes(q) ||
        item.definition.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q) ||
        (item.aka && item.aka.some((a) => a.toLowerCase().includes(q)));

      return matchesLetter && matchesQuery;
    });
  }, [items, search, selectedLetter]);

  return (
    <div className="w-full">
      {/* Search Input Bar */}
      <div className="relative max-w-2xl mx-auto mb-8">
        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter glossary terms, Sanskrit definitions, or aliases..."
          className="w-full pl-11 pr-10 py-3.5 rounded-sm bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-xs font-mono text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] shadow-xs transition-shadow"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-[var(--color-text-muted)] hover:text-[var(--color-text)] px-1.5 py-0.5"
          >
            Clear
          </button>
        )}
      </div>

      {/* Alphabetical A–Z Jump Scrubber */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 mb-10 pb-4 border-b border-[var(--color-border)]">
        <button
          onClick={() => setSelectedLetter('ALL')}
          className={`px-3 py-1.5 rounded-sm text-xs font-mono font-semibold transition-all ${
            selectedLetter === 'ALL'
              ? 'bg-[var(--color-text)] text-[var(--color-bg)] shadow-xs'
              : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)] bg-[var(--color-bg-elevated)] border border-[var(--color-border)]'
          }`}
        >
          ALL ({items.length})
        </button>

        {availableLetters.map((letter) => {
          const isSelected = selectedLetter === letter;
          const count = items.filter(
            (i) => i.term.charAt(0).toUpperCase() === letter
          ).length;

          return (
            <button
              key={letter}
              onClick={() => setSelectedLetter(letter)}
              className={`px-2.5 py-1.5 rounded-sm text-xs font-mono font-semibold transition-all ${
                isSelected
                  ? 'bg-[var(--color-text)] text-[var(--color-bg)] shadow-xs'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)] bg-[var(--color-bg-elevated)] border border-[var(--color-border)]'
              }`}
            >
              {letter}
              <span className="text-[10px] opacity-70 ml-1">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Counter Row */}
      <div className="flex items-center justify-between text-xs font-mono text-[var(--color-text-muted)] mb-6 px-1">
        <span>Displaying {filtered.length} of {items.length} archival terms</span>
        {(search || selectedLetter !== 'ALL') && (
          <button
            onClick={() => { setSearch(''); setSelectedLetter('ALL'); }}
            className="text-[var(--color-accent)] hover:underline"
          >
            Reset view filters
          </button>
        )}
      </div>

      {/* Terms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => {
            const isHighlighted = highlightedId === item.id;

            return (
              <motion.div
                key={item.id}
                id={item.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className={`p-6 rounded-sm border bg-[var(--color-bg-elevated)] flex flex-col justify-between transition-all ${
                  isHighlighted
                    ? 'border-[var(--color-accent)] ring-1 ring-[var(--color-accent)]/30 shadow-md'
                    : 'border-[var(--color-border)] hover:border-[var(--color-border-strong)] shadow-xs'
                }`}
              >
                <div>
                  {/* Term Header */}
                  <div className="flex items-baseline justify-between gap-2 mb-2 pb-2 border-b border-[var(--color-border)]">
                    <h2 className="text-xl font-serif font-bold text-[var(--color-text)]">
                      {item.term}
                    </h2>
                    <span className="font-mono text-[10px] text-[var(--color-accent)] uppercase tracking-wider font-semibold">
                      #{item.id}
                    </span>
                  </div>

                  {/* Also Known As */}
                  {item.aka && item.aka.length > 0 && (
                    <div className="text-xs font-mono text-[var(--color-text-muted)] mb-3">
                      Also referenced as:{' '}
                      <span className="text-[var(--color-text-secondary)] font-medium">
                        {item.aka.join(', ')}
                      </span>
                    </div>
                  )}

                  {/* Definition */}
                  <p className="text-sm text-[var(--color-text-secondary)] font-sans leading-relaxed mb-6">
                    {item.definition}
                  </p>
                </div>

                {/* Footnote Citation Cross-Reference */}
                {item.cite && item.cite.length > 0 && (
                  <div className="pt-3 border-t border-[var(--color-border)] flex items-center justify-between text-xs font-mono text-[var(--color-text-muted)] mt-auto">
                    <span>Citations: {item.cite.join(', ')}</span>
                    <Link
                      href={`/sources#${item.cite[0]}`}
                      className="inline-flex items-center gap-1 text-[var(--color-accent)] hover:underline font-semibold no-underline"
                    >
                      <span>Verify Source</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 px-4 rounded-sm bg-[var(--color-bg-elevated)] border border-[var(--color-border)]">
          <BookA className="w-8 h-8 mx-auto text-[var(--color-text-muted)] mb-3" />
          <h3 className="font-serif text-lg font-bold text-[var(--color-text)] mb-1">
            No Lexicon Entries Found
          </h3>
          <p className="text-xs text-[var(--color-text-secondary)] font-sans max-w-sm mx-auto mb-4">
            No glossary term matched &ldquo;{search}&rdquo;.
          </p>
          <button
            onClick={() => { setSearch(''); setSelectedLetter('ALL'); }}
            className="px-4 py-2 rounded-sm bg-[var(--color-text)] text-[var(--color-bg)] text-xs font-mono uppercase font-semibold"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
