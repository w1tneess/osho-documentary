'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, ChevronLeft, ChevronRight, Disc3, ExternalLink } from 'lucide-react';

interface ArchivalQuote {
  id: string;
  theme: string;
  era: string;
  quote: string;
  discourse: string;
  series: string;
  sourceUrl: string;
  reelIndex: string;
}

const ARCHIVAL_QUOTES: ArchivalQuote[] = [
  {
    id: 'mustard-seed',
    theme: 'On Personal Awakening & Rejection of Dogma',
    era: 'Pune Ashram • 1974',
    quote:
      'Do not follow me. I am not a leader. I am not giving you any dogma. I am simply sharing my ecstasy, my intoxication. You have to discover your own light.',
    discourse: 'The Mustard Seed, Discourse #12',
    series: 'Gospel of Thomas Commentaries',
    sourceUrl: 'https://oshoworld.com/discourses-audio-mp3-the-mustard-seed/',
    reelIndex: 'PUN-1974-REEL-12',
  },
  {
    id: 'zorba-buddha',
    theme: 'The Synthesis: Zorba the Buddha',
    era: 'Rajneeshpuram, Oregon • 1985',
    quote:
      'I teach Zorba the Buddha – a new synthesis. The meeting of the earth and the sky, the visible and the invisible, the meeting of all polarities. The earth without the sky is dead; the sky without the earth is empty.',
    discourse: 'The Last Testament, Vol. 2, Discourse #19',
    series: 'Discourses on the New Man',
    sourceUrl: 'https://www.osho.com/osho-online-library/osho-talks/zorba-buddha-samadhi-c7c4c3e8-8b9?p=1',
    reelIndex: 'ORE-1985-REEL-02',
  },
  {
    id: 'meditation-mind',
    theme: 'On Meditation & The Witness State',
    era: 'Woodlands, Mumbai • 1972',
    quote:
      'Meditation is not a concentration of the mind. It is not an effort. Meditation is simply the realization that you are not the mind. When you are an unmoving witness, a profound silence descends.',
    discourse: 'Fish in the Sea is Not Thirsty, Discourse #4',
    series: 'Songs of Kabir',
    sourceUrl: 'https://oshoworld.com/fish-in-the-sea-is-not-thirsty-04/',
    reelIndex: 'BOM-1972-REEL-04',
  },
  {
    id: 'secrets-truth',
    theme: 'On The Cessation of Seeking',
    era: 'Kashmir Meditation Camp • 1973',
    quote:
      'Stop searching, and it is there. The very search creates distance. You are already that which you seek at the innermost core of your being. Drop the future, and existence opens.',
    discourse: 'The Book of Secrets, Discourse #28',
    series: 'Vigyan Bhairav Tantra',
    sourceUrl: 'https://oshoworld.com/the-book-of-secrets-28/',
    reelIndex: 'KSH-1973-REEL-28',
  },
  {
    id: 'celebration-life',
    theme: 'On Life As Mystery and Celebration',
    era: 'Bombay Public Addresses • 1968',
    quote:
      'Life is a mystery to be lived, not a problem to be solved. Be in the world, but not of the world. Celebrate each breath as an unrepeatable gift from existence.',
    discourse: 'From Sex to Superconsciousness, Chapter 3',
    series: 'Early Indian Public Tours',
    sourceUrl: 'https://www.osho.com/osho-online-library/osho-talks/sex-superconsciousness-love-586b51e0-6a9?p=1',
    reelIndex: 'BOM-1968-REEL-03',
  },
  {
    id: 'death-silence',
    theme: 'On Death as the Ultimate Climax',
    era: 'Pune Gautam the Buddha Auditorium • 1989',
    quote:
      'Death is not the enemy of life; it is the ultimate crescendo. If you live totally, you die ecstatically. Just as rivers disappear into the ocean, consciousness returns home to the vast universe.',
    discourse: 'The Zen Manifesto: Freedom From Oneself, Discourse #11',
    series: 'Final Pune Discourses',
    sourceUrl: 'https://oshoworld.com/the-zen-manifesto-freedom-from-oneself-11/',
    reelIndex: 'PUN-1989-REEL-11',
  },
];

