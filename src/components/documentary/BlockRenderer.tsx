import type { DocumentaryBlock } from '../../content/types';

interface BlockRendererProps {
  block: DocumentaryBlock;
  delay?: number;
}

/**
 * Renders a single documentary content block with appropriate styling.
 * Each block type maps to a distinct editorial treatment.
 */
export function BlockRenderer({ block, delay = 0 }: BlockRendererProps) {
  const style = delay > 0 ? { transitionDelay: `${delay}ms` } : undefined;

  switch (block.type) {
    case 'heading':
      return (
        <div className="reveal" style={style}>
          {block.eyebrow && (
            <span className="eyebrow">{block.eyebrow}</span>
          )}
          {block.eyebrow ? (
            <h2 style={{ fontSize: 'var(--text-chapter)', marginBottom: 'var(--space-3)' }}>
              {block.title}
            </h2>
          ) : (
            <h3 style={{ fontSize: 'var(--text-heading)', marginBottom: 'var(--space-3)' }}>
              {block.title}
            </h3>
          )}
          {block.body && (
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-subheading)',
              color: 'var(--color-ink-soft)',
              fontWeight: 300,
            }}>
              {block.body}
            </p>
          )}
        </div>
      );

    case 'paragraph':
      return (
        <div className="reveal" style={style}>
          <p style={{ marginBottom: 'var(--space-4)' }}>
            {block.body}
            {block.evidence && (
              <span className="evidence-badge">{block.evidence}</span>
            )}
          </p>
        </div>
      );

    case 'quote':
      return (
        <blockquote className="reveal" style={style}>
          <p>"{block.text}"</p>
          {(block.attribution || block.source) && (
            <footer style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-caption)',
              fontStyle: 'normal',
              color: 'var(--color-earth-warm)',
              marginTop: 'var(--space-3)',
            }}>
              {block.attribution && <strong>{block.attribution}</strong>}
              {block.source && <span> — {block.source}</span>}
            </footer>
          )}
        </blockquote>
      );

    case 'analysis':
      return (
        <div className="analysis-block reveal" style={style}>
          {block.label && (
            <span className="analysis-label">{block.label}</span>
          )}
          <p style={{ fontSize: 'var(--text-body)', color: 'var(--color-ink-soft)' }}>
            {block.body}
          </p>
        </div>
      );

    case 'statement':
      return (
        <div className="reveal" style={style}>
          <p style={{
            fontFamily: 'var(--font-editorial)',
            fontSize: 'var(--text-subheading)',
            fontWeight: 500,
            color: 'var(--color-ink)',
            marginBottom: 'var(--space-4)',
          }}>
            {block.body}
          </p>
        </div>
      );

    case 'timeline':
      return (
        <ul className="timeline reveal" style={style}>
          {block.items.map((item, i) => (
            <li key={i} className="timeline-item">
              <span className="timeline-year">{item.year}</span>
              <span className="timeline-event">{item.event}</span>
            </li>
          ))}
        </ul>
      );

    case 'reference':
      return (
        <div className="reveal" style={style}>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-caption)',
            color: 'var(--color-earth-warm)',
            lineHeight: 'var(--leading-relaxed)',
            marginBottom: 'var(--space-2)',
          }}>
            {block.citation}
            {block.url && (
              <> — <a href={block.url} target="_blank" rel="noopener noreferrer">{block.url}</a></>
            )}
          </p>
        </div>
      );
  }
}
