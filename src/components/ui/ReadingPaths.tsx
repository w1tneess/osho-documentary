'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, BookOpen, ShieldAlert, ArrowRight } from 'lucide-react';

interface PathConfig {
  id: string;
  badge: string;
  duration: string;
  title: string;
  subtitle: string;
  description: string;
  articles: string[];
  image: string;
  icon: typeof Clock;
}

const PATHS: PathConfig[] = [
  {
    id: 'overview',
    badge: 'Fast-Track Dossier',
    duration: '5 Min Read',
    title: 'The Essential Primer',
    subtitle: 'The Rise, The Commune & The Downfall',
    description: 'An executive synthesis of Osho’s trajectory, the Oregon experiment, and the dramatic aftermath.',
    articles: ['life/early-years', 'movement/pune-1'],
    image: '/images/archival/poona-disciples-1977.jpg',
    icon: Clock,
  },
  {
    id: 'full-story',
    badge: 'Chronological Archive',
    duration: '35 Min Deep Dive',
    title: 'The Complete Chronicle',
    subtitle: 'From Rebel Scholar to Global Guru',
    description: 'The unabridged life arc: Madhya Pradesh roots, philosophy professor, Mumbai discourses, and international exile.',
    articles: ['life/early-years', 'life/teaching-career', 'movement/pune-1', 'movement/rajneeshpuram', 'life/final-years'],
    image: '/images/archival/rajneesh-rolls-royce.jpg',
    icon: BookOpen,
  },
  {
    id: 'fact-check',
    badge: 'Declassified Exhibits',
    duration: 'Forensic Vault',
    title: 'The Evidence & Controversies',
    subtitle: 'Bioterror, Wiretaps & The FBI',
    description: 'Direct examination of the 1984 The Dalles Salmonella attack, Sheela’s inner circle, and the Alford plea.',
    articles: ['controversies/bioterror-attack', 'controversies/group-therapies'],
    image: '/images/archival/rajneeshpuram-festival.jpg',
    icon: ShieldAlert,
  },
];

const fadeUpVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: {
      duration: 0.7,
      ease: [0.32, 0.72, 0, 1] as const,
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export function ReadingPaths() {
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});

  useEffect(() => {
    try {
      const historyStr = localStorage.getItem('osho_read_history');
      const readArticles: string[] = historyStr ? JSON.parse(historyStr) : [];
      const newMap: Record<string, number> = {};

      PATHS.forEach((path) => {
        const readCount = path.articles.filter((a) => readArticles.includes(a)).length;
        newMap[path.id] = path.articles.length > 0 ? Math.round((readCount / path.articles.length) * 100) : 0;
      });

      setProgressMap(newMap);
    } catch {
      // Ignore storage errors
    }
  }, []);

  return (
    <section className="py-24" id="reading-paths">
      {/* Header */}
      <motion.div 
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-[var(--color-border)]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        <div className="max-w-2xl">
          <motion.div 
            variants={fadeUpVariant} 
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[var(--color-accent)] font-semibold mb-3"
          >
            <span className="w-1.5 h-1.5 bg-[var(--color-accent)]" />
            <span>Curated Archival Pathways</span>
          </motion.div>

          <motion.h2 
            variants={fadeUpVariant} 
            className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight text-[var(--color-text)] leading-[1.0]"
          >
            Choose Your Investigation Angle
          </motion.h2>

          <motion.p 
            variants={fadeUpVariant} 
            className="text-[var(--color-text-secondary)] text-base sm:text-lg mt-4 leading-relaxed font-sans"
          >
            Follow structured, evidence-graded dossiers through the archives tailored to your research objectives.
          </motion.p>
        </div>

        <motion.div 
          variants={fadeUpVariant} 
          className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] flex items-center gap-2 px-3 py-1.5 border border-[var(--color-border)] bg-[var(--color-bg-elevated)] rounded-none shrink-0"
        >
          <span className="w-1.5 h-1.5 bg-emerald-500" />
          <span>Progress Stored Locally</span>
        </motion.div>
      </motion.div>

      {/* Archival Dossier Cards Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        {PATHS.map((path) => {
          const progress = progressMap[path.id] || 0;
          const Icon = path.icon;

          return (
            <motion.div 
              variants={fadeUpVariant} 
              key={path.id} 
              className="flex flex-col justify-between border border-[var(--color-border)] bg-[var(--color-bg-elevated)] rounded-none hover:border-[var(--color-border-strong)] transition-colors p-6 sm:p-7 shadow-xs"
            >
              <div>
                {/* Archival Photographic Plate */}
                <div className="relative w-full aspect-[16/10] overflow-hidden mb-6 border border-[var(--color-border)] bg-neutral-950">
                  <img
                    src={path.image}
                    alt={path.title}
                    className="w-full h-full object-cover object-center filter grayscale contrast-105 hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                  {/* Corner Docket Tag */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest font-semibold bg-black/80 text-amber-300 border border-white/10">
                      {path.badge}
                    </span>
                  </div>

                  {/* Bottom Plate Data */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-neutral-300">
                    <span className="flex items-center gap-1.5 bg-black/70 px-2 py-0.5 border border-white/10">
                      <Icon className="w-3 h-3 text-amber-400" />
                      {path.duration}
                    </span>
                    <span className="bg-black/70 px-2 py-0.5 border border-white/10 text-amber-300 font-semibold">
                      {progress === 100 ? 'COMPLETED' : `${progress}% READ`}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="text-[11px] font-mono text-[var(--color-accent)] uppercase tracking-wider mb-1">
                  {path.subtitle}
                </div>

                <h3 className="text-2xl font-serif font-bold text-[var(--color-text)] mb-3 leading-snug">
                  {path.title}
                </h3>

                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed font-sans mb-6">
                  {path.description}
                </p>
              </div>

              {/* Progress & Clean Action */}
              <div className="pt-4 border-t border-[var(--color-border)] mt-auto">
                <div className="flex items-center justify-between text-[11px] font-mono text-[var(--color-text-muted)] mb-2">
                  <span>Dossier Progress</span>
                  <span>{progress}%</span>
                </div>

                {/* Clean Hairline Progress Bar */}
                <div className="w-full h-1 bg-[var(--color-bg-inset)] border border-[var(--color-border)] mb-5 overflow-hidden">
                  <div 
                    className="h-full bg-[var(--color-accent)] transition-all duration-700"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <Link
                  href={`/articles/${path.articles[0]}`}
                  className="w-full flex items-center justify-between px-4 py-3 bg-[var(--color-text)] text-[var(--color-bg)] hover:opacity-90 text-xs font-mono uppercase tracking-wider font-semibold transition-opacity no-underline shadow-xs min-h-[44px]"
                >
                  <span>{progress > 0 ? (progress === 100 ? 'Review Dossier' : 'Continue Reading') : 'Begin Investigation'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
