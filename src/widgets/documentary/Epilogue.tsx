import { BlockRenderer } from './BlockRenderer';
import type { DocumentaryBlock, ReferenceBlock } from '../../entities/content/types';

interface EpilogueProps {
  blocks: DocumentaryBlock[];
  references: ReferenceBlock[];
  /** Score indices for the two closing sections. */
  conclusionScore: number;
  referencesScore: number;
}

/**
 * The close.
 *
 * Two things happen here and they are deliberately different.
 *
 * The CONCLUSION is a held band: no plate, the whole frame, the highest-key
 * and lowest-contrast moment in the documentary. The material has been shown
 * and the judgement is the reader's, so the frame steps back and stops
 * competing.
 *
 * The REFERENCES are a return to paper: flat, evenly lit, ruled, and readable
 * as a document. The 3D world recedes to almost nothing behind them, because a
 * citation list is not a scene.
 *
 * The conclusion's title is lifted out of the content rather than restated
 * here. The documentary's own text is the source of truth for what it is
 * called; a hardcoded copy of the same string is a second source that will
 * silently drift the first time either one is edited.
 */
export function Epilogue({ blocks, references, conclusionScore, referencesScore }: EpilogueProps) {
  const heading = blocks.find((b) => b.type === 'heading');
  const title = heading && heading.type === 'heading' ? heading.title : 'Conclusion';
  const eyebrow =
    heading && heading.type === 'heading' && heading.eyebrow ? heading.eyebrow : 'Conclusion';
  const body = blocks.filter((b) => b.type !== 'heading');

  return (
    <>
      <section
        className="spread spread--held spread--center"
        id="epilogue"
        data-section="epilogue"
        data-score={conclusionScore}
        aria-labelledby="epilogue-title"
      >
        <div className="spread__grid">
          <div className="spread__body">
            <header className="beat__head reveal">
              <span className="beat__kicker">{eyebrow}</span>
              <h2 className="opener__title opener__title--centered" id="epilogue-title">
                {title}
              </h2>
              <div className="opener__rule opener__rule--centered" aria-hidden="true" />
            </header>
            <div className="beat__flow">
              {body.map((block, i) => (
                <BlockRenderer key={`epilogue-${i}`} block={block} delay={80 + i * 80} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="spread spread--beat spread--center spread--refs"
        id="references"
        data-section="references"
        data-score={referencesScore}
        aria-labelledby="references-title"
      >
        <div className="spread__grid">
          <div className="spread__body">
            <div className="plate">
              <header className="beat__head reveal">
                <span className="beat__kicker">Sources</span>
                <h2 className="beat__title beat__title--lg" id="references-title">
                  Archival &amp; Legal References
                </h2>
                <p className="beat__standfirst">
                  Every claim in this documentary is drawn from the record below.
                  Where the documentary offers an interpretation rather than a
                  fact, it is marked as such in the text.
                </p>
              </header>

              <ol className="reference-list reveal">
                {references.map((ref, i) => (
                  <li className="reference" key={`ref-${i}`}>
                    <span className="reference__index" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <BlockRenderer block={ref} />
                    </div>
                  </li>
                ))}
              </ol>

              <footer className="colophon">
                <p>
                  A critical examination of Osho Rajneesh (1931–1990), assembled
                  from court records, official biographies, recorded discourses,
                  and contemporary scholarship.
                </p>
                <p className="colophon__note">
                  An independent documentary. Not affiliated with, endorsed by,
                  or representative of any Osho organisation or commune.
                </p>
              </footer>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
