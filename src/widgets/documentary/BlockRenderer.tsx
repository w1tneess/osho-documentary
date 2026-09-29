import type { DocumentaryBlock, ImageRole } from '../../entities/content/types';
import { Plate } from './Plate';

/**
 * BlockRenderer: the printing press.
 *
 * Each block type gets a distinct typographic treatment, because the treatment
 * is what tells a reader how to read it. A fact is a paragraph. A claim of
 * interpretation is set apart as an aside. A quotation is a held moment with no
 * container. An image is a plate with a credit line and a declared box.
 *
 * Nothing here is a card, and nothing here decides its own size from the
 * viewport.
 */

const EVIDENCE_LABEL: Record<string, string> = {
  fact: 'Documented',
  analysis: 'Analysis',
  argument: 'Argument',
  conclusion: 'Conclusion',
  quote: 'Quoted',
  reference: 'Source',
};

/**
 * A provenance mark. Rendered only when the content declares an evidence kind,
 * because the documentary must not label a claim the source does not support.
 */
function EvidenceMark({ kind }: { kind?: string }) {
  if (!kind || !EVIDENCE_LABEL[kind]) return null;
  return (
    <span
      className={`evidence${kind === 'analysis' || kind === 'argument' ? ' evidence--analysis' : ''}`}
      title={
        kind === 'fact'
          ? 'Drawn from the documentary record'
          : kind === 'analysis' || kind === 'argument'
            ? "The documentary's own interpretation"
            : undefined
      }
    >
      {EVIDENCE_LABEL[kind]}
    </span>
  );
}

interface BlockProps {
  block: DocumentaryBlock;
  delay?: number;
}

export function BlockRenderer({ block, delay = 0 }: BlockProps) {
  const style = delay > 0 ? { transitionDelay: `${delay}ms` } : undefined;

  switch (block.type) {
    case 'heading':
      return (
        <div className="reveal" style={style}>
          <h3 className="beat__title beat__title--lg">
            {block.title}
            <EvidenceMark kind={block.evidence} />
          </h3>
          {block.body && <p className="beat__standfirst">{block.body}</p>}
        </div>
      );

    case 'paragraph':
      return (
        <div className="reveal" style={style}>
          <p className={`prose${block.lede ? ' prose--lede' : ''}`}>
            {block.body}
            <EvidenceMark kind={block.evidence} />
          </p>
        </div>
      );

    case 'quote':
      return (
        <blockquote className="pull reveal" style={style}>
          <p className="pull__text">{block.text}</p>
          {(block.attribution || block.source) && (
            <cite className="pull__cite">
              {block.attribution && <span className="pull__author">{block.attribution}</span>}
              {block.attribution && block.source && <span aria-hidden="true">—</span>}
              {block.source && <span>{block.source}</span>}
            </cite>
          )}
        </blockquote>
      );

    case 'analysis':
      return (
        <aside className="aside reveal" style={style} aria-label="Documentary analysis">
          <span className="aside__label">{block.label ?? 'Analysis'}</span>
          <p className="aside__body">
            {block.body}
            <EvidenceMark kind={block.evidence} />
          </p>
        </aside>
      );

    case 'statement':
      return (
        <p className="statement reveal" style={style}>
          {block.body}
        </p>
      );

    case 'timeline':
      return (
        <ul className="timeline reveal" style={style} aria-label="Chronology">
          {block.items.map((item, i) => (
            <li className="timeline__entry" key={`${item.year}-${i}`}>
              <span className="timeline__year">{item.year}</span>
              <span className="timeline__event">{item.event}</span>
            </li>
          ))}
        </ul>
      );

    case 'reference':
      return (
        <p className="reference__citation reveal" style={style}>
          {block.citation}
          {block.url && (
            <a className="reference__url" href={block.url} target="_blank" rel="noopener noreferrer">
              {block.url}
            </a>
          )}
        </p>
      );

    case 'image':
      return (
        <figure
          className={`plate-figure plate-figure--${block.role} reveal`}
          style={style}
        >
          <div className="plate-figure__frame">
            <Plate
              src={block.src.replace(/\.(jpe?g|png|webp)$/, '')}
              alt={block.alt}
              sizes={IMAGE_SIZES[block.role]}
            />
          </div>
          {(block.caption || block.year || block.location || block.archiveSource) && (
            <figcaption className="plate-figure__caption">
              {(block.year || block.location) && (
                <span className="plate-figure__meta">
                  {block.year && <span className="plate-figure__year">{block.year}</span>}
                  {block.location && <span>{block.location}</span>}
                </span>
              )}
              {block.caption && <span className="plate-figure__text">{block.caption}</span>}
              {block.archiveSource && (
                <span className="plate-figure__source">Source: {block.archiveSource}</span>
              )}
            </figcaption>
          )}
        </figure>
      );
  }
}

/**
 * The `sizes` each role declares, matching the box its CSS token actually
 * produces. Declaring it here is what stops the browser from downloading the
 * 900px derivative for a plate that renders 240px wide.
 */
const IMAGE_SIZES: Record<ImageRole, string> = {
  portrait: '(max-width: 47.99rem) 11rem, 15rem',
  landscape: '(max-width: 47.99rem) 100vw, 34rem',
  plate: '(max-width: 47.99rem) 100vw, 26rem',
  detail: '(max-width: 47.99rem) 100vw, 18rem',
  bleed: '100vw',
};
