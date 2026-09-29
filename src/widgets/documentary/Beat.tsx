import type { DocumentaryBeat } from '../../entities/content/types';
import { BlockRenderer } from './BlockRenderer';
import { BLOCK_COMPOSITION, TWO_COLUMN_MODES } from './beatComposition';

interface BeatProps {
  beat: DocumentaryBeat;
}

/**
 * A beat is one composed band: a viewport's worth of screen holding one
 * narrative moment, with the 3D world staged to match it.
 *
 * The layout mode decides three things at once:
 *   • which grid columns the editorial column occupies;
 *   • where the directional scrim is anchored;
 *   • where the camera pans the 3D subject, via BLOCK_COMPOSITION — the same
 *     terms the score uses.
 *
 * Quote and statement beats are "held": they drop the reading plate entirely
 * and take the whole frame. A held moment inside a box is not a held moment.
 */
export function Beat({ beat }: BeatProps) {
  const held = beat.layoutMode === 'quote' || beat.layoutMode === 'statement';
  const twoColumn = TWO_COLUMN_MODES.has(beat.layoutMode);
  const composition = BLOCK_COMPOSITION[beat.layoutMode];
  const band = held ? 'spread--held' : 'spread--beat';

  const head =
    beat.eyebrow || beat.title ? (
      <header className="beat__head reveal">
        {beat.eyebrow && <span className="beat__kicker">{beat.eyebrow}</span>}
        {beat.title && <h3 className="beat__title">{beat.title}</h3>}
        {beat.subtitle && <p className="beat__standfirst">{beat.subtitle}</p>}
      </header>
    ) : null;

  // A comparative beat's blocks are distributed into two columns by position,
  // not by a type rule: the tension between two arguments is expressed by the
  // layout, and deciding which side a block falls on by its kind would be a
  // content decision pretending to be a layout one.
  const flow = twoColumn ? (
    <div className="split">
      {splitPoint(beat).map(([slice, side]) => (
        <div className="split__col" key={side}>
          {slice.map((block, i) => (
            <BlockRenderer key={`${beat.id}-${side}-${i}`} block={block} delay={90 + i * 55} />
          ))}
        </div>
      ))}
    </div>
  ) : (
    <div className="beat__flow">
      {beat.blocks.map((block, i) => (
        <BlockRenderer key={`${beat.id}-${i}`} block={block} delay={90 + i * 55} />
      ))}
    </div>
  );

  return (
    <section
      id={`beat-${beat.id}`}
      className={`spread ${band} spread--${composition}`}
      data-beat={beat.id}
      data-layout={beat.layoutMode}
      aria-label={beat.title ?? beat.eyebrow}
    >
      <div className="spread__grid">
        <div className="spread__body">
          {held ? (
            <>
              {head}
              {flow}
            </>
          ) : (
            <div className="plate">
              {head}
              {flow}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/** Split a beat's blocks into two balanced, non-empty columns. */
function splitPoint(beat: DocumentaryBeat): Array<[DocumentaryBeat['blocks'], string]> {
  const half = Math.ceil(beat.blocks.length / 2)
  return [
    [beat.blocks.slice(0, half), 'a'],
    [beat.blocks.slice(half), 'b'],
  ].filter(([slice]) => slice.length > 0) as Array<[DocumentaryBeat['blocks'], string]>
}
