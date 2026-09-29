import type { ChapterContent } from '../../entities/content/types';
import { useAppStore } from '../../features/store';

interface RailProps {
  chapters: ChapterContent[];
}

/**
 * The chapter rail.
 *
 * Nine ticks in the right margin, one per chapter. A tick rather than a dot:
 * with nine of them, position carries more information than fill, and an empty
 * tick is legible against both a bright sky and a dark one.
 *
 * Hidden below the laptop breakpoint, where there is no margin to hold it and
 * the index drawer carries the same function.
 */
export function ChapterRail({ chapters }: RailProps) {
  const activeChapter = useAppStore(s => s.chapterIndex);
  if (chapters.length === 0) return null;

  return (
    <nav className="rail" aria-label="Chapter position">
      {chapters.map((chapter, i) => (
        <button
          key={chapter.slug}
          type="button"
          className="rail__tick"
          aria-current={i === activeChapter ? 'true' : undefined}
          aria-label={`Chapter ${chapter.index}: ${chapter.title}`}
          onClick={() => {
            document
              .getElementById(`chapter-${chapter.slug}`)
              ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
        >
          <span className="rail__bar" aria-hidden="true" />
          <span className="rail__tick-label" aria-hidden="true">
            {String(chapter.index).padStart(2, '0')} · {chapter.title}
          </span>
        </button>
      ))}
    </nav>
  );
}
