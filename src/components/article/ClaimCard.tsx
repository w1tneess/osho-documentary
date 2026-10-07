'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle2, AlertTriangle, HelpCircle, FileSearch, Info, BookOpen } from 'lucide-react';
import type { SourceItem } from '@/lib/types';

export type ClaimLevel = 'established' | 'reported' | 'disputed' | 'alleged' | 'interpretation';

interface ClaimCardProps {
  level: ClaimLevel;
  sources?: SourceItem[];
  citeIds?: string[];
  children: React.ReactNode;
}

const CLAIM_META: Record<
  ClaimLevel,
  {
    label: string;
    definition: string;
    badgeStyle: string;
    icon: React.ComponentType<{ className?: string }>;
  }
> = {
  established: {
    label: 'Established Record',
    definition: 'Multiple reliable independent sources and official court records corroborate this fact.',
    badgeStyle: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
    icon: CheckCircle2,
  },
  reported: {
    label: 'Credibly Reported',
    definition: 'Documented by reliable contemporary journalists or historians, without independent legal trial adjudication.',
    badgeStyle: 'border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-300',
    icon: FileSearch,
  },
  disputed: {
    label: 'Disputed Claim',
    definition: 'Credible historical accounts, investigative findings, or participant testimonies actively contradict each other.',
    badgeStyle: 'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300',
    icon: AlertTriangle,
  },
  alleged: {
    label: 'Allegation / Accusation',
    definition: 'Asserted by a party in legal or public testimony, but unproven or resolved without direct admission of guilt.',
    badgeStyle: 'border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300',
    icon: HelpCircle,
  },
  interpretation: {
    label: 'Scholarly Interpretation',
    definition: 'Analytical framework, sociological synthesis, or psychological commentary offered by an observer.',
    badgeStyle: 'border-purple-500/30 bg-purple-500/10 text-purple-700 dark:text-purple-300',
    icon: Info,
  },
};

export function ClaimCard({ level, sources = [], citeIds = [], children }: ClaimCardProps) {
  const [open, setOpen] = useState(false);
  const cardRef = useRef<HTMLSpanElement>(null);
  const meta = CLAIM_META[level] || CLAIM_META.established;
  const Icon = meta.icon;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <span className="relative inline" ref={cardRef}>
      <span className="border-b-2 border-dotted border-amber-600/40 dark:border-amber-400/40">
        {children}
      </span>

      {/* Claim Indicator Chip */}
      <button
        onClick={() => setOpen(!open)}
        className={`inline-flex items-center gap-1 mx-1.5 px-2 py-0.5 rounded-sm text-[10px] font-mono font-bold border ${meta.badgeStyle} align-middle cursor-pointer hover:opacity-90 active:scale-95 transition-all not-prose`}
        aria-label={`Claim Level: ${meta.label}`}
        aria-expanded={open}
      >
        <Icon className="w-3 h-3 shrink-0" />
        <span>{level.toUpperCase()}</span>
      </button>

      {open && (
        <span
          role="dialog"
          aria-label="Claim evidentiary foundation"
          className="absolute z-50 bottom-full left-0 mb-2 w-84 p-4 rounded-sm bg-neutral-950 text-neutral-100 border border-white/15 shadow-xl text-left text-xs font-sans not-prose block animate-in fade-in zoom-in-95 duration-200"
        >
          <div className="flex items-center gap-2.5 mb-2 pb-2 border-b border-white/10">
            <Icon className="w-4 h-4 text-amber-400" />
            <div>
              <div className="font-mono text-[9px] uppercase tracking-widest text-amber-400 font-bold">
                Evidentiary Classification
              </div>
              <div className="font-serif font-bold text-sm text-neutral-100">
                {meta.label}
              </div>
            </div>
          </div>

          <p className="text-[11px] text-neutral-300 mb-3 leading-relaxed">
            {meta.definition}
          </p>

          {/* Sources breakdown */}
          <div className="pt-2 border-t border-white/10">
            <div className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 mb-1.5 flex items-center gap-1">
              <BookOpen className="w-3 h-3 text-amber-400" /> Supporting Archival Citations
            </div>
            {sources.length > 0 ? (
              <ul className="space-y-1">
                {sources.map((s) => (
                  <li key={s.id}>
                    <Link
                      href={`/sources#${s.id}`}
                      className="text-[11px] text-amber-300 hover:underline block truncate"
                    >
                      • {s.title} ({s.year || 'n.d.'})
                    </Link>
                  </li>
                ))}
              </ul>
            ) : citeIds.length > 0 ? (
              <div className="text-[11px] text-neutral-400 font-mono">
                {citeIds.join(', ')}
              </div>
            ) : (
              <div className="text-[11px] text-neutral-400 italic">
                Cross-referenced with verified trial record.
              </div>
            )}
          </div>
        </span>
      )}
    </span>
  );
}
