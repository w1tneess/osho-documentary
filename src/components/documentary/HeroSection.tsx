import type { DocumentaryBlock } from '../../content/types';
import { BlockRenderer } from './BlockRenderer';

interface HeroSectionProps {
  blocks: DocumentaryBlock[];
}

/**
 * The opening hero section — the first viewport of the documentary.
 * Full-height, centered, cinematic. Sets the editorial tone.
 */
export function HeroSection({ blocks }: HeroSectionProps) {
  return (
    <section
      className="chapter-section"
      id="hero"
      aria-label="Introduction"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: 'var(--content-max-width)' }}>
        <div className="text-veil" style={{ textAlign: 'center' }}>
          {blocks.map((block, i) => (
            <BlockRenderer
              key={`intro-block-${i}`}
              block={block}
              delay={i * 120}
            />
          ))}
          <div className="reveal" style={{ transitionDelay: '800ms' }}>
            <div style={{
              marginTop: 'var(--space-12)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--space-2)',
            }}>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-caption)',
                color: 'var(--color-earth-warm)',
                letterSpacing: 'var(--tracking-wide)',
              }}>
                Scroll to begin
              </span>
              <svg
                width="20"
                height="28"
                viewBox="0 0 20 28"
                fill="none"
                style={{ opacity: 0.5 }}
                aria-hidden="true"
              >
                <rect x="1" y="1" width="18" height="26" rx="9" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="10" cy="8" r="2" fill="currentColor">
                  <animate
                    attributeName="cy"
                    values="8;16;8"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
