'use client';

import React, { useState, useEffect } from 'react';
import { Check, Copy } from 'lucide-react';

interface ReaderControlsProps {
  articleTitle: string;
  articleCategory: string;
}

export function ReaderControls({ articleTitle, articleCategory }: ReaderControlsProps) {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'huge'>('normal');
  const [fontFamily, setFontFamily] = useState<'serif' | 'sans'>('serif');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const articleEl = document.querySelector('.article-body');
    if (!articleEl) return;

    if (fontSize === 'normal') {
      articleEl.classList.remove('text-xl', 'text-2xl');
      articleEl.classList.add('text-lg');
    } else if (fontSize === 'large') {
      articleEl.classList.remove('text-lg', 'text-2xl');
      articleEl.classList.add('text-xl');
    } else {
      articleEl.classList.remove('text-lg', 'text-xl');
      articleEl.classList.add('text-2xl');
    }

    if (fontFamily === 'sans') {
      articleEl.classList.remove('font-serif');
      articleEl.classList.add('font-sans');
    } else {
      articleEl.classList.remove('font-sans');
      articleEl.classList.add('font-serif');
    }
  }, [fontSize, fontFamily]);

  const copyCitation = () => {
    const citation = `Osho Documentary Archive. "${articleTitle}." Section: ${articleCategory}. Available at: ${window.location.href}`;
    navigator.clipboard.writeText(citation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-8 not-prose p-1 rounded-sm bg-[var(--color-bg-elevated)] border border-[var(--color-border)] shadow-xs">
      <div className="px-4 py-2 bg-[var(--color-bg-elevated)] flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        {/* Typography family and size */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] font-semibold">
            Reader Mode:
          </span>

          {/* Font family toggle */}
          <div className="flex items-center bg-[var(--color-bg-inset)] rounded-sm p-0.5 border border-[var(--color-border)]">
            <button
              onClick={() => setFontFamily('serif')}
              className={`px-3 py-1 rounded-sm font-serif text-xs transition-all cursor-pointer ${
                fontFamily === 'serif'
                  ? 'bg-[var(--color-text)] text-[var(--color-bg)] font-bold shadow-xs'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
              }`}
            >
              Serif
            </button>
            <button
              onClick={() => setFontFamily('sans')}
              className={`px-3 py-1 rounded-sm font-sans text-xs transition-all cursor-pointer ${
                fontFamily === 'sans'
                  ? 'bg-[var(--color-text)] text-[var(--color-bg)] font-bold shadow-xs'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
              }`}
            >
              Sans
            </button>
          </div>

          {/* Font scale toggle */}
          <div className="flex items-center bg-[var(--color-bg-inset)] rounded-sm p-0.5 border border-[var(--color-border)]">
            {(['normal', 'large', 'huge'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFontSize(s)}
                className={`px-2.5 py-1 rounded-sm text-[11px] font-mono transition-all cursor-pointer ${
                  fontSize === s
                    ? 'bg-[var(--color-text)] text-[var(--color-bg)] font-bold shadow-xs'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
                }`}
              >
                {s === 'normal' ? '1x' : s === 'large' ? '1.2x' : '1.5x'}
              </button>
            ))}
          </div>
        </div>

        {/* Copy Citation Button */}
        <button
          onClick={copyCitation}
          className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-[var(--color-bg-inset)] hover:bg-[var(--color-bg)] border border-[var(--color-border)] transition-all text-[var(--color-text)] cursor-pointer text-xs font-mono uppercase tracking-wider"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Citation Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
              <span>Copy Archival Citation</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
