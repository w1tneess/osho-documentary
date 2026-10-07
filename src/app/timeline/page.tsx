'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Tag, ShieldCheck, MapPin, Search, ArrowRight, BookOpen, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface TimelineEvent {
  year: number;
  dateStr: string;
  title: string;
  category: 'life' | 'movement' | 'world';
  era: 'early' | 'philosophy' | 'pune' | 'oregon' | 'exile';
  location: string;
  description: string;
  evidence: 'established' | 'reported' | 'disputed';
  articleUrl?: string;
  articleLabel?: string;
}

const EVENTS: TimelineEvent[] = [
  {
    year: 1931,
    dateStr: 'December 11, 1931',
    title: 'Birth of Chandra Mohan Jain',
    category: 'life',
    era: 'early',
    location: 'Kuchwada, Madhya Pradesh, India',
    description: 'Born to a Taranpanthi Jain cloth merchant family. Spent his first seven years living with maternal grandparents, developing an early fiercely independent disposition free from parental discipline.',
    evidence: 'established',
    articleUrl: '/articles/life/early-years',
    articleLabel: 'Early Years & Upbringing',
  },
  {
    year: 1953,
    dateStr: 'March 21, 1953',
    title: 'Claim of Spiritual Enlightenment',
    category: 'life',
    era: 'early',
    location: 'Bhanvartal Garden, Jabalpur, India',
    description: 'At age 21, while a philosophy student at D.N. Jain College, Rajneesh states he experienced total ego dissolution and spiritual enlightenment beneath a Maulshree tree.',
    evidence: 'reported',
    articleUrl: '/articles/life/early-years',
    articleLabel: 'Enlightenment Experience',
  },
  {
    year: 1957,
    dateStr: '1957 – 1966',
    title: 'University Professor of Philosophy & Public Debates',
    category: 'life',
    era: 'philosophy',
    location: 'University of Jabalpur, India',
    description: 'Taught philosophy while traveling nationwide as "Acharya Rajneesh," fiercely criticizing orthodox Hindu ritualism, socialist economics, and Mahatma Gandhi’s celebration of poverty.',
    evidence: 'established',
    articleUrl: '/articles/life/teaching-career',
    articleLabel: 'Teaching Career & Public Debates',
  },
  {
    year: 1970,
    dateStr: 'September 1970',
    title: 'Initiation of First Neo-Sannyasins',
    category: 'movement',
    era: 'philosophy',
    location: 'Manali & Woodlands, Mumbai, India',
    description: 'Introduces his trademark Dynamic Meditation and initiates disciples into Neo-Sannyas, requiring them to wear orange/ochre robes, mala beads with his portrait, and adopt new spiritual names.',
    evidence: 'established',
    articleUrl: '/movement',
    articleLabel: 'Genesis of Neo-Sannyas',
  },
  {
    year: 1974,
    dateStr: 'March 1974',
    title: 'Establishment of the Koregaon Park Pune Ashram',
    category: 'movement',
    era: 'pune',
    location: 'Koregaon Park, Pune, Maharashtra',
    description: 'Purchases six acres in affluent Koregaon Park. The ashram expands into an international commune attracting thousands of Western therapists, artists, and counterculture seekers for daily discourses and encounter groups.',
    evidence: 'established',
    articleUrl: '/articles/movement/pune-1',
    articleLabel: 'The Poona Ashram Phase',
  },
  {
    year: 1980,
    dateStr: 'May 22, 1980',
    title: 'Assassination Attempt During Morning Discourse',
    category: 'world',
    era: 'pune',
    location: 'Buddha Hall, Pune, India',
    description: 'Vilash Tupe, a fundamentalist Hindu militant, throws a knife at Osho during a morning lecture in Buddha Hall, expressing outrage over his radical critiques of orthodox Hindu scriptures.',
    evidence: 'established',
    articleUrl: '/articles/movement/pune-1',
    articleLabel: 'Assassination Attempt Record',
  },
  {
    year: 1981,
    dateStr: 'July 1981',
    title: 'Acquisition of Big Muddy Ranch in Central Oregon',
    category: 'movement',
    era: 'oregon',
    location: 'Wasco County, Oregon, USA',
    description: 'The Chidvalas Rajneesh Meditation Center purchases the 64,229-acre Big Muddy Ranch for $5.75 million. Disciples incorporate the city of Rajneeshpuram, transforming arid high desert into an agricultural oasis.',
    evidence: 'established',
    articleUrl: '/articles/movement/rajneeshpuram',
    articleLabel: 'Rajneeshpuram in Oregon',
  },
  {
    year: 1984,
    dateStr: 'September 1984',
    title: 'The Dalles Salmonella Bioterror Attack',
    category: 'world',
    era: 'oregon',
    location: 'The Dalles, Oregon, USA',
    description: 'Commune leadership operatives led by Ma Anand Sheela contaminate salad bars at 10 restaurants with Salmonella Typhimurium to suppress local voter turnout for county elections. 751 people are sickened in the first confirmed U.S. bioterror incident.',
    evidence: 'established',
    articleUrl: '/articles/controversies/bioterror-attack',
    articleLabel: 'Salmonella Bioterror Dossier',
  },
  {
    year: 1985,
    dateStr: 'September 13, 1985',
    title: 'Flight of Sheela & Public Exposure of Wiretaps',
    category: 'movement',
    era: 'oregon',
    location: 'Rajneeshpuram, Oregon, USA',
    description: 'Ma Anand Sheela and 20 inner-circle lieutenants abruptly flee to Europe. Rajneesh breaks three years of public silence, denouncing Sheela’s administration as a "gang of fascists" and inviting the FBI and Oregon State Police onto the ranch.',
    evidence: 'established',
    articleUrl: '/articles/controversies/legal-battles',
    articleLabel: 'Internal Schism & Investigations',
  },
  {
    year: 1985,
    dateStr: 'October – November 1985',
    title: 'Federal Indictment, Charlotte Arrest & Alford Plea',
    category: 'world',
    era: 'oregon',
    location: 'Charlotte, NC / Portland, OR',
    description: 'Arrested aboard a chartered jet in Charlotte, North Carolina. Pleads guilty under the Alford doctrine to two felony immigration fraud counts, pays a $400,000 fine, and agrees to immediate voluntary departure from the United States.',
    evidence: 'established',
    articleUrl: '/articles/controversies/legal-battles',
    articleLabel: 'Alford Plea & U.S. Expulsion',
  },
  {
    year: 1986,
    dateStr: '1985 – 1986',
    title: 'World Tour & Mass Refusal of Entry across 21 Nations',
    category: 'world',
    era: 'exile',
    location: '21 Sovereign Nations Worldwide',
    description: 'Denied entry, detained, or expelled from 21 countries—including Greece, Switzerland, Spain, the United Kingdom, and Canada—under sustained diplomatic pressure from the U.S. State Department.',
    evidence: 'established',
    articleUrl: '/articles/life/world-tour',
    articleLabel: 'The Global World Tour Odyssey',
  },
  {
    year: 1989,
    dateStr: '1989',
    title: 'Adoption of the Name "Osho"',
    category: 'life',
    era: 'exile',
    location: 'Pune, Maharashtra, India',
    description: 'Drops the honorific "Bhagwan" and assumes the Japanese title "Osho," derived from William James’ concept of oceanic consciousness and Zen monastic lineage terminology.',
    evidence: 'established',
    articleUrl: '/articles/life/later-years',
    articleLabel: 'Adoption of the Name Osho',
  },
  {
    year: 1990,
    dateStr: 'January 19, 1990',
    title: 'Death of Osho & Allegations of Poisoning',
    category: 'life',
    era: 'exile',
    location: 'Pune, Maharashtra, India',
    description: 'Dies at age 58. Sannyasin physicians allege he was covertly poisoned with thallium during his 12-day unmonitored incarceration in Oklahoma federal penitentiary; official death certificate reports heart failure.',
    evidence: 'disputed',
    articleUrl: '/articles/controversies/death-theories',
    articleLabel: 'Death & Poisoning Theories',
  },
];

