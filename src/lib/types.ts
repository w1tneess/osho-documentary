export interface SourceItem {
  id: string;
  title: string;
  author: string;
  year?: number;
  publisher?: string;
  type: 'primary' | 'academic' | 'journalism' | 'book' | 'memoir' | 'partisan' | 'court' | 'media';
  url?: string;
  notes?: string;
  credibility?: string;
}

export interface GlossaryItem {
  id: string;
  term: string;
  definition: string;
  aka?: string[];
  cite?: string[];
}

export interface CorrectionItem {
  id: string;
  date: string;
  page: string;
  description: string;
  reason: string;
  cite?: string[];
}

export interface ArticleMetadata {
  slug: string;
  category: string;
  fileSlug: string;
  title: string;
  summary: string;
  lastReviewed?: string;
  seeAlso?: string[];
  content?: string;
}
