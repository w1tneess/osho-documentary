import React from 'react';
import type { Metadata } from 'next';
import { ReadingPaths } from '@/components/ui/ReadingPaths';
import { Compass, BookMarked } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Curated Reading Paths | Osho Documentary Archive',
  description: 'Choose your guided pathway through the archive: executive primer, complete chronological narrative, or forensic fact-check.',
};

export default function PathsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Archival Folio Header */}
      <div className="mb-14 border-b border-[var(--color-border)] pb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[var(--color-accent-subtle)] text-[var(--color-accent)] border border-[var(--color-accent)]/20 text-xs font-mono uppercase tracking-widest font-semibold mb-4">
          <Compass className="w-3.5 h-3.5" />
          <span>Curated Reading Pathways • Folio #RP-1931</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[var(--color-text)] mb-4 tracking-tight">
          Guided Archival Journeys
        </h1>

        <p className="text-base sm:text-lg text-[var(--color-text-secondary)] max-w-3xl leading-relaxed font-sans">
          The documentary corpus contains extensive trial testimonies, biographical chapters, and philosophical analyses. Choose a pathway tailored to your research objectives—from rapid evidentiary primers to exhaustive chronological investigations. Your chapter progress is saved locally.
        </p>
      </div>

      {/* Reading Paths Interactive Component */}
      <ReadingPaths />
    </div>
  );
}
