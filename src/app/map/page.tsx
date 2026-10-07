'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, ArrowRight, Compass, Globe, ExternalLink, ShieldAlert, FileText, CheckCircle2 } from 'lucide-react';
import { TiltCard } from '@/components/ui/TiltCard';

interface Place {
  id: string;
  name: string;
  region: 'India' | 'United States';
  coordinates: string;
  lat: number;
  lng: number;
  // Map SVG normalized percentage coordinates [x, y] on 1000x500 world projection
  svgX: number;
  svgY: number;
  era: string;
  description: string;
  significance: string;
  keyStat: string;
  statLabel: string;
  relatedArticle: string;
  articleLabel: string;
  sources: string[];
}

const PLACES: Place[] = [
  {
    id: 'kuchwada',
    name: 'Kuchwada, Madhya Pradesh',
    region: 'India',
    coordinates: '23.45° N, 77.95° E',
    lat: 23.45,
    lng: 77.95,
    svgX: 685,
    svgY: 228,
    era: '1931–1938',
    description: 'A secluded rural village in Raisen district where Chandra Mohan Jain was born on December 11, 1931, in his maternal grandfather’s house. Here he experienced complete unstructured freedom without parental restraint for his first seven formative years.',
    significance: 'Birthplace & Formative Solitude',
    keyStat: 'Age 0–7',
    statLabel: 'Formative Independence',
    relatedArticle: '/articles/life/early-years',
    articleLabel: 'Early Years & Upbringing',
    sources: ['britannica-osho', 'joshi-1982'],
  },
  {
    id: 'jabalpur',
    name: 'Jabalpur, Madhya Pradesh',
    region: 'India',
    coordinates: '23.18° N, 79.98° E',
    lat: 23.18,
    lng: 79.98,
    svgX: 695,
    svgY: 232,
    era: '1951–1966',
    description: 'Site of the University of Jabalpur where Osho served as Professor of Philosophy, and Bhanvartal Garden where he claimed spiritual enlightenment on March 21, 1953, under a Maulshree tree.',
    significance: 'Academic Tenure & Enlightenment',
    keyStat: '9 Years',
    statLabel: 'University Chair of Philosophy',
    relatedArticle: '/articles/life/teaching-career',
    articleLabel: 'Teaching Career & Public Debates',
    sources: ['osho-com-archives', 'carter-2011'],
  },
  {
    id: 'mumbai',
    name: 'Mumbai (Bombay)',
    region: 'India',
    coordinates: '18.96° N, 72.82° E',
    lat: 18.96,
    lng: 72.82,
    svgX: 672,
    svgY: 248,
    era: '1970–1974',
    description: 'Woodlands Apartments on Peddar Road where Osho held evening intimate darshans and initiated his first disciples into Neo-Sannyas, introducing orange robes and the 108-bead mala.',
    significance: 'Genesis of Neo-Sannyas Movement',
    keyStat: '1970',
    statLabel: 'First Disciples Initiated',
    relatedArticle: '/movement',
    articleLabel: 'The Movement Archive',
    sources: ['carter-2011'],
  },
  {
    id: 'pune',
    name: 'Koregaon Park, Pune',
    region: 'India',
    coordinates: '18.53° N, 73.89° E',
    lat: 18.53,
    lng: 73.89,
    svgX: 678,
    svgY: 252,
    era: '1974–1981 & 1987–1990',
    description: 'A 6-acre leafy estate that transformed into a worldwide spiritual commune. Hosted daily morning discourses, Western cathartic psychotherapy groups, and remains today the OSHO International Resort.',
    significance: 'Global Ashrama & Final Zen Talks',
    keyStat: '600+',
    statLabel: 'Discourse Books Recorded',
    relatedArticle: '/articles/movement/pune-1',
    articleLabel: 'The Poona Ashram Phase',
    sources: ['carter-2011', 'mullan-1983'],
  },
  {
    id: 'rajneeshpuram',
    name: 'Rajneeshpuram, Wasco County, Oregon',
    region: 'United States',
    coordinates: '44.76° N, -120.51° W',
    lat: 44.76,
    lng: -120.51,
    svgX: 205,
    svgY: 152,
    era: '1981–1985',
    description: 'The 64,229-acre Big Muddy Ranch developed into an incorporated city with 7,000 residents, private airstrip, reservoir, police department, public bus transit, and a fleet of 93 Rolls-Royces.',
    significance: 'The American Utopian Experiment',
    keyStat: '64,229 Acres',
    statLabel: 'Commune Land Area',
    relatedArticle: '/articles/movement/rajneeshpuram',
    articleLabel: 'Rajneeshpuram in Oregon',
    sources: ['usdoj-cr85-0150', 'fitzgerald-1986'],
  },
  {
    id: 'the-dalles',
    name: 'The Dalles, Oregon',
    region: 'United States',
    coordinates: '45.59° N, -121.17° W',
    lat: 45.59,
    lng: -121.17,
    svgX: 202,
    svgY: 147,
    era: 'September 1984',
    description: 'County seat of Wasco County. Site where commune operators contaminated 10 restaurant salad bars with Salmonella typhimurium to suppress voter turnout, sickening 751 people in the first confirmed U.S. bioterrorism incident.',
    significance: '1984 Salmonella Bioterror Attack',
    keyStat: '751 Victims',
    statLabel: 'CDC Confirmed Cases',
    relatedArticle: '/articles/controversies/bioterror-attack',
    articleLabel: 'Salmonella Bioterror Attack',
    sources: ['topp-1984-salmonella', 'usdoj-cr85-0150'],
  },
];

