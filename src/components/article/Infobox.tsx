'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ShieldCheck, MapPin, Calendar, Users, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface InfoboxFact {
  label: string;
  value: string;
}

export interface InfoboxProps {
  title: string;
  subtitle?: string;
  category: string;
  era?: string;
  locations?: string[];
  keyFigures?: string[];
  facts?: InfoboxFact[];
  evidenceLevel?: 'Tier 1 (Court Record)' | 'Tier 1 (Academic Consensus)' | 'Tier 2 (Investigative)' | 'Disputed Historical Record';
}

export function Infobox({
  title,
  subtitle,
  category,
  era,
  locations,
  keyFigures,
  facts = [],
  evidenceLevel = 'Tier 1 (Court Record)',
}: InfoboxProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className="my-8 lg:my-0 lg:float-right lg:ml-10 lg:mb-8 w-full lg:w-84 double-bezel not-prose">
      <div className="double-bezel-inner overflow-hidden text-sm font-sans">
        {/* Header Bar */}
        <div className="p-5 bg-black/[0.03] dark:bg-white/[0.03] border-b border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--color-accent)] font-bold block mb-1">
              Archival Dossier • {category}
            </span>
            <h3 className="font-serif font-bold text-lg text-[var(--color-text)] leading-tight">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs text-[var(--color-text-secondary)] mt-1 line-clamp-2">
                {subtitle}
              </p>
            )}
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="lg:hidden p-2 rounded-sm hover:bg-black/5 dark:hover:bg-white/10 text-[var(--color-text-secondary)] transition-colors cursor-pointer"
            aria-label={collapsed ? 'Expand infobox' : 'Collapse infobox'}
          >
            {collapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>

        {/* Content Body */}
        <AnimatePresence initial={false}>
          {!collapsed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
              className="p-5 space-y-4 text-xs overflow-hidden"
            >
              {/* Evidence classification badge */}
              <div className="flex items-center gap-2.5 p-3 rounded-sm bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200">
                <ShieldCheck className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
                <div>
                  <div className="font-mono font-semibold uppercase tracking-wider text-[9px] text-amber-700 dark:text-amber-300">
                    Evidentiary Classification
                  </div>
                  <div className="font-medium text-[11px]">{evidenceLevel}</div>
                </div>
              </div>

              {era && (
                <div className="flex items-start gap-3 py-1.5 border-b border-black/[0.04] dark:border-white/[0.06]">
                  <Calendar className="w-3.5 h-3.5 text-neutral-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-neutral-500 font-mono uppercase tracking-wider text-[9px] block">
                      Historical Era
                    </span>
                    <span className="font-medium text-[var(--color-text)]">{era}</span>
                  </div>
                </div>
              )}

              {locations && locations.length > 0 && (
                <div className="flex items-start gap-3 py-1.5 border-b border-black/[0.04] dark:border-white/[0.06]">
                  <MapPin className="w-3.5 h-3.5 text-neutral-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-neutral-500 font-mono uppercase tracking-wider text-[9px] block">
                      Key Geography
                    </span>
                    <span className="font-medium text-[var(--color-text)]">
                      {locations.join(' • ')}
                    </span>
                  </div>
                </div>
              )}

              {keyFigures && keyFigures.length > 0 && (
                <div className="flex items-start gap-3 py-1.5 border-b border-black/[0.04] dark:border-white/[0.06]">
                  <Users className="w-3.5 h-3.5 text-neutral-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-neutral-500 font-mono uppercase tracking-wider text-[9px] block">
                      Key Historical Figures
                    </span>
                    <span className="font-medium text-[var(--color-text)]">
                      {keyFigures.join(', ')}
                    </span>
                  </div>
                </div>
              )}

              {facts.map((fact, i) => (
                <div key={i} className="flex items-start gap-3 py-1.5 border-b border-black/[0.04] dark:border-white/[0.06]">
                  <FileText className="w-3.5 h-3.5 text-neutral-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-neutral-500 font-mono uppercase tracking-wider text-[9px] block">
                      {fact.label}
                    </span>
                    <span className="font-medium text-[var(--color-text)]">
                      {fact.value}
                    </span>
                  </div>
                </div>
              ))}

              <div className="pt-2 text-[10px] font-mono text-neutral-400 text-center">
                All records verified against court & primary files.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}
