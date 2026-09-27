import type { DocumentaryBlock } from '../../content/types';

interface BlockRendererProps {
  block: DocumentaryBlock;
  delay?: number;
}

/**
 * Editorial Publication Block Renderer
 * 
 * Grounded in scholarly editorial craftsmanship:
 * - Dignified typography with authentic hierarchy
 * - Quiet scholarly evidence citations (no shouty SaaS badges)
 * - Restrained blockquotes with generous negative space
 * - Minimal, informative chronological entries
 */
export function BlockRenderer({ block, delay = 0 }: BlockRendererProps) {
  const style = delay > 0 ? { transitionDelay: `${delay}ms` } : undefined;

  switch (block.type) {
    case 'heading':
      return (
        <div className="reveal" style={style}>
          <h2 className="editorial-subheading">
            {block.title}
          </h2>
          {block.body && (
            <p className="editorial-lead-body">
              {block.body}
            </p>
          )}
        </div>
      );

    case 'paragraph':
      return (
        <div className="reveal" style={style}>
          <p className="editorial-paragraph">
            {block.body}
            {block.evidence === 'fact' && (
              <span className="scholarly-annotation" title="Documented by archival records">
                Documented
              </span>
            )}
            {block.evidence === 'analysis' && (
              <span className="scholarly-annotation is-analysis" title="Critical documentary analysis">
                Analysis
              </span>
            )}
          </p>
        </div>
      );

    case 'quote':
      return (
        <blockquote className="editorial-quote reveal" style={style}>
          <p className="quote-text">{block.text}</p>
          {(block.attribution || block.source) && (
            <cite className="quote-cite">
              {block.attribution && <span className="cite-author">{block.attribution}</span>}
              {block.attribution && block.source && <span className="cite-sep">{' \u2014 '}</span>}
              {block.source && <span className="cite-source">{block.source}</span>}
            </cite>
          )}
        </blockquote>
      );

    case 'analysis':
      return (
        <aside className="analysis-entry reveal" style={style} aria-label="Editorial analysis">
          <span className="analysis-label">
            {block.label ? block.label : 'Critical analysis'}
          </span>
          <p className="analysis-body">
            {block.body}
          </p>
        </aside>
      );

    case 'statement':
      return (
        <div className="editorial-statement reveal" style={style}>
          <p>{block.body}</p>
        </div>
      );

    case 'timeline':
      return (
        <ul className="editorial-timeline reveal" style={style} aria-label="Chronology">
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
