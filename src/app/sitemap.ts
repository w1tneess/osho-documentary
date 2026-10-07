import { MetadataRoute } from 'next';
import { getAllArticles } from '@/lib/articles';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://osho-documentary.vercel.app';
  const now = new Date();

  const staticRoutes = [
    '',
    '/life',
    '/teachings',
    '/movement',
    '/controversies',
    '/legacy',
    '/timeline',
    '/gallery',
    '/map',
    '/sources',
    '/method',
    '/paths',
    '/glossary',
    '/corrections',
    '/about',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const articles = getAllArticles().map((article) => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: article.lastReviewed ? new Date(article.lastReviewed) : now,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...articles];
}
