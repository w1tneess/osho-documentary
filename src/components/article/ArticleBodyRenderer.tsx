'use client';

import React, { useMemo } from 'react';
import { SectionHeading } from './SectionHeading';
import { CitationCard, CitationData } from './CitationCard';
import { ClaimCard, ClaimLevel } from './ClaimCard';
import { GlossaryPopover } from './GlossaryPopover';
import { ArchivalFigure } from './ArchivalFigure';
import { PerspectiveLens, type Perspective } from './PerspectiveLens';
import { WarningBanner, SourceGap, FactCard } from './Callouts';
import type { SourceItem, GlossaryItem } from '@/lib/types';
import { slugifyHeading } from '@/lib/slugify';
import {
  extractBlocks,
  parseAttributes,
  parseJsLiteral,
  sanitizeArticleSource,
  stripTags,
  type ArticleBlock,
} from '@/lib/mdxLite';

interface ArticleBodyRendererProps {
  content: string;
  citations: CitationData[];
  sourcesMap: Record<string, SourceItem>;
  glossaryMap: Record<string, GlossaryItem>;
}

interface RenderContext {
  citationMap: Map<string, CitationData>;
  sourcesMap: Record<string, SourceItem>;
  glossaryMap: Record<string, GlossaryItem>;
}

const CLAIM_LEVELS: ClaimLevel[] = ['established', 'reported', 'disputed', 'alleged', 'interpretation'];

// ---------------------------------------------------------------------------
// Inline rendering
// ---------------------------------------------------------------------------

const MARKDOWN_INLINE =
  /(\*\*([^*]+)\*\*|__([^_]+)__|\*([^*\s][^*]*?)\*|(?<!\w)_([^_\s][^_]*?)_(?!\w)|\[([^\]]+)\]\((https?:\/\/[^)\s]+|\/[^)\s]*)\))/g;

