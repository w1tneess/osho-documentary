'use client';

import React from 'react';
import Link from 'next/link';
import { ExternalLink, BookCheck, ArrowUpRight, ArrowUp } from 'lucide-react';
import { CitationData } from './CitationCard';

interface ReferencesListProps {
  citations: CitationData[];
}

export function ReferencesList({ citations }: ReferencesListProps) {
  if (citations.length === 0) return null;

  return (
    <section id="references-section" className="mt-16 pt-10 border-t border-black/[0.08] dark:border-white/[0.12] not-prose">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-accent)] font-bold block mb-1">
            Evidentiary Foundation
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--color-text)]">
            Primary References & Archival Records ({citations.length})
          </h2>
        </div>
        <Link
          href="/sources"
          className="group inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-black/[0.08] dark:border-white/[0.12] hover:border-amber-500 text-xs font-mono text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-all no-underline w-max"
        >
          <span>Examine Full Vault</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>

      <ol className="space-y-3.5 text-xs font-sans">
        {citations.map((c) => (
          <li
            key={c.num}
            id={`ref-${c.num}`}
            className="p-4 sm:p-5 rounded-sm bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.06] dark:border-white/[0.08] hover:border-amber-500/40 flex items-start gap-4 transition-all duration-300 hover:shadow-xs group"
          >
            <span className="font-mono font-bold text-[var(--color-accent)] shrink-0 text-sm mt-0.5">
              [{c.num}]
            </span>

            <div className="flex-1 space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-serif font-bold text-[var(--color-text)] text-sm sm:text-base leading-snug">
                  {c.title}
                </span>
                {c.type && (
                  <span className="px-2 py-0.5 rounded-none text-[9px] font-mono uppercase tracking-wider bg-black/5 dark:bg-white/10 text-[var(--color-text-secondary)] font-semibold border border-black/5 dark:border-white/10">
                    {c.type}
                  </span>
                )}
              </div>

              <div className="font-mono text-[11px] text-[var(--color-text-muted)]">
                {c.author && <span>{c.author}. </span>}
                {c.year && <span>({c.year}). </span>}
                {c.publisher && <span>{c.publisher}.</span>}
              </div>

              {c.notes && (
                <p className="text-[var(--color-text-secondary)] text-xs italic pt-1 leading-relaxed">
                  {c.notes}
                </p>
              )}

              <div className="flex items-center gap-5 pt-2 text-[11px] font-mono">
                <Link
                  href={`/sources#${c.id}`}
                  className="text-[var(--color-accent)] hover:underline flex items-center gap-1.5 font-medium"
                >
                  <BookCheck className="w-3.5 h-3.5" /> Source Vault Details
                </Link>
                {c.url && (
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] flex items-center gap-1"
                  >
                    Direct Document <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Back link to location in text */}
            <a
              href={`#cite-ref-${c.num}`}
              aria-label={`Jump back to citation ${c.num} in article`}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-all shrink-0 cursor-pointer"
            >
              <ArrowUp className="w-4 h-4" />
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
