import type { DocumentaryBlock } from '../../content/types';
import { BlockRenderer } from './BlockRenderer';

interface EpilogueSectionProps {
  blocks: DocumentaryBlock[];
}

/**
 * The concluding section — brings the narrative full circle.
 * The "final horizon" that should feel earned (per DESIGN.md).
 */
export function EpilogueSection({ blocks }: EpilogueSectionProps) {
  return (
    <section
      className="chapter-section"
      id="epilogue"
      aria-label="Conclusion"
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
              key={`epilogue-block-${i}`}
              block={block}
              delay={i * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
