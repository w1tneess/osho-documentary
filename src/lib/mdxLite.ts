/**
 * Minimal, dependency-free helpers for the article pipeline.
 * They understand just enough MDX to split an article into prose and the
 * handful of block components used in `src/content/articles`, and to parse
 * JSX props (including JS object literals) without ever using `eval`.
 */

export const BLOCK_COMPONENTS = ['WarningBanner', 'SourceGap', 'FactCard', 'PerspectiveLens'] as const;
export type BlockComponentName = (typeof BLOCK_COMPONENTS)[number];

export type ArticleBlock =
  | { kind: 'text'; text: string }
  | {
      kind: 'component';
      name: BlockComponentName;
      attrs: Record<string, string>;
      exprs: Record<string, string>;
      inner: string;
    };

/** Index of the `>` that closes an opening tag, ignoring `>` inside quotes or `{}`. */
function findOpenTagEnd(src: string, from: number): number {
  let depth = 0;
  let quote: string | null = null;
  for (let i = from; i < src.length; i++) {
    const c = src[i];
    if (quote) {
      if (c === '\\') i++;
      else if (c === quote) quote = null;
      continue;
    }
    if (c === '"' || c === "'") quote = c;
    else if (c === '{') depth++;
    else if (c === '}') depth--;
    else if (c === '>' && depth === 0) return i;
  }
  return -1;
}

/** Parses the attribute text found between a tag name and its closing `>`. */
export function parseAttributes(raw: string): {
  attrs: Record<string, string>;
  exprs: Record<string, string>;
} {
  const attrs: Record<string, string> = {};
  const exprs: Record<string, string> = {};
  let i = 0;
  const n = raw.length;

  while (i < n) {
    while (i < n && /[\s/]/.test(raw[i])) i++;
    const nameMatch = /^[\w:-]+/.exec(raw.slice(i));
    if (!nameMatch) break;
    const name = nameMatch[0];
    i += name.length;
    if (raw[i] !== '=') {
      attrs[name] = 'true';
      continue;
    }
    i++;
    const c = raw[i];
    if (c === '"' || c === "'") {
      const end = raw.indexOf(c, i + 1);
      const stop = end === -1 ? n : end;
      attrs[name] = raw.slice(i + 1, stop);
      i = stop + 1;
    } else if (c === '{') {
      let depth = 0;
      let quote: string | null = null;
      let j = i;
      for (; j < n; j++) {
        const ch = raw[j];
        if (quote) {
          if (ch === '\\') j++;
          else if (ch === quote) quote = null;
          continue;
        }
        if (ch === '"' || ch === "'") quote = ch;
        else if (ch === '{') depth++;
        else if (ch === '}') {
          depth--;
          if (depth === 0) break;
        }
      }
      exprs[name] = raw.slice(i + 1, j).trim();
      i = j + 1;
    } else {
      i++;
    }
  }
  return { attrs, exprs };
}

/**
 * Splits content into prose segments and block-level components.
 * Components may span many lines and contain blank lines.
 */
export function extractBlocks(src: string): ArticleBlock[] {
  const blocks: ArticleBlock[] = [];
  const opener = new RegExp(`<(${BLOCK_COMPONENTS.join('|')})(?=[\\s/>])`, 'g');
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = opener.exec(src)) !== null) {
    const name = match[1] as BlockComponentName;
    const tagStart = match.index;
    const attrStart = tagStart + match[0].length;
    const tagEnd = findOpenTagEnd(src, attrStart);
    if (tagEnd === -1) break;

    const selfClosing = src[tagEnd - 1] === '/';
    const rawAttrs = src.slice(attrStart, selfClosing ? tagEnd - 1 : tagEnd);
    const { attrs, exprs } = parseAttributes(rawAttrs);

    let inner = '';
    let blockEnd = tagEnd + 1;
    if (!selfClosing) {
      const close = `</${name}>`;
      const closeIdx = src.indexOf(close, tagEnd + 1);
      if (closeIdx === -1) {
        inner = src.slice(tagEnd + 1);
        blockEnd = src.length;
      } else {
        inner = src.slice(tagEnd + 1, closeIdx);
        blockEnd = closeIdx + close.length;
      }
    }

    if (tagStart > cursor) blocks.push({ kind: 'text', text: src.slice(cursor, tagStart) });
    blocks.push({ kind: 'component', name, attrs, exprs, inner });
    cursor = blockEnd;
    opener.lastIndex = blockEnd;
  }

  if (cursor < src.length) blocks.push({ kind: 'text', text: src.slice(cursor) });
  return blocks;
}

