'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ExternalLink, BookCheck } from 'lucide-react';

export interface CitationData {
  num: number;
  id: string;
  title: string;
  author: string;
  year?: number;
  publisher?: string;
  type?: string;
  notes?: string;
  url?: string;
}

interface CitationCardProps {
  citation: CitationData;
}

export function CitationCard({ citation }: CitationCardProps) {
  const [open, setOpen] = useState(false);
  const cardRef = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        cardRef.current &&
        !cardRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const typeBadge = citation.type || 'source';

  return (
    <span className="relative inline-block align-baseline not-prose mx-0.5" ref={cardRef}>
      <button
        ref={triggerRef}
        id={`cite-ref-${citation.num}`}
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setOpen(true)}
        className="inline-flex items-center justify-center text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full text-amber-700 dark:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-500/40 cursor-pointer"
        aria-label={`Citation [${citation.num}]: ${citation.title}`}
        aria-expanded={open}
      >
        [{citation.num}]
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Citation details"
          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-80 p-4 rounded-2xl bg-neutral-950/95 text-neutral-100 border border-white/10 shadow-[0_24px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl text-left text-xs font-sans animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-white/10">
            <span className="font-mono text-[9px] uppercase tracking-widest text-amber-400 font-bold">
              Citation [{citation.num}] • {typeBadge}
            </span>
            <a
              href={`#ref-${citation.num}`}
              onClick={() => setOpen(false)}
              className="text-[10px] font-mono text-neutral-400 hover:text-white underline"
            >
              Jump to refs ↓
            </a>
          </div>

          {/* Title */}
          <div className="font-serif font-bold text-sm text-neutral-100 leading-snug mb-1">
            {citation.title}
          </div>

          {/* Metadata */}
          <div className="text-[11px] text-neutral-400 space-y-0.5 mb-2 font-mono">
            {citation.author && <div>Author: {citation.author}</div>}
            <div>
              {citation.year && <span>{citation.year}</span>}
              {citation.publisher && <span> • {citation.publisher}</span>}
            </div>
          </div>

          {citation.notes && (
            <p className="text-[11px] text-neutral-300 font-sans leading-relaxed border-t border-white/5 pt-2">
              {citation.notes}
            </p>
          )}

          {/* Actions */}
          <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between">
            <Link
              href={`/sources#${citation.id}`}
              className="text-[10px] font-mono text-amber-400 hover:underline flex items-center gap-1"
            >
              <BookCheck className="w-3 h-3" /> Source Vault Entry
            </Link>
            {citation.url && (
              <a
                href={citation.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-mono text-neutral-400 hover:text-white flex items-center gap-1"
              >
                External <ExternalLink className="w-2.5 h-2.5" />
              </a>
            )}
          </div>
        </div>
      )}
    </span>
  );
}
