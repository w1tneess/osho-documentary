'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUp, ShieldCheck, Scale, FileText } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg)] pt-16 sm:pt-20 pb-28 sm:pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-[var(--color-border)]">
          {/* Brand Colophon & Declassified Seal */}
          <div className="lg:col-span-5 max-w-md">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[var(--color-text-muted)] mb-4">
              <span className="w-1.5 h-1.5 rounded-none bg-[var(--color-accent)]" />
              <span>Archival Colophon • 1931–1990</span>
            </div>

            <div className="flex items-baseline gap-2 mb-4">
              <span className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-text)]">
                OSHO
              </span>
              <span className="text-xs font-mono tracking-widest text-[var(--color-accent)] uppercase font-semibold">
                DOCUMENTARY ARCHIVE
              </span>
            </div>

            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6 font-sans">
              An open-access, evidence-graded investigative inquiry into the life, philosophy, commune experiments, criminal trials, and cultural aftermath of Bhagwan Shree Rajneesh.
            </p>

            {/* Archival Standards Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider text-[var(--color-text-secondary)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] rounded-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Peer-Cross-Examined</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider text-[var(--color-text-secondary)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] rounded-sm">
                <Scale className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Evidence-Graded</span>
              </span>
            </div>

            {/* Authentic Signature Archive */}
            <div className="pt-6 border-t border-[var(--color-border)] flex items-center gap-4">
              <img
                src="/images/archival/osho-signature.webp"
                alt="Osho authentic signature"
                className="signature-archival h-9 w-auto opacity-85 hover:opacity-100 transition-opacity dark:invert dark:opacity-90 select-none"
              />
              <div className="text-[11px] font-mono text-[var(--color-text-muted)] leading-tight">
                <div className="font-semibold text-[var(--color-text-secondary)]">Authentic Signature Archive</div>
                <div>Historical Handwriting Sample • 1931–1990</div>
              </div>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10 text-sm">
            <div>
              <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text)] mb-4 font-bold">
                Core Pillars
              </h4>
              <ul className="space-y-2.5 font-sans">
                <li>
                  <Link
                    href="/life"
                    className="text-xs sm:text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] no-underline transition-colors"
                  >
                    Biography & Arc
                  </Link>
                </li>
                <li>
                  <Link
                    href="/teachings"
                    className="text-xs sm:text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] no-underline transition-colors"
                  >
                    Core Teachings
                  </Link>
                </li>
                <li>
                  <Link
                    href="/movement"
                    className="text-xs sm:text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] no-underline transition-colors"
                  >
                    The Communes
                  </Link>
                </li>
                <li>
                  <Link
                    href="/controversies"
                    className="text-xs sm:text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] no-underline transition-colors"
                  >
                    Bioterror & Trials
                  </Link>
                </li>
                <li>
                  <Link
                    href="/legacy"
                    className="text-xs sm:text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] no-underline transition-colors"
                  >
                    Modern Legacy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text)] mb-4 font-bold">
                Investigation
              </h4>
              <ul className="space-y-2.5 font-sans">
                <li>
                  <Link
                    href="/timeline"
                    className="text-xs sm:text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] no-underline transition-colors"
                  >
                    Interactive Timeline
                  </Link>
                </li>
                <li>
                  <Link
                    href="/gallery"
                    className="text-xs sm:text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] no-underline transition-colors flex items-center justify-between"
                  >
                    <span>Photo Vault</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 bg-[var(--color-accent-subtle)] text-[var(--color-accent)] rounded-none">32</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/paths"
                    className="text-xs sm:text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] no-underline transition-colors"
                  >
                    Curated Pathways
                  </Link>
                </li>
                <li>
                  <Link
                    href="/map"
                    className="text-xs sm:text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] no-underline transition-colors"
                  >
                    Geopolitical Map
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sources"
                    className="text-xs sm:text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] no-underline transition-colors"
                  >
                    Primary Source Vault
                  </Link>
                </li>
                <li>
                  <Link
                    href="/glossary"
                    className="text-xs sm:text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] no-underline transition-colors"
                  >
                    Archival Glossary
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text)] mb-4 font-bold">
                Standards
              </h4>
              <ul className="space-y-2.5 font-sans">
                <li>
                  <Link
                    href="/method"
                    className="text-xs sm:text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] no-underline transition-colors"
                  >
                    Forensic Method
                  </Link>
                </li>
                <li>
                  <Link
                    href="/corrections"
                    className="text-xs sm:text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] no-underline transition-colors"
                  >
                    Corrections Log
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-xs sm:text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] no-underline transition-colors"
                  >
                    Editorial Charter
                  </Link>
                </li>
                <li className="pt-2">
                  <button
                    onClick={scrollToTop}
                    className="group inline-flex items-center gap-2 px-3 py-2 rounded-sm border border-[var(--color-border)] hover:border-[var(--color-accent)] bg-[var(--color-bg-elevated)] text-xs font-mono uppercase tracking-wider text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors cursor-pointer min-h-[44px]"
                    aria-label="Scroll to top of page"
                  >
                    <span>Back to Top</span>
                    <ArrowUp className="w-3.5 h-3.5 text-[var(--color-accent)] transition-transform group-hover:-translate-y-0.5" />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Colophon Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[var(--color-text-muted)] gap-4">
          <div>1931–1990 • Historical & Educational Archival Corpus • Zero Fabricated Claims</div>
          <div>All Claims Graded: Established / Reported / Disputed / Alleged</div>
        </div>
      </div>
    </footer>
  );
}