export default function MapPage() {
  const [selectedPlace, setSelectedPlace] = useState<Place>(PLACES[4]); // Default to Rajneeshpuram
  const [regionFilter, setRegionFilter] = useState<'All' | 'India' | 'United States'>('All');

  const filteredPlaces = regionFilter === 'All'
    ? PLACES
    : PLACES.filter((p) => p.region === regionFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 pb-32 sm:pb-20">
      {/* Archival Masthead */}
      <div className="text-center mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[var(--color-accent-subtle)] text-[var(--color-accent)] border border-[var(--color-accent)]/20 text-xs font-mono uppercase tracking-widest font-semibold mb-4">
          <Globe className="w-3.5 h-3.5" />
          <span>Geopolitical Cartography • Folio #GEO-1931-1990</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[var(--color-text)] mb-4 tracking-tight">
          The Geopolitical Landscape
        </h1>
        <p className="text-base sm:text-lg text-[var(--color-text-secondary)] max-w-3xl mx-auto leading-relaxed font-sans">
          From the banks of the Narmada river in central India to the high desert canyons of central Oregon: trace the geographic coordinates, legal jurisdictions, and municipal conflicts that shaped the Rajneesh movement.
        </p>
      </div>

      {/* Region Filter Bar: Horizontal swipe rail on mobile */}
      <div className="flex items-center gap-2 mb-10 overflow-x-auto no-scrollbar flex-nowrap -mx-4 px-4 sm:mx-0 sm:px-0 sm:justify-center pb-2">
        {(['All', 'India', 'United States'] as const).map((reg) => (
          <button
            key={reg}
            onClick={() => setRegionFilter(reg)}
            className={`px-4 py-2.5 rounded-sm text-xs font-mono uppercase tracking-wider font-semibold transition-all shrink-0 min-h-[44px] flex items-center justify-center cursor-pointer ${
              regionFilter === reg
                ? 'bg-[var(--color-text)] text-[var(--color-bg)] shadow-xs'
                : 'bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] border border-[var(--color-border)]'
            }`}
          >
            {reg === 'All' ? 'Global Grid (All Hubs)' : reg}
          </button>
        ))}
      </div>

      {/* Interactive Cartography Radar Schematic Map */}
      <div className="mb-12 rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-3 sm:p-6 overflow-hidden relative shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-accent)] font-semibold uppercase tracking-wider">
            <Compass className="w-4 h-4 animate-spin-slow" />
            <span>Transcontinental Movement Vector Map</span>
          </div>
          <div className="text-[11px] font-mono text-[var(--color-text-muted)]">
            Projection: Equirectangular WGS84 • Selected: <strong className="text-[var(--color-text)]">{selectedPlace.name}</strong>
          </div>
        </div>

        {/* SVG World Map / Schematic Surface */}
        <div className="relative w-full aspect-[2/1] bg-neutral-950 rounded-none overflow-hidden border border-neutral-800">
          <svg
            viewBox="0 0 1000 500"
            className="w-full h-full select-none"
            style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.5))' }}
          >
            {/* Latitude / Longitude Graticule Lines */}
            <defs>
              <pattern id="grid" width="100" height="50" patternUnits="userSpaceOnUse">
                <path d="M 100 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
              </pattern>
              <radialGradient id="beaconGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#d97706" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
              </radialGradient>
            </defs>

            <rect width="1000" height="500" fill="#08080a" />
            <rect width="1000" height="500" fill="url(#grid)" />

            {/* Stylized Continents Outlines */}
            {/* North America */}
            <path
              d="M 120 70 Q 200 60 280 90 Q 320 140 290 190 Q 250 220 220 260 Q 180 290 160 250 Q 120 210 100 150 Z"
              fill="rgba(255,255,255,0.04)"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="1"
            />
            {/* South America */}
            <path
              d="M 270 290 Q 330 310 320 380 Q 290 460 260 480 Q 230 420 250 340 Z"
              fill="rgba(255,255,255,0.03)"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
            />
            {/* Europe */}
            <path
              d="M 460 80 Q 540 70 560 120 Q 530 160 480 150 Q 450 120 460 80 Z"
              fill="rgba(255,255,255,0.04)"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
            />
            {/* Africa */}
            <path
              d="M 480 170 Q 560 160 570 240 Q 550 340 500 370 Q 460 300 470 220 Z"
              fill="rgba(255,255,255,0.03)"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
            />
            {/* Asia & India */}
            <path
              d="M 570 80 Q 750 60 850 140 Q 820 230 760 260 Q 710 310 660 260 Q 640 210 580 170 Z"
              fill="rgba(255,255,255,0.05)"
              stroke="rgba(255,255,255,0.14)"
              strokeWidth="1"
            />
            {/* Australia */}
            <path
              d="M 780 340 Q 860 330 870 400 Q 820 440 770 410 Z"
              fill="rgba(255,255,255,0.03)"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
            />

            {/* Flight / Transit Arc connecting Pune/India to Oregon/Rajneeshpuram */}
            <path
              d="M 678 252 Q 440 60 205 152"
              fill="none"
              stroke="rgba(217, 119, 6, 0.35)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />

            {/* Interactive Pins */}
            {PLACES.map((place) => {
              const isSelected = selectedPlace.id === place.id;
              return (
                <g
                  key={place.id}
                  onClick={() => setSelectedPlace(place)}
                  className="cursor-pointer transition-transform hover:scale-110"
                >
                  {/* Invisible generous touch hit area (diameter 64px in SVG space) */}
                  <circle
                    cx={place.svgX}
                    cy={place.svgY}
                    r="32"
                    fill="transparent"
                    pointerEvents="all"
                  />
                  {/* Outer pulse when selected */}
                  {isSelected && (
                    <circle
                      cx={place.svgX}
                      cy={place.svgY}
                      r="18"
                      fill="url(#beaconGlow)"
                      className="animate-ping"
                      style={{ animationDuration: '3s' }}
                    />
                  )}
                  {/* Pin Circle */}
                  <circle
                    cx={place.svgX}
                    cy={place.svgY}
                    r={isSelected ? 7 : 5}
                    fill={isSelected ? '#f59e0b' : '#a3a3a3'}
                    stroke="#ffffff"
                    strokeWidth={isSelected ? 2 : 1}
                  />
                  {/* Label */}
                  <text
                    x={place.svgX + 8}
                    y={place.svgY + 4}
                    fill={isSelected ? '#fbbf24' : '#737373'}
                    fontSize={isSelected ? '10' : '8'}
                    fontFamily="monospace"
                    fontWeight={isSelected ? 'bold' : 'normal'}
                  >
                    {place.name.split(',')[0]}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Grid: Left Location Cards List, Right Selected Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Location Selector List */}
        <div className="lg:col-span-5 space-y-4">
          <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-2 px-1">
            Historical Coordinate Nodes ({filteredPlaces.length})
          </div>

          {filteredPlaces.map((place) => {
            const isSelected = selectedPlace.id === place.id;
            return (
              <motion.div
                key={place.id}
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                onClick={() => setSelectedPlace(place)}
                className={`p-5 rounded-sm cursor-pointer border transition-all ${
                  isSelected
                    ? 'bg-[var(--color-accent-subtle)] border-[var(--color-accent)] shadow-xs'
                    : 'bg-[var(--color-bg-elevated)] border-[var(--color-border)] hover:border-[var(--color-border-strong)]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-none bg-[var(--color-bg-inset)] text-[var(--color-text-secondary)] font-semibold border border-[var(--color-border)]">
                    {place.region} • {place.era}
                  </span>
                  <span className="text-xs font-mono text-[var(--color-text-muted)]">
                    {place.coordinates}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-[var(--color-text)] mb-1">
                  {place.name}
                </h3>

                <div className="text-xs text-[var(--color-accent)] font-mono font-medium">
                  {place.significance}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right: Selected Location Detailed Archival Dossier */}
        <div className="lg:col-span-7 sticky top-24">
          <div className="p-5 sm:p-10 rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-elevated)] shadow-xs flex flex-col justify-between min-h-[400px] sm:min-h-[500px]">
            <div>
              {/* Dossier Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-6 border-b border-[var(--color-border)]">
                <div className="flex items-center gap-3">
                  <span className="p-2.5 rounded-sm bg-[var(--color-accent-subtle)] text-[var(--color-accent)] border border-[var(--color-accent)]/20 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </span>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-text-muted)]">
                      COORDINATES • GEO-ARCHIVED
                    </div>
                    <div className="text-sm font-mono font-bold text-[var(--color-text)]">
                      {selectedPlace.coordinates}
                    </div>
                  </div>
                </div>

                <span className="px-2.5 py-1 text-xs font-mono uppercase tracking-wider font-semibold rounded-none bg-[var(--color-bg-inset)] text-[var(--color-text-secondary)] border border-[var(--color-border)]">
                  {selectedPlace.region} • {selectedPlace.era}
                </span>
              </div>

              {/* Place Title & Significance */}
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--color-text)] mb-3 tracking-tight">
                {selectedPlace.name}
              </h2>

              <div className="inline-block px-2.5 py-1 rounded-none bg-[var(--color-accent-subtle)] text-[var(--color-accent)] font-mono text-xs font-semibold mb-6 border border-[var(--color-accent)]/20">
                {selectedPlace.significance}
              </div>

              {/* Narrative Description */}
              <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed font-sans mb-8">
                {selectedPlace.description}
              </p>

              {/* Key Metric Highlight */}
              <div className="p-4 rounded-sm bg-[var(--color-bg-inset)] border border-[var(--color-border)] flex flex-wrap items-center justify-between gap-4 mb-8">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-text-muted)]">
                    {selectedPlace.statLabel}
                  </div>
                  <div className="font-serif text-2xl font-bold text-[var(--color-text)]">
                    {selectedPlace.keyStat}
                  </div>
                </div>

                <div className="text-left sm:text-right text-[11px] font-mono text-[var(--color-text-muted)]">
                  <div>Cited in Sources:</div>
                  <div className="font-semibold text-[var(--color-text-secondary)]">
                    {selectedPlace.sources.join(', ')}
                  </div>
                </div>
              </div>
            </div>

            {/* Dossier Action Footer */}
            <div className="pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="text-xs font-mono text-[var(--color-text-muted)]">
                Cartographic Ledger Entry #{selectedPlace.id.toUpperCase()}
              </div>

              <Link
                href={selectedPlace.relatedArticle}
                className="inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-sm bg-[var(--color-text)] text-[var(--color-bg)] text-xs font-mono uppercase tracking-wider font-semibold transition-opacity hover:opacity-90 no-underline shadow-xs w-full sm:w-auto min-h-[44px]"
              >
                <span>Read Chapter: {selectedPlace.articleLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