export function QuotePlayer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const active = ARCHIVAL_QUOTES[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % ARCHIVAL_QUOTES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + ARCHIVAL_QUOTES.length) % ARCHIVAL_QUOTES.length);
  };

  const togglePlay = async () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.warn('Audio playback error:', err);
        setIsPlaying(false);
      }
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, []);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <section 
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="w-full max-w-5xl mx-auto rounded-sm bg-[var(--color-bg-elevated)] border border-[var(--color-border)] overflow-hidden shadow-xs not-prose select-none"
    >
      {/* Tape Deck Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-5 sm:px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-bg-inset)]/60 text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className={`w-2 h-2 rounded-none ${isPlaying ? 'bg-amber-500 animate-pulse' : 'bg-neutral-400'}`} />
          <span className="uppercase tracking-[0.18em] font-semibold text-[var(--color-text-secondary)]">
            Archival Audio Console • Master Tape 7½ IPS
          </span>
        </div>

        <div className="flex items-center gap-4 text-[var(--color-text-muted)]">
          <span className="hidden sm:inline">Reference: {active.reelIndex}</span>
          <span className="text-[var(--color-text)] font-semibold">
            Transcript {currentIndex + 1} of {ARCHIVAL_QUOTES.length}
          </span>
        </div>
      </div>

      <div className="p-6 sm:p-12">
        {/* Quote Topic & Origin Banner */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--color-accent)] font-semibold mb-1">
              {active.theme}
            </div>
            <div className="text-xs font-mono text-[var(--color-text-muted)]">
              Recorded at: {active.era}
            </div>
          </div>

          {/* Previous / Next Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-sm border border-[var(--color-border)] bg-[var(--color-bg)] hover:bg-[var(--color-bg-inset)] text-[var(--color-text)] transition-colors active:scale-95 cursor-pointer"
              aria-label="Previous archival recording"
              title="Previous transcript"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-sm border border-[var(--color-border)] bg-[var(--color-bg)] hover:bg-[var(--color-bg-inset)] text-[var(--color-text)] transition-colors active:scale-95 cursor-pointer"
              aria-label="Next archival recording"
              title="Next transcript"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Verbatim Transcript */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
          >
            <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl text-[var(--color-text)] italic leading-[1.3] mb-8 font-normal">
              &ldquo;{active.quote}&rdquo;
            </blockquote>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6 border-t border-[var(--color-border)]">
              {/* Citation Details */}
              <div className="md:col-span-8 flex flex-col justify-center">
                <div className="font-medium text-sm text-[var(--color-text)]">
                  {active.discourse}
                </div>
                <div className="text-xs font-mono text-[var(--color-text-muted)] mt-1">
                  Series: {active.series}
                </div>
                <a
                  href={active.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[var(--color-accent)] hover:underline mt-2 font-mono"
                >
                  <span>Verify at Osho Archive & Osho World</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Master Tape Player Control */}
              <div className="md:col-span-4 flex items-center md:justify-end">
                <button
                  onClick={togglePlay}
                  className="inline-flex items-center justify-center gap-3 px-5 py-3 rounded-sm border border-[var(--color-border)] bg-[var(--color-bg)] hover:bg-[var(--color-bg-inset)] text-[var(--color-text)] font-mono text-xs font-medium transition-all active:scale-98 cursor-pointer shadow-xs min-h-[44px] w-full sm:w-auto"
                  aria-label={isPlaying ? 'Pause master audio excerpt' : 'Listen to master audio excerpt'}
                >
                  <Disc3
                    className={`w-4 h-4 text-[var(--color-accent)] ${
                      isPlaying ? 'animate-spin' : ''
                    }`}
                    style={{ animationDuration: '3s' }}
                  />
                  <span>{isPlaying ? 'Pause Audio' : 'Listen Excerpt'}</span>
                  {isPlaying ? (
                    <VolumeX className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <audio ref={audioRef} src="/audio/osho-quote.mp3" preload="metadata" />
      </div>
    </section>
  );
}
