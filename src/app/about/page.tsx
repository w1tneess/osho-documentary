import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Scale, FileText, BookOpen, AlertCircle, ArrowRight, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About the Archive & Editorial Charter | Osho Documentary',
  description: 'Our mission, forensic methodology, neutrality policy, and strict editorial standards.',
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Archival Folio Header */}
      <div className="mb-14 border-b border-[var(--color-border)] pb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[var(--color-accent-subtle)] text-[var(--color-accent)] border border-[var(--color-accent)]/20 text-xs font-mono uppercase tracking-widest font-semibold mb-4">
          <Scale className="w-3.5 h-3.5" />
          <span>Editorial Independence Charter • Folio #ABOUT-CHARTER</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[var(--color-text)] mb-4 tracking-tight">
          About the Documentary Archive
        </h1>

        <p className="text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed font-sans max-w-3xl">
          An independent, open-access historical research initiative documenting the life, movement, controversies, and legacy of Bhagwan Shree Rajneesh (Osho) using forensic evidentiary standards.
        </p>
      </div>

      <div className="space-y-12 font-sans text-[var(--color-text)] leading-relaxed">
        {/* Core Mission */}
        <section className="p-8 sm:p-10 rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-elevated)] shadow-xs">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--color-text)] mb-4">
            Our Core Mission & Mandate
          </h2>
          <p className="text-base text-[var(--color-text-secondary)] mb-4 leading-relaxed">
            Bhagwan Shree Rajneesh (1931–1990) remains one of the most polarizing cultural and spiritual figures of the 20th century. Mainstream portrayals routinely veer between hagiography produced by disciples and sensationalized true-crime depictions in commercial television.
          </p>
          <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
            This documentary project exists to bridge that chasm. Our goal is not to persuade the reader of a single predetermined thesis, but to provide an evidence-stratified dossier that allows readers to examine primary U.S. court records, investigative journalism, scholarly monographs, and firsthand testimonies side-by-side.
          </p>
        </section>

        {/* The 5 Evidentiary Charter Rules */}
        <section className="p-8 sm:p-10 rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-elevated)] shadow-xs">
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-6 h-6 text-[var(--color-accent)]" />
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--color-text)]">
              The 5 Rules of Our Archival Charter
            </h2>
          </div>

          <div className="space-y-5 text-sm sm:text-base">
            <div className="flex items-start gap-4 pb-4 border-b border-[var(--color-border)]">
              <span className="font-mono text-xs font-bold text-[var(--color-accent)] px-2 py-0.5 rounded-none border border-[var(--color-border)] bg-[var(--color-bg-inset)] mt-0.5">
                01
              </span>
              <div>
                <strong className="text-[var(--color-text)] block mb-1">
                  Zero Fabricated Claims:
                </strong>
                <span className="text-[var(--color-text-secondary)]">
                  Every single date, number, quotation, or historical statement must be backed by an identifiable citation in our Primary Source Vault.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-4 pb-4 border-b border-[var(--color-border)]">
              <span className="font-mono text-xs font-bold text-[var(--color-accent)] px-2 py-0.5 rounded-none border border-[var(--color-border)] bg-[var(--color-bg-inset)] mt-0.5">
                02
              </span>
              <div>
                <strong className="text-[var(--color-text)] block mb-1">
                  Claim Strength Stratification:
                </strong>
                <span className="text-[var(--color-text-secondary)]">
                  Claims are explicitly categorized as <em>Established</em>, <em>Reported</em>, <em>Disputed</em>, <em>Alleged</em>, or <em>Interpretation</em>. No unsubstantiated rumor is ever presented as established fact.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-4 pb-4 border-b border-[var(--color-border)]">
              <span className="font-mono text-xs font-bold text-[var(--color-accent)] px-2 py-0.5 rounded-none border border-[var(--color-border)] bg-[var(--color-bg-inset)] mt-0.5">
                03
              </span>
              <div>
                <strong className="text-[var(--color-text)] block mb-1">
                  Equal Critical Scrutiny:
                </strong>
                <span className="text-[var(--color-text-secondary)]">
                  We subject the claims of government prosecutors, hostile politicians, commune leaders, and devotion-driven disciples to identical rigorous cross-examination.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-4 pb-4 border-b border-[var(--color-border)]">
              <span className="font-mono text-xs font-bold text-[var(--color-accent)] px-2 py-0.5 rounded-none border border-[var(--color-border)] bg-[var(--color-bg-inset)] mt-0.5">
                04
              </span>
              <div>
                <strong className="text-[var(--color-text)] block mb-1">
                  Transparent Public Corrections:
                </strong>
                <span className="text-[var(--color-text-secondary)]">
                  Whenever a factual mistake or mischaracterization is verified, we log it immediately and permanently in our public Corrections Log.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="font-mono text-xs font-bold text-[var(--color-accent)] px-2 py-0.5 rounded-none border border-[var(--color-border)] bg-[var(--color-bg-inset)] mt-0.5">
                05
              </span>
              <div>
                <strong className="text-[var(--color-text)] block mb-1">
                  Permanent Public Non-Commercial Access:
                </strong>
                <span className="text-[var(--color-text-secondary)]">
                  No paywalls, no tracking advertisements, no sponsored content, and zero institutional affiliation with either the Osho International Foundation or anti-cult interest groups.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Links to explore */}
        <section className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            href="/method"
            className="p-6 rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-elevated)] hover:border-[var(--color-accent)] transition-all no-underline group shadow-xs"
          >
            <div className="font-serif font-bold text-lg text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors mb-2">
              Forensic Methodology →
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed font-sans">
              Deep dive into how we evaluate source credibility tiers, evidentiary weight, and multi-perspective conflicts.
            </p>
          </Link>

          <Link
            href="/corrections"
            className="p-6 rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-elevated)] hover:border-[var(--color-accent)] transition-all no-underline group shadow-xs"
          >
            <div className="font-serif font-bold text-lg text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors mb-2">
              Public Corrections Log →
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed font-sans">
              Review our transparent ledger of factual rectifications, updated citations, and revision history.
            </p>
          </Link>
        </section>
      </div>
    </div>
  );
}