/**
 * Parses a JS literal (objects, arrays, strings, numbers, booleans, null) such as
 * the `perspectives={[...]}` prop. Returns `undefined` when the input is malformed.
 */
export function parseJsLiteral(src: string): unknown {
  let i = 0;
  const fail = (): never => {
    throw new Error(`Unexpected token at ${i}`);
  };
  const ws = () => {
    while (i < src.length && /\s/.test(src[i])) i++;
  };

  const parseString = (): string => {
    const quote = src[i++];
    let out = '';
    while (i < src.length && src[i] !== quote) {
      if (src[i] === '\\') {
        i++;
        const esc = src[i++];
        out += esc === 'n' ? '\n' : esc === 't' ? '\t' : esc;
      } else {
        out += src[i++];
      }
    }
    if (src[i] !== quote) fail();
    i++;
    return out;
  };

  const parseValue = (): unknown => {
    ws();
    const c = src[i];
    if (c === '[') {
      i++;
      const arr: unknown[] = [];
      ws();
      while (src[i] !== ']') {
        if (i >= src.length) fail();
        arr.push(parseValue());
        ws();
        if (src[i] === ',') {
          i++;
          ws();
        } else if (src[i] !== ']') fail();
      }
      i++;
      return arr;
    }
    if (c === '{') {
      i++;
      const obj: Record<string, unknown> = {};
      ws();
      while (src[i] !== '}') {
        if (i >= src.length) fail();
        let key: string;
        if (src[i] === '"' || src[i] === "'") key = parseString();
        else {
          const m = /^[\w$]+/.exec(src.slice(i));
          if (!m) return fail();
          key = m[0];
          i += key.length;
        }
        ws();
        if (src[i] !== ':') fail();
        i++;
        obj[key] = parseValue();
        ws();
        if (src[i] === ',') {
          i++;
          ws();
        } else if (src[i] !== '}') fail();
      }
      i++;
      return obj;
    }
    if (c === '"' || c === "'") return parseString();
    const lit = /^(true|false|null|-?\d+(?:\.\d+)?)/.exec(src.slice(i));
    if (lit) {
      i += lit[0].length;
      return lit[0] === 'true' ? true : lit[0] === 'false' ? false : lit[0] === 'null' ? null : Number(lit[0]);
    }
    return fail();
  };

  try {
    const value = parseValue();
    ws();
    return i === src.length ? value : undefined;
  } catch {
    return undefined;
  }
}

/** Removes imports, JSX whitespace expressions and interactive tags we do not render. */
export function sanitizeArticleSource(content: string): string {
  return content
    .replace(/\r\n/g, '\n')
    .replace(/^import\s+.*$/gm, '')
    .replace(/<(Map|Timeline)\b[^>]*?\/>/g, '')
    .replace(/\{'\s*'\}/g, ' ')
    .replace(
      /<a\s+[^>]*?href="(https?:\/\/[^"\s)]+|\/[^"\s)]*)"[^>]*>([^<]+)<\/a>/g,
      (_m, href: string, label: string) => `[${label.replace(/[[\]]/g, '')}](${href})`
    )
    .replace(/<\/Claim>[ \t]*\n[ \t]*([,.;:!?])/g, '</Claim>$1');
}

/** Flattens inner markup to plain text (used for slot content and word counts). */
export function stripTags(markup: string): string {
  return markup
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
