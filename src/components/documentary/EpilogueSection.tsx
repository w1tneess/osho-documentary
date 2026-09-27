import type { DocumentaryBlock } from '../../content/types';
import { BlockRenderer } from './BlockRenderer';

interface EpilogueSectionProps {
  blocks: DocumentaryBlock[];
}

/**
 * Epilogue Section: The Final Horizon
 * 
 * Replaces the card container with an expansive, intentional horizon composition:
 * - Huge negative space allowing the 3D infinite plain and evening glow to breathe
 * - Minimal, quiet, profound editorial typography
 * - Space to reflect
 */
export function EpilogueSection({ blocks }: EpilogueSectionProps) {
  return (
    <section
      className="final-horizon-spread"
      id="epilogue"
      aria-label="Conclusion: The Final Horizon"
    >
      <div className="final-horizon-content">
        <span className="chapter-entry-label reveal" style={{ justifyContent: 'center' }}>
          FINAL EPILOGUE
        </span>

        <h2 className="final-horizon-title reveal" style={{ transitionDelay: '100ms' }}>
          LEGACY & CONTINUATION
        </h2>

        <div className="chapter-divider-rule reveal" style={{ margin: '0 auto var(--space-8)' }} />

        <div style={{ maxWidth: '44rem', margin: '0 auto', textAlign: 'left' }}>
          {blocks.map((block, i) => (
            <BlockRenderer
              key={`epilogue-block-${i}`}
              block={block}
              delay={i * 90}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
