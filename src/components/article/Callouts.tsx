import React from 'react';
import { Info, AlertTriangle, ShieldAlert, FileX2, Lightbulb } from 'lucide-react';

type BannerLevel = 'info' | 'warning' | 'caution';

const BANNER_STYLES: Record<
  BannerLevel,
  { icon: React.ComponentType<{ className?: string }>; box: string; label: string }
> = {
  info: {
    icon: Info,
    box: 'border-blue-500/30 bg-blue-500/[0.06] text-blue-800 dark:text-blue-200',
    label: 'Editorial Note',
  },
  warning: {
    icon: AlertTriangle,
    box: 'border-amber-500/40 bg-amber-500/[0.07] text-amber-900 dark:text-amber-200',
    label: 'Reader Advisory',
  },
  caution: {
    icon: ShieldAlert,
    box: 'border-rose-500/40 bg-rose-500/[0.07] text-rose-900 dark:text-rose-200',
    label: 'Content Caution',
  },
};

function toLevel(level?: string): BannerLevel {
  return level === 'warning' || level === 'caution' ? level : 'info';
}

export function WarningBanner({
  level,
  title,
  children,
}: {
  level?: string;
  title?: string;
  children: React.ReactNode;
}) {
  const style = BANNER_STYLES[toLevel(level)];
  const Icon = style.icon;
  return (
    <aside className={`not-prose my-6 flex gap-3 rounded-xl border p-4 ${style.box}`} role="note">
      <Icon className="mt-0.5 h-4 w-4 shrink-0" />
      <div className="font-sans text-sm leading-relaxed">
        <div className="mb-1 font-mono text-[10px] font-bold uppercase tracking-widest">
          {title || style.label}
        </div>
        {children}
      </div>
    </aside>
  );
}

const GAP_REASONS: Record<string, string> = {
  lost: 'Records lost or destroyed',
  sealed: 'Records sealed or restricted',
  disputed: 'Records disputed',
  unavailable: 'Records unavailable',
};

export function SourceGap({
  title,
  reason,
  children,
}: {
  title?: string;
  reason?: string;
  children: React.ReactNode;
}) {
  return (
    <aside
      className="not-prose my-6 rounded-xl border border-dashed border-neutral-400/60 bg-[var(--color-bg-inset)] p-4"
      role="note"
    >
      <div className="mb-2 flex flex-wrap items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)]">
        <FileX2 className="h-3.5 w-3.5 text-[var(--color-accent)]" />
        <span>Source Gap{title ? ` — ${title}` : ''}</span>
        {reason && (
          <span className="rounded-full border border-[var(--color-border)] px-2 py-0.5 font-medium normal-case tracking-normal text-[var(--color-text-muted)]">
            {GAP_REASONS[reason] ?? reason}
          </span>
        )}
      </div>
      <div className="font-sans text-sm leading-relaxed text-[var(--color-text-secondary)]">{children}</div>
    </aside>
  );
}

export function FactCard({
  title,
  variant,
  children,
}: {
  title?: string;
  variant?: string;
  children: React.ReactNode;
}) {
  const accent =
    variant === 'positive'
      ? 'border-l-emerald-500'
      : variant === 'negative'
        ? 'border-l-rose-500'
        : 'border-l-[var(--color-accent)]';
  return (
    <aside
      className={`not-prose my-8 rounded-r-xl border border-l-4 border-[var(--color-border)] ${accent} bg-[var(--color-bg-elevated)] p-5`}
    >
      {title && (
        <div className="mb-2 flex items-center gap-2 font-serif text-lg font-bold text-[var(--color-text)]">
          <Lightbulb className="h-4 w-4 text-[var(--color-accent)]" />
          {title}
        </div>
      )}
      <div className="font-sans text-sm leading-relaxed text-[var(--color-text-secondary)]">{children}</div>
    </aside>
  );
}
