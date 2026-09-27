import type { ChapterContent, DocumentaryBeat, DocumentaryBlock } from '../../content/types';
import { BlockRenderer } from './BlockRenderer';

interface ChapterSectionProps {
  chapter: ChapterContent;
}

/**
 * Spatial Editorial Chapter Section
 * 
 * Authored Documentary Beat System:
 * - Grand Chapter Opener with dignified literary typography
 * - Sequence of focused Documentary Beats
 * - Thoughtful negative space and seamless integration with 3D environment
 */
export function ChapterSection({ chapter }: ChapterSectionProps) {
  const isOdd = chapter.index % 2 !== 0;

  // Chapter opener spread alignment based on environment focus
  const openerSpreadClass =
    chapter.index === 3 || chapter.index === 9
      ? 'spread-center'
      : isOdd
      ? 'spread-left'
      : 'spread-right';

  return (
    <article
      className="chapter-container"
      id={`chapter-${chapter.slug}`}
      aria-label={`Chapter ${chapter.index}: ${chapter.title}`}
    >
      {/* ─── CHAPTER OPENER MOMENT ─── */}
      <section className={`editorial-spread ${openerSpreadClass} chapter-opener-spread`}>
        <div className="editorial-content chapter-opener">
          {/* Chapter Metadata Line */}
          <div className="chapter-meta-line reveal">
            <span className="chapter-ordinal">Chapter 0{chapter.index}</span>
            {chapter.subtitle && (
              <>
                <span className="meta-sep" aria-hidden="true">—</span>
                <span className="chapter-period">{chapter.subtitle}</span>
              </>
            )}
          </div>

          {/* Majestic Chapter Title */}
          <h2 className="chapter-main-title reveal" style={{ transitionDelay: '80ms' }}>
            {chapter.title}
          </h2>

          {/* Subtle Accent Line */}
          <div className="chapter-accent-line reveal" style={{ transitionDelay: '140ms' }} />
        </div>
      </section>

      {/* ─── DOCUMENTARY BEATS SEQUENCE ─── */}
      {chapter.beats && chapter.beats.length > 0 ? (
        chapter.beats.map((beat: DocumentaryBeat) => (
          <section
            key={beat.id}
            id={`beat-${beat.id}`}
            className={`editorial-spread spread-${beat.layoutMode}`}
            data-beat-id={beat.id}
            data-focal-target={beat.focalTarget}
          >
            <div className={`editorial-content editorial-beat beat-${beat.layoutMode}`}>
              {/* Context Tag (Location / Phase) */}
              {beat.eyebrow && (
                <span className="beat-context-tag reveal">
                  {beat.eyebrow}
                </span>
              )}

              {/* Beat Heading Title */}
              {beat.title && (
                <h3 className="beat-title reveal" style={{ transitionDelay: '70ms' }}>
                  {beat.title}
                </h3>
              )}

              {/* Beat Subtitle */}
              {beat.subtitle && (
                <p className="beat-subtitle reveal" style={{ transitionDelay: '120ms' }}>
                  {beat.subtitle}
                </p>
              )}

              {/* Beat Documentary Content Blocks */}
              <div className="beat-blocks-flow">
                {beat.blocks.map((block: DocumentaryBlock, i: number) => (
                  <BlockRenderer
                    key={`${beat.id}-block-${i}`}
                    block={block}
                    delay={140 + i * 60}
                  />
                ))}
              </div>
            </div>
          </section>
        ))
      ) : (
        /* Fallback for chapters without beats */
        <section className={`editorial-spread ${openerSpreadClass}`}>
          <div className="editorial-content">
            {chapter.blocks.map((block: DocumentaryBlock, i: number) => (
              <BlockRenderer
                key={`${chapter.id}-block-${i}`}
                block={block}
                delay={i * 60}
              />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
