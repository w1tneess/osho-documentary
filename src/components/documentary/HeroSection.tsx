import type { DocumentaryBlock } from '../../content/types';
import { BlockRenderer } from './BlockRenderer';

interface HeroSectionProps {
  blocks: DocumentaryBlock[];
}

/**
 * Opening Cinematic Composition
 * 
 * Replaces the centered static card with an asymmetric, wide publication layout.
 * The 3D world (dawn mountains, distant horizon, stone terrace, winding path)
 * provides the visual atmosphere and depth.
 */
export function HeroSection({ blocks }: HeroSectionProps) {
  // Extract major content from intro blocks
  const headerBlock = blocks[0];
  const ledeBlock = blocks[1];
  const narrativeBlocks = blocks.slice(2);

  return (
    <section
      className="hero-spread"
      id="hero"
      aria-label="Introduction: Osho Rajneesh Documentary"
    >
      <div className="hero-composition">
        {/* Editorial Eyebrow */}
        <span className="hero-eyebrow">
          AN INTERACTIVE DOCUMENTARY INVESTIGATION
        </span>

        {/* Cinematic Title Group */}
        <div className="hero-title-group">
          <h1 className="hero-title-main">OSHO</h1>
          <span className="hero-title-sub">RAJNEESH</span>
        </div>

        {/* Subtitle / Thesis */}
        <p className="hero-subtitle">
          {headerBlock && 'body' in headerBlock && headerBlock.body
            ? headerBlock.body
            : 'Philosophy, Outcomes, and the Truth Behind the Movement'}
        </p>

        {/* Restrained Editorial Lede */}
        {ledeBlock && 'body' in ledeBlock && (
          <p className="hero-lede">
            {ledeBlock.body}
          </p>
        )}

        {/* Remaining narrative introduction blocks rendered cleanly */}
        <div style={{ marginTop: 'var(--space-6)', maxWidth: '44rem' }}>
          {narrativeBlocks.map((block, i) => (
            <BlockRenderer
              key={`intro-block-${i}`}
              block={block}
              delay={i * 80}
            />
          ))}
        </div>

        {/* Restrained Scroll Prompt */}
        <div className="hero-scroll-cue reveal" style={{ marginTop: 'var(--space-8)' }}>
          <div className="hero-scroll-line" />
          <span>SCROLL TO ENTER THE JOURNEY</span>
        </div>
      </div>
    </section>
  );
}
