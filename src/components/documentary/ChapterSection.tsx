import type { ChapterContent } from '../../content/types';
import { BlockRenderer } from './BlockRenderer';

interface ChapterSectionProps {
  chapter: ChapterContent;
}

/**
 * A single chapter section of the documentary.
 * Contains a text veil for readability over the 3D canvas,
 * and renders all blocks with staggered reveal delays.
 */
export function ChapterSection({ chapter }: ChapterSectionProps) {
  return (
    <section
      className="chapter-section"
      id={`chapter-${chapter.slug}`}
      aria-label={`Chapter ${chapter.index}: ${chapter.title}`}
    >
      <div className="chapter-inner">
        <div className="text-veil">
          {chapter.blocks.map((block, i) => (
            <BlockRenderer
              key={`${chapter.id}-block-${i}`}
              block={block}
              delay={i * 60}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