const ERA_TABS = [
  { id: 'all', label: 'All Eras' },
  { id: 'early', label: '1931–1953: Early Solitude' },
  { id: 'philosophy', label: '1957–1970: Philosophy & Travels' },
  { id: 'pune', label: '1974–1981: Pune Ashram' },
  { id: 'oregon', label: '1981–1985: Rajneeshpuram' },
  { id: 'exile', label: '1985–1990: World Tour & Zen' },
];

export default function TimelinePage() {
  const [activeEra, setActiveEra] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  const filteredEvents = useMemo(() => {
    return EVENTS.filter((evt) => {
      const matchesEra = activeEra === 'all' || evt.era === activeEra;
      const q = search.toLowerCase().trim();
      const matchesQuery =
        !q ||
        evt.title.toLowerCase().includes(q) ||
        evt.description.toLowerCase().includes(q) ||
        evt.location.toLowerCase().includes(q) ||
        evt.year.toString().includes(q);
      return matchesEra && matchesQuery;
    });
  }, [activeEra, search]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 pb-32 sm:pb-20">
      {/* Archival Masthead Header */}
      <div className="text-center mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[var(--color-accent-subtle)] text-[var(--color-accent)] border border-[var(--color-accent)]/20 text-xs font-mono uppercase tracking-widest font-semibold mb-4">
          <Clock className="w-3.5 h-3.5" />
          <span>Chronological Ledger • 1931–1990</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[var(--color-text)] mb-4 tracking-tight">
          Master Historical Timeline
        </h1>

        <p className="text-base sm:text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed font-sans mb-8">
          Trace six decades of biographical milestones, commune governance, federal indictments, and global controversies through verified court records and contemporaneous reporting.
        </p>

        {/* Quick Search */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search dates, locations, Bioterror, Alford plea..."
            className="w-full pl-10 pr-4 py-3 rounded-sm bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-base sm:text-xs font-mono text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] min-h-[44px]"
          />
        </div>
      </div>

      {/* Era Navigation Scrubber: Horizontal swipe rail on mobile */}
      <div className="flex items-center gap-2 mb-10 overflow-x-auto no-scrollbar flex-nowrap -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center pb-2">
        {ERA_TABS.map((era) => {
          const isActive = activeEra === era.id;
          return (
            <button
              key={era.id}
              onClick={() => setActiveEra(era.id)}
              className={`px-4 py-2.5 rounded-sm text-xs font-mono uppercase tracking-wider font-semibold transition-all shrink-0 min-h-[44px] flex items-center justify-center cursor-pointer ${
                isActive
                  ? 'bg-[var(--color-text)] text-[var(--color-bg)] shadow-xs'
                  : 'bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] border border-[var(--color-border)]'
              }`}
            >
              {era.label}
            </button>
          );
        })}
      </div>

      {/* Timeline Stream */}
      <div className="relative border-l-2 border-[var(--color-border)] ml-3 sm:ml-8 pl-4 sm:pl-10 space-y-8 sm:space-y-10">
        <AnimatePresence mode="popLayout">
          {filteredEvents.map((evt, idx) => (
            <motion.div
              key={`${evt.year}-${evt.title}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, delay: idx * 0.03 }}
              className="relative"
            >
              {/* Timeline Pin Node on Left Spine */}
              <div className="absolute -left-[23px] sm:-left-[47px] top-6 w-3 h-3 rounded-none bg-[var(--color-accent)] ring-4 ring-[var(--color-bg)]" />

              <div className="p-5 sm:p-8 rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-elevated)] shadow-xs hover:border-[var(--color-border-strong)] transition-all">
                {/* Top Metadata Row */}
                <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="font-serif text-2xl sm:text-3xl font-bold text-[var(--color-accent)]">
                      {evt.year}
                    </span>
                    <span className="text-xs font-mono text-[var(--color-text-muted)]">•</span>
                    <span className="text-xs font-mono font-medium text-[var(--color-text-secondary)]">
                      {evt.dateStr}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider font-semibold rounded-none border ${
                        evt.evidence === 'established'
                          ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/25'
                          : evt.evidence === 'disputed'
                          ? 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/25'
                          : 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/25'
                      }`}
                    >
                      {evt.evidence} Record
                    </span>

                    <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-text-muted)]">
                      CHRONO-{evt.year}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[var(--color-text)] mb-2">
                  {evt.title}
                </h3>

                {/* Location Pin */}
                <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--color-text-muted)] mb-4">
                  <MapPin className="w-3.5 h-3.5 text-[var(--color-accent)] shrink-0" />
                  <span>{evt.location}</span>
                </div>

                {/* Narrative Body */}
                <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed font-sans mb-5">
                  {evt.description}
                </p>

                {/* Cross-Reference Link */}
                {evt.articleUrl && (
                  <div className="pt-4 border-t border-[var(--color-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    <div className="text-[11px] font-mono text-[var(--color-text-muted)]">
                      Corroborated Archival Evidence
                    </div>

                    <Link
                      href={evt.articleUrl}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--color-accent)] hover:underline font-semibold no-underline min-h-[44px] py-1"
                    >
                      <span>Investigate: {evt.articleLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-16 px-4 rounded-sm bg-[var(--color-bg-elevated)] border border-[var(--color-border)]">
          <Clock className="w-8 h-8 mx-auto text-[var(--color-text-muted)] mb-3" />
          <h3 className="font-serif text-lg font-bold text-[var(--color-text)] mb-1">
            No Historical Milestones Found
          </h3>
          <p className="text-xs text-[var(--color-text-secondary)] font-sans max-w-sm mx-auto mb-4">
            No events match your search &ldquo;{search}&rdquo;. Try another era or clear your query.
          </p>
          <button
            onClick={() => { setSearch(''); setActiveEra('all'); }}
            className="px-4 py-2 rounded-sm bg-[var(--color-text)] text-[var(--color-bg)] text-xs font-mono uppercase font-semibold"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
