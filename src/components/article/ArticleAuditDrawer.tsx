'use client';

import React, { useState } from 'react';
import { ShieldCheck, ChevronDown, ChevronUp, AlertCircle, FileSpreadsheet } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ArticleAuditDrawerProps {
  title: string;
  slug: string;
  sourceCount: number;
  claimCounts: {
    established: number;
    reported: number;
    disputed: number;
    alleged: number;
    interpretation: number;
  };
  wordCount: number;
  readingTimeMinutes: number;
  lastReviewed?: string;
}

export function ArticleAuditDrawer({
  title,
  slug,
  sourceCount,
  claimCounts,
  wordCount,
  readingTimeMinutes,
  lastReviewed = '2024-05-20',
}: ArticleAuditDrawerProps) {
  const [open, setOpen] = useState(false);

  const issueUrl = `https://github.com/advait/osho-documentary/issues/new?title=${encodeURIComponent(
    `[Discrepancy Report]: ${title}`
  )}&body=${encodeURIComponent(
    `Article: ${slug}\nDiscrepancy Details:\n\nRequested Evidence / Citation Correction:`
  )}`;

  return (
    <div className="my-10 double-bezel not-prose">
      <div className="double-bezel-inner overflow-hidden text-xs font-sans">
        <button
          onClick={() => setOpen(!open)}
          className="w-full p-5 flex items-center justify-between text-left hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors cursor-pointer"
          aria-expanded={open}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <span className="font-mono uppercase tracking-[0.18em] text-[10px] font-bold text-[var(--color-text)] block">
                Editorial Transparency & Verification Audit
              </span>
              <span className="text-[11px] text-[var(--color-text-secondary)]">
                {sourceCount} Verified Primary Sources • {wordCount} Words • {readingTimeMinutes} min reading duration
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
            <span className="text-[11px] font-mono hidden sm:inline">{open ? 'Hide Audit' : 'Inspect Audit'}</span>
            {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
              className="p-5 pt-2 border-t border-black/[0.06] dark:border-white/[0.08] space-y-4 overflow-hidden"
            >
              <p className="text-[var(--color-text-secondary)] leading-relaxed text-xs">
                This dossier was compiled adhering to strict forensic documentary standards. Every factual premise
                is checked against federal trial archives, peer-reviewed monographs, and firsthand testimonies.
              </p>

              {/* Claims breakdown */}
              <div>
                <div className="font-mono text-[9px] uppercase tracking-widest text-[var(--color-text-muted)] mb-2.5">
                  Evidentiary Weight Stratification
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-center font-mono">
                  <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                    <div className="text-lg font-bold">{claimCounts.established}</div>
                    <div className="text-[9px] uppercase tracking-wider">Established</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-700 dark:text-blue-300">
                    <div className="text-lg font-bold">{claimCounts.reported}</div>
                    <div className="text-[9px] uppercase tracking-wider">Reported</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300">
                    <div className="text-lg font-bold">{claimCounts.disputed}</div>
                    <div className="text-[9px] uppercase tracking-wider">Disputed</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-300">
                    <div className="text-lg font-bold">{claimCounts.alleged}</div>
                    <div className="text-[9px] uppercase tracking-wider">Alleged</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-700 dark:text-purple-300">
                    <div className="text-lg font-bold">{claimCounts.interpretation}</div>
                    <div className="text-[9px] uppercase tracking-wider">Analysis</div>
                  </div>
                </div>
              </div>

              {/* Verification Status & Link */}
              <div className="pt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-black/[0.04] dark:border-white/[0.06] font-mono text-[11px] text-[var(--color-text-muted)]">
                <div>
                  Archival Fact-Check: <span className="text-[var(--color-text)] font-semibold">{lastReviewed}</span>
                </div>
                <a
                  href={issueUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[var(--color-accent)] hover:underline"
                >
                  <AlertCircle className="w-3.5 h-3.5" /> Report Discrepancy via GitHub
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
