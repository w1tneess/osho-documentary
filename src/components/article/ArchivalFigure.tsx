'use client';

import React, { useState } from 'react';
import { Maximize2, X, Camera, ShieldCheck, ExternalLink } from 'lucide-react';

export interface ArchivalFigureProps {
  src: string;
  alt: string;
  caption: string;
  year?: string;
  location?: string;
  archiveRef?: string;
  sourceCredit?: string;
  sourceUrl?: string;
}

export function ArchivalFigure({
  src,
  alt,
  caption,
  year,
  location,
  archiveRef,
  sourceCredit = 'Archival Historical Record (osho.com / oshoworld.com / Federal Trial Record)',
  sourceUrl,
}: ArchivalFigureProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  const cleanRef = (() => {
    if (!archiveRef) return null;
    const legacyMap: Record<string, string> = {
      'ORE-HIST-0834': 'Oregon Commune • 1983',
      'ORE-FEST-1983': 'World Celebration Festival • 1983',
      'ORE-ROLLS-091': 'Rolls-Royce Commune Fleet • 1983',
      'ORE-AIR-1984': 'Air Rajneesh Fleet • 1984',
      'ORE-AIR-0412': 'Air Rajneesh Airstrip • 1984',
      'PUN-DAR-1977': 'Buddha Hall Assembly • 1977',
      'PUN-ASH-1977': 'Pune Buddha Hall • 1977',
      'PUN-DIS-1978': 'Morning Discourse • 1978',
      'PUN-DIS-0789': 'Morning Discourse • 1978',
      'PUN-ZEN-1989': 'Zen Master Era • 1989',
      'POR-STUD-0933': 'Studio Portrait • 1978',
      'POR-OSHO-1976': 'Archival Portrait • Pune, 1976',
      'POR-CLOSE-1974': 'Meditative Gaze Portrait • 1974',
      'POR-ZEN-1989': 'Zen Master Era • Pune, 1989',
    };
    return legacyMap[archiveRef] || archiveRef;
  })();

  return (
    <>
      <figure className="my-10 not-prose rounded-sm overflow-hidden bg-[var(--color-bg-elevated)] border border-[var(--color-border)] shadow-xs group">
        <div className="relative overflow-hidden aspect-[16/10] sm:aspect-[16/9] bg-neutral-950 flex items-center justify-center">
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover object-center filter contrast-[1.02] brightness-95 group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20 pointer-events-none" />

          {/* Stamp Top Badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono tracking-wider uppercase">
            {cleanRef && (
              <span className="px-2.5 py-0.5 rounded-none bg-black/80 text-amber-300 border border-white/15 font-semibold">
                {cleanRef}
              </span>
            )}
            <button
              onClick={() => setIsZoomed(true)}
              className="ml-auto p-1.5 rounded-sm bg-black/70 text-white/90 hover:text-white border border-white/20 transition-all hover:scale-105 cursor-pointer"
              aria-label="Enlarge photograph"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Location & Year Overlays */}
          {(location || year) && (
            <div className="absolute bottom-4 left-4 flex items-center gap-2 text-[10px] font-mono text-neutral-300">
              <Camera className="w-3.5 h-3.5 text-amber-400" />
              <span>{location}</span>
              {location && year && <span>•</span>}
              {year && <span className="text-amber-300 font-bold">{year}</span>}
            </div>
          )}
        </div>

        {/* Caption & Metadata Footer */}
        <figcaption className="p-4 sm:p-5 text-xs font-sans text-neutral-700 dark:text-neutral-300 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
          <div className="leading-relaxed font-serif text-sm sm:text-base text-neutral-900 dark:text-neutral-100 mb-2">
            {caption}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-neutral-500 dark:text-neutral-400 pt-2 border-t border-neutral-200/60 dark:border-neutral-800/60">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-500" /> Credit: {sourceCredit}
            </span>
            {sourceUrl && (
              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
              >
                External Record <ExternalLink className="w-2.5 h-2.5" />
              </a>
            )}
          </div>
        </figcaption>
      </figure>

      {/* Lightbox Modal */}
      {isZoomed && (
        <div
          role="dialog"
          aria-label={alt}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setIsZoomed(false)}
        >
          <button
            onClick={() => setIsZoomed(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
            aria-label="Close zoomed photograph"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-6xl max-h-[85vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={src}
              alt={alt}
              className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl border border-white/10"
            />
            {cleanRef && (
              <div className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold mb-2">
                Archival Record • {cleanRef}
              </div>
            )}
            <p className="text-center text-sm font-serif text-neutral-200 max-w-2xl leading-relaxed">
              {caption}
            </p>
            <span className="text-xs font-mono text-neutral-400 mt-2">
              {location} {year ? `(${year})` : ''} • {sourceCredit}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