/** Bold / italic / links inside plain prose. */
function renderMarkdown(text: string, keyBase: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  const re = new RegExp(MARKDOWN_INLINE.source, 'g');

  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const key = `${keyBase}-md-${m.index}`;
    if (m[2] !== undefined || m[3] !== undefined) {
      out.push(<strong key={key}>{renderMarkdown(m[2] ?? m[3], key)}</strong>);
    } else if (m[4] !== undefined || m[5] !== undefined) {
      out.push(<em key={key}>{renderMarkdown(m[4] ?? m[5], key)}</em>);
    } else if (m[6] !== undefined) {
      const external = m[7].startsWith('http');
      out.push(
        <a
          key={key}
          href={m[7]}
          className="text-[var(--color-accent)] underline underline-offset-2 hover:no-underline"
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {m[6]}
        </a>
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

const INLINE_TOKEN =
  /<Claim\s+([^>]*)>([\s\S]*?)<\/Claim>|<Cite\s+([^>]*?)\/>|<GlossaryTerm\s+([^>]*?)\/>|<a\s+([^>]*)>([\s\S]*?)<\/a>/g;

/** MDX inline tokens (Claim, Cite, GlossaryTerm, raw anchors) plus markdown. */
function renderInline(text: string, ctx: RenderContext, keyBase: string): React.ReactNode[] {
  const elements: React.ReactNode[] = [];
  const re = new RegExp(INLINE_TOKEN.source, 'g');
  let last = 0;
  let m: RegExpExecArray | null;

  while ((m = re.exec(text)) !== null) {
    if (m.index > last) elements.push(...renderMarkdown(text.slice(last, m.index), `${keyBase}-t${last}`));
    const key = `${keyBase}-${m.index}`;

    if (m[1] !== undefined) {
      const { attrs, exprs } = parseAttributes(m[1]);
      const level = (attrs.level || 'established').toLowerCase() as ClaimLevel;
      const parsed = exprs.cite ? parseJsLiteral(exprs.cite) : undefined;
      const citeIds = Array.isArray(parsed)
        ? parsed.filter((v): v is string => typeof v === 'string')
        : exprs.cite
          ? exprs.cite
              .replace(/[[\]'"]/g, '')
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean)
          : [];
      elements.push(
        <ClaimCard
          key={key}
          level={CLAIM_LEVELS.includes(level) ? level : 'established'}
          sources={citeIds.map((id) => ctx.sourcesMap[id]).filter(Boolean)}
          citeIds={citeIds}
        >
          {renderInline(m[2].trim(), ctx, key)}
        </ClaimCard>
      );
    } else if (m[3] !== undefined) {
      const id = parseAttributes(m[3]).attrs.id;
      if (id) {
        const citation: CitationData = ctx.citationMap.get(id) ?? {
          num: ctx.citationMap.size + 1,
          id,
          title: `Archive Document: ${id}`,
          author: 'Archival Record',
          type: 'court',
        };
        elements.push(<CitationCard key={key} citation={citation} />);
      }
    } else if (m[4] !== undefined) {
      const { id, text: label } = parseAttributes(m[4]).attrs;
      if (label) {
        const item = (id && ctx.glossaryMap[id]) || ctx.glossaryMap[label.toLowerCase()];
        elements.push(<GlossaryPopover key={key} term={label} item={item} id={id} />);
      }
    } else if (m[5] !== undefined) {
      const { href } = parseAttributes(m[5]).attrs;
      const safe = href && /^(https?:\/\/|\/)/.test(href) ? href : undefined;
      const external = !!safe && safe.startsWith('http');
      elements.push(
        <a
          key={key}
          href={safe}
          className="text-[var(--color-accent)] underline underline-offset-2 hover:no-underline"
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {renderMarkdown(stripTags(m[6]), key)}
        </a>
      );
    }
    last = m.index + m[0].length;
  }

  if (last < text.length) elements.push(...renderMarkdown(text.slice(last), `${keyBase}-t${last}`));
  return elements;
}

// ---------------------------------------------------------------------------
// Block rendering
// ---------------------------------------------------------------------------

const LIST_ITEM = /^\s*(?:([-*])|(\d+)[.)])\s+(.*)$/;

function renderParagraph(para: string, ctx: RenderContext, key: string): React.ReactNode {
  // Archival figure (self-closing tag, may span lines)
  const figure = /<ArchivalFigure\b([\s\S]*?)\/>/.exec(para);
  if (figure) {
    const { attrs } = parseAttributes(figure[1]);
    if (attrs.src) {
      return (
        <ArchivalFigure
          key={key}
          src={attrs.src}
          alt={attrs.alt || 'Archival photograph'}
          caption={attrs.caption || ''}
          year={attrs.year}
          location={attrs.location}
          archiveRef={attrs.archiveRef}
          sourceCredit={attrs.sourceCredit}
          sourceUrl={attrs.sourceUrl}
        />
      );
    }
  }

  // Standard markdown image
  const image = /^!\[([^\]]*)\]\(([^)\s]+)\)$/.exec(para);
  if (image) {
    return (
      <ArchivalFigure
        key={key}
        src={image[2]}
        alt={image[1] || 'Archival record photograph'}
        caption={image[1] || 'Archival record photograph'}
      />
    );
  }

  const heading = /^(#{2,3})\s+(.+)$/.exec(para);
  if (heading) {
    const text = heading[2].trim();
    return (
      <SectionHeading key={key} level={heading[1].length === 2 ? 2 : 3} id={slugifyHeading(text)}>
        {text}
      </SectionHeading>
    );
  }

  const lines = para.split('\n');

  // Hatnote
  if (/^>?\s*Hatnote:/.test(lines[0])) {
    const note = para.replace(/^>?\s*Hatnote:\s*/, '').replace(/\n>?\s*/g, ' ');
    return (
      <div
        key={key}
        className="not-prose my-4 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3.5 font-mono text-xs italic text-[var(--color-text-secondary)]"
      >
        ℹ {renderInline(note, ctx, key)}
      </div>
    );
  }

  // Blockquote: every line begins with ">"
  if (lines.every((l) => l.trim().startsWith('>'))) {
    const body = lines
      .map((l) => l.replace(/^\s*>\s?/, '').trim())
      .filter(Boolean)
      .join(' ');
    if (!body) return null;
    return (
      <blockquote
        key={key}
        className="not-prose my-8 rounded-r-2xl border-y border-r border-l-4 border-amber-500/10 border-l-amber-500 bg-amber-500/[0.04] py-3 pl-5 pr-4 font-serif text-lg italic leading-relaxed text-[var(--color-text)] md:text-xl"
      >
        {renderInline(body, ctx, key)}
      </blockquote>
    );
  }

  // Mixed prose / list lines
  const nodes: React.ReactNode[] = [];
  let textBuf: string[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;

  const flushText = () => {
    if (textBuf.length === 0) return;
    const joined = textBuf.join(' ').replace(/\s+/g, ' ').trim();
    if (joined) {
      nodes.push(
        <p key={`${key}-p${nodes.length}`} className="leading-relaxed">
          {renderInline(joined, ctx, `${key}-p${nodes.length}`)}
        </p>
      );
    }
    textBuf = [];
  };

  const flushList = () => {
    if (!list) return;
    const ListTag = list.ordered ? 'ol' : 'ul';
    const k = `${key}-l${nodes.length}`;
    nodes.push(
      <ListTag
        key={k}
        className={`my-2 space-y-2 pl-6 leading-relaxed ${list.ordered ? 'list-decimal' : 'list-disc'} marker:text-[var(--color-accent)]`}
      >
        {list.items.map((item, idx) => (
          <li key={`${k}-${idx}`}>{renderInline(item, ctx, `${k}-${idx}`)}</li>
        ))}
      </ListTag>
    );
    list = null;
  };

  for (const line of lines) {
    const item = LIST_ITEM.exec(line);
    if (item) {
      flushText();
      const ordered = item[2] !== undefined;
      if (list && list.ordered !== ordered) flushList();
      if (!list) list = { ordered, items: [] };
      list.items.push(item[3].trim());
    } else if (list && /^\s+\S/.test(line)) {
      list.items[list.items.length - 1] += ` ${line.trim()}`;
    } else {
      flushList();
      textBuf.push(line.trim());
    }
  }
  flushText();
  flushList();

  return nodes.length === 1 ? nodes[0] : <React.Fragment key={key}>{nodes}</React.Fragment>;
}

/** Renders a run of prose, protecting multi-line <Claim> tags from paragraph splitting. */
function renderProse(text: string, ctx: RenderContext, keyBase: string): React.ReactNode[] {
  const prepared = text
    .replace(/<Claim[\s\S]*?<\/Claim>/g, (m) => m.replace(/\n[ \t]*\n/g, '\n'))
    .replace(/^(#{2,3} .+)$/gm, '\n$1\n');

  return prepared
    .split(/\n[ \t]*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p, i) => renderParagraph(p, ctx, `${keyBase}-${i}`));
}

function toPerspectives(expr: string | undefined, inner: string): Perspective[] | undefined {
  const parsed = expr ? parseJsLiteral(expr) : undefined;
  if (!Array.isArray(parsed)) return undefined;

  const details: Record<string, string> = {};
  for (const slot of inner.matchAll(/<div\s+slot="([^"]+)"[^>]*>([\s\S]*?)<\/div>/g)) {
    details[slot[1]] = stripTags(slot[2]);
  }

  const items: Perspective[] = [];
  for (const raw of parsed) {
    if (!raw || typeof raw !== 'object') continue;
    const p = raw as Record<string, unknown>;
    if (typeof p.id !== 'string' || typeof p.name !== 'string' || typeof p.summary !== 'string') continue;
    items.push({
      id: p.id,
      name: p.name,
      summary: p.summary,
      sourceType: typeof p.sourceType === 'string' ? p.sourceType : 'source',
      detail: details[p.id] || undefined,
    });
  }
  return items.length > 0 ? items : undefined;
}

function renderBlock(block: ArticleBlock, ctx: RenderContext, key: string): React.ReactNode {
  if (block.kind === 'text') return <React.Fragment key={key}>{renderProse(block.text, ctx, key)}</React.Fragment>;

  const body = () => renderProse(block.inner.trim(), ctx, `${key}-in`);

  switch (block.name) {
    case 'WarningBanner':
      return (
        <WarningBanner key={key} level={block.attrs.level} title={block.attrs.title}>
          {body()}
        </WarningBanner>
      );
    case 'SourceGap':
      return (
        <SourceGap key={key} title={block.attrs.title} reason={block.attrs.reason}>
          {body()}
        </SourceGap>
      );
    case 'FactCard':
      return (
        <FactCard key={key} title={block.attrs.title} variant={block.attrs.variant}>
          {body()}
        </FactCard>
      );
    case 'PerspectiveLens':
      return (
        <PerspectiveLens
          key={key}
          title={block.attrs.title}
          topicId={block.attrs.topicId}
          perspectives={toPerspectives(block.exprs.perspectives, block.inner)}
        />
      );
    default:
      return null;
  }
}

export function ArticleBodyRenderer({
  content,
  citations,
  sourcesMap,
  glossaryMap,
}: ArticleBodyRendererProps) {
  const blocks = useMemo(() => extractBlocks(sanitizeArticleSource(content)), [content]);
  const ctx = useMemo<RenderContext>(
    () => ({
      citationMap: new Map(citations.map((c) => [c.id, c])),
      sourcesMap,
      glossaryMap,
    }),
    [citations, sourcesMap, glossaryMap]
  );

  return <div className="space-y-6">{blocks.map((b, i) => renderBlock(b, ctx, `b${i}`))}</div>;
}
