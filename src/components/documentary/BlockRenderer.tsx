import type { DocumentaryBlock } from '../../content/types';

interface BlockRendererProps {
  block: DocumentaryBlock;
  delay?: number;
}

/**
 * Editorial Publication Block Renderer
 * 
 * Implements:
 * - Unboxed editorial typography
 * - Quiet metadata tags instead of SaaS pill badges
 * - Pure negative space quotations (Composition B)
 * - Typographic analysis eyebrows with left hairline rules
 * - Integrated minimal timelines (Composition E)
 */
export function BlockRenderer({ block, delay = 0 }: BlockRendererProps) {
  const style = delay > 0 ? { transitionDelay: `${delay}ms` } : undefined;

  switch (block.type) {
    case 'heading':
      return (
        <div className="reveal" style={style}>
          {block.eyebrow && (
            <span className="chapter-entry-label">{block.eyebrow}</span>
          )}
          <h2 style={{
            fontSize: block.eyebrow ? 'clamp(2rem, 4vw, 3.2rem)' : 'clamp(1.5rem, 2.8vw, 2.4rem)',
            color: 'var(--color-earth-deep)',
            marginBottom: 'var(--space-3)',
            lineHeight: 1.15,
          }}>
            {block.title}
          </h2>
          {block.body && (
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.875rem',
              color: 'var(--color-earth-warm)',
              marginBottom: 'var(--space-6)',
              letterSpacing: 'var(--tracking-wide)',
            }}>
              {block.body}
            </p>
          )}
        </div>
      );

    case 'paragraph':
      return (
        <div className="reveal" style={style}>
          <p style={{
            fontSize: 'clamp(1rem, 1.15vw, 1.125rem)',
            lineHeight: 'var(--leading-relaxed)',
            color: 'var(--color-ink-soft)',
            marginBottom: 'var(--space-5)',
          }}>
            {block.body}
            {block.evidence === 'fact' && (
              <span className="editorial-meta-tag">
                <span className="meta-dot">▪</span> DOCUMENTED
              </span>
            )}
            {block.evidence === 'analysis' && (
              <span className="editorial-meta-tag">
                <span className="meta-dot">▪</span> ANALYSIS
              </span>
            )}
          </p>
        </div>
      );

    case 'quote':
      return (
        <blockquote className="editorial-quote reveal" style={style}>
          <span className="quote-mark">“</span>
          <p className="quote-text">{block.text}</p>
          {(block.attribution || block.source) && (
            <cite className="quote-cite">
              {block.attribution && <strong>{block.attribution}</strong>}
              {block.source && <span>— {block.source}</span>}
            </cite>
          )}
        </blockquote>
      );

    case 'analysis':
      return (
        <div className="analysis-entry reveal" style={style}>
          <span className="analysis-eyebrow">
            {block.label || 'DOCUMENTARY ANALYSIS'}
          </span>
          <p style={{
            fontSize: '1rem',
            lineHeight: 'var(--leading-relaxed)',
            color: 'var(--color-earth-deep)',
          }}>
            {block.body}
          </p>
        </div>
      );

    case 'statement':
      return (
        <div className="editorial-statement reveal" style={style}>
          <p>{block.body}</p>
        </div>
      );

    case 'timeline':
      return (
        <ul className="editorial-timeline reveal" style={style}>
          {block.items.map((item, i) => (
            <li key={i} className="timeline-entry">
              <span className="timeline-date">{item.year}</span>
              <p className="timeline-desc">{item.event}</p>
            </li>
          ))}
        </ul>
      );

    case 'reference':
      return (
        <div className="editorial-reference reveal" style={style}>
          <p>
            {block.citation}
            {block.url && (
              <> — <a href={block.url} target="_blank" rel="noopener noreferrer">{block.url}</a></>
            )}
          </p>
        </div>
      );
  }
}
