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
import { ChapterIndicator } from './components/ui/ChapterIndicator';
import './styles/global.css';

/**
 * OSHO DOCUMENTARY — Main Application Shell
 * 
 * Architecture: Split DOM (semantic content) + Persistent R3F Canvas (3D environment).
 * Communication: normalized scroll progress via refs (no per-frame React state).
 */
export default function App() {
  const [webglSupported, setWebglSupported] = useState(true);
  const quality = useQualityLevel();
  const { progressRef, chapterIndexRef } = useScrollProgress(TOTAL_SCROLL_PAGES);
  const documentaryRef = useRevealObserver();

  // WebGL support detection
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) {
        setWebglSupported(false);
        document.documentElement.classList.add('webgl-fallback');
      }
    } catch {
      setWebglSupported(false);
      document.documentElement.classList.add('webgl-fallback');
    }
  }, []);

  return (
    <>
      {/* 3D Canvas — fixed behind DOM content */}
      {webglSupported && (
        <SceneCanvas scrollProgress={progressRef} quality={quality} />
      )}

      {/* Film grain overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Chapter progress indicator */}
      <ChapterIndicator chapterIndexRef={chapterIndexRef} />

      {/* Documentary content layer */}
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
