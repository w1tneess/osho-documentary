import type { DocumentaryBlock } from '../../entities/content/types';
import { BlockRenderer } from './BlockRenderer';

interface PrologueProps {
  blocks: DocumentaryBlock[];
}

/**
 * The Prologue: the introduction proper, as its own composed spread.
 *
 * It exists so the hero can stay a cover. The lede and the method statement
 * both need a full reading measure and a scrim behind them, and neither of those
 * things can be had in a frame that also has to hold a title at display size.
 */
export function Prologue({ blocks }: PrologueProps) {
  const heading = blocks.find((b) => b.type === 'heading');
  const body = blocks.filter((b) => b.type !== 'heading');

  return (
    <section
      className="spread spread--beat spread--left"
      id="prologue"
      data-section="prologue"
      data-score="0"
      aria-labelledby="prologue-title"
    >
      <div className="spread__grid">
        <div className="spread__body">
          <div className="plate">
            <header className="beat__head reveal">
              <span className="beat__kicker">Prologue</span>
              {heading && heading.type === 'heading' && (
                <h2 className="beat__title beat__title--lg" id="prologue-title">
                  {heading.title}
                </h2>
              )}
            </header>
            <div className="beat__flow">
              {body.map((block, i) => (
                <BlockRenderer
                  key={`prologue-${i}`}
                  // The first paragraph of the documentary is set as a lede:
                  // larger and darker, the way a printed opening paragraph is.
                  // It is the reader's first encounter with the prose voice, and
                  // it should not read as one more line of body copy.
                  block={i === 0 && block.type === 'paragraph' ? { ...block, lede: true } : block}
                  delay={80 + i * 70}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
