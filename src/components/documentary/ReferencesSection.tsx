import { documentary } from '../../content/documentary';
import { BlockRenderer } from './BlockRenderer';

/**
 * References section at the very end of the documentary.
 * Minimal styling — mono font, editorial treatment.
 */
export function ReferencesSection() {
  return (
    <section
      className="chapter-section"
      id="references"
      aria-label="References"
      style={{
        minHeight: 'auto',
        paddingTop: 'var(--space-16)',
        paddingBottom: 'var(--space-24)',
      }}
    >
      <div className="chapter-inner" style={{ maxWidth: 'var(--content-max-width)' }}>
        <div className="text-veil">
          <div className="reveal">
            <span className="eyebrow">Sources</span>
            <h3 style={{
              fontSize: 'var(--text-heading)',
              marginBottom: 'var(--space-8)',
            }}>
              References
            </h3>
          </div>
          {documentary.references.map((ref, i) => (
            <BlockRenderer key={`ref-${i}`} block={ref} delay={i * 30} />
          ))}
        </div>
      </div>
    </section>
  );
}
