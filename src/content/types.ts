// Content type definitions for the Osho Documentary
// Defines the structured content model for the documentary data based on PRD, TRD, and DESIGN.md.

export type EvidenceKind =
  | 'fact'
  | 'quote'
  | 'analysis'
  | 'argument'
  | 'conclusion'
  | 'reference';

export type EditorialLayoutMode =
  | 'left'
  | 'right'
  | 'quote'
  | 'split'
  | 'statement'
  | 'center'
  | 'timeline';

export interface HeadingBlock {
  type: 'heading';
  eyebrow?: string;
  title: string;
  body?: string;
  evidence?: EvidenceKind;
}

export interface ParagraphBlock {
  type: 'paragraph';
  body: string;
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
  evidence?: EvidenceKind;
}

export type DocumentaryBlock =
  | HeadingBlock
  | ParagraphBlock
  | QuoteBlock
  | AnalysisBlock
  | StatementBlock
  | TimelineBlock
  | ReferenceBlock;

/**
 * A Documentary Beat represents one focused narrative moment / camera shot.
 * Maps 1:1 with an editorial composition (0.8 - 1.2 viewport heights).
 */
export interface DocumentaryBeat {
  id: string;
  chapterId: string;
  layoutMode: EditorialLayoutMode;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  blocks: DocumentaryBlock[];
  focalTarget?: string;
}

export interface ChapterContent {
  id: string;
  index: number;
  slug: string;
  title: string;
  subtitle?: string;
  beats: DocumentaryBeat[];
  blocks: DocumentaryBlock[];
}

export interface DocumentaryData {
  intro: DocumentaryBlock[];
  chapters: ChapterContent[];
  epilogue: DocumentaryBlock[];
  references: ReferenceBlock[];
}
