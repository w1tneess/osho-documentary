'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { BookA, ExternalLink } from 'lucide-react';
import type { GlossaryItem } from '@/lib/types';

interface GlossaryPopoverProps {
  term: string;
  item?: GlossaryItem;
  id?: string;
}

export function GlossaryPopover({ term, item, id }: GlossaryPopoverProps) {
  const [open, setOpen] = useState(false);
  const cardRef = useRef<HTMLSpanElement>(null);

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
      <button
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setOpen(true)}
        className="inline-flex items-center text-inherit border-b border-dashed border-amber-600/70 dark:border-amber-400/70 hover:text-amber-700 dark:hover:text-amber-400 font-medium cursor-help transition-colors"
        aria-label={`Glossary definition for ${term}`}
        aria-expanded={open}
      >
        {term}
        <span className="text-[10px] ml-0.5 opacity-60 text-amber-600 dark:text-amber-400">°</span>
      </button>

      {open && item && (
        <span
          role="dialog"
          aria-label={`Definition of ${item.term}`}
          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-80 p-4 rounded-sm bg-neutral-950 text-neutral-100 border border-white/15 shadow-xl text-left text-xs font-sans not-prose block animate-in fade-in zoom-in-95 duration-200"
        >
          <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2">
            <span className="font-mono text-[9px] uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1">
              <BookA className="w-3 h-3" /> Archival Glossary Term
            </span>
            <Link
              href={`/glossary#${item.id}`}
              className="text-[10px] font-mono text-neutral-400 hover:text-white flex items-center gap-0.5"
            >
              Full Lexicon <ExternalLink className="w-2.5 h-2.5" />
            </Link>
          </div>

          <div className="font-serif font-bold text-sm text-neutral-100 mb-1">
            {item.term}
          </div>

          {item.aka && item.aka.length > 0 && (
            <div className="text-[10px] font-mono text-neutral-400 mb-2">
              Also known as: {item.aka.join(', ')}
            </div>
          )}

          <p className="text-[11px] text-neutral-300 leading-relaxed font-sans">
            {item.definition}
          </p>
        </span>
      )}
    </span>
  );
}
