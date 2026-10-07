import type { SourceItem } from './types';
import { slugifyHeading } from './slugify';
import { sanitizeArticleSource, stripTags } from './mdxLite';
import type { TocHeading } from '@/components/article/TableOfContents';
import type { CitationData } from '@/components/article/CitationCard';
import type { ClaimLevel } from '@/components/article/ClaimCard';

export interface ProcessedArticleData {
  headings: TocHeading[];
  citations: CitationData[];
  claimCounts: {
    established: number;
    reported: number;
    disputed: number;
    alleged: number;
    interpretation: number;
  };
  wordCount: number;
  readingTimeMinutes: number;
}

export { slugifyHeading };

export function processArticleContent(
  rawContent: string,
  sources: SourceItem[] = []
): ProcessedArticleData {
  const sourcesMap = new Map<string, SourceItem>();
  sources.forEach((s) => sourcesMap.set(s.id, s));

  // Extract headings
  const headings: TocHeading[] = [];
  const lines = sanitizeArticleSource(rawContent).split('\n');

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('## ')) {
      const title = trimmed.replace(/^## /, '').trim();
      headings.push({
        id: slugifyHeading(title),
        title,
        level: 2,
      });
    } else if (trimmed.startsWith('### ')) {
      const title = trimmed.replace(/^### /, '').trim();
      headings.push({
        id: slugifyHeading(title),
        title,
        level: 3,
      });
    }
  }

  // Extract citations sequentially
  const citations: CitationData[] = [];
  const citedIds = new Set<string>();
  const citeRegex = /<Cite\s+id="([^"]+)"\s*\/>/g;
  let match: RegExpExecArray | null;

  while ((match = citeRegex.exec(rawContent)) !== null) {
    const id = match[1];
    if (!citedIds.has(id)) {
      citedIds.add(id);
      const source = sourcesMap.get(id);
      citations.push({
        num: citations.length + 1,
        id,
        title: source ? source.title : `Archive Document: ${id}`,
        author: source ? source.author : 'Archival Record',
        year: source ? source.year : undefined,
        publisher: source ? source.publisher : undefined,
        type: source ? source.type : 'court',
        notes: source ? source.notes : undefined,
        url: source ? source.url : undefined,
      });
    }
  }

  // Count claims
  const claimCounts = {
    established: 0,
    reported: 0,
    disputed: 0,
    alleged: 0,
    interpretation: 0,
  };

  const claimRegex = /<Claim\s+level="([^"]+)"/g;
  while ((match = claimRegex.exec(rawContent)) !== null) {
    const level = match[1].toLowerCase() as ClaimLevel;
    if (level in claimCounts) {
      claimCounts[level]++;
    }
  }

  // Word count & reading time
  const cleanWords = stripTags(
    sanitizeArticleSource(rawContent)
      .replace(/^#{1,6}\s+/gm, '')
      .replace(/[*_>`]/g, '')
  ).split(/\s+/);
  const wordCount = cleanWords.filter(Boolean).length;
  const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  return {
    headings,
    citations,
    claimCounts,
    wordCount,
    readingTimeMinutes,
  };
}
