import type { ChapterContent, DocumentaryBeat, DocumentaryBlock } from '../../content/types';
import { BlockRenderer } from './BlockRenderer';

interface ChapterSectionProps {
  chapter: ChapterContent;
}

/**
 * Spatial Editorial Chapter Section
 * 
 * Implements the authored DOCUMENTARY BEAT SYSTEM:
 * Each chapter is composed of:
 * 1. Grand Chapter Opener (title, metadata, chronology, thesis)
 * 2. Sequence of focused Documentary Beats (0.8 - 1.2 vh each)
 * 
 * Each beat maps to an editorial composition:
 * - 'left': Text safe zone on left, 3D focal subject on right
 * - 'right': Text safe zone on right, 3D focal subject on left
 * - 'quote': Large negative space, centered or off-center contemplative moment
 * - 'split': Comparative or dual-perspective two-column publication layout
 * - 'statement': Resonant thematic statement with substantial breathing room
 * - 'timeline': Scholarly chronological timeline beat
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
          {/* Chapter Metadata Eyebrow */}
          <div className="chapter-entry-label reveal">
            <span className="chapter-number-badge">
              0{chapter.index} / 09
            </span>
            <span>•</span>
            <span>
              {chapter.subtitle || `CHAPTER 0${chapter.index}`}
            </span>
          </div>

          {/* Majestic Chapter Title */}
          <h2 className="chapter-main-title reveal" style={{ transitionDelay: '100ms' }}>
            {chapter.title}
          </h2>

          {/* Chapter Period / Chronology */}
          {chapter.subtitle && (
            <span className="chapter-period-tag reveal" style={{ transitionDelay: '180ms' }}>
              {chapter.subtitle}
            </span>
          )}

          {/* Refined Divider Rule */}
          <div className="chapter-divider-rule reveal" style={{ transitionDelay: '220ms' }} />
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
              {/* Optional Beat Eyebrow */}
              {beat.eyebrow && (
                <span className="editorial-meta-tag reveal">
                  <span className="meta-dot">▪</span> {beat.eyebrow}
                </span>
              )}

              {/* Beat Heading Title */}
              {beat.title && (
                <h3 className="beat-title reveal" style={{ transitionDelay: '80ms' }}>
                  {beat.title}
                </h3>
              )}

              {/* Beat Subtitle */}
              {beat.subtitle && (
                <span className="beat-subtitle reveal" style={{ transitionDelay: '140ms' }}>
                  {beat.subtitle}
                </span>
              )}

              {/* Beat Documentary Content Blocks */}
              <div className="beat-blocks-flow">
                {beat.blocks.map((block: DocumentaryBlock, i: number) => (
                  <BlockRenderer
                    key={`${beat.id}-block-${i}`}
                    block={block}
                    delay={160 + i * 70}
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
                delay={i * 70}
              />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
