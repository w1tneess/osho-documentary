'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ExternalLink, 
  BookCheck, 
  FileText, 
  Landmark, 
  GraduationCap, 
  Newspaper, 
  Copy, 
  Check, 
  Sparkles,
  Filter,
  ShieldAlert,
  ShieldCheck
} from 'lucide-react';
import type { SourceItem } from '@/lib/types';

interface SourcesDirectoryProps {
  sources: SourceItem[];
}

export function SourcesDirectory({ sources }: SourcesDirectoryProps) {
  const [query, setQuery] = useState('');
  const [activeType, setActiveType] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

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

  const copyCitation = (item: SourceItem) => {
    const citation = `${item.author} (${item.year || 'n.d.'}). "${item.title}". ${item.publisher || ''}. Ref ID: ${item.id}.`;
    navigator.clipboard.writeText(citation);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const getSourceCategory = (type: string) => {
    switch (type) {
      case 'primary':
      case 'court':
        return { label: 'Primary / Court Record', color: 'emerald', tier: 'Tier 1 Evidence' };
      case 'academic':
        return { label: 'Peer-Reviewed Academic', color: 'blue', tier: 'Tier 1 Evidence' };
      case 'journalism':
      case 'media':
        return { label: 'Investigative Journalism', color: 'amber', tier: 'Tier 2 Corroborated' };
      case 'memoir':
      case 'book':
        return { label: 'Historical Memoir / Book', color: 'purple', tier: 'Tier 2 Secondary' };
      case 'partisan':
        return { label: 'Discourse Archive / Partisan', color: 'rose', tier: 'Primary Partisan' };
      default:
        return { label: 'Archival Reference', color: 'neutral', tier: 'Archival Reference' };
    }
  };

  const filterTabs = [
    { id: 'all', label: 'All Sources', count: sources.length },
    { id: 'court_primary', label: 'Primary & Legal', count: sources.filter(s => s.type === 'primary' || s.type === 'court').length },
    { id: 'academic', label: 'Academic & CDC', count: sources.filter(s => s.type === 'academic').length },
    { id: 'journalism', label: 'Journalism', count: sources.filter(s => s.type === 'journalism' || s.type === 'media').length },
    { id: 'memoir_book', label: 'Memoirs & Books', count: sources.filter(s => s.type === 'memoir' || s.type === 'book').length },
    { id: 'partisan', label: 'Audio Archives', count: sources.filter(s => s.type === 'partisan').length },
  ];

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return sources.filter((s) => {
      const matchesQuery =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.author.toLowerCase().includes(q) ||
        (s.notes && s.notes.toLowerCase().includes(q)) ||
        (s.publisher && s.publisher.toLowerCase().includes(q)) ||
        s.id.toLowerCase().includes(q);

      let matchesType = true;
      if (activeType === 'court_primary') {
        matchesType = s.type === 'primary' || s.type === 'court';
      } else if (activeType === 'journalism') {
        matchesType = s.type === 'journalism' || s.type === 'media';
      } else if (activeType === 'memoir_book') {
        matchesType = s.type === 'memoir' || s.type === 'book';
      } else if (activeType !== 'all') {
        matchesType = s.type === activeType;
      }

      return matchesQuery && matchesType;
    });
  }, [sources, query, activeType]);

  return (
    <div className="w-full">
      {/* Archival Vault Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <div className="p-4 rounded-sm bg-[var(--color-bg-elevated)] border border-[var(--color-border)]">
          <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-text-muted)] mb-1">
            Total Citations
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-[var(--color-text)]">
            {sources.length}
          </div>
          <div className="text-[11px] font-mono text-[var(--color-accent)] mt-0.5">
            Indexed in Vault
          </div>
        </div>

        <div className="p-4 rounded-sm bg-[var(--color-bg-elevated)] border border-[var(--color-border)]">
          <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-text-muted)] mb-1">
            Tier 1 Evidentiary
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400">
            {sources.filter(s => s.type === 'primary' || s.type === 'court' || s.type === 'academic').length}
          </div>
          <div className="text-[11px] font-mono text-emerald-600/80 dark:text-emerald-400/80 mt-0.5">
            Court & Peer-Reviewed
          </div>
        </div>

        <div className="p-4 rounded-sm bg-[var(--color-bg-elevated)] border border-[var(--color-border)]">
          <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-text-muted)] mb-1">
            Investigative Media
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-amber-600 dark:text-amber-400">
            {sources.filter(s => s.type === 'journalism' || s.type === 'book').length}
          </div>
          <div className="text-[11px] font-mono text-amber-600/80 dark:text-amber-400/80 mt-0.5">
            Pulitzer & Major Presses
          </div>
        </div>

        <div className="p-4 rounded-sm bg-[var(--color-bg-elevated)] border border-[var(--color-border)]">
          <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-text-muted)] mb-1">
            Discoursal Tape Corpus
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-[var(--color-text)]">
            5,000+
          </div>
          <div className="text-[11px] font-mono text-[var(--color-text-muted)] mt-0.5">
            Hours Recorded Audio
          </div>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="relative max-w-2xl mx-auto mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search archives by author, book title, FBI case number, or keywords..."
          className="w-full pl-11 pr-12 py-3 rounded-sm bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] text-base sm:text-xs font-mono shadow-xs transition-shadow min-h-[44px]"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-mono text-[var(--color-text-muted)] hover:text-[var(--color-text)] min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
            aria-label="Clear search query"
          >
            Clear
          </button>
        )}
      </div>

      {/* Filter Category Tabs: Horizontal swipe rail on mobile */}
      <div className="flex items-center gap-2 mb-10 overflow-x-auto no-scrollbar flex-nowrap -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center pb-2">
        {filterTabs.map((tab) => {
          const isActive = activeType === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveType(tab.id)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-sm text-xs font-mono uppercase tracking-wider font-semibold transition-all shrink-0 min-h-[44px] flex items-center justify-center cursor-pointer ${
                isActive
                  ? 'bg-[var(--color-text)] text-[var(--color-bg)] shadow-xs'
                  : 'bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] border border-[var(--color-border)]'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-none font-mono ${
                  isActive
                    ? 'bg-[var(--color-bg)]/20 text-[var(--color-bg)]'
                    : 'bg-[var(--color-bg-inset)] text-[var(--color-text-muted)]'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between text-xs font-mono text-[var(--color-text-muted)] mb-6 px-1 border-b border-[var(--color-border)] pb-3">
        <span>Displaying {filtered.length} of {sources.length} indexed historical records</span>
        {activeType !== 'all' && (
          <button
            onClick={() => { setActiveType('all'); setQuery(''); }}
            className="text-[var(--color-accent)] hover:underline"
          >
            Reset filter view
          </button>
        )}
      </div>

      {/* Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => {
            const cat = getSourceCategory(item.type);
            const isHighlighted = highlightedId === item.id;
            const isCopied = copiedId === item.id;

            return (
              <motion.div
                key={item.id}
                id={item.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className={`relative flex flex-col justify-between p-6 rounded-sm border bg-[var(--color-bg-elevated)] transition-all ${
                  isHighlighted
                    ? 'border-[var(--color-accent)] ring-1 ring-[var(--color-accent)]/30 shadow-md'
                    : 'border-[var(--color-border)] hover:border-[var(--color-border-strong)] shadow-xs'
                }`}
              >
                <div>
                  {/* Top Provenance Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span
                      className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-none font-semibold border ${
                        cat.color === 'emerald'
                          ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/25'
                          : cat.color === 'blue'
                          ? 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/25'
                          : cat.color === 'amber'
                          ? 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/25'
                          : cat.color === 'purple'
                          ? 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/25'
                          : 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/25'
                      }`}
                    >
                      {cat.tier}
                    </span>

                    <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-text-muted)]">
                      {item.year && <span>{item.year}</span>}
                      <span>•</span>
                      <span className="font-semibold text-[var(--color-text-secondary)]">
                        #{item.id}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[var(--color-text)] mb-2 leading-snug">
                    {item.title}
                  </h3>

                  {/* Metadata Row */}
                  <div className="space-y-1 mb-4 text-xs font-mono text-[var(--color-text-muted)]">
                    <div>
                      Author / Investigator:{' '}
                      <span className="font-semibold text-[var(--color-text-secondary)]">
                        {item.author}
                      </span>
                    </div>
                    {item.publisher && (
                      <div>
                        Publisher / Entity:{' '}
                        <span className="text-[var(--color-text-secondary)]">
                          {item.publisher}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Curatorial Archival Notes */}
                  {item.notes && (
                    <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed font-sans mb-4">
                      {item.notes}
                    </p>
                  )}
                </div>

                {/* Footer Actions */}
                <div className="pt-3 border-t border-[var(--color-border)] flex items-center justify-between gap-3 text-xs font-mono text-[var(--color-text-muted)] mt-auto">
                  <button
                    onClick={() => copyCitation(item)}
                    className="inline-flex items-center gap-1.5 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors cursor-pointer min-h-[44px] py-1 active:opacity-70"
                    title="Copy formatted citation"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Citation Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Citation</span>
                      </>
                    )}
                  </button>

                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[var(--color-accent)] hover:underline no-underline min-h-[44px] py-1"
                    >
                      <span>Digital Repository</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-[11px] text-[var(--color-text-muted)] min-h-[44px] flex items-center">
                      Archival Vault Copy
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 px-4 rounded-sm bg-[var(--color-bg-elevated)] border border-[var(--color-border)]">
          <FileText className="w-8 h-8 mx-auto text-[var(--color-text-muted)] mb-3" />
          <h3 className="font-serif text-lg font-bold text-[var(--color-text)] mb-1">
            No Primary Records Found
          </h3>
          <p className="text-xs font-sans text-[var(--color-text-secondary)] max-w-md mx-auto mb-4">
            No source matches your query &ldquo;{query}&rdquo; under the selected category.
          </p>
          <button
            onClick={() => { setQuery(''); setActiveType('all'); }}
            className="px-4 py-2 rounded-sm bg-[var(--color-text)] text-[var(--color-bg)] text-xs font-mono font-semibold uppercase"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
}
