import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Scale, 
  AlertOctagon, 
  CheckCircle2, 
  Newspaper, 
  HelpCircle, 
  AlertTriangle, 
  ArrowLeft,
  ArrowRight,
  BookOpen,
  FileCheck2,
  FileSearch
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Investigative Methodology & Evidence Standards | Osho Documentary',
  description: 'Forensic standards separating verified historical facts from commune hagiography, government prejudice, and tabloid sensationalism.',
};

export default function MethodPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 pb-32 sm:pb-20">
      {/* Back Link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] hover:text-[var(--color-accent)] mb-8 sm:mb-10 no-underline min-h-[44px]"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Archival Home
      </Link>

      {/* Archival Folio Header */}
      <div className="mb-14 border-b border-[var(--color-border)] pb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[var(--color-accent-subtle)] text-[var(--color-accent)] border border-[var(--color-accent)]/20 text-xs font-mono uppercase tracking-widest font-semibold mb-4">
          <FileSearch className="w-3.5 h-3.5" />
          <span>Research Protocol & Epistemological Standards • Folio #METHOD-01</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[var(--color-text)] mb-4 tracking-tight">
          Investigative Methodology & Evidentiary Standards
        </h1>

        <p className="text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed font-sans max-w-3xl">
          How this documentary separates verified historical fact from commune hagiography, government hysteria, and sensationalist tabloid coverage.
        </p>
      </div>

      <div className="space-y-14">
        {/* Core Principles */}
        <div className="p-8 sm:p-10 rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-elevated)] shadow-xs">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--color-text)] mb-6">
            Core Principles of Historical Neutrality
          </h2>

          <div className="space-y-6 text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed font-sans">
            <div className="flex items-start gap-4">
              <span className="p-2.5 rounded-sm bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0 mt-1 border border-emerald-500/20">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <div>
                <strong className="text-[var(--color-text)] block mb-1">
                  Evidence-First Primacy:
                </strong>
                No claim is accepted as established truth simply because it was published in a sannyasin devotional memoir or an anti-cult tabloid headline. Sworn U.S. District Court transcripts, declassified FBI affidavits, CDC laboratory cultures, and contemporary magnetic audio recordings take absolute priority over retrospective recollections.
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="p-2.5 rounded-sm bg-[var(--color-accent-subtle)] text-[var(--color-accent)] shrink-0 mt-1 border border-[var(--color-accent)]/20">
                <Scale className="w-5 h-5" />
              </span>
              <div>
                <strong className="text-[var(--color-text)] block mb-1">
                  Multi-Perspective Archival Lenses:
                </strong>
                Whenever a major historical inflection point is subject to conflicting narratives—such as Osho’s level of awareness regarding the 1984 salmonella contamination or allegations of Oklahoma prison poisoning—the competing accounts are presented with their specific evidentiary strengths and conflicts.
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="p-2.5 rounded-sm bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0 mt-1 border border-blue-500/20">
                <AlertOctagon className="w-5 h-5" />
              </span>
              <div>
                <strong className="text-[var(--color-text)] block mb-1">
                  Strict Separation of Philosophy from Municipal Crimes:
                </strong>
                The spiritual discourses of Rajneesh on meditation, Eastern mysticism, Zen parables, and Tantra are critically appraised on their intellectual and phenomenological merits, distinct from the conspiratorial actions and municipal malfeasance of commune administrative lieutenants.
              </div>
            </div>
          </div>
        </div>

        {/* Claim Strength Tiers */}
        <div>
          <div className="mb-6">
            <div className="text-xs font-mono uppercase tracking-[0.2em] font-semibold text-[var(--color-accent)] mb-1">
              Epistemological Framework
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--color-text)]">
              The Evidence Grading Classification System
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Established */}
            <div className="p-6 rounded-sm border border-[var(--color-border)] border-l-2 border-l-emerald-500 bg-[var(--color-bg-elevated)] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-emerald-700 dark:text-emerald-400">
                    Established Fact • Tier 1
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed font-sans mb-4">
                  Corroborated by multiple independent reliable sources, sworn grand jury transcripts, physical CDC lab results, or verified audio/video recordings.
                </p>
              </div>
              <div className="p-3 rounded-sm bg-[var(--color-bg-inset)] text-[11px] font-mono text-[var(--color-text-muted)] border border-[var(--color-border)]">
                Ex: The intentional Salmonella contamination of 751 citizens in The Dalles, Oregon.
              </div>
            </div>

            {/* Reported */}
            <div className="p-6 rounded-sm border border-[var(--color-border)] border-l-2 border-l-blue-500 bg-[var(--color-bg-elevated)] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Newspaper className="w-4 h-4 text-blue-500" />
                  <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-blue-700 dark:text-blue-400">
                    Reported Observation • Tier 2
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed font-sans mb-4">
                  Documented by credible journalistic organizations (The Oregonian, The New York Times) or academic sociologists, without direct physical forensic proof.
                </p>
              </div>
              <div className="p-3 rounded-sm bg-[var(--color-bg-inset)] text-[11px] font-mono text-[var(--color-text-muted)] border border-[var(--color-border)]">
                Ex: Estimates of commune cash flow and internal financial reserves prior to dissolution.
              </div>
            </div>

            {/* Disputed */}
            <div className="p-6 rounded-sm border border-[var(--color-border)] border-l-2 border-l-amber-500 bg-[var(--color-bg-elevated)] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <HelpCircle className="w-4 h-4 text-amber-500" />
                  <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-amber-700 dark:text-amber-400">
                    Disputed Narrative • Contested
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed font-sans mb-4">
                  Parties offer irreconcilable accounts with competing documentary evidence.
                </p>
              </div>
              <div className="p-3 rounded-sm bg-[var(--color-bg-inset)] text-[11px] font-mono text-[var(--color-text-muted)] border border-[var(--color-border)]">
                Ex: Whether Osho was personally cognizant of the wiretaps and poison plots before Sheela fled to Europe.
              </div>
            </div>

            {/* Alleged */}
            <div className="p-6 rounded-sm border border-[var(--color-border)] border-l-2 border-l-rose-500 bg-[var(--color-bg-elevated)] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-4 h-4 text-rose-500" />
                  <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-rose-700 dark:text-rose-400">
                    Partisan Allegation • Uncorroborated
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed font-sans mb-4">
                  Claims made by partisan figures without objective validation or corroborating evidence.
                </p>
              </div>
              <div className="p-3 rounded-sm bg-[var(--color-bg-inset)] text-[11px] font-mono text-[var(--color-text-muted)] border border-[var(--color-border)]">
                Ex: Disciples’ claim that Osho was administered lethal thallium radiation while jailed in Oklahoma.
              </div>
            </div>
          </div>
        </div>

        {/* Quick Link Footer */}
        <div className="pt-8 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/sources"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-sm bg-[var(--color-text)] text-[var(--color-bg)] font-sans font-medium text-xs no-underline uppercase tracking-wider font-mono hover:opacity-90 transition-opacity"
          >
            <span>Consult All 25+ Primary Sources</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            href="/corrections"
            className="text-xs font-mono text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
          >
            View Public Archival Corrections Log →
          </Link>
        </div>
      </div>
    </div>
  );
}
