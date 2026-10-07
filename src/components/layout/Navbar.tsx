'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sun,
  Moon,
  Search,
  Laptop,
  ChevronDown,
  BookOpen,
  Compass,
  FileText,
  MapPin,
  Clock,
  Camera,
  ShieldCheck,
  Scale,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

// Core 5 Narrative Pillars
const PILLAR_LINKS = [
  { label: 'Life', href: '/life' },
  { label: 'Teachings', href: '/teachings' },
  { label: 'Movement', href: '/movement' },
  { label: 'Controversies', href: '/controversies' },
  { label: 'Legacy', href: '/legacy' },
];

// Archival Explorers & Evidentiary Tools
const EXPLORER_LINKS = [
  { label: 'Timeline', href: '/timeline', icon: Clock },
  { label: 'Photo Vault', href: '/gallery', badge: '32', icon: Camera },
  { label: 'Map', href: '/map', icon: MapPin },
];

// Research & Methodology Folio Items
const RESEARCH_ITEMS = [
  {
    label: 'Curated Pathways',
    description: 'Thematic guided investigative routes',
    href: '/paths',
    icon: Compass,
  },
  {
    label: 'Primary Sources',
    description: 'Declassified dockets, books & CDC reports',
    href: '/sources',
    icon: BookOpen,
  },
  {
    label: 'Lexicon & Glossary',
    description: 'Sannyas terminology & Sanskrit concepts',
    href: '/glossary',
    icon: FileText,
  },
  {
    label: 'Forensic Methodology',
    description: 'Multi-perspective corroboration standards',
    href: '/method',
    icon: ShieldCheck,
  },
  {
    label: 'Corrections Ledger',
    description: 'Public audit trail & factual revisions',
    href: '/corrections',
    icon: Scale,
  },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [researchOpen, setResearchOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (theme === 'dark') setTheme('light');
    else if (theme === 'light') setTheme('system');
    else setTheme('dark');
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setResearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setResearchOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  const isResearchActive = RESEARCH_ITEMS.some((item) => pathname?.startsWith(item.href));

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 pt-3 sm:pt-5 pointer-events-none">
        <motion.div
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto flex items-center justify-between gap-3 sm:gap-6 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-sm transition-all duration-300 border border-[var(--color-border)]/80 bg-[var(--color-bg)]/85 dark:bg-[#0c0a09]/85 backdrop-blur-2xl ${
            scrolled
              ? 'shadow-[0_12px_32px_-8px_rgba(0,0,0,0.35),0_1px_2px_0_rgba(0,0,0,0.1),inset_0_1px_0_0_rgba(255,255,255,0.08)] scale-[0.99]'
              : 'shadow-[0_4px_20px_-4px_rgba(0,0,0,0.15),inset_0_1px_0_0_rgba(255,255,255,0.06)]'
          }`}
        >
          {/* Brand Colophon Emblem */}
          <Link
            href="/"
            className="flex items-center gap-2.5 text-[var(--color-text)] no-underline pr-2 group select-none"
          >
            <div className="relative flex items-center justify-center w-7 h-7 rounded-sm bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-[var(--color-accent)] font-serif font-black text-sm tracking-tighter group-hover:border-[var(--color-accent)]/50 transition-colors shadow-2xs">
              <span>O</span>
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[var(--color-accent)] rounded-none" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif font-bold text-base sm:text-lg tracking-tight group-hover:text-[var(--color-accent)] transition-colors leading-none">
                  OSHO
                </span>
                <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors hidden sm:inline">
                  ARCHIVE
                </span>
              </div>
              <span className="text-[8px] font-mono text-[var(--color-text-muted)] tracking-wider hidden sm:block">
                1931–1990 CORPUS
              </span>
            </div>
          </Link>

          {/* Center: Desktop Navigation Hub */}
          <nav className="hidden xl:flex items-center gap-1.5" aria-label="Main documentary navigation">
            
            {/* 1. Core Pillars Segment */}
            <div className="flex items-center gap-1 p-0.5 rounded-sm bg-[var(--color-bg-elevated)]/60 border border-[var(--color-border)]/50">
              {PILLAR_LINKS.map((item) => {
                const active = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
                const isHovered = hoveredLink === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onMouseEnter={() => setHoveredLink(item.href)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className={`relative px-3 py-1.5 text-xs font-sans font-medium rounded-sm transition-colors duration-150 no-underline select-none ${
                      active
                        ? 'text-[var(--color-text)] font-semibold'
                        : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
                    }`}
                  >
                    {active && (
                      <motion.div
                        layoutId="active-pillar-indicator"
                        className="absolute inset-0 rounded-sm bg-[var(--color-bg)] border border-[var(--color-border)] shadow-2xs -z-10"
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      />
                    )}
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Vertical Hairline Divider */}
            <div className="h-4 w-px bg-[var(--color-border)] opacity-60 mx-1" />

            {/* 2. Archival Explorers Segment */}
            <div className="flex items-center gap-1">
              {EXPLORER_LINKS.map((item) => {
                const active = pathname === item.href || pathname?.startsWith(item.href);
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-sans rounded-sm transition-colors no-underline ${
                      active
                        ? 'text-[var(--color-accent)] font-semibold bg-[var(--color-accent-subtle)] border border-[var(--color-accent)]/20'
                        : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-elevated)] border border-transparent'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 opacity-80" />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="px-1 py-0.2 text-[9px] font-mono bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 rounded-none font-bold">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Vertical Hairline Divider */}
            <div className="h-4 w-px bg-[var(--color-border)] opacity-60 mx-1" />

            {/* 3. Research & Methodology Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setResearchOpen(!researchOpen)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-sans rounded-sm transition-colors cursor-pointer border ${
                  isResearchActive || researchOpen
                    ? 'text-[var(--color-text)] bg-[var(--color-bg-elevated)] border-[var(--color-border)]'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-elevated)] border-transparent'
                }`}
                aria-expanded={researchOpen}
                aria-haspopup="true"
              >
                <span>Research</span>
                <ChevronDown
                  className={`w-3 h-3 opacity-60 transition-transform duration-200 ${
                    researchOpen ? 'rotate-180 text-[var(--color-accent)]' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {researchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute right-0 mt-2 w-72 rounded-sm border border-[var(--color-border)] bg-[var(--color-bg)] dark:bg-[#0f0d0b] shadow-2xl p-2 z-50 space-y-1 backdrop-blur-2xl"
                  >
                    <div className="px-2 py-1.5 border-b border-[var(--color-border)]/60 text-[10px] font-mono uppercase tracking-[0.15em] text-[var(--color-text-muted)] flex items-center justify-between">
                      <span>Forensic Dossiers</span>
                      <span>5 Modules</span>
                    </div>

                    <div className="pt-1 space-y-1">
                      {RESEARCH_ITEMS.map((ritem) => {
                        const RIcon = ritem.icon;
                        const active = pathname === ritem.href;

                        return (
                          <Link
                            key={ritem.href}
                            href={ritem.href}
                            className={`flex items-start gap-2.5 p-2 rounded-sm text-left no-underline transition-colors ${
                              active
                                ? 'bg-[var(--color-accent-subtle)] text-[var(--color-accent)]'
                                : 'hover:bg-[var(--color-bg-elevated)] text-[var(--color-text)]'
                            }`}
                          >
                            <RIcon className="w-4 h-4 mt-0.5 text-[var(--color-accent)] flex-shrink-0" />
                            <div>
                              <div className="text-xs font-sans font-semibold leading-tight">
                                {ritem.label}
                              </div>
                              <div className="text-[11px] font-sans text-[var(--color-text-secondary)] leading-tight mt-0.5">
                                {ritem.description}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </nav>

          {/* Right: Command Bar & Theme Controls */}
          <div className="flex items-center gap-2">
            {/* Modern Interactive Search Trigger */}
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new CustomEvent('open-command-palette'));
                }
              }}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-sm bg-[var(--color-bg-elevated)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-all cursor-pointer shadow-2xs group"
              title="Search Archives (Ctrl + K / ⌘K)"
              aria-label="Open Archive Search"
            >
              <Search className="w-3.5 h-3.5 text-[var(--color-accent)] group-hover:scale-110 transition-transform" />
              <span className="text-xs font-sans hidden md:inline">Search</span>
              <kbd className="hidden sm:inline text-[9px] font-mono px-1.5 py-0.5 rounded-xs bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text-muted)] group-hover:text-[var(--color-text)]">
                ⌘K
              </kbd>
            </button>

            {/* Theme Toggle Button */}
            {mounted && (
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={toggleTheme}
                className="p-1.5 rounded-sm bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors cursor-pointer shadow-2xs"
                aria-label="Toggle light or dark theme"
                title={`Current: ${theme}`}
              >
                {theme === 'system' ? (
                  <Laptop className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
                ) : resolvedTheme === 'dark' ? (
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                ) : (
                  <Moon className="w-3.5 h-3.5 text-indigo-600" />
                )}
              </motion.button>
            )}

            {/* Mobile Menu Hamburger Trigger */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="xl:hidden min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 rounded-sm bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-[var(--color-text)] transition-colors cursor-pointer shadow-2xs"
              aria-label={mobileOpen ? 'Close navigation drawer' : 'Open navigation drawer'}
              aria-expanded={mobileOpen}
            >
              <div className="w-4 h-4 flex flex-col justify-around">
                <span
                  className={`h-0.5 w-full bg-[var(--color-text)] transition-transform duration-200 ${
                    mobileOpen ? 'rotate-45 translate-y-1.5' : ''
                  }`}
                />
                <span
                  className={`h-0.5 w-full bg-[var(--color-text)] transition-opacity duration-200 ${
                    mobileOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`h-0.5 w-full bg-[var(--color-text)] transition-transform duration-200 ${
                    mobileOpen ? '-rotate-45 -translate-y-1.5' : ''
                  }`}
                />
              </div>
            </motion.button>
          </div>
        </motion.div>
      </header>

      {/* Screen-Filling Mobile Glass Overlay Navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[var(--color-bg)]/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 xl:hidden overflow-y-auto pb-32"
          >
            <div className="pt-20 space-y-8">
              {/* Mobile Quick Search Bar */}
              <button
                onClick={() => {
                  setMobileOpen(false);
                  if (typeof window !== 'undefined') {
                    window.dispatchEvent(new CustomEvent('open-command-palette'));
                  }
                }}
                className="w-full min-h-[48px] flex items-center justify-between p-3.5 rounded-sm bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-xs font-mono text-[var(--color-text-secondary)]"
              >
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-[var(--color-accent)]" />
                  <span>Search 32 files, transcripts & timeline...</span>
                </div>
                <kbd className="px-1.5 py-0.5 bg-[var(--color-bg)] border border-[var(--color-border)] text-[10px]">
                  ⌘K
                </kbd>
              </button>

              {/* Section 1: Narrative Pillars */}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--color-accent)] font-bold block mb-3">
                  Narrative Pillars
                </span>
                <nav className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {PILLAR_LINKS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="min-h-[48px] flex items-center justify-between p-3.5 rounded-sm bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-lg font-serif font-bold text-[var(--color-text)] no-underline hover:border-[var(--color-accent)] transition-colors"
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight className="w-4 h-4 text-[var(--color-accent)]" />
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Section 2: Explorers & Vault */}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--color-accent)] font-bold block mb-3">
                  Evidentiary Vaults & Tools
                </span>
                <nav className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {EXPLORER_LINKS.map((item) => {
                    const EIcon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="min-h-[48px] flex items-center justify-between p-3 rounded-sm bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-sm font-sans font-semibold text-[var(--color-text)] no-underline hover:border-[var(--color-accent)] transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <EIcon className="w-4 h-4 text-[var(--color-accent)]" />
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 bg-amber-500/15 text-amber-500 border border-amber-500/30">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Section 3: Research Folio */}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--color-accent)] font-bold block mb-3">
                  Research & Methodology
                </span>
                <nav className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {RESEARCH_ITEMS.map((item) => {
                    const RIcon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="min-h-[48px] flex items-center gap-2.5 p-3 rounded-sm bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-xs font-sans text-[var(--color-text)] no-underline hover:border-[var(--color-accent)] transition-colors"
                      >
                        <RIcon className="w-4 h-4 text-[var(--color-accent)] shrink-0" />
                        <div>
                          <div className="font-semibold">{item.label}</div>
                          <div className="text-[10px] text-[var(--color-text-secondary)]">{item.description}</div>
                        </div>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Mobile Footer */}
            <div className="border-t border-[var(--color-border)] pt-6 mt-6 flex items-center justify-between text-xs font-mono text-[var(--color-text-muted)]">
              <div>Corpus 1931–1990 • Open-Access Archive</div>
              <button
                onClick={() => setMobileOpen(false)}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center text-[var(--color-accent)] font-bold uppercase tracking-wider cursor-pointer"
              >
                Close ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent Mobile Bottom Navigation Dock (Thumb-Zone Ergonomics) */}
      <aside aria-label="Mobile Navigation Dock" className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--color-bg)]/95 backdrop-blur-xl border-t border-[var(--color-border)] pb-safe shadow-lg">
        <div className="flex items-center justify-around px-2 py-1.5">
          <Link
            href="/life"
            className={`min-h-[48px] min-w-[56px] flex flex-col items-center justify-center gap-1 text-[10px] font-mono uppercase tracking-wider transition-colors no-underline ${
              pathname?.startsWith('/life') || pathname?.startsWith('/teachings') || pathname?.startsWith('/movement') || pathname?.startsWith('/controversies') || pathname?.startsWith('/legacy')
                ? 'text-[var(--color-accent)] font-bold'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Pillars</span>
          </Link>

          <Link
            href="/timeline"
            className={`min-h-[48px] min-w-[56px] flex flex-col items-center justify-center gap-1 text-[10px] font-mono uppercase tracking-wider transition-colors no-underline ${
              pathname === '/timeline'
                ? 'text-[var(--color-accent)] font-bold'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Timeline</span>
          </Link>

          <Link
            href="/gallery"
            className={`relative min-h-[48px] min-w-[56px] flex flex-col items-center justify-center gap-1 text-[10px] font-mono uppercase tracking-wider transition-colors no-underline ${
              pathname === '/gallery'
                ? 'text-[var(--color-accent)] font-bold'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
            }`}
          >
            <div className="relative">
              <Camera className="w-4 h-4" />
              <span className="absolute -top-1.5 -right-3 px-1 py-0 text-[8px] font-mono font-bold bg-[var(--color-accent)] text-white rounded-none leading-none">
                32
              </span>
            </div>
            <span>Vault</span>
          </Link>

          <Link
            href="/map"
            className={`min-h-[48px] min-w-[56px] flex flex-col items-center justify-center gap-1 text-[10px] font-mono uppercase tracking-wider transition-colors no-underline ${
              pathname === '/map'
                ? 'text-[var(--color-accent)] font-bold'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Map</span>
          </Link>

          <button
            onClick={() => setMobileOpen(true)}
            className="min-h-[48px] min-w-[56px] flex flex-col items-center justify-center gap-1 text-[10px] font-mono uppercase tracking-wider text-[var(--color-text-secondary)] hover:text-[var(--color-text)] cursor-pointer"
            aria-label="Open full archival navigation menu"
          >
            <div className="w-4 h-4 flex flex-col justify-around py-0.5">
              <span className="h-0.5 w-full bg-current rounded-none" />
              <span className="h-0.5 w-full bg-current rounded-none" />
              <span className="h-0.5 w-full bg-current rounded-none" />
            </div>
            <span>Menu</span>
          </button>
        </div>
      </aside>
    </>
  );
}
