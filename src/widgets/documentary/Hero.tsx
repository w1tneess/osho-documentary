import type { DocumentaryBlock } from '../../entities/content/types';
import { Plate } from './Plate';

interface HeroProps {
  /** Block 0: the title block. Block 1: the deck. */
  blocks: DocumentaryBlock[];
  chapterCount: number;
  beatCount: number;
}

function textOf(block: DocumentaryBlock | undefined): string | undefined {
  if (!block) return undefined;
  return 'body' in block && typeof block.body === 'string' ? block.body : undefined;
}

/**
 * The opening frame.
 *
 * Composed as a cover rather than a web hero: masthead in the top band, title
 * and argument in the lower left, the archival portrait hung in the margin as a
 * plate with a credit line, and the right two-thirds of the frame given over to
 * the world. That emptiness is the composition — it is where the valley and the
 * low sun are, and it is what lets the title read as the subject rather than as
 * a label over one.
 *
 * The hero carries the title and the deck only. The introduction proper is the
 * Prologue spread that follows, because a lede needs room to be read and this
 * frame does not have it.
 */
export function Hero({ blocks, chapterCount, beatCount }: HeroProps) {
  const subtitle =
    textOf(blocks[0]) ?? 'Philosophy, Outcomes, and the Truth Behind the Movement';
  const deck = textOf(blocks[1]);

  return (
    <section className="hero" id="hero" data-section="hero" data-score="0" aria-labelledby="hero-title">
      <div className="hero__grid">
        <div className="hero__body">
          <p className="hero__masthead reveal">
            <span className="hero__imprint">Osho Rajneesh</span>
            <span className="hero__masthead-sep" aria-hidden="true" />
            <span className="hero__genre">A Documentary</span>
            <span className="hero__masthead-sep" aria-hidden="true" />
            <span className="hero__extent">1931–1990</span>
          </p>

          <h1 className="hero__title reveal" id="hero-title">
            Osho
            <span className="hero__title-sub">Rajneesh</span>
          </h1>

          <p className="hero__thesis reveal">{subtitle}</p>
          {deck && <p className="hero__lede reveal">{deck}</p>}

          <div className="hero__actions reveal">
            <a className="hero__cue" href="#prologue">
              <span className="hero__cue-mark" aria-hidden="true" />
              Begin the investigation
            </a>
            <span className="hero__meta">
              {chapterCount} chapters · {beatCount} sequences
            </span>
          </div>
        </div>

          <figure className="hero__portrait reveal">
            <div className="plate-figure plate-figure--portrait">
              <div className="plate-figure__frame">
                <Plate
                  src="/images/osho/osho-portrait"
                  alt="Archival portrait of Bhagwan Shree Rajneesh, known as Osho, in white robes."
                  sizes="(max-width: 63.99rem) 9.5rem, 15rem"
                  eager
                />
              </div>
            <figcaption className="plate-figure__caption">
              <span className="plate-figure__meta">
                <span className="plate-figure__year">1931–1990</span>
                <span>Archival portrait</span>
              </span>
              <span className="plate-figure__text">
                Bhagwan Shree Rajneesh, known as Osho — philosopher, spiritual
                teacher, and founder of the Rajneesh movement.
              </span>
              <span className="plate-figure__source">Wikimedia Commons</span>
            </figcaption>
          </div>
        </figure>
      </div>
    </section>
  );
}
