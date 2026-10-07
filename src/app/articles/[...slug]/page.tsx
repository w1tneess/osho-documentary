import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllArticles, getArticleBySlug } from '@/lib/articles';
import { getAllSources, getAllGlossary, SourceItem, GlossaryItem } from '@/lib/contentData';
import { processArticleContent } from '@/lib/articleProcessor';
import { ArrowLeft, Clock, ShieldCheck, BookOpen, Bookmark } from 'lucide-react';
import { ArticleClientWrapper } from '@/components/article/ArticleClientWrapper';
import { TableOfContents } from '@/components/article/TableOfContents';
import { Infobox } from '@/components/article/Infobox';
import { ArticleBodyRenderer } from '@/components/article/ArticleBodyRenderer';
import { ReferencesList } from '@/components/article/ReferencesList';
import { ArticleAuditDrawer } from '@/components/article/ArticleAuditDrawer';
import { PerspectiveLens } from '@/components/article/PerspectiveLens';

interface ArticlePageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((a) => ({
    slug: a.slug.split('/'),
  }));
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const resolvedParams = await params;
  const slugPath = resolvedParams.slug.join('/');
  const article = getArticleBySlug(slugPath);

  if (!article) {
    notFound();
  }

  const allArticles = getAllArticles();
  const currentIndex = allArticles.findIndex((a) => a.slug === article.slug);
  const nextArticle =
    currentIndex >= 0 && currentIndex < allArticles.length - 1
      ? allArticles[currentIndex + 1]
      : allArticles[0];

  const sources = getAllSources();
  const sourcesMap: Record<string, SourceItem> = {};
  sources.forEach((s) => {
    sourcesMap[s.id] = s;
  });

  // Process data from content
  const processed = processArticleContent(article.content, sources);

  const glossary = getAllGlossary();
  const glossaryMap: Record<string, GlossaryItem> = {};
  glossary.forEach((g) => {
    glossaryMap[g.id] = g;
    glossaryMap[g.term.toLowerCase()] = g;
  });

  const hasPerspectiveLensInContent = article.content.includes('<PerspectiveLens');
  const showPerspectiveLens =
    !hasPerspectiveLensInContent &&
    (article.slug.includes('bioterror') ||
      article.slug.includes('final-years') ||
      article.slug.includes('group-therapies'));

  // Related articles from seeAlso
  const seeAlsoArticles = (article.seeAlso || [])
    .map((s) => getArticleBySlug(s))
    .filter(Boolean);

  return (
    <article className="max-w-6xl mx-auto px-4 py-8 sm:py-12 pb-32 sm:pb-16">
      {/* Back to Archive Pillar & Breadcrumbs */}
      <div className="mb-8 flex items-center justify-between">
        <Link
          href={`/${article.category.toLowerCase()}`}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 hover:text-amber-600 no-underline transition-colors min-h-[44px]"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to {article.category} Archives
        </Link>
        <span className="text-xs font-mono text-neutral-400">
          Archival Dossier • {article.category} Section
        </span>
      </div>

      {/* Header */}
      <header className="mb-10 border-b border-neutral-200 dark:border-neutral-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="px-3 py-1 text-[11px] font-mono uppercase tracking-widest font-semibold rounded-sm bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
            Dossier: {article.category}
          </span>
          <span className="text-xs font-mono text-neutral-500 flex items-center gap-1">
            <Clock className="w-3 h-3" /> {processed.readingTimeMinutes} min read ({processed.wordCount} words)
          </span>
          <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> {processed.citations.length} Verified Sources
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-serif font-bold text-neutral-950 dark:text-neutral-50 mb-6 tracking-tight leading-[1.05]">
          {article.title}
        </h1>

        <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed max-w-3xl">
          {article.summary}
        </p>

        {article.lastReviewed && (
          <div className="mt-6 text-xs font-mono text-neutral-400">
            Archival Record Last Reviewed: {article.lastReviewed} • Impartial Peer Review
          </div>
        )}
      </header>

      {/* Main 2-Column Grid: Body (with Infobox) + Sticky TOC */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left / Center Body Column */}
        <div className="lg:col-span-9">
          {/* Mobile TOC */}
          <div className="lg:hidden">
            <TableOfContents headings={processed.headings} variant="mobile" />
          </div>

          {/* Reader Client Wrapper with progress & comfort controls */}
          <ArticleClientWrapper
            slug={article.slug}
            title={article.title}
            category={article.category}
          >
            {/* Wikipedia-Style Infobox */}
            <Infobox
              title={article.title}
              subtitle={article.summary}
              category={article.category}
              era={
                article.slug.includes('early')
                  ? '1931–1970'
                  : article.slug.includes('pune')
                  ? '1974–1981'
                  : article.slug.includes('rajneeshpuram') || article.slug.includes('bioterror')
                  ? '1981–1985'
                  : '1985–1990'
              }
              locations={
                article.slug.includes('rajneeshpuram') || article.slug.includes('bioterror')
                  ? ['Wasco County, Oregon', 'The Dalles', 'Antelope']
                  : article.slug.includes('pune')
                  ? ['Koregaon Park, Pune, India']
                  : ['Madhya Pradesh', 'Mumbai', 'Pune']
              }
              keyFigures={
                article.slug.includes('bioterror')
                  ? ['Bhagwan Shree Rajneesh', 'Ma Anand Sheela', 'U.S. Attorney Charles Turner']
                  : ['Bhagwan Shree Rajneesh', 'Ma Yoga Laxmi', 'Ma Anand Sheela']
              }
              evidenceLevel="Tier 1 (Court Record)"
            />

            {/* Prose Content */}
            <ArticleBodyRenderer
              content={article.content}
              citations={processed.citations}
              sourcesMap={sourcesMap}
              glossaryMap={glossaryMap}
            />

            {/* Perspective Lens for Disputed / Controversy Articles */}
            {showPerspectiveLens && (
              <PerspectiveLens
                title={`Evidence Inquiry: Historical Perspectives on ${article.title}`}
              />
            )}

            {/* See Also Hatnotes & Cards */}
            {seeAlsoArticles.length > 0 && (
              <div className="my-12 p-6 rounded-sm bg-neutral-100/50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 not-prose">
                <div className="text-xs font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold mb-3 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5" /> See Also in the Documentary Archive
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {seeAlsoArticles.map((rel) =>
                    rel ? (
                      <Link
                        key={rel.slug}
                        href={`/articles/${rel.slug}`}
                        className="p-3.5 rounded-sm bg-white dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700/60 hover:border-amber-500 transition-colors group no-underline"
                      >
                        <div className="font-serif font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-amber-600 transition-colors text-sm">
                          {rel.title}
                        </div>
                        <p className="text-xs text-neutral-500 line-clamp-2 mt-1">
                          {rel.summary}
                        </p>
                      </Link>
                    ) : null
                  )}
                </div>
              </div>
            )}

            {/* References Section */}
            <ReferencesList citations={processed.citations} />

            {/* Forensic Transparency Drawer */}
            <ArticleAuditDrawer
              title={article.title}
              slug={article.slug}
              sourceCount={processed.citations.length}
              claimCounts={processed.claimCounts}
              wordCount={processed.wordCount}
              readingTimeMinutes={processed.readingTimeMinutes}
              lastReviewed={article.lastReviewed}
            />
          </ArticleClientWrapper>

          {/* Up Next Recommendation Dossier */}
          {nextArticle && (
            <div className="mt-16 double-bezel not-prose">
              <div className="double-bezel-inner p-8 sm:p-10 rounded-sm">
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--color-accent)] font-bold mb-2">
                  Continue The Investigation
                </div>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-[var(--color-text)] mb-3">
                  Up Next: {nextArticle.title}
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] font-sans mb-6 line-clamp-2 max-w-2xl leading-relaxed">
                  {nextArticle.summary}
                </p>
                <Link
                  href={`/articles/${nextArticle.slug}`}
                  className="group inline-flex items-center gap-4 px-6 py-3 rounded-sm bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 text-xs font-mono font-semibold uppercase tracking-wider no-underline transition-all duration-300 hover:opacity-90 shadow-sm"
                >
                  <span>Read Next Dossier</span>
                  <ArrowLeft className="w-3.5 h-3.5 rotate-180 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          )}

          {/* Footer Navigation */}
          <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <Link
              href={`/${article.category.toLowerCase()}`}
              className="text-sm font-mono text-amber-600 dark:text-amber-400 hover:underline no-underline min-h-[44px] flex items-center"
            >
              ← Return to {article.category} Section
            </Link>
            <Link
              href="/sources"
              className="text-sm font-mono text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 no-underline min-h-[44px] flex items-center"
            >
              Examine Cited Bibliography →
            </Link>
          </div>
        </div>

        {/* Right Sticky Sidebar (TOC) on Desktop */}
        <aside className="hidden lg:block lg:col-span-3">
          <TableOfContents headings={processed.headings} variant="desktop" />
        </aside>
      </div>
    </article>
  );
}
