import { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import { documentary } from '../entities/content/documentary';
import { useScrollEngine } from '../features/useScrollProgress';
import { useQualityLevel, useSoundscape } from '../features/useQualityLevel';
import { useRevealObserver } from '../features/useRevealObserver';
import { Hero } from '../widgets/documentary/Hero';
import { Prologue } from '../widgets/documentary/Prologue';
import { Chapter } from '../widgets/documentary/Chapter';
import { Epilogue } from '../widgets/documentary/Epilogue';
import { NavigationHeader } from '../shared/ui/NavigationHeader';
import { IndexDrawer } from '../shared/ui/IndexDrawer';
import { ChapterRail } from '../shared/ui/ChapterRail';
import { ProgressLine } from '../shared/ui/ProgressLine';
import { Grade } from '../shared/ui/Grade';
import '../shared/styles/global.css';

/**
 * The 3D world is a dynamic import, and that is the whole performance story.
 *
 * three.js and the R3F runtime are ~600KB before compression and they are not
 * the product — the documentary is. Loading them statically would mean the
 * reader waits on a renderer before they can read the first paragraph, and
 * would ship a renderer to devices that will never draw one. Imported here, the
 * entry chunk carries the entire documentary and the world streams in behind
 * it. The documentary is usable, navigable and complete the moment this chunk
 * executes; the world is a room, and a room can arrive later.
 */
const SceneCanvas = lazy(() =>
  import('../widgets/three/SceneCanvas').then((m) => ({ default: m.SceneCanvas }))
);

/**
 * The application shell.
 *
 * DOM and canvas are two layers of ONE composition. The only thing crossing
 * between them is normalized scroll progress, and the score in `config/chapters`
 * is the single place where a narrative position and a camera position are
 * declared together. Nothing here holds a chapter number or a scene number.
 *
 * The `data-score` attributes are what bind the two layers together. Each
 * section declares which score entry it belongs to, and the scroll engine
 * interpolates between them. The hero and the prologue both belong to entry 0,
 * so the camera holds its frame while the reader is on the opening spread rather
 * than sliding on at a rate nobody asked for.
 */

const CHAPTERS = documentary.chapters;
const CONCLUSION_SCORE = CHAPTERS.length + 1;
const REFERENCES_SCORE = CHAPTERS.length + 2;

export default function App() {
  const [webglSupported] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      const probe = document.createElement('canvas');
      return !!(probe.getContext('webgl2') || probe.getContext('webgl'));
    } catch {
      return false;
    }
  });

  const [indexOpen, setIndexOpen] = useState(false);
  const quality = useQualityLevel();
  const { playing, toggle } = useSoundscape();

  // Attach scroll engine
  useScrollEngine(CHAPTERS.length);

  const mainRef = useRevealObserver<HTMLElement>();

  const beatCount = useMemo(
    () => CHAPTERS.reduce((n, c) => n + c.beats.length, 0),
    []
  );

  useEffect(() => {
    document.documentElement.classList.toggle('webgl-fallback', !webglSupported);
  }, [webglSupported]);

  return (
    <>
      {/* A failure to build the 3D world is not a failure of the page. The
          canvas is simply absent and the document carries on over paper. */}
      {webglSupported && (
        <Suspense fallback={null}>
          <SceneCanvas
            quality={quality.level}
            reducedMotion={quality.reducedMotion}
          />
        </Suspense>
      )}

      <Grade />

      <NavigationHeader
        onOpenIndex={() => setIndexOpen(true)}
        indexOpen={indexOpen}
        audioOn={playing}
        onToggleAudio={toggle}
      />

      <ChapterRail chapters={CHAPTERS} />

      <ProgressLine />

      <IndexDrawer
        open={indexOpen}
        onClose={() => setIndexOpen(false)}
        chapters={CHAPTERS}
        beatCount={beatCount}
      />

      <main className="documentary-layer" ref={mainRef}>
        {/* ── Score entry 0: the opening. Hero and prologue share it. ───────── */}
        <Hero
          blocks={documentary.intro}
          chapterCount={CHAPTERS.length}
          beatCount={beatCount}
        />
        <Prologue blocks={documentary.intro.slice(2)} />

        {/* ── Score entries 1–9: the nine chapters. ─────────────────────────── */}
        {CHAPTERS.map((chapter) => (
          <Chapter key={chapter.id} chapter={chapter} />
        ))}

        {/* ── Score entries 10–11: the conclusion and the sources. ─────────── */}
        <Epilogue
          blocks={documentary.epilogue}
          references={documentary.references}
          conclusionScore={CONCLUSION_SCORE}
          referencesScore={REFERENCES_SCORE}
        />
      </main>
    </>
  );
}
