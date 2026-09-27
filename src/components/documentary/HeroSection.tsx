import type { DocumentaryBlock } from '../../content/types';
import { BlockRenderer } from './BlockRenderer';

interface HeroSectionProps {
  blocks: DocumentaryBlock[];
}

/**
 * Opening Cinematic Composition
 * 
 * Literary & Scholarly Editorial Craft:
 * - Dignified serif typography carrying the weight of the investigation
 * - Asymmetric, wide publication layout with atmospheric negative space
 * - Real documentary thesis and introductory blocks
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
        {/* Restrained Publication Eyebrow */}
        <span className="hero-genre-tag reveal">
          A Documentary Investigation
        </span>

        {/* Grand Title Presentation */}
        <div className="hero-headline-group reveal" style={{ transitionDelay: '60ms' }}>
          <h1 className="hero-headline">
            <span className="hero-headline-primary">Osho</span>
            <span className="hero-headline-secondary">Rajneesh</span>
          </h1>
        </div>

        {/* Subtitle / Thesis */}
        <p className="hero-thesis reveal" style={{ transitionDelay: '120ms' }}>
          {headerBlock && 'body' in headerBlock && headerBlock.body
            ? headerBlock.body
            : 'Philosophy, Outcomes, and the Truth Behind the Movement'}
        </p>

        {/* Lede Introduction */}
        {ledeBlock && 'body' in ledeBlock && (
          <p className="hero-lede reveal" style={{ transitionDelay: '180ms' }}>
            {ledeBlock.body}
          </p>
        )}

        {/* Narrative Introduction Blocks */}
        <div className="hero-narrative-flow" style={{ marginTop: 'var(--space-6)', maxWidth: '44rem' }}>
          {narrativeBlocks.map((block, i) => (
            <BlockRenderer
              key={`intro-block-${i}`}
              block={block}
              delay={240 + i * 70}
            />
          ))}
        </div>

        {/* Quiet Scroll Cue */}
        <div className="hero-scroll-cue reveal" style={{ marginTop: 'var(--space-8)' }}>
          <span className="scroll-cue-line" aria-hidden="true" />
          <span className="scroll-cue-label">Scroll to explore</span>
        </div>
      </div>
    </section>
  );
}
