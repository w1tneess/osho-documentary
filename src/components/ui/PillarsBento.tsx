'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Compass, ShieldAlert, BookOpen, Flame, Landmark } from 'lucide-react';
import { motion } from 'framer-motion';

interface Pillar {
  volume: string;
  title: string;
  period: string;
  description: string;
  href: string;
  keyEvidence: string;
  colSpan: string;
  image?: string;
  icon: typeof BookOpen;
}

const PILLARS: Pillar[] = [
  {
    volume: 'Volume I',
    title: 'The Biographical Arc',
    period: '1931 – 1990',
    description:
      'Chandra Mohan Jain’s transition from a rebellious central Indian youth and Jabalpur philosophy professor into an all-India mystic orator, commune founder, and global celebrity.',
    href: '/life',
    keyEvidence: '22 Biographical Exhibits • Madhya Pradesh to Pune',
    colSpan: 'md:col-span-2',
    image: '/images/archival/osho-teaching.jpg',
    icon: Compass,
  },
  {
    volume: 'Volume II',
    title: 'Philosophical Doctrines',
    period: 'Active Meditation & Tantra',
    description:
      'The Zorba the Buddha ideal: radical synthesis of Eastern spiritual detachment and Western material celebration, dynamic catharsis, and critiques of organized orthodoxy.',
    href: '/teachings',
    keyEvidence: 'Over 600 extemporaneous discourse transcriptions',
    colSpan: 'md:col-span-1',
    icon: Flame,
  },
  {
    volume: 'Volume III',
    title: 'The Global Movement',
    period: 'Poona I to Rajneeshpuram',
    description:
      'The expansion of the sannyas movement: the 1970s therapy boom in Maharashtra, migration to the 64,000-acre Big Muddy Ranch in Oregon, and commune corporatization.',
    href: '/movement',
    keyEvidence: 'Wasco County land deed files & international branch records',
    colSpan: 'md:col-span-1',
    icon: Landmark,
  },
  {
    volume: 'Volume IV',
    title: 'Criminal Record & Federal Inquiries',
    period: '1984 Bioterrorism & Wiretaps',
    description:
      'The forensic breakdown of the Salmonella outbreak in The Dalles, Oregon, mass immigration fraud conspiracies, wiretapping networks, and the federal Alford plea agreement.',
    href: '/controversies',
    keyEvidence: 'U.S. Attorney trial briefs, CDC epidemiological reports, FBI vault',
    colSpan: 'md:col-span-2',
    image: '/images/archival/rajneesh-rolls-royce.jpg',
    icon: ShieldAlert,
  },
  {
    volume: 'Volume V',
    title: 'Legacy & Contemporary Aftermath',
    period: '1990 – Present Day',
    description:
      'Post-Osho corporate restructuring: the transformation into the Pune Meditation Resort, international trademark litigation in Zurich, and global cultural renaissance.',
    href: '/legacy',
    keyEvidence: 'Swiss Federal Court filings & global publishing catalog',
    colSpan: 'md:col-span-3',
    image: '/images/archival/rajneeshpuram-festival.jpg',
    icon: BookOpen,
  },
];

const fadeUpVariant = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
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

export function PillarsBento() {
  return (
    <section className="py-24 border-t border-[var(--color-border)] bg-[var(--color-bg-inset)]/30" id="explore-pillars">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Masthead */}
        <motion.div
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[var(--color-border)]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
        >
          <div className="max-w-3xl">
            <motion.div
              variants={fadeUpVariant}
              className="text-xs font-mono uppercase tracking-[0.2em] font-semibold text-[var(--color-accent)] mb-3"
            >
              Archival Ledger • Primary Collections
            </motion.div>
            <motion.h2
              variants={fadeUpVariant}
              className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-[var(--color-text)]"
            >
              The Five Investigative Volumes
            </motion.h2>
            <motion.p
              variants={fadeUpVariant}
              className="text-[var(--color-text-secondary)] text-base sm:text-lg max-w-2xl mt-4 leading-relaxed"
            >
              Examine every critical epoch of the Rajneesh phenomenon through cross-examined FBI files, trial transcripts, eyewitness testimonies, and primary discourses.
            </motion.p>
          </div>

          <motion.div variants={fadeUpVariant}>
            <Link
              href="/sources"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors"
            >
              <span>Examine Bibliography & Sources</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Archival Chapter Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
        >
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <motion.div key={pillar.volume} variants={fadeUpVariant} className={pillar.colSpan}>
                <Link
                  href={pillar.href}
                  className="group block h-full rounded-sm bg-[var(--color-bg-elevated)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/50 transition-all duration-300 overflow-hidden no-underline text-inherit shadow-xs"
                >
                  <div className="flex flex-col h-full justify-between p-6 sm:p-8">
                    {pillar.image && (
                      <div className="relative w-full h-56 -mx-6 -mt-6 sm:-mx-8 sm:-mt-8 mb-6 overflow-hidden border-b border-[var(--color-border)] bg-neutral-900">
                        <img
                          src={pillar.image}
                          alt={pillar.title}
                          className="w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-elevated)] via-transparent to-transparent opacity-80" />
                        <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono tracking-wider text-white">
                          {pillar.period}
                        </div>
                      </div>
                    )}

                    <div>
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <span className="text-[11px] font-mono uppercase tracking-[0.18em] font-semibold text-[var(--color-accent)]">
                          {pillar.volume}
                        </span>
                        <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-text-muted)] group-hover:text-[var(--color-text)] transition-colors">
                          <Icon className="w-3.5 h-3.5" />
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                      </div>

                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--color-text)] mb-3 group-hover:text-[var(--color-accent)] transition-colors">
                        {pillar.title}
                      </h3>

                      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6 font-sans">
                        {pillar.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[var(--color-border)] flex items-center justify-between text-[11px] font-mono text-[var(--color-text-muted)]">
                      <span>{pillar.keyEvidence}</span>
                      <span className="text-[var(--color-accent)] group-hover:underline">Open Volume &rarr;</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
