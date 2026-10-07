'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Clock,
  ShieldCheck,
  MapPin,
  Volume2,
  Camera,
  FileText,
  BookA,
  Compass,
  Flame,
  Landmark,
  ShieldAlert,
  BookOpen,
  Maximize2,
  ExternalLink,
} from 'lucide-react';
import { ARCHIVAL_IMAGES, ArchivalImage } from '@/lib/archivalImages';

export interface PillarViewProps {
  pillarNumber: string;
  category: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  plateSrc: string;
  plateAlt: string;
  plateTag: string;
  plateCaption: string;
  thesisTag: string;
  thesisTitle: string;
  thesisDescription: string;
  stat1: string;
  stat2: string;
  articles: Array<{ slug: string; title: string; summary: string }>;
  contextIconType: 'map' | 'audio' | 'photos' | 'sources' | 'glossary';
  contextTitle: string;
  contextDesc: string;
  contextLink: string;
  contextLinkText: string;
  accentVariant?: 'amber' | 'rose' | 'purple';
}

const fadeUpVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export function PillarView({
  pillarNumber,
  category,
  title,
  titleAccent,
  subtitle,
  plateSrc,
  plateAlt,
  plateTag,
  plateCaption,
  thesisTag,
  thesisTitle,
  thesisDescription,
  stat1,
  stat2,
  articles,
  contextIconType,
  contextTitle,
  contextDesc,
  contextLink,
  contextLinkText,
  accentVariant = 'amber',
}: PillarViewProps) {
  const getAccentColor = () => {
    if (accentVariant === 'rose') return 'text-rose-600 dark:text-rose-400';
    if (accentVariant === 'purple') return 'text-purple-600 dark:text-purple-400';
    return 'text-[var(--color-accent)]';
  };

  const getPillBadgeColor = () => {
    if (accentVariant === 'rose')
      return 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/25';
    if (accentVariant === 'purple')
      return 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/25';
    return 'bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/25';
  };

  const renderContextIcon = () => {
    const className = `w-5 h-5 ${
      accentVariant === 'rose'
        ? 'text-rose-600 dark:text-rose-400'
        : accentVariant === 'purple'
        ? 'text-purple-600 dark:text-purple-400'
        : 'text-[var(--color-accent)]'
    }`;
    switch (contextIconType) {
      case 'map':
        return <MapPin className={className} />;
      case 'audio':
        return <Volume2 className={className} />;
      case 'photos':
        return <Camera className={className} />;
      case 'sources':
        return <FileText className={className} />;
      case 'glossary':
        return <BookA className={className} />;
      default:
        return <Compass className={className} />;
    }
  };

  const renderCardIcon = () => {
    const className = 'w-4 h-4 text-neutral-400 group-hover:text-[var(--color-accent)] transition-colors duration-200';
    if (accentVariant === 'rose')
      return <ShieldAlert className="w-4 h-4 text-rose-500 group-hover:text-rose-600 transition-colors duration-200" />;
    if (accentVariant === 'purple')
      return <BookOpen className="w-4 h-4 text-purple-500 group-hover:text-purple-600 transition-colors duration-200" />;
    if (category.toLowerCase() === 'teachings') return <Flame className={className} />;
    if (category.toLowerCase() === 'movement') return <Landmark className={className} />;
    return <Compass className={className} />;
  };

  // Curate 4 relevant archival photos from the master collection of 139 images
  const relatedPhotos = useMemo(() => {
    const cat = category.toLowerCase();
    let matches: ArchivalImage[] = [];

    if (cat === 'life') {
      matches = ARCHIVAL_IMAGES.filter(
        (img) => img.era === 'early' || img.era === 'pune-1' || img.category === 'portraits'
      );
    } else if (cat === 'teachings') {
      matches = ARCHIVAL_IMAGES.filter(
        (img) => img.category === 'pune' || img.category === 'artifacts' || img.era === 'pune-2'
      );
    } else if (cat === 'movement') {
      matches = ARCHIVAL_IMAGES.filter(
        (img) => img.category === 'rajneeshpuram' || img.category === 'commune'
      );
    } else if (cat === 'controversies') {
      matches = ARCHIVAL_IMAGES.filter(
        (img) => img.category === 'investigation' || img.era === 'crisis-1985'
      );
    } else if (cat === 'legacy') {
      matches = ARCHIVAL_IMAGES.filter(
        (img) => img.era === 'legacy' || img.category === 'pune' || img.category === 'artifacts'
      );
    }

    return matches.slice(0, 4);
  }, [category]);

  return (
    <div className="w-full">
      {/* Editorial Hero Header */}
      <section className="relative py-20 lg:py-28 border-b border-[var(--color-border)] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {/* Archival Eyebrow */}
            <motion.div
              variants={fadeUpVariant}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[var(--color-bg-elevated)] border border-[var(--color-border)] mb-8 shadow-xs"
            >
              <span className="w-1.5 h-1.5 bg-[var(--color-accent)] rounded-none" />
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] font-semibold text-[var(--color-text-secondary)]">
                Volume {pillarNumber} • {category} Archives
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUpVariant}
              className="font-serif text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-[var(--color-text)] leading-[0.96] mb-8"
            >
              {title} <br />
              <span className={`italic font-normal ${getAccentColor()}`}>{titleAccent}</span>
            </motion.h1>

            <motion.p
              variants={fadeUpVariant}
              className="text-lg sm:text-xl text-[var(--color-text-secondary)] font-sans leading-relaxed max-w-2xl mx-auto"
            >
              {subtitle}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Featured Archival Hardware Plate */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6 sm:p-10 lg:p-12 shadow-xs rounded-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Photographic Mount */}
            <div className="lg:col-span-6 relative overflow-hidden aspect-[16/10] bg-neutral-950 border border-[var(--color-border)] rounded-sm group">
              <img
                src={plateSrc}
                alt={plateAlt}
                className="w-full h-full object-cover object-center filter contrast-105 scale-100 group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
              
              <div className="absolute top-3 left-3 px-2 py-0.5 bg-black/85 border border-white/20 text-[10px] font-mono text-amber-300 tracking-wider uppercase font-semibold rounded-none">
                {plateTag}
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-xs font-mono text-white/90">
                {plateCaption}
              </div>
            </div>

            {/* Investigative Thesis Dossier */}
            <div className="lg:col-span-6 text-left">
              <div
                className={`inline-flex items-center gap-2 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-[0.2em] font-semibold mb-4 rounded-none border ${getPillBadgeColor()}`}
              >
                <span>{thesisTag}</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--color-text)] mb-4 leading-snug">
                {thesisTitle}
              </h2>

              <p className="text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed mb-6 font-sans">
                {thesisDescription}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--color-text-muted)] pt-4 border-t border-[var(--color-border)]">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[var(--color-accent)]" /> {stat1}
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> {stat2}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Relevant Archival Evidence Photo Strip */}
      {relatedPhotos.length > 0 && (
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between mb-6 pb-3 border-b border-[var(--color-border)]">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-[var(--color-accent)]" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] font-semibold text-[var(--color-text)]">
                Corroborated Archival Exhibits • {category}
              </span>
            </div>
            <Link
              href="/gallery"
              className="text-xs font-mono text-[var(--color-accent)] hover:underline flex items-center gap-1 no-underline font-semibold"
            >
              <span>View All 32 Plates in Vault</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedPhotos.map((photo) => (
              <Link
                key={photo.id}
                href="/gallery"
                className="group block border border-[var(--color-border)] bg-[var(--color-bg-elevated)] rounded-sm overflow-hidden no-underline hover:border-[var(--color-border-strong)] transition-colors shadow-2xs"
              >
                <div className="relative aspect-[4/3] bg-neutral-950 overflow-hidden">
                  <Image
                    src={photo.src}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-black/85 text-[9px] font-mono text-amber-300 border border-amber-500/30">
                    {photo.year}
                  </div>
                </div>

                <div className="p-3">
                  <div className="text-[10px] font-mono text-[var(--color-text-muted)] mb-1 truncate">
                    {photo.location}
                  </div>
                  <h4 className="font-serif text-xs font-bold text-[var(--color-text)] line-clamp-1 group-hover:text-[var(--color-accent)] transition-colors">
                    {photo.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Chapters Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[var(--color-border)]">
        <div className="mb-14 text-left">
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[var(--color-accent)] font-semibold mb-2">
            Investigative Dossiers
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--color-text)]">
            Explore the {category} Studies
          </h2>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
        >
          {articles.map((art) => (
            <motion.div key={art.slug} variants={fadeUpVariant} className="h-full">
              <Link
                href={`/articles/${art.slug}`}
                className="h-full flex flex-col justify-between p-8 lg:p-10 border border-[var(--color-border)] bg-[var(--color-bg-elevated)] hover:border-[var(--color-border-strong)] transition-colors no-underline text-inherit group shadow-xs rounded-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className={`text-[10px] font-mono uppercase tracking-[0.2em] px-2.5 py-0.5 font-semibold rounded-none border ${getPillBadgeColor()}`}
                    >
                      Dossier
                    </span>
                    {renderCardIcon()}
                  </div>

                  <h3 className="font-serif text-2xl lg:text-3xl font-bold text-[var(--color-text)] mb-3 group-hover:text-[var(--color-accent)] transition-colors duration-200 leading-tight">
                    {art.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed mb-8 font-sans">
                    {art.summary}
                  </p>
                </div>

                <div className="pt-6 border-t border-[var(--color-border)] flex items-center justify-between">
                  <span className="text-xs font-mono text-[var(--color-text-muted)]">
                    Examine Dossier
                  </span>
                  <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
                    <span>Read Study</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Contextual Archival Cross-Link Tool */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs rounded-sm">
          <div className="flex items-center gap-4 text-left">
            <div
              className={`w-12 h-12 border rounded-sm flex items-center justify-center shrink-0 ${
                accentVariant === 'rose'
                  ? 'bg-rose-500/10 border-rose-500/20'
                  : accentVariant === 'purple'
                  ? 'bg-purple-500/10 border-purple-500/20'
                  : 'bg-amber-500/10 border-amber-500/20'
              }`}
            >
              {renderContextIcon()}
            </div>
            <div>
              <h4 className="font-serif text-xl font-bold text-[var(--color-text)] mb-1">
                {contextTitle}
              </h4>
              <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] font-sans">
                {contextDesc}
              </p>
            </div>
          </div>
          <Link
            href={contextLink}
            className="inline-flex items-center gap-3 px-6 py-3.5 bg-[var(--color-text)] text-[var(--color-bg)] font-mono text-xs uppercase tracking-wider font-semibold hover:opacity-90 transition-opacity no-underline shrink-0 shadow-xs rounded-sm"
          >
            <span>{contextLinkText}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
