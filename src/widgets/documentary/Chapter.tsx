import type { ChapterContent } from '../../entities/content/types';
import { Beat } from './Beat';

interface ChapterProps {
  chapter: ChapterContent;
}

/**
 * A chapter is two things stacked in one continuous scroll:
 *
 *   1. An OPENER — a stage, not a container. A small ordinal, a very large
 *      title, and then a long silence. The 3D subject is panned to the
 *      chapter's side and the frame is given over to it.
 *
 *   2. Its BEATS — each one independently composed, each with its own scrim
 *      and its own camera pan.
 *
 * The chapter's own `composition` governs the opener; individual beats may
 * choose differently, which is how the camera moves within a chapter.
 *
 * The opener's ordinal is the chapter's position in the nine, not a running
 * counter: the narrative number is always 01–09 no matter where the reader
 * enters from.
 */
export function Chapter({ chapter }: ChapterProps) {
  return (
    <article
      className="chapter"
      id={`chapter-${chapter.slug}`}
      data-section="chapter"
      data-score={chapter.index}
      aria-labelledby={`chapter-${chapter.slug}-title`}
    >
      <section className={`spread spread--opener opener--${chapter.composition}`}>
        <div className="opener__grid">
          <div className="opener__body">
            <div className="reveal">
              <p className="opener__ordinal">
                <span>Chapter {String(chapter.index).padStart(2, '0')}</span>
                <span className="opener__ordinal-rule" aria-hidden="true" />
                {chapter.subtitle && <span className="opener__period">{chapter.subtitle}</span>}
              </p>
              <h2 className="opener__title" id={`chapter-${chapter.slug}-title`}>
                {chapter.title}
              </h2>
              <div className="opener__rule" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      {chapter.beats.map((beat) => (
        <Beat key={beat.id} beat={beat} />
      ))}
    </article>
  );
}
