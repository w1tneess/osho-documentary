import type { EditorialLayoutMode } from '../../entities/content/types';

/**
 * The bridge between the DOM's layout vocabulary and the 3D score's.
 *
 * A beat declares an editorial intent (`quote`, `split`, `timeline`); that
 * intent has to become a spatial decision — "text left, subject right". Doing
 * the translation in one table means the editorial column and the 3D subject
 * can never disagree about which side of the frame they occupy.
 *
 * This is the DOM half of the composition contract. The score in
 * `config/chapters.ts` is the camera half, and chapter-level composition is
 * authored in the same terms.
 */

export type BeatComposition = 'left' | 'right' | 'center';

export const BLOCK_COMPOSITION: Record<EditorialLayoutMode, BeatComposition> = {
  left: 'left',
  right: 'right',
  center: 'center',
  // Held moments take the whole frame: the page is the composition.
  quote: 'center',
  statement: 'center',
  // A comparative beat needs the middle: two columns cannot live in a third.
  split: 'center',
  timeline: 'left',
};

/** Layout modes whose blocks are set in two columns with a rule between them. */
export const TWO_COLUMN_MODES = new Set<EditorialLayoutMode>(['split']);
