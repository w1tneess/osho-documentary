import React from 'react';
import type { Metadata } from 'next';
import { getAllSources } from '@/lib/contentData';
import { SourcesDirectory } from '@/components/sources/SourcesDirectory';
import { BookOpen, ShieldCheck, FileCheck } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Primary Sources, Trial Records & Bibliography | Osho Documentary',
  description: 'Complete cross-verified archival repository of government trial documents, FBI files, CDC epidemiological studies, and academic monographs.',
};

export default function SourcesPage() {
  const sources = getAllSources();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 pb-32 sm:pb-20">
      {/* Archival Folio Header */}
      <div className="mb-14 border-b border-[var(--color-border)] pb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[var(--color-accent-subtle)] text-[var(--color-accent)] border border-[var(--color-accent)]/20 text-xs font-mono uppercase tracking-widest font-semibold mb-4">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Evidentiary Archive & Bibliography • Folio #SRC-VAULT</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[var(--color-text)] mb-4 tracking-tight">
          Primary Sources & Evidentiary Vault
        </h1>

        <p className="text-base sm:text-lg text-[var(--color-text-secondary)] max-w-3xl leading-relaxed font-sans mb-6">
          Every statement, chronology marker, and analytical conclusion across this documentary is anchored in verifiable primary evidence. We stratify sources into strict credibility tiers: grand jury exhibits, CDC field epidemiological reports, peer-reviewed academic literature, and partisan movement publications.
        </p>

        {/* Methodology Notice Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-sm bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-xs font-mono">
          <div className="flex items-center gap-2.5 text-[var(--color-text-secondary)]">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>All 25+ entries vetted against Original U.S. District Court & Wasco County dockets.</span>
          </div>

          <Link
            href="/method"
            className="inline-flex items-center gap-1.5 text-[var(--color-accent)] hover:underline shrink-0 font-semibold"
          >
            <span>Review Evidence Grading Protocol</span>
            <span>→</span>
          </Link>
        </div>
      </div>

      {/* Interactive Sources Research Directory */}
      <SourcesDirectory sources={sources} />
    </div>
  );
}
