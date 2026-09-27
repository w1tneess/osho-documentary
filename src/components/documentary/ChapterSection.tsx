import type { ChapterContent, DocumentaryBlock } from '../../content/types';
import { BlockRenderer } from './BlockRenderer';

interface ChapterSectionProps {
  chapter: ChapterContent;
}

/**
 * Spatial Editorial Chapter Section
 * 
 * Replaces the monolithic card container with choreographed editorial spreads:
 * - Spread 1: Chapter Opener Moment (strong title, metadata, thesis)
 * - Spread 2: Narrative & Primary Quotation (asymmetric negative space)
 * - Spread 3: Critical Analysis & Documentary Timeline
 * 
 * Layout alternates between left-third, right-third, and center-wide to balance
 * the 3D foreground framing and midground architecture.
 */
export function ChapterSection({ chapter }: ChapterSectionProps) {
  const isOdd = chapter.index % 2 !== 0;

  // Determine editorial layout classes based on chapter environment
  // Ch 1 (Left text vs Right Bodhi tree)
  // Ch 2 (Right text vs Left stone gate)
  // Ch 3 (Center text framed by dual colonnade)
  // Ch 4 (Left text vs Right reflection pool)
  // Ch 5 (Right text vs Left watchtower & wide highway)
  // Ch 6 (Left text vs Right tilted fractured pillars)
  // Ch 7 (Right text vs Left solitary gate)
  // Ch 8 (Split / Center text navigating the duality threshold)
  // Ch 9 (Center-wide text over vast open horizon)
  const openerSpreadClass =
    chapter.index === 3 || chapter.index === 9
      ? 'spread-center'
      : isOdd
      ? 'spread-left'
      : 'spread-right';

  const secondarySpreadClass =
    chapter.index === 3 || chapter.index === 8
      ? 'spread-wide'
      : isOdd
      ? 'spread-right'
      : 'spread-left';

  // Group blocks into coherent narrative spreads
  const blocks = chapter.blocks;

  // If the first block is a heading that duplicates chapter title, we use it for the opener
  const firstBlock = blocks[0];
  const remainingBlocks = blocks.slice(1);

  // Divide remaining blocks into narrative beats (first half vs second half)
  const midPoint = Math.ceil(remainingBlocks.length / 2);
  const narrativeBeatA = remainingBlocks.slice(0, midPoint);
  const narrativeBeatB = remainingBlocks.slice(midPoint);

  return (
    <article
      className="chapter-container"
      id={`chapter-${chapter.slug}`}
      aria-label={`Chapter ${chapter.index}: ${chapter.title}`}
    >
      {/* ─── SPREAD 1: CHAPTER OPENER MOMENT ─── */}
      <section className={`editorial-spread ${openerSpreadClass}`}>
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

          {/* Refined Divider */}
          <div className="chapter-divider-rule reveal" style={{ transitionDelay: '220ms' }} />

          {/* First block / opening statement if available and not repeating subtitle */}
          {firstBlock &&
            firstBlock.type === 'heading' &&
            firstBlock.body &&
            firstBlock.body.trim() !== (chapter.subtitle || '').trim() && (
              <p className="editorial-statement reveal" style={{ transitionDelay: '260ms' }}>
                {firstBlock.body}
              </p>
            )}
        </div>
      </section>

      {/* ─── SPREAD 2: PRIMARY NARRATIVE & TESTIMONY ─── */}
      {narrativeBeatA.length > 0 && (
        <section className={`editorial-spread ${secondarySpreadClass}`}>
          <div className="editorial-content">
            {narrativeBeatA.map((block: DocumentaryBlock, i: number) => (
              <BlockRenderer
                key={`${chapter.id}-beatA-${i}`}
                block={block}
                delay={i * 70}
              />
            ))}
          </div>
        </section>
      )}

      {/* ─── SPREAD 3: CRITICAL ANALYSIS & OUTCOMES ─── */}
      {narrativeBeatB.length > 0 && (
        <section className={`editorial-spread ${openerSpreadClass}`}>
          <div className="editorial-content">
            {narrativeBeatB.map((block: DocumentaryBlock, i: number) => (
              <BlockRenderer
                key={`${chapter.id}-beatB-${i}`}
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
