import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllCorrections } from '@/lib/contentData';
import { Calendar, ArrowRight, History, GitPullRequest, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Public Corrections Log | Osho Documentary Archive',
  description: 'Complete transparent record of factual corrections, retractions, and revisions made to this archive.',
};

export default function CorrectionsPage() {
  const corrections = getAllCorrections();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Archival Folio Header */}
      <div className="mb-14 border-b border-[var(--color-border)] pb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[var(--color-accent-subtle)] text-[var(--color-accent)] border border-[var(--color-accent)]/20 text-xs font-mono uppercase tracking-widest font-semibold mb-4">
          <History className="w-3.5 h-3.5" />
          <span>Archival Transparency Log • Ledger #CORR-HIST</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[var(--color-text)] mb-4 tracking-tight">
          Public Corrections Log
        </h1>

        <p className="text-base sm:text-lg text-[var(--color-text-secondary)] max-w-3xl leading-relaxed font-sans">
          Historical rigor requires ruthless transparency. When factual errors, conflations, or omissions are verified, they are corrected and permanently recorded here with an explanation of why the change occurred.
        </p>
      </div>

      {/* Corrections Policy Card */}
      <div className="p-6 sm:p-8 mb-12 rounded-sm bg-[var(--color-bg-elevated)] border border-[var(--color-border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xs">
        <div>
          <h2 className="font-serif font-bold text-lg sm:text-xl text-[var(--color-text)] mb-1">
            Our Correction Charter
          </h2>
          <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] font-sans max-w-xl leading-relaxed">
            We never silently edit factual claims. All substantive revisions to dates, demographic figures, participant testimonies, or legal findings are permanently logged with their corresponding archival source.
          </p>
        </div>

        <a
          href="https://github.com/advait/osho-documentary/issues/new?title=%5BCorrection+Notice%5D+Factual+Discrepancy"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-[var(--color-text)] text-[var(--color-bg)] text-xs font-mono font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity no-underline shrink-0 shadow-xs"
        >
          <GitPullRequest className="w-3.5 h-3.5" />
          <span>Submit Correction</span>
        </a>
      </div>

      {/* Corrections List */}
      <div className="space-y-6">
        {corrections.map((corr) => (
          <div
            key={corr.id}
            className="p-6 sm:p-7 rounded-sm bg-[var(--color-bg-elevated)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)] transition-all shadow-xs"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3 pb-3 border-b border-[var(--color-border)]">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-[var(--color-accent)]">
                  #{corr.id}
                </span>
                <span className="flex items-center gap-1.5 text-xs font-mono text-[var(--color-text-muted)]">
                  <Calendar className="w-3.5 h-3.5 text-[var(--color-accent)]" /> {corr.date}
                </span>
              </div>

              <span className="px-2 py-0.5 rounded-none text-[10px] font-mono uppercase tracking-wider font-semibold bg-[var(--color-bg-inset)] text-[var(--color-text-secondary)] border border-[var(--color-border)]">
                {corr.reason}
              </span>
            </div>

            <p className="text-sm sm:text-base text-[var(--color-text-secondary)] mb-4 leading-relaxed font-sans">
              {corr.description}
            </p>

            <div className="flex items-center justify-between pt-2 text-xs font-mono text-[var(--color-text-muted)]">
              <Link
                href={`/articles/${corr.page}`}
                className="text-[var(--color-accent)] hover:underline flex items-center gap-1 font-semibold no-underline"
              >
                <span>Inspect Affected Article</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              {corr.cite && corr.cite.length > 0 && (
                <span>
                  Cited Source: <strong className="text-[var(--color-text-secondary)]">{corr.cite.join(', ')}</strong>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
