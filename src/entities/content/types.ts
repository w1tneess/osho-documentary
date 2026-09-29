/**
 * The documentary content model.
 *
 * Two rules govern this file:
 *
 * 1. PROVENANCE IS EXPLICIT. `evidence` marks whether a block is a fact drawn
 *    from the record, a quotation, or the documentary's own analysis. The UI
 *    renders a mark only when the content declares one — it never invents a
 *    label the source does not support.
 *
 * 2. IMAGES HAVE ROLES. An archival image is documentary material, so it is
 *    never left to fill whatever column it lands in. `role` declares its box
 *    and its proportion: a portrait is narrow and tall, a landscape is wide and
 *    bounded, a detail is small and close, a bleed is the one image in a
 *    chapter allowed to run the full measure.
 */

/** How a claim should be read, where the source makes that distinction. */
export type EvidenceKind =
  | 'fact'
  | 'quote'
  | 'analysis'
  | 'argument'
  | 'conclusion'
  | 'reference';

/**
 * Where a beat sits in the frame, and therefore where the 3D subject sits too.
 * The score in `config/chapters.ts` carries the same values; these drive the
 * DOM, the score drives the camera, and the two are authored together.
 */
export type Composition = 'left' | 'right' | 'center';

export type EditorialLayoutMode =
  | 'left'
  | 'right'
  | 'center'
  | 'quote'
  | 'statement'
  | 'split'
  | 'timeline';

/** Image roles. See note 2 above. */
export type ImageRole = 'portrait' | 'landscape' | 'plate' | 'detail' | 'bleed';

export interface HeadingBlock {
  type: 'heading';
  /** Section label printed above the title. */
  eyebrow?: string;
  title: string;
  body?: string;
  evidence?: EvidenceKind;
}

export interface ParagraphBlock {
  type: 'paragraph';
  body: string;
  /** Marks the paragraph as the opening statement of its beat. */
  lede?: boolean;
  evidence?: EvidenceKind;
}

export interface QuoteBlock {
  type: 'quote';
  text: string;
  attribution?: string;
  source?: string;
  evidence?: EvidenceKind;
}

export interface AnalysisBlock {
  type: 'analysis';
  label?: string;
  body: string;
  evidence?: EvidenceKind;
}

export interface StatementBlock {
  type: 'statement';
  body: string;
  evidence?: EvidenceKind;
}

export interface TimelineItem {
  year: string;
  event: string;
}

export interface TimelineBlock {
  type: 'timeline';
  items: TimelineItem[];
  evidence?: EvidenceKind;
}

export interface ReferenceBlock {
  type: 'reference';
  citation: string;
  url?: string;
}

export interface ImageBlock {
  type: 'image';
  src: string;
  alt: string;
  /**
   * Declares the box and proportion. Required — there is no default role, and
   * an image without one has no size of its own and would simply fill whatever
   * column it landed in.
   */
  role: ImageRole;
  caption?: string;
  year?: string;
  location?: string;
  archiveSource?: string;
  evidence?: EvidenceKind;
}

export type DocumentaryBlock =
  | HeadingBlock
  | ParagraphBlock
  | QuoteBlock
  | AnalysisBlock
  | StatementBlock
  | TimelineBlock
  | ReferenceBlock
  | ImageBlock;

/** One narrative moment, occupying one composed band. */
export interface DocumentaryBeat {
  id: string;
  chapterId: string;
  layoutMode: EditorialLayoutMode;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  blocks: DocumentaryBlock[];
}

export interface ChapterContent {
  id: string;
  index: number;
  slug: string;
  title: string;
  subtitle?: string;
  /** Which third the 3D subject occupies while this chapter is on screen. */
  composition: Composition;
  beats: DocumentaryBeat[];
}

export interface DocumentaryData {
  intro: DocumentaryBlock[];
  chapters: ChapterContent[];
  epilogue: DocumentaryBlock[];
  references: ReferenceBlock[];
}
