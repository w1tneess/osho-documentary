'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, Newspaper, HelpCircle, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';

const TIERS = [
  {
    name: 'Established',
    accent: 'border-l-2 border-emerald-500',
    tagColor: 'text-emerald-600 dark:text-emerald-400',
    icon: CheckCircle2,
    desc: 'Multiple independent verified sources, official court transcripts, grand jury exhibits, or primary audio archives confirm the historical facts.',
    standard: 'Tier 1 Standard',
  },
  {
    name: 'Reported',
    accent: 'border-l-2 border-blue-500',
    tagColor: 'text-blue-600 dark:text-blue-400',
    icon: Newspaper,
    desc: 'Documented by reputable contemporary journalists (The Oregonian, The New York Times) or recognized academic sociological studies.',
    standard: 'Tier 2 Secondary',
  },
  {
    name: 'Disputed',
    accent: 'border-l-2 border-amber-500',
    tagColor: 'text-amber-600 dark:text-amber-400',
    icon: HelpCircle,
    desc: 'Conflicting accounts exist between commune leadership, federal prosecutors, hostile neighbors, or former disciples.',
    standard: 'Contested Record',
  },
  {
    name: 'Alleged',
    accent: 'border-l-2 border-rose-500',
    tagColor: 'text-rose-600 dark:text-rose-400',
    icon: AlertTriangle,
    desc: 'Asserted by a single partisan party or hostile witness without independent documentary corroboration or physical forensic proof.',
    standard: 'Uncorroborated',
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
      staggerChildren: 0.1,
    },
  },
};

export function EvidenceMatrix() {
  return (
    <section className="py-24 border-t border-[var(--color-border)]" id="evidence-matrix">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="max-w-3xl mb-16"
        >
          <motion.div 
            variants={fadeUpVariant} 
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[var(--color-accent)] font-semibold mb-3"
          >
            <span className="w-1.5 h-1.5 bg-[var(--color-accent)]" />
            <span>Forensic Evidentiary Classification</span>
          </motion.div>

          <motion.h2 
            variants={fadeUpVariant} 
            className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-[var(--color-text)] mb-4 tracking-tight leading-[1.0]"
          >
            How We Grade Historical Evidence
          </motion.h2>
          
          <motion.p 
            variants={fadeUpVariant} 
            className="text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed font-sans"
          >
            Because the Rajneesh movement is subject to intense hagiography by disciples and sensationalism by tabloids, every notable claim across this platform is explicitly categorized by evidence strength.
          </motion.p>
        </motion.div>

        {/* Claim Strength Ledger Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          {TIERS.map((tier) => {
            const Icon = tier.icon;
            return (
              <motion.div 
                key={tier.name} 
                variants={fadeUpVariant} 
                className={`p-6 sm:p-7 border border-[var(--color-border)] bg-[var(--color-bg-elevated)] ${tier.accent} flex flex-col justify-between shadow-xs hover:border-[var(--color-border-strong)] transition-colors`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[11px] font-mono uppercase tracking-widest font-semibold ${tier.tagColor}`}>
                      {tier.standard}
                    </span>
                    <Icon className="w-4 h-4 text-[var(--color-text-muted)]" />
                  </div>

                  <h3 className="font-serif text-2xl font-bold tracking-tight text-[var(--color-text)] mb-3">
                    {tier.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed font-sans mb-6">
                    {tier.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[var(--color-border)] flex items-center justify-between text-[10px] font-mono text-[var(--color-text-muted)]">
                  <span>Corroboration Level</span>
                  <span className="font-semibold text-[var(--color-text-secondary)]">Strict Protocol</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Action Link */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUpVariant}>
            <Link
              href="/method"
              className="inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-[var(--color-text)] text-[var(--color-bg)] text-xs font-mono uppercase tracking-wider font-semibold hover:opacity-90 transition-opacity no-underline shadow-xs w-full sm:w-auto min-h-[44px]"
            >
              <span>Read The Complete Research Protocol</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
