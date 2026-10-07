'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Calendar, MapPin, ExternalLink, ShieldCheck, Maximize2, X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

export interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  caption: string;
  era: string;
  category: 'pune' | 'oregon' | 'portraits';
  location: string;
  year: string;
  archiveRef: string;
  credit: string;
  sourceUrl: string;
}

const ARCHIVAL_PHOTOS: GalleryPhoto[] = [
  {
    id: 'rolls-royce',
    src: '/images/archival/rajneesh-rolls-royce.jpg',
    title: 'The Daily Drive-By on Nirvana Drive',
    caption:
      'Bhagwan Shree Rajneesh greeting sannyasins lining the roadside during his daily afternoon drive through the commune. The commune fleet eventually grew to 93 Rolls-Royce automobiles purchased by disciples.',
    era: '1981–1985',
    category: 'oregon',
    location: 'Rajneeshpuram, Wasco County, Oregon',
    year: '1983',
    archiveRef: 'Oregon Commune • 1983',
    credit: 'Oregon State Historical Records & oshoworld.com photo archives',
    sourceUrl: 'https://oshoworld.com/rajneeshpuram-photo-gallery/',
  },
  {
    id: 'rajneeshpuram-fest',
    src: '/images/archival/rajneeshpuram-festival.jpg',
    title: 'The World Celebration in the Oregon Desert',
    caption:
      'Over 15,000 international visitors and disciples gathered inside the gigantic open-air geodesic Mandir tent for the annual World Celebration festival on the Big Muddy Ranch.',
    era: '1981–1985',
    category: 'oregon',
    location: 'Wasco County, Oregon',
    year: '1983',
    archiveRef: 'World Celebration Festival • 1983',
    credit: 'Rajneeshpuram Archival Collection & osho.com',
    sourceUrl: 'https://www.osho.com/osho-online-library/osho-talks',
  },
  {
    id: 'poona-disciples',
    src: '/images/archival/poona-disciples-1977.jpg',
    title: 'Morning Darshan at the Koregaon Park Ashram',
    caption:
      'Western seekers and Indian initiates seated in orange robes during the morning discourse in the open-sided Buddha Hall. This era established Pune as an international epicenter of alternative psychology and mysticism.',
    era: '1974–1981',
    category: 'pune',
    location: 'Koregaon Park, Pune, Maharashtra, India',
    year: '1977',
    archiveRef: 'Pune Buddha Hall • 1977',
    credit: 'Osho International Foundation Archives (osho.com)',
    sourceUrl: 'https://www.osho.com/',
  },
  {
    id: 'air-rajneesh',
    src: '/images/archival/osho-air-rajneesh.jpg',
    title: 'Air Rajneesh & Commune Private Airstrip',
    caption:
      'The Rajneeshpuram municipal airstrip featuring Air Rajneesh commuter aircraft used to fly visitors and leaders between Portland International Airport and the remote Central Oregon ranch.',
    era: '1981–1985',
    category: 'oregon',
    location: 'Big Muddy Ranch Airfield, Wasco County, Oregon',
    year: '1984',
    archiveRef: 'Air Rajneesh Airstrip • 1984',
    credit: 'Federal Aviation Administration & Wasco County Court Exhibits',
    sourceUrl: 'https://oshoworld.com/',
  },
  {
    id: 'teaching-podium',
    src: '/images/archival/osho-teaching.jpg',
    title: 'Spoken Word Discourse from the Marble Podium',
    caption:
      'Osho speaking during a morning satsang. Between 1974 and 1981, he gave daily 90-minute extemporaneous talks alternating between Hindi and English, covering world religions and philosophical traditions.',
    era: '1974–1981',
    category: 'pune',
    location: 'Buddha Hall, Pune, India',
    year: '1978',
    archiveRef: 'Pune Morning Discourse • 1978',
    credit: 'Osho World Foundation (oshoworld.com)',
    sourceUrl: 'https://oshoworld.com/audio-discourse/',
  },
  {
    id: 'portrait-zen',
    src: '/images/archival/osho-portrait-zen.jpg',
    title: 'The Final Pune Years: The Zen Master',
    caption:
      'In his final years following the world tour, Osho adopted the name "Osho" and delivered his last series of discourses on Zen, focusing entirely on silence, humor, and meditation until January 1990.',
    era: '1986–1990',
    category: 'portraits',
    location: 'Pune Ashram, India',
    year: '1989',
    archiveRef: 'Zen Master Era • 1989',
    credit: 'Osho International Meditation Resort Archives (osho.com)',
    sourceUrl: 'https://www.osho.com/meditation-resort',
  },
  {
    id: 'portrait-formal',
    src: '/images/archival/hero-osho-portrait.jpg',
    title: 'Formal Archival Portrait',
    caption:
      'High-contrast studio portrait of Bhagwan Shree Rajneesh during the height of the international neo-sannyas movement.',
    era: '1975–1980',
    category: 'portraits',
    location: 'Bombay / Pune Studios',
    year: '1978',
    archiveRef: 'Formal Studio Portrait • 1978',
    credit: 'Historical Archival Negative Collection',
    sourceUrl: 'https://www.osho.com/',
  },
];

