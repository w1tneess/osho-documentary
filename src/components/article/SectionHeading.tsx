'use client';

import React, { useState } from 'react';
import { Link2, Check } from 'lucide-react';

interface SectionHeadingProps {
  level: 2 | 3;
  id: string;
  children: React.ReactNode;
}

export function SectionHeading({ level, id, children }: SectionHeadingProps) {
  const [copied, setCopied] = useState(false);

  const copyAnchor = (e: React.MouseEvent) => {
    e.preventDefault();
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const HeadingTag = level === 2 ? 'h2' : 'h3';
  const headingStyles =
    level === 2
      ? 'text-2xl sm:text-3xl font-serif font-bold text-neutral-950 dark:text-neutral-50 mt-12 mb-4 pt-6 border-t border-neutral-200 dark:border-neutral-800/80 group flex items-center gap-2'
      : 'text-xl sm:text-2xl font-serif font-semibold text-neutral-900 dark:text-neutral-200 mt-8 mb-3 group flex items-center gap-2';

  return (
    <HeadingTag id={id} className={headingStyles}>
      <span className="flex-1">{children}</span>
      <a
        href={`#${id}`}
        onClick={copyAnchor}
        className="opacity-0 group-hover:opacity-100 focus:opacity-100 p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-400 hover:text-amber-600 dark:hover:text-amber-400 transition-all text-xs font-mono no-underline shrink-0"
        aria-label={`Copy deep link to ${id}`}
      >
        {copied ? (
          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400">
            <Check className="w-3.5 h-3.5" /> Copied
          </span>
        ) : (
          <Link2 className="w-4 h-4" />
        )}
      </a>
    </HeadingTag>
  );
}
