'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale } from 'lucide-react';

export interface Perspective {
  id: string;
  name: string;
  sourceType: string;
  summary: string;
  detail?: string;
}

interface PerspectiveLensProps {
  title?: string;
  topicId?: string;
  perspectives?: Perspective[];
}

const DEFAULT_PERSPECTIVES: Perspective[] = [
  {
    id: 'investigators',
    name: 'Federal & State Prosecutors',
    sourceType: 'Court Record',
    summary:
      'Argued that while direct wiretaps linking Osho to the bio-agent laboratory were lacking, his absolute authoritarian control over the commune created and sanctioned the culture of lawlessness.',
  },
  {
    id: 'critics',
    name: 'Former Disciples & Critics',
    sourceType: 'Investigative Memoir',
    summary:
      'Asserted that Osho received daily private briefings from Ma Anand Sheela, regularly approved aggressive maneuvers against Wasco County, and scapegoated her only after she fled.',
  },
  {
    id: 'defense',
    name: 'Rajneesh Defense & Sannyasins',
    sourceType: 'Commune Testimony',
    summary:
      'Maintained that Osho was in strict public isolation in his residence, consumed by daily discourse preparations and health treatments, while Sheela built a rogue criminal syndicate in secret.',
  },
  {
    id: 'scholars',
    name: 'Academic Sociologists',
    sourceType: 'Peer-Reviewed Study',
    summary:
      'Concluded that the commune structure suffered from charismatic institutional breakdown: extreme external pressure from Oregon authorities catalyzed paranoia within Sheela’s insular leadership cabal.',
  },
];

export function PerspectiveLens({
  title = 'Multi-Perspective Historical Inquiry: Was Osho Personally Complicit?',
  perspectives,
}: PerspectiveLensProps) {
  const items = perspectives && perspectives.length > 0 ? perspectives : DEFAULT_PERSPECTIVES;
  const [activeId, setActiveId] = useState(items[0].id);
  const activeItem = items.find((p) => p.id === activeId) || items[0];

  return (
    <div className="my-12 p-1 rounded-sm double-bezel not-prose">
      <div className="double-bezel-inner p-6 sm:p-8 rounded-sm">
        <div className="flex items-center gap-2 mb-3">
          <Scale className="w-4 h-4 text-[var(--color-accent)]" />
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-accent)] font-semibold">
            Perspective Lens • Disputed Record
          </span>
        </div>

        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[var(--color-text)] mb-6">
          {title}
        </h3>

        {/* Perspective Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-[var(--color-border)] pb-4">
          {items.map((p) => {
            const isSelected = p.id === activeId;
            return (
              <button
                key={p.id}
                onClick={() => setActiveId(p.id)}
                className={`relative px-3.5 py-1.5 rounded-sm text-xs font-mono font-medium transition-colors cursor-pointer border ${
                  isSelected
                    ? 'bg-[var(--color-text)] text-[var(--color-bg)] border-[var(--color-text)] font-bold shadow-xs'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)] border-[var(--color-border)] bg-[var(--color-bg-elevated)]'
                }`}
              >
                {p.name}
              </button>
            );
          })}
        </div>

        {/* Selected Perspective Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeItem.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="p-5 rounded-sm bg-[var(--color-bg-inset)] border border-[var(--color-border)]"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-sans font-bold text-sm text-[var(--color-text)]">
                {activeItem.name}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-none bg-[var(--color-accent-subtle)] text-[var(--color-accent)] border border-[var(--color-accent)]/20 font-semibold">
                {activeItem.sourceType}
              </span>
            </div>
            <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed font-sans">
              {activeItem.summary}
            </p>
            {activeItem.detail && (
              <p className="mt-3 text-sm text-[var(--color-text-muted)] leading-relaxed font-sans border-t border-[var(--color-border)] pt-3">
                {activeItem.detail}
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
