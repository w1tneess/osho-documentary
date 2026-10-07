'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, X, ArrowLeft, ArrowRight, Maximize2, 
  Camera, Calendar, MapPin, ShieldCheck, Tag, ExternalLink,
  ChevronLeft, ChevronRight, Layers, SlidersHorizontal
} from 'lucide-react';
import { ARCHIVAL_IMAGES, ArchivalImage, ERA_LABELS, CATEGORY_LABELS } from '@/lib/archivalImages';

type EraFilter = 'all' | ArchivalImage['era'];
type CategoryFilter = 'all' | ArchivalImage['category'];

export default function GalleryPage() {
  const [selectedEra, setSelectedEra] = useState<EraFilter>('all');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalImage, setActiveModalImage] = useState<ArchivalImage | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  // Filter images based on era, category, and search text
  const filteredImages = useMemo(() => {
    return ARCHIVAL_IMAGES.filter((img) => {
      if (selectedEra !== 'all' && img.era !== selectedEra) return false;
      if (selectedCategory !== 'all' && img.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = img.title.toLowerCase().includes(query);
        const matchesCaption = img.caption.toLowerCase().includes(query);
        const matchesLocation = img.location.toLowerCase().includes(query);
        const matchesYear = String(img.year).includes(query);
        const matchesCategory = img.category.toLowerCase().includes(query);
        return matchesTitle || matchesCaption || matchesLocation || matchesYear || matchesCategory;
      }
      return true;
    });
  }, [selectedEra, selectedCategory, searchQuery]);

  // Modal navigation (previous / next)
  const currentIndex = activeModalImage
    ? filteredImages.findIndex((img) => img.id === activeModalImage.id)
    : -1;

  const handleNext = () => {
    if (currentIndex >= 0 && currentIndex < filteredImages.length - 1) {
      setActiveModalImage(filteredImages[currentIndex + 1]);
      setIsZoomed(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setActiveModalImage(filteredImages[currentIndex - 1]);
      setIsZoomed(false);
    }
  };

  // Touch swipe gesture handling for mobile
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrev();
  };

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!activeModalImage) return;
      if (e.key === 'Escape') setActiveModalImage(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeModalImage, currentIndex, filteredImages]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: ARCHIVAL_IMAGES.length };
    ARCHIVAL_IMAGES.forEach((img) => {
      counts[img.category] = (counts[img.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-bg)] pt-24 pb-28 text-[var(--color-text)]">
      {/* Archival Masthead Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="border-b border-[var(--color-border)] pb-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-xs font-mono uppercase tracking-[0.2em] text-[var(--color-text-secondary)]">
              <Camera className="w-3.5 h-3.5 text-[var(--color-accent)]" />
              <span>Declassified Photographic Record • 1931–1990</span>
            </div>

            <div className="text-xs font-mono text-[var(--color-text-muted)] flex items-center gap-3">
              <span>LEDGER SIZE: <strong>{ARCHIVAL_IMAGES.length} PLATES</strong></span>
              <span>•</span>
              <span className="text-emerald-700 dark:text-emerald-300">HISTORICAL PROVENANCE VERIFIED</span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif font-bold tracking-tight text-[var(--color-text)] mb-4">
            The Archival Photography Vault
          </h1>

          <p className="text-base sm:text-lg text-[var(--color-text-secondary)] max-w-3xl font-sans leading-relaxed">
            A comprehensive visual inquiry into six decades of Osho’s trajectory: from early Madhya Pradesh university years and 1970s Bombay woodlands, to the 64,000-acre commune at Rajneeshpuram, European protests, FBI and CDC evidentiary artifacts, and the final Zen gardens of Pune.
          </p>
        </div>
      </section>

      {/* Control Station: Filters & Search */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="p-4 sm:p-6 rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-elevated)] shadow-xs space-y-6">
          
          {/* Top Row: Search and Stats */}
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search captions, dates, locations (e.g. Rolls-Royce, Salmonella, Sheela, Convair)..."
                className="w-full pl-10 pr-4 py-2 text-xs font-mono rounded-sm bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center justify-between md:justify-end gap-3 text-xs font-mono text-[var(--color-text-secondary)]">
              <span>Displaying <strong>{filteredImages.length}</strong> of <strong>{ARCHIVAL_IMAGES.length}</strong> plates</span>
              {(selectedEra !== 'all' || selectedCategory !== 'all' || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedEra('all');
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className="px-2.5 py-1 text-[11px] rounded-sm border border-[var(--color-border)] bg-[var(--color-bg)] hover:bg-[var(--color-border)] transition-colors"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>

          {/* Era Filter Strip */}
          <div>
            <div className="text-[11px] font-mono uppercase tracking-[0.15em] text-[var(--color-text-muted)] mb-2 flex items-center gap-1.5">
              <Calendar className="w-3 h-3 text-[var(--color-accent)]" />
              <span>Historical Chronology Era</span>
            </div>
            <div className="flex overflow-x-auto no-scrollbar gap-1.5 pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
              <button
                onClick={() => setSelectedEra('all')}
                className={`min-h-[38px] sm:min-h-[32px] px-3.5 py-1.5 rounded-sm text-xs font-mono uppercase tracking-wider font-semibold transition-all shrink-0 ${
                  selectedEra === 'all'
                    ? 'bg-[var(--color-text)] text-[var(--color-bg)]'
                    : 'bg-[var(--color-bg)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)]'
                }`}
              >
                All Eras ({ARCHIVAL_IMAGES.length})
              </button>
              {(Object.keys(ERA_LABELS) as Array<ArchivalImage['era']>).map((eraKey) => (
                <button
                  key={eraKey}
                  onClick={() => setSelectedEra(eraKey)}
                  className={`min-h-[38px] sm:min-h-[32px] px-3.5 py-1.5 rounded-sm text-xs font-mono uppercase tracking-wider font-semibold transition-all shrink-0 ${
                    selectedEra === eraKey
                      ? 'bg-[var(--color-text)] text-[var(--color-bg)]'
                      : 'bg-[var(--color-bg)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)]'
                  }`}
                >
                  {ERA_LABELS[eraKey]}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter Strip */}
          <div>
            <div className="text-[11px] font-mono uppercase tracking-[0.15em] text-[var(--color-text-muted)] mb-2 flex items-center gap-1.5">
              <Layers className="w-3 h-3 text-[var(--color-accent)]" />
              <span>Subject Category</span>
            </div>
            <div className="flex overflow-x-auto no-scrollbar gap-1.5 pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`min-h-[38px] sm:min-h-[32px] px-3.5 py-1.5 rounded-sm text-xs font-mono transition-all shrink-0 ${
                  selectedCategory === 'all'
                    ? 'bg-[var(--color-accent)] text-white font-semibold'
                    : 'bg-[var(--color-bg)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:text-[var(--color-text)]'
                }`}
              >
                All Categories ({ARCHIVAL_IMAGES.length})
              </button>
              {(Object.keys(CATEGORY_LABELS) as Array<ArchivalImage['category']>).map((catKey) => (
                <button
                  key={catKey}
                  onClick={() => setSelectedCategory(catKey)}
                  className={`min-h-[38px] sm:min-h-[32px] px-3.5 py-1.5 rounded-sm text-xs font-mono transition-all shrink-0 ${
                    selectedCategory === catKey
                      ? 'bg-[var(--color-accent)] text-white font-semibold'
                      : 'bg-[var(--color-bg)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:text-[var(--color-text)]'
                  }`}
                >
                  {CATEGORY_LABELS[catKey]} ({categoryCounts[catKey] || 0})
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Photography Masonry Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredImages.length === 0 ? (
          <div className="text-center py-24 border border-[var(--color-border)] rounded-sm bg-[var(--color-bg-elevated)] p-8">
            <Camera className="w-12 h-12 mx-auto text-[var(--color-text-muted)] mb-4" />
            <h3 className="font-serif text-2xl font-bold text-[var(--color-text)] mb-2">
              No Archival Plates Match Query
            </h3>
            <p className="text-sm font-sans text-[var(--color-text-secondary)] max-w-md mx-auto mb-6">
              No historical photographs match the current era, category, and keyword combination.
            </p>
            <button
              onClick={() => {
                setSelectedEra('all');
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-sm bg-[var(--color-text)] text-[var(--color-bg)] text-xs font-mono uppercase tracking-wider font-semibold"
            >
              Reset Search & Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((img, idx) => (
              <motion.article
                key={img.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: Math.min(idx * 0.02, 0.5) }}
                onClick={() => {
                  setActiveModalImage(img);
                  setIsZoomed(false);
                }}
                className="group relative flex flex-col justify-between border border-[var(--color-border)] bg-[var(--color-bg-elevated)] rounded-sm overflow-hidden cursor-pointer hover:border-[var(--color-border-strong)] transition-all duration-300 hover:shadow-md"
              >
                {/* Photo Frame */}
                <div className="relative aspect-[4/3] bg-black/10 dark:bg-black/40 overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Top Corner Docket Badges */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 text-[10px] font-mono bg-black/80 text-amber-300 tracking-wider uppercase font-semibold rounded-none border border-amber-500/30">
                      {img.year}
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-mono bg-black/80 text-neutral-300 tracking-wider uppercase rounded-none border border-white/20">
                      PLATE #{String(idx + 1).padStart(3, '0')}
                    </span>
                  </div>

                  {/* Hover Inspect Icon */}
                  <div className="absolute bottom-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="p-1.5 rounded-sm bg-black/80 text-white flex items-center gap-1 text-[10px] font-mono">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Inspect</span>
                    </span>
                  </div>
                </div>

                {/* Metadata Card Footer */}
                <div className="p-4 flex-1 flex flex-col justify-between bg-[var(--color-bg-elevated)] border-t border-[var(--color-border)]">
                  <div>
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-[var(--color-accent)] mb-1.5">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{img.location}</span>
                    </div>

                    <h3 className="font-serif text-base font-bold text-[var(--color-text)] leading-snug mb-2 group-hover:text-[var(--color-accent)] transition-colors line-clamp-2">
                      {img.title}
                    </h3>

                    <p className="text-xs font-sans text-[var(--color-text-secondary)] line-clamp-2 leading-relaxed mb-3">
                      {img.caption}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[var(--color-border)]/60 flex items-center justify-between text-[10px] font-mono text-[var(--color-text-muted)]">
                    <span className="uppercase tracking-widest truncate max-w-[140px]">{CATEGORY_LABELS[img.category]}</span>
                    <span className="text-[var(--color-text)] font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      View Plate →
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox / Archival Inspection Modal */}
      <AnimatePresence>
        {activeModalImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 lg:p-10 bg-black/85 backdrop-blur-md pb-safe">
            {/* Close Button */}
            <button
              onClick={() => setActiveModalImage(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 min-h-[44px] min-w-[44px] flex items-center justify-center p-2.5 rounded-sm bg-black/75 text-white hover:bg-black border border-white/20 transition-colors cursor-pointer"
              title="Close modal (Esc)"
              aria-label="Close archival modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Previous / Next Arrow Buttons */}
            {currentIndex > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-50 min-h-[48px] min-w-[48px] flex items-center justify-center p-3 rounded-sm bg-black/60 text-white hover:bg-black border border-white/20 transition-colors hidden sm:flex cursor-pointer"
                title="Previous image (Left Arrow)"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {currentIndex < filteredImages.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-50 min-h-[48px] min-w-[48px] flex items-center justify-center p-3 rounded-sm bg-black/60 text-white hover:bg-black border border-white/20 transition-colors hidden sm:flex cursor-pointer"
                title="Next image (Right Arrow)"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-6xl w-full max-h-[92vh] overflow-y-auto bg-[var(--color-bg)] rounded-sm border border-[var(--color-border)] shadow-2xl grid grid-cols-1 lg:grid-cols-12 pb-6 lg:pb-0"
            >
              {/* Photo Display Viewport with Touch Gestures */}
              <div 
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                className="lg:col-span-8 bg-neutral-950 flex flex-col items-center justify-center p-3 sm:p-8 min-h-[280px] sm:min-h-[350px] lg:min-h-[580px] relative border-b lg:border-b-0 lg:border-r border-[var(--color-border)] select-none"
              >
                <div 
                  className={`relative w-full h-[260px] sm:h-[450px] lg:h-[520px] transition-all duration-300 ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
                  onClick={() => setIsZoomed(!isZoomed)}
                >
                  <Image
                    src={activeModalImage.src}
                    alt={activeModalImage.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 65vw"
                    className={`object-contain transition-transform duration-300 ${isZoomed ? 'scale-125' : 'scale-100'}`}
                  />
                </div>

                {/* Sub-bar below photo */}
                <div className="w-full flex items-center justify-between mt-3 text-[10px] sm:text-[11px] font-mono text-neutral-400">
                  <div className="flex items-center gap-1.5 sm:gap-2 truncate max-w-[240px] sm:max-w-none">
                    <span className="text-amber-400 font-semibold">{currentIndex + 1} / {filteredImages.length}</span>
                    <span>•</span>
                    <span className="hidden sm:inline">Click image to {isZoomed ? 'zoom out' : 'magnify'}</span>
                    <span className="sm:hidden text-[9px] text-neutral-300">Swipe ← / → to change</span>
                  </div>
                  <a
                    href={activeModalImage.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-neutral-300 hover:text-white transition-colors shrink-0"
                  >
                    <span>Full Res</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Dossier Information Panel */}
              <div className="lg:col-span-4 p-5 sm:p-8 flex flex-col justify-between bg-[var(--color-bg-elevated)] space-y-5 sm:space-y-6">
                <div className="space-y-4 sm:space-y-5">
                  {/* Docket Metadata Headers */}
                  <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3">
                    <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-[0.2em] bg-[var(--color-accent-subtle)] text-[var(--color-accent)] font-semibold rounded-none border border-[var(--color-accent)]/20">
                      {activeModalImage.year} RECORD
                    </span>
                    <span className="text-[11px] font-mono text-[var(--color-text-muted)]">
                      DOCKET-{activeModalImage.id.toUpperCase().slice(0, 10)}
                    </span>
                  </div>

                  {/* Title & Location */}
                  <div>
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-[var(--color-text)] mb-2 leading-tight">
                      {activeModalImage.title}
                    </h2>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--color-accent)]">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span>{activeModalImage.location}</span>
                    </div>
                  </div>

                  {/* Historical Caption Body */}
                  <div className="space-y-1.5">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-text-muted)]">
                      Evidentiary Context
                    </div>
                    <p className="text-xs sm:text-sm font-sans text-[var(--color-text-secondary)] leading-relaxed">
                      {activeModalImage.caption}
                    </p>
                  </div>

                  {/* Provenance & Citation Data */}
                  <div className="p-3 sm:p-3.5 rounded-sm border border-[var(--color-border)] bg-[var(--color-bg)] space-y-1.5 text-xs font-mono">
                    <div className="flex items-center justify-between">
                      <span className="text-[var(--color-text-muted)]">Source:</span>
                      <span className="text-[var(--color-text)] font-semibold truncate max-w-[180px]">{activeModalImage.source}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[var(--color-text-muted)]">Era Class:</span>
                      <span className="text-[var(--color-text)]">{ERA_LABELS[activeModalImage.era]}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[var(--color-text-muted)]">Subject:</span>
                      <span className="text-[var(--color-text)]">{CATEGORY_LABELS[activeModalImage.category]}</span>
                    </div>
                  </div>
                </div>

                {/* Modal Footer Controls */}
                <div className="pt-4 border-t border-[var(--color-border)] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrev}
                      disabled={currentIndex === 0}
                      className="min-h-[44px] px-3.5 py-2 rounded-sm border border-[var(--color-border)] text-xs font-mono disabled:opacity-30 hover:bg-[var(--color-border)] transition-colors cursor-pointer"
                    >
                      ← Prev
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={currentIndex === filteredImages.length - 1}
                      className="min-h-[44px] px-3.5 py-2 rounded-sm border border-[var(--color-border)] text-xs font-mono disabled:opacity-30 hover:bg-[var(--color-border)] transition-colors cursor-pointer"
                    >
                      Next →
                    </button>
                  </div>

                  <Link
                    href={`/timeline`}
                    className="min-h-[44px] flex items-center text-xs font-mono text-[var(--color-accent)] hover:underline gap-1 no-underline font-semibold"
                  >
                    <span>Timeline</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
