import { useState, useEffect } from 'react';
import { documentary } from '../../content/documentary';
import { soundscape } from '../../utils/soundscape';

interface NavigationHeaderProps {
  chapterIndexRef: React.RefObject<number>;
  onOpenDrawer: () => void;
}

/**
 * Apple HIG Compliant Floating Navigation Header (Liquid Glass Capsule)
 * 
 * Design Elements:
 * - Floating functional layer Liquid Glass capsule
 * - Dynamic chapter tracker with smooth text morphing
 * - Generative ambient audio toggle with animated visualizer wave bars
 * - Chapter index drawer trigger
 * - Adaptive layout: compact on mobile, full editorial metadata on desktop
 */
export function NavigationHeader({ chapterIndexRef, onOpenDrawer }: NavigationHeaderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAudioActive, setIsAudioActive] = useState(false);

  // Poll chapter index at low frequency (250ms) to avoid scroll listeners
  useEffect(() => {
    const interval = setInterval(() => {
      const current = chapterIndexRef.current ?? 0;
      setActiveIndex(current);
    }, 250);

    return () => clearInterval(interval);
  }, [chapterIndexRef]);

  // Subscribe to audio engine state
  useEffect(() => {
    const unsubscribe = soundscape.subscribe((active) => {
      setIsAudioActive(active);
    });
    return unsubscribe;
  }, []);

  // Determine active chapter title
  const getChapterLabel = () => {
    if (activeIndex === 0) return 'Prologue: Introduction';
    if (activeIndex === 10) return 'Epilogue: Dual Legacy';
    if (activeIndex === 11) return 'References & Bibliography';
    const ch = documentary.chapters[activeIndex - 1];
    return ch ? `0${ch.index} · ${ch.title}` : 'Osho Documentary';
  };

  const handleAudioToggle = () => {
    soundscape.toggle();
  };

  return (
    <header className="nav-capsule-wrapper" role="banner">
      <div className="nav-capsule">
        {/* Left: Brand Monogram */}
        <button
          className="nav-brand-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top of documentary"
        >
          <span className="nav-brand-title">OSHO</span>
          <span className="nav-brand-sep" aria-hidden="true">/</span>
          <span className="nav-brand-sub">DOCUMENTARY</span>
        </button>

        {/* Center: Live Narrative Chapter Pill */}
        <button
          className="nav-chapter-pill"
          onClick={onOpenDrawer}
          aria-label={`Current chapter: ${getChapterLabel()}. Click to open table of contents.`}
        >
          <span className="nav-chapter-dot" aria-hidden="true" />
          <span className="nav-chapter-text">{getChapterLabel()}</span>
        </button>

        {/* Right: Functional Controls Group */}
        <div className="nav-actions">
          {/* Ambient Soundscape Toggle */}
          <button
            className={`nav-action-btn nav-audio-btn ${isAudioActive ? 'is-playing' : ''}`}
            onClick={handleAudioToggle}
            aria-label={isAudioActive ? 'Mute ambient contemplative audio' : 'Play ambient contemplative audio'}
            title={isAudioActive ? 'Audio: 432Hz Drone Playing' : 'Audio: Muted'}
          >
            <div className="nav-audio-bars" aria-hidden="true">
              <span className="audio-bar bar-1" />
              <span className="audio-bar bar-2" />
              <span className="audio-bar bar-3" />
            </div>
            <span className="nav-btn-label">
              {isAudioActive ? 'Audio' : 'Mute'}
            </span>
          </button>

          {/* Chapters Index Trigger */}
          <button
            className="nav-action-btn nav-drawer-btn"
            onClick={onOpenDrawer}
            aria-label="Open Table of Contents"
            title="Table of Contents (Index)"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
              <path
                d="M2.5 4.5H12.5M2.5 7.5H12.5M2.5 10.5H9.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            <span className="nav-btn-label">Index</span>
          </button>
        </div>
      </div>
    </header>
  );
}