export function ArchivalGallery() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'pune' | 'oregon' | 'portraits'>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPhoto(null);
    };
    if (selectedPhoto) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedPhoto]);

  const filtered = ARCHIVAL_PHOTOS.filter(
    (p) => activeFilter === 'all' || p.category === activeFilter
  );

  return (
    <section className="not-prose w-full">
      {/* Gallery Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[var(--color-border)]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-[var(--color-accent-subtle)] text-[var(--color-accent)] border border-[var(--color-accent)]/20 mb-3 font-semibold">
            <Camera className="w-3.5 h-3.5" />
            <span>Photographic Evidence • 1974–1989</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[var(--color-text)] tracking-tight">
            Archival Visual Evidence
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-text-secondary)] font-sans max-w-2xl mt-2 leading-relaxed">
            Historical photographs documenting the Koregaon Park ashram, the high desert city of Rajneeshpuram, and primary assembly halls.
            Corroborated by <span className="font-mono text-[var(--color-accent)]">osho.com</span>, <span className="font-mono text-[var(--color-accent)]">oshoworld.com</span>, and court exhibits.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          {[
            { id: 'all', label: 'All Photos' },
            { id: 'oregon', label: 'Oregon (1981–85)' },
            { id: 'pune', label: 'Pune Ashram (1974–81)' },
            { id: 'portraits', label: 'Portraits & Zen' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id as any)}
              className={`px-4 py-2 rounded-lg border transition-all cursor-pointer ${
                activeFilter === f.id
                  ? 'bg-[var(--color-text)] text-[var(--color-bg)] border-transparent font-semibold shadow-xs'
                  : 'bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-border-strong)]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setSelectedPhoto(photo)}
            className="group relative rounded-sm overflow-hidden bg-[var(--color-bg-elevated)] border border-[var(--color-border)] shadow-xs hover:border-[var(--color-border-strong)] transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            {/* Image Aspect Box */}
            <div className="relative aspect-[16/10] overflow-hidden bg-neutral-950">
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-cover object-center filter contrast-[1.02] brightness-95 group-hover:scale-105 transition-transform duration-500 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

              {/* Archive Tag */}
              <div className="absolute top-3 left-3 text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-none bg-black/80 text-amber-300 border border-white/10">
                {photo.archiveRef}
              </div>

              {/* Year & Location */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-neutral-300">
                <span className="flex items-center gap-1 truncate max-w-[70%]">
                  <MapPin className="w-3 h-3 text-amber-400 shrink-0" /> {photo.location}
                </span>
                <span className="text-amber-300 font-bold shrink-0">{photo.year}</span>
              </div>
            </div>

            {/* Title & Caption */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif font-bold text-lg text-[var(--color-text)] mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                  {photo.title}
                </h3>
                <p className="text-xs text-[var(--color-text-secondary)] font-sans line-clamp-3 leading-relaxed">
                  {photo.caption}
                </p>
              </div>

              <div className="pt-3 mt-4 border-t border-[var(--color-border)] flex items-center justify-between text-[11px] font-mono text-[var(--color-text-muted)]">
                <span>Era: {photo.era}</span>
                <span className="text-[var(--color-accent)] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform font-semibold">
                  Inspect <Maximize2 className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Link to Full 139-Image Vault */}
      <div className="mt-14 text-center">
        <Link
          href="/gallery"
          className="inline-flex items-center gap-3 px-6 py-3.5 rounded-sm bg-[var(--color-text)] text-[var(--color-bg)] font-mono text-xs uppercase tracking-widest font-semibold hover:opacity-90 transition-opacity no-underline shadow-xs"
        >
          <span>Explore All 32 Curated Photographs in the Photo Vault</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Lightbox / High-Res View Modal */}
      {selectedPhoto && (
        <div
          role="dialog"
          aria-label={selectedPhoto.title}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-6 right-6 p-2 rounded-sm bg-black/80 hover:bg-black text-white border border-white/20 transition-all cursor-pointer z-50"
            aria-label="Close photo inspect modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div
            className="max-w-5xl max-h-[90vh] flex flex-col items-center overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.title}
              className="max-w-full max-h-[65vh] object-contain rounded-sm shadow-2xl border border-white/15"
            />

            <div className="mt-6 text-left w-full bg-neutral-900/95 border border-neutral-800 p-6 rounded-sm text-neutral-200">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-3 border-b border-neutral-800">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                  Archival Record • {selectedPhoto.archiveRef}
                </span>
                <span className="text-xs font-mono text-neutral-400">
                  {selectedPhoto.location} ({selectedPhoto.year})
                </span>
              </div>

              <h2 className="font-serif font-bold text-2xl text-white mb-2">
                {selectedPhoto.title}
              </h2>

              <p className="text-sm font-sans text-neutral-300 leading-relaxed mb-4">
                {selectedPhoto.caption}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-neutral-800 text-xs font-mono text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> Source: {selectedPhoto.credit}
                </span>
                {selectedPhoto.sourceUrl && (
                  <a
                    href={selectedPhoto.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:underline flex items-center gap-1"
                  >
                    View Official Archive <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
