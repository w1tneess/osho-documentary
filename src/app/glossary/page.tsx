import React from 'react';
import type { Metadata } from 'next';
import { getAllGlossary } from '@/lib/contentData';
import { GlossaryDirectory } from '@/components/glossary/GlossaryDirectory';
import { BookA, BookmarkCheck } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Archival Lexicon & Movement Glossary | Osho Documentary',
  description: 'Definitive reference for Sanskrit spiritual terms, internal commune designations, and legal definitions in the Osho historical record.',
};

export default function GlossaryPage() {
  const items = getAllGlossary();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Archival Folio Header */}
      <div className="mb-14 border-b border-[var(--color-border)] pb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[var(--color-accent-subtle)] text-[var(--color-accent)] border border-[var(--color-accent)]/20 text-xs font-mono uppercase tracking-widest font-semibold mb-4">
          <BookA className="w-3.5 h-3.5" />
          <span>Historical & Movement Lexicon • Folio #LEX-09</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[var(--color-text)] mb-4 tracking-tight">
          Archival Glossary & Lexicon
        </h1>

        <p className="text-base sm:text-lg text-[var(--color-text-secondary)] max-w-3xl leading-relaxed font-sans mb-6">
          Sanskrit concepts, specialized commune administrative terminology, and criminal legal definitions crucial for understanding the historical record of Bhagwan Shree Rajneesh, Rajneeshpuram, and the Neo-Sannyas movement.
        </p>

        {/* Cross-Reference Notice */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-sm bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-xs font-mono">
          <div className="flex items-center gap-2.5 text-[var(--color-text-secondary)]">
            <BookmarkCheck className="w-4 h-4 text-[var(--color-accent)] shrink-0" />
            <span>Terms automatically cross-reference source citations in our primary evidentiary vault.</span>
          </div>

          <Link
            href="/sources"
            className="inline-flex items-center gap-1.5 text-[var(--color-accent)] hover:underline shrink-0 font-semibold"
          >
            <span>Consult Source Vault</span>
            <span>→</span>
          </Link>
        </div>
      </div>

      {/* Interactive Glossary Directory */}
      <GlossaryDirectory items={items} />
    </div>
  );
}
