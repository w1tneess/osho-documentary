'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Sun,
  Moon,
  Laptop,
  ChevronDown,
  ArrowUpRight,
  Clock,
  Camera,
  MapPin,
  BookOpen,
  ShieldCheck,
  Compass,
  FileText,
  Scale,
  Info,
  X,
  ArrowRight,
} from 'lucide-react';

// Core Navigation Links for the Centered Segmented Pill (Inspired by Mindly)
const NAV_ITEMS = [
  { label: 'Life', href: '/life' },
  { label: 'Teachings', href: '/teachings' },
  { label: 'Movement', href: '/movement' },
  { label: 'Controversies', href: '/controversies' },
  { label: 'Timeline', href: '/timeline' },
  { label: 'Vault', href: '/gallery' },
];

// Research & Archive Modules Dropdown
const RESEARCH_MODULES = [
  {
    title: 'Primary Sources',
    desc: 'FBI files, declassified records & court testimonies',
    href: '/sources',
    icon: BookOpen,
  },
  {
    title: 'Forensic Methodology',
    desc: 'The 4-tier evidentiary verification framework',
    href: '/method',
    icon: ShieldCheck,
  },
  {
    title: 'Curated Pathways',
    desc: 'Thematic guided investigative routes',
    href: '/paths',
    icon: Compass,
  },
  {
    title: 'Lexicon & Glossary',
    desc: 'Sannyas terminology & Sanskrit concepts',
    href: '/glossary',
    icon: FileText,
  },
  {
    title: 'Global Cartography',
    desc: 'Interactive map of key communes & historical sites',
    href: '/map',
    icon: MapPin,
  },
  {
    title: 'Corrections Ledger',
    desc: 'Public audit trail & factual revisions',
    href: '/corrections',
    icon: Scale,
  },
  {
    title: 'About the Project',
    desc: 'Scholarly intent, editorial mission & scope',
    href: '/about',
    icon: Info,
  },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [researchOpen, setResearchOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = useCallback(() => {
    if (theme === 'dark') setTheme('light');
    else if (theme === 'light') setTheme('system');
    else setTheme('dark');
  }, [theme, setTheme]);

  // Track scroll depth and elevation
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 15);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress(Math.min(Math.max(scrollY / docHeight, 0), 1));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setResearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setResearchOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setResearchOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setResearchOpen(false);
    }, 160);
  };

  const isResearchActive = RESEARCH_MODULES.some((item) => pathname?.startsWith(item.href));

  return (
    <>
      {/* Fixed At The Top Header (Inspired by Mindly Reference) */}
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/85 dark:bg-[#0c0a09]/85 backdrop-blur-xl border-b border-neutral-200/60 dark:border-neutral-800/60 py-3 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)]'
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        {/* Subtle reading progress beam when scrolled */}
        {scrolled && (
          <div className="absolute bottom-0 left-0 right-0 h-[1.5px] overflow-hidden pointer-events-none">
            <div
              className="h-full bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent transition-transform duration-100 ease-out opacity-80"
              style={{
                transform: `scaleX(${scrollProgress})`,
                transformOrigin: 'left',
              }}
            />
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          
          {/* ——— LEFT: Brand Wordmark (Mindly° Typography Style) ——— */}
          <Link
            href="/"
            className="flex items-center gap-2.5 no-underline group select-none flex-shrink-0"
            aria-label="Osho Documentary Archive Homepage"
          >
            <span className="font-serif font-black text-xl sm:text-2xl tracking-tight text-neutral-900 dark:text-neutral-50 group-hover:text-[var(--color-accent)] transition-colors leading-none">
              Osho<span className="text-[var(--color-accent)] font-sans">°</span>
            </span>
            <span className="text-[9.5px] font-mono uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500 font-semibold border-l border-neutral-300 dark:border-neutral-700 pl-2.5 hidden sm:inline leading-none">
              Archive
            </span>
          </Link>

          {/* ——— CENTER: Floating Segmented Pill Nav (Mindly Pill Aesthetic) ——— */}
          <nav
            className="hidden lg:flex items-center gap-0.5 p-1 rounded-full bg-neutral-100/90 dark:bg-neutral-900/90 border border-neutral-200/70 dark:border-neutral-800/70 backdrop-blur-md shadow-2xs"
            aria-label="Main documentary navigation"
          >
            {NAV_ITEMS.map((item) => {
              const isActive =
                pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-3.5 py-1.5 text-xs sm:text-[13px] font-sans font-medium rounded-full transition-colors duration-150 no-underline select-none ${
                    isActive
                      ? 'text-neutral-900 dark:text-neutral-50 font-semibold'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-mindly-pill"
                      className="absolute inset-0 rounded-full bg-white dark:bg-[#1c1917] shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.06)] border border-neutral-200/60 dark:border-neutral-700/60 -z-10"
                      transition={{ type: 'spring', stiffness: 480, damping: 34 }}
                    />
                  )}
                  <span>{item.label}</span>
                </Link>
              );
            })}

            {/* Research Dropdown inside the center segmented pill */}
            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setResearchOpen((prev) => !prev)}
                className={`relative flex items-center gap-1 px-3 py-1.5 text-xs sm:text-[13px] font-sans font-medium rounded-full transition-colors cursor-pointer ${
                  isResearchActive || researchOpen
                    ? 'text-neutral-900 dark:text-neutral-50 font-semibold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
                }`}
                aria-expanded={researchOpen}
              >
                {(isResearchActive || researchOpen) && (
                  <motion.div
                    layoutId="active-mindly-pill"
                    className="absolute inset-0 rounded-full bg-white dark:bg-[#1c1917] shadow-[0_1px_3px_rgba(0,0,0,0.1)] border border-neutral-200/60 dark:border-neutral-700/60 -z-10"
                    transition={{ type: 'spring', stiffness: 480, damping: 34 }}
                  />
                )}
                <span>Research</span>
                <ChevronDown
                  className={`w-3 h-3 opacity-60 transition-transform duration-200 ${
                    researchOpen ? 'rotate-180 opacity-100 text-[var(--color-accent)]' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {researchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.16, ease: 'easeOut' }}
                    className="absolute -right-12 mt-2 w-76 rounded-2xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white/95 dark:bg-[#141210]/95 shadow-2xl p-2 z-50 backdrop-blur-2xl"
                  >
                    <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                      <span>Evidentiary Dossiers</span>
                      <span>7 Portals</span>
                    </div>
                    <div className="py-1 space-y-0.5">
                      {RESEARCH_MODULES.map((item) => {
                        const Icon = item.icon;
                        const active = pathname === item.href;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-start gap-2.5 p-2 rounded-xl text-neutral-800 dark:text-neutral-200 no-underline transition-colors group ${
                              active
                                ? 'bg-neutral-100 dark:bg-neutral-800 text-[var(--color-accent)]'
                                : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/60'
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5 text-[var(--color-accent)] shrink-0 mt-0.5" />
                            <div>
                              <div className="text-xs font-semibold group-hover:text-[var(--color-accent)] transition-colors">
                                {item.title}
                              </div>
                              <div className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-tight mt-0.5">
                                {item.desc}
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

          {/* ——— RIGHT: Search Trigger, Theme Toggle & CTA Pill ("Get the app ↗" Style) ——— */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Theme Toggle Button */}
            {mounted && (
              <button
                type="button"
                onClick={toggleTheme}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-neutral-100/80 dark:bg-neutral-800/80 hover:bg-neutral-200/80 dark:hover:bg-neutral-700/80 border border-neutral-200/60 dark:border-neutral-700/60 text-neutral-600 dark:text-neutral-300 transition-colors cursor-pointer shrink-0"
                aria-label={`Toggle theme (currently ${theme})`}
                title={`Theme: ${theme}`}
              >
                {theme === 'system' ? (
                  <Laptop className="w-3.5 h-3.5 text-neutral-500" />
                ) : resolvedTheme === 'dark' ? (
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                ) : (
                  <Moon className="w-3.5 h-3.5 text-indigo-600" />
                )}
              </button>
            )}

            {/* Main Action Pill ("Get the app ↗" in Reference Graphic) */}
            <Link
              href="/timeline"
              className="inline-flex items-center gap-1 px-4 py-2 sm:px-5 sm:py-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 text-xs sm:text-[13px] font-medium font-sans no-underline transition-all duration-200 shadow-xs hover:shadow-md active:scale-[0.98] shrink-0"
            >
              <span>Explore Archive</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
            </Link>

            {/* Mobile Hamburger Trigger (Visible below lg) */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-8 h-8 rounded-full flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 transition-colors cursor-pointer shrink-0"
              aria-label={mobileOpen ? 'Close navigation drawer' : 'Open navigation drawer'}
              aria-expanded={mobileOpen}
            >
              <div className="w-3.5 h-3.5 relative flex flex-col justify-center items-center">
                <span
                  className={`h-0.5 w-3.5 bg-current rounded-full transition-transform duration-200 ${
                    mobileOpen ? 'rotate-45' : '-translate-y-1'
                  }`}
                />
                <span
                  className={`h-0.5 w-3.5 bg-current rounded-full transition-opacity duration-150 ${
                    mobileOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`h-0.5 w-3.5 bg-current rounded-full transition-transform duration-200 ${
                    mobileOpen ? '-rotate-45' : 'translate-y-1'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Screen-Filling Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white/95 dark:bg-[#0c0a09]/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 lg:hidden overflow-y-auto pt-24 pb-32"
          >
            <div className="space-y-6">
              {/* Mobile Search Input */}
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  if (typeof window !== 'undefined') {
                    window.dispatchEvent(new CustomEvent('open-command-palette'));
                  }
                }}
                className="w-full flex items-center justify-between p-3.5 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-sans text-neutral-500"
              >
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-[var(--color-accent)]" />
                  <span>Search records, dossiers & timeline...</span>
                </div>
                <kbd className="px-1.5 py-0.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-md text-[10px]">
                  ⌘K
                </kbd>
              </button>

              {/* Core Pillars */}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--color-accent)] font-bold block mb-2">
                  The Narrative Arcs
                </span>
                <nav className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {NAV_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/70 dark:border-neutral-800 text-sm font-sans font-semibold text-neutral-900 dark:text-neutral-100 no-underline"
                    >
                      <span>{item.label}</span>
                      <ArrowRight className="w-4 h-4 text-neutral-400" />
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Research Portals */}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--color-accent)] font-bold block mb-2">
                  Research & Evidentiary Vaults
                </span>
                <nav className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {RESEARCH_MODULES.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/70 dark:border-neutral-800 text-xs font-sans text-neutral-800 dark:text-neutral-200 no-underline"
                      >
                        <Icon className="w-3.5 h-3.5 text-[var(--color-accent)] shrink-0" />
                        <span className="truncate">{item.title}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Mobile Bottom Bar */}
            <div className="border-t border-neutral-200 dark:border-neutral-800 pt-4 mt-6 flex items-center justify-between text-xs font-mono text-neutral-400">
              <div>Corpus 1931–1990 • Open-Access Archive</div>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="text-[var(--color-accent)] font-bold uppercase tracking-wider cursor-pointer"
              >
                Close ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent Mobile Bottom Navigation Dock */}
      <aside
        aria-label="Mobile Navigation Dock"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#12100e]/95 backdrop-blur-xl border-t border-neutral-200 dark:border-neutral-800 pb-safe shadow-lg"
      >
        <div className="flex items-center justify-around px-2 py-1.5">
          <Link
            href="/life"
            className={`min-h-[44px] min-w-[50px] flex flex-col items-center justify-center gap-1 text-[9.5px] font-mono uppercase tracking-wider transition-colors no-underline ${
              pathname?.startsWith('/life') ||
              pathname?.startsWith('/teachings') ||
              pathname?.startsWith('/movement') ||
              pathname?.startsWith('/controversies') ||
              pathname?.startsWith('/legacy')
                ? 'text-[var(--color-accent)] font-bold'
                : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Pillars</span>
          </Link>

          <Link
            href="/timeline"
            className={`min-h-[44px] min-w-[50px] flex flex-col items-center justify-center gap-1 text-[9.5px] font-mono uppercase tracking-wider transition-colors no-underline ${
              pathname === '/timeline'
                ? 'text-[var(--color-accent)] font-bold'
                : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Timeline</span>
          </Link>

          <Link
            href="/gallery"
            className={`relative min-h-[44px] min-w-[50px] flex flex-col items-center justify-center gap-1 text-[9.5px] font-mono uppercase tracking-wider transition-colors no-underline ${
              pathname === '/gallery'
                ? 'text-[var(--color-accent)] font-bold'
                : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <div className="relative">
              <Camera className="w-4 h-4" />
              <span className="absolute -top-1 -right-2 px-1 py-0 text-[8px] font-mono font-bold bg-[var(--color-accent)] text-white rounded-full leading-none">
                32
              </span>
            </div>
            <span>Vault</span>
          </Link>

          <Link
            href="/map"
            className={`min-h-[44px] min-w-[50px] flex flex-col items-center justify-center gap-1 text-[9.5px] font-mono uppercase tracking-wider transition-colors no-underline ${
              pathname === '/map'
                ? 'text-[var(--color-accent)] font-bold'
                : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Map</span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="min-h-[44px] min-w-[50px] flex flex-col items-center justify-center gap-1 text-[9.5px] font-mono uppercase tracking-wider text-neutral-500 hover:text-neutral-900 dark:hover:text-white cursor-pointer"
            aria-label="Open full archival navigation menu"
          >
            <div className="w-3.5 h-3.5 flex flex-col justify-around py-0.5">
              <span className="h-0.5 w-full bg-current rounded-full" />
              <span className="h-0.5 w-full bg-current rounded-full" />
              <span className="h-0.5 w-full bg-current rounded-full" />
            </div>
            <span>Menu</span>
          </button>
        </div>
      </aside>
    </>
  );
}
