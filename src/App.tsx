import { useState, useEffect } from 'react';
import { documentary } from './content/documentary';
import { TOTAL_SCROLL_PAGES } from './config/chapters';
import { useScrollProgress } from './hooks/useScrollProgress';
import { useQualityLevel } from './hooks/useQualityLevel';
import { useRevealObserver } from './hooks/useRevealObserver';
import { SceneCanvas } from './components/three/SceneCanvas';
import { HeroSection } from './components/documentary/HeroSection';
import { ChapterSection } from './components/documentary/ChapterSection';
import { EpilogueSection } from './components/documentary/EpilogueSection';
import { ReferencesSection } from './components/documentary/ReferencesSection';
import { NavigationHeader } from './components/ui/NavigationHeader';
import { ChapterDrawer } from './components/ui/ChapterDrawer';
import { ChapterIndicator } from './components/ui/ChapterIndicator';
import { ReadingHUD } from './components/ui/ReadingHUD';
import './styles/global.css';

/**
 * OSHO DOCUMENTARY — Main Application Shell
 * 
 * Architecture:
 * - Content Layer: Semantic documentary spreads + persistent 3D Canvas
 * - Functional Layer (Apple HIG): Liquid Glass navigation capsule, slide-over drawer,
 *   subtle ambient soundscape engine, and rail indicator.
 */
export default function App() {
  const [webglSupported] = useState(() => {
    if (typeof window === 'undefined') return true;
    try {
      const canvas = document.createElement('canvas');
      return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
    } catch {
      return false;
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const quality = useQualityLevel();
  const { progressRef, chapterIndexRef } = useScrollProgress(TOTAL_SCROLL_PAGES);
  const documentaryRef = useRevealObserver();

  // Synchronize webgl-fallback class to HTML root if needed
  useEffect(() => {
    if (!webglSupported) {
      document.documentElement.classList.add('webgl-fallback');
    }
  }, [webglSupported]);

  return (
    <>
      {/* 3D Canvas — fixed behind DOM content */}
      {webglSupported && (
        <SceneCanvas scrollProgress={progressRef} quality={quality} />
      )}

      {/* Film grain overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* ─── Apple HIG Functional Layer: Floating Navigation Capsule ─── */}
      <NavigationHeader
        chapterIndexRef={chapterIndexRef}
        onOpenDrawer={() => setIsDrawerOpen(true)}
      />

      {/* ─── Apple HIG Functional Layer: Chapter Progression Rail ─── */}
      <ChapterIndicator chapterIndexRef={chapterIndexRef} />

      {/* ─── Apple HIG Functional Layer: Reading HUD ─── */}
      <ReadingHUD progressRef={progressRef} />

      {/* ─── Apple HIG Functional Layer: Table of Contents Drawer ─── */}
      <ChapterDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        chapterIndexRef={chapterIndexRef}
      />

      {/* ─── Content Layer: Semantic Documentary Spreads ─── */}
      <main className="documentary-layer" ref={documentaryRef}>
        {/* Hero / Introduction */}
        <HeroSection blocks={documentary.intro} />

        {/* Nine chapters */}
        {documentary.chapters.map((chapter) => (
          <ChapterSection key={chapter.id} chapter={chapter} />
        ))}

        {/* Epilogue / Conclusion */}
        <EpilogueSection blocks={documentary.epilogue} />

        {/* References */}
        <ReferencesSection />
      </main>

      {/* Skip to content (a11y) */}
      <a
        href="#hero"
        className="sr-only"
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        Skip to content
      </a>
    </>
  );
}
