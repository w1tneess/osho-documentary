import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export interface ArticleMetadata {
  slug: string;
  category: string;
  fileSlug: string;
  title: string;
  summary: string;
  lastReviewed?: string;
  seeAlso?: string[];
  content: string;
}

const ARTICLES_DIR = path.join(process.cwd(), 'src/content/articles');

function toSafePathSegment(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9_-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^[-_]+|[-_]+$/g, '');
}

let cache: ArticleMetadata[] | null = null;

export function getAllArticles(): ArticleMetadata[] {
  if (cache && process.env.NODE_ENV === 'production') return cache;
  if (!fs.existsSync(ARTICLES_DIR)) return [];

  const articles: ArticleMetadata[] = [];
  const categories = fs.readdirSync(ARTICLES_DIR).sort();

  for (const cat of categories) {
    const catPath = path.join(ARTICLES_DIR, cat);
    if (!fs.statSync(catPath).isDirectory()) continue;

    const files = fs
      .readdirSync(catPath)
      .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
      .sort();
    for (const file of files) {
      const filePath = path.join(catPath, file);
      const raw = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(raw);
      const fileSlug = file.replace(/\.mdx?$/, '');
      const safeCategory = toSafePathSegment(cat);
      const safeFileSlug = toSafePathSegment(fileSlug);

      articles.push({
        slug: `${safeCategory}/${safeFileSlug}`,
        category: safeCategory,
        fileSlug: safeFileSlug,
        title: data.title || fileSlug,
        summary: data.summary || '',
        lastReviewed: data.lastReviewed || '',
        seeAlso: Array.isArray(data.seeAlso) ? data.seeAlso : [],
        content,
      });
    }
  }

  cache = articles;
  return articles;
}

export function getArticlesByCategory(category: string): ArticleMetadata[] {
  return getAllArticles().filter((a) => a.category.toLowerCase() === category.toLowerCase());
}

export function getArticleBySlug(slugPath: string): ArticleMetadata | null {
  const normalized = slugPath.replace(/^\/+|\/+$/g, '');
  return getAllArticles().find((a) => a.slug === normalized) || null;
}
