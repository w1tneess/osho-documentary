// Content type definitions for the Osho Documentary
// These types define the structured content model for the documentary data.

export type EvidenceKind =
  | 'fact'
  | 'quote'
  | 'analysis'
  | 'argument'
  | 'conclusion'
  | 'reference';

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

export interface ChapterContent {
  id: string;
  index: number;
  slug: string;
  title: string;
  subtitle?: string;
  blocks: DocumentaryBlock[];
}

export interface DocumentaryData {
  intro: DocumentaryBlock[];
  chapters: ChapterContent[];
  epilogue: DocumentaryBlock[];
  references: ReferenceBlock[];
}
