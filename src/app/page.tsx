'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Search, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { ReadingPaths } from '@/components/ui/ReadingPaths';
import { PillarsBento } from '@/components/ui/PillarsBento';
import { EvidenceMatrix } from '@/components/ui/EvidenceMatrix';
import { QuotePlayer } from '@/components/ui/QuotePlayer';
import { ArchivalGallery } from '@/components/ui/ArchivalGallery';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
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

export default function HomePage() {
  return (
    <div className="w-full">
      {/* Editorial Documentary Hero Section */}
      <section className="relative min-h-[90dvh] flex items-center justify-center py-20 lg:py-28 border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
          >
            {/* Left Column: Documentary Lead & Editorial Typography */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* Masthead Eyebrow */}
              <motion.div
                variants={fadeUpVariant}
                className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-[var(--color-accent)] font-semibold mb-6"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
                <span>An Impartial Archival Investigation • 1931–1990</span>
              </motion.div>

              <motion.h1
                variants={fadeUpVariant}
                className="font-serif text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-[var(--color-text)] leading-[1.0] mb-6"
              >
                BHAGWAN
                <span className="block italic font-normal text-3xl sm:text-5xl lg:text-6xl text-[var(--color-text-secondary)] mt-2 font-serif">
                  The Enigma of Osho
                </span>
              </motion.h1>

              {/* Editorial Lead Narrative */}
              <motion.p
                variants={fadeUpVariant}
                className="text-lg sm:text-xl text-[var(--color-text-secondary)] font-sans leading-relaxed max-w-2xl mb-10"
              >
                Spiritual master to hundreds of thousands; dangerous cult leader and public enemy to the United States government. An unflinching, evidence-graded documentary deconstructing the 20th century’s most polarizing spiritual phenomenon across five investigative volumes.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                variants={fadeUpVariant}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-10 w-full sm:w-auto"
              >
                <Link
                  href="/articles/life/early-years"
                  className="inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-sm bg-[var(--color-text)] text-[var(--color-bg)] font-mono font-semibold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity no-underline shadow-xs min-h-[48px]"
                >
                  <span>Begin Chronological Inquiry</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/sources"
                  className="inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-sm bg-[var(--color-bg-elevated)] hover:bg-[var(--color-bg-inset)] text-[var(--color-text)] border border-[var(--color-border)] font-mono font-semibold text-xs uppercase tracking-wider transition-colors no-underline min-h-[48px]"
                >
                  <Search className="w-4 h-4 text-[var(--color-text-muted)]" />
                  <span>Consult Primary Sources</span>
                </Link>
              </motion.div>

              {/* Archival Provenance Bar */}
              <motion.div
                variants={fadeUpVariant}
                className="pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full"
              >
                <img
                  src="/images/archival/osho-signature.webp"
                  alt="Osho authentic signature"
                  className="signature-archival h-9 sm:h-10 w-auto opacity-85 hover:opacity-100 transition-opacity dark:invert dark:opacity-90 select-none"
                />
                <div className="text-[11px] font-mono text-[var(--color-text-muted)] leading-tight">
                  <div className="font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-1">
                    Primary Source Corpus
                  </div>
                  <div>Over 5,000 Recorded Audio Discourses • Declassified FBI Vault Exhibits</div>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Museum Archival Mount */}
            {/* Right Column: Museum Archival Mount */}
            <motion.div variants={fadeUpVariant} className="lg:col-span-5 w-full">
              <div className="rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-3 shadow-xs">
                <div className="relative overflow-hidden aspect-[4/5] bg-neutral-950 border border-[var(--color-border)]">
                  <img
                    src="/images/archival/hero-osho-portrait.jpg"
                    alt="Archival portrait of Bhagwan Shree Rajneesh"
                    className="w-full h-full object-cover object-top filter contrast-105 brightness-95 ken-burns"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute top-4 left-4 px-2.5 py-1 bg-black/80 text-[10px] font-mono uppercase tracking-wider text-neutral-300 border border-white/15 font-semibold">
                    Archival Plate • Pune, 1978
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 text-white text-left">
                    <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-400 font-semibold mb-1">
                      Historical Record Ref #1978-08
                    </div>
                    <div className="font-serif text-xl sm:text-2xl font-bold mb-1">
                      Chandra Mohan Jain (Osho)
                    </div>
                    <div className="text-xs text-white/70 font-sans">
                      Photographed during the morning discourse period at Koregaon Park Ashram, Pune, India.
                    </div>
                  </div>
                </div>

                <div className="px-3 py-3 flex items-center justify-between text-[11px] font-mono text-[var(--color-text-muted)] border-t border-[var(--color-border)] mt-2">
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" /> Wasco County & FBI Dossier Cross-Ref
                  </span>
                  <span>Verified Impartial</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Archival Evidentiary Index (4 Key Exhibits) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[var(--color-border)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12 pb-6 border-b border-[var(--color-border)]">
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.2em] font-semibold text-[var(--color-accent)] mb-1">
              Archival Ledger
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--color-text)]">
              Index of Key Evidentiary Exhibits
            </h2>
          </div>
          <div className="text-xs font-mono text-[var(--color-text-muted)]">
            Corroborated by Wasco County Grand Jury & CDC Records
          </div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
        >
          {/* Exhibit 01 */}
          <motion.div
            variants={fadeUpVariant}
            className="flex flex-col p-6 rounded-none bg-[var(--color-bg-elevated)] border border-[var(--color-border)] shadow-xs"
          >
            <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-accent)] font-semibold mb-2">
              Exhibit 01 • Fleet Ledger
            </div>
            <div className="font-serif text-4xl sm:text-5xl font-bold text-[var(--color-text)] tracking-tight mb-2">
              93
            </div>
            <div className="text-xs font-mono font-medium text-[var(--color-text-secondary)] mb-2 uppercase tracking-wider">
              Rolls-Royces Owned
            </div>
            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed font-sans">
              Purchased by disciples as a deliberate philosophical provocation against asceticism; later liquidated in federal receivership.
            </p>
          </motion.div>

          {/* Exhibit 02 */}
          <motion.div
            variants={fadeUpVariant}
            className="flex flex-col p-6 rounded-none bg-[var(--color-bg-elevated)] border border-[var(--color-border)] shadow-xs"
          >
            <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-accent)] font-semibold mb-2">
              Exhibit 02 • Bioterror Case
            </div>
            <div className="font-serif text-4xl sm:text-5xl font-bold text-[var(--color-text)] tracking-tight mb-2">
              751
            </div>
            <div className="text-xs font-mono font-medium text-[var(--color-text-secondary)] mb-2 uppercase tracking-wider">
              Poisoning Victims
            </div>
            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed font-sans">
              The September 1984 Salmonella typhimurium salad-bar contamination in The Dalles, Oregon — the first confirmed U.S. biological attack.
            </p>
          </motion.div>

          {/* Exhibit 03 */}
          <motion.div
            variants={fadeUpVariant}
            className="flex flex-col p-6 rounded-none bg-[var(--color-bg-elevated)] border border-[var(--color-border)] shadow-xs"
          >
            <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-accent)] font-semibold mb-2">
              Exhibit 03 • Audio Archive
            </div>
            <div className="font-serif text-4xl sm:text-5xl font-bold text-[var(--color-text)] tracking-tight mb-2">
              600+
            </div>
            <div className="text-xs font-mono font-medium text-[var(--color-text-secondary)] mb-2 uppercase tracking-wider">
              Transcribed Volumes
            </div>
            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed font-sans">
              Delivered completely extemporaneously over three decades, recorded on master magnetic tape reels and translated into 50+ languages.
            </p>
          </motion.div>

          {/* Exhibit 04 */}
          <motion.div
            variants={fadeUpVariant}
            className="flex flex-col p-6 rounded-none bg-[var(--color-bg-elevated)] border border-[var(--color-border)] shadow-xs"
          >
            <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-accent)] font-semibold mb-2">
              Exhibit 04 • World Odyssey
            </div>
            <div className="font-serif text-4xl sm:text-5xl font-bold text-[var(--color-text)] tracking-tight mb-2">
              21
            </div>
            <div className="text-xs font-mono font-medium text-[var(--color-text-secondary)] mb-2 uppercase tracking-wider">
              Nations Denied Entry
            </div>
            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed font-sans">
              The 1985–1986 global post-deportation exile following the Alford plea conviction and federal expulsion from the United States.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Quote & Audio Listening Console */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-[var(--color-border)]">
        <QuotePlayer />
      </section>

      {/* Archival Visual Evidence Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-[var(--color-border)]">
        <ArchivalGallery />
      </section>

      {/* The Five Archival Volumes */}
      <PillarsBento />

      {/* Curated Reading Pathways */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-[var(--color-border)]">
        <ReadingPaths />
      </section>

      {/* Forensic Evidence Matrix */}
      <section className="py-16 sm:py-20 pb-32 sm:pb-20">
        <EvidenceMatrix />
      </section>
    </div>
  );
}
