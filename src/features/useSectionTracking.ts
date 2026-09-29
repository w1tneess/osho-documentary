import type { ChapterContent } from '../entities/content/types';

/** Human label, ordinal and a narrow-bar stand-in for a section index. */
export function describeSection(
  sectionIndex: number,
  chapters: ChapterContent[]
): { label: string; ordinal: string; short: string } {
  if (sectionIndex <= 0) return { label: 'Opening', ordinal: '00', short: 'Opening' };
  if (sectionIndex === 1) return { label: 'Prologue', ordinal: '00', short: 'Prologue' };
  if (sectionIndex <= 1 + chapters.length) {
    const chapter = chapters[sectionIndex - 2];
    if (chapter) {
      return {
        label: chapter.title,
        ordinal: String(chapter.index).padStart(2, '0'),
        // A bare number is a position with no referent, and the full title does
        // not fit in a 390px bar. Two words give the reader something to
        // orient by without turning the bar into a second title.
        short: shortChapterLabel(chapter.title),
      };
    }
  }
  if (sectionIndex === 2 + chapters.length) {
    return { label: 'Conclusion', ordinal: '—', short: 'Conclusion' };
  }
  return { label: 'References', ordinal: '—', short: 'Sources' };
}

/** First two meaningful words of a chapter title, punctuation dropped. */
function shortChapterLabel(title: string): string {
  const words = title
    .replace(/&/g, 'and')
    .split(/[\s:—–-]+/)
    .filter(Boolean);
  const two = words.slice(0, 2).join(' ');
  return two.length > 18 ? words[0] : two;
}
