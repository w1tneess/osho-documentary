import { documentary } from '../../content/documentary';
import { BlockRenderer } from './BlockRenderer';

/**
 * References Section: Scholarly Documentation Archive
 * 
 * Minimal scholarly typography — mono citations, quiet rules, no card boxes.
 */
export function ReferencesSection() {
  return (
    <section
      className="editorial-spread spread-center"
      id="references"
      aria-label="References and Sources"
      style={{
        paddingTop: 'var(--space-24)',
        paddingBottom: 'var(--space-32)',
      }}
    >
      <div className="editorial-content" style={{ maxWidth: '52rem', textAlign: 'left' }}>
        <div className="reveal">
          <span className="chapter-entry-label">
            VERIFIED DOCUMENTARY SOURCES
          </span>
          <h3 style={{
            fontSize: 'clamp(1.8rem, 3.2vw, 2.8rem)',
            color: 'var(--color-earth-deep)',
            marginBottom: 'var(--space-4)',
          }}>
            Archival & Legal References
          </h3>
          <div className="chapter-divider-rule" />
        </div>

        <div style={{ marginTop: 'var(--space-8)' }}>
          {documentary.references.map((ref, i) => (
            <BlockRenderer key={`ref-${i}`} block={ref} delay={i * 40} />
          ))}
        </div>
      </div>
    </section>
  );
}
