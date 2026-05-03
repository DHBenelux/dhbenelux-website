#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { remark } from 'remark';
import strip from 'strip-markdown';

const ROOT = process.cwd();
const CONTENT_EVENTS_DIR = path.join(ROOT, 'content', 'events');
const OUTPUT = path.join(ROOT, 'public', 'data', 'search-index.json');

function isMdxOrMd(fileName) {
  return fileName.endsWith('.mdx') || fileName.endsWith('.md');
}

async function listFilesRecursive(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listFilesRecursive(fullPath)));
    } else if (entry.isFile() && isMdxOrMd(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

function normalizeString(value) {
  return String(value ?? '')
    .normalize('NFKD')
    .replace(/\p{Diacritic}/gu, '')
    .trim();
}

function normalizeWhitespace(value) {
  return normalizeString(value).replace(/\s+/g, ' ').trim();
}

async function markdownToPlainText(markdown) {
  const processed = await remark().use(strip).process(markdown);
  return String(processed).replace(/\s+/g, ' ').trim();
}

function clampText(value, maxLen) {
  const text = normalizeWhitespace(value);
  if (text.length <= maxLen) return text;
  return `${text.slice(0, maxLen).trim()}…`;
}

function inferEventType(data) {
  const kind = typeof data.kind === 'string' ? data.kind : undefined;
  if (kind === 'journal' || kind === 'publication') return 'journal-volume';
  if (kind === 'conference') return 'conference';
  if (kind === 'news') return 'news';
  return 'timeline';
}

function hrefForEvent(type, slug) {
  if (type === 'news') return `/news/${slug}`;
  if (type === 'journal-volume') return `https://journal.dhbenelux.org`;
  return `/timeline/${slug}`;
}

function parseAuthors(data) {
  return parsePeopleList([data?.authors, data?.author]);
}

function normalizeStringList(value) {
  if (typeof value === 'string' || typeof value === 'number') {
    const text = normalizeString(value);
    return text ? [text] : [];
  }

  if (Array.isArray(value)) {
    return value.flatMap(normalizeStringList);
  }

  if (value && typeof value === 'object') {
    const name =
      typeof value.name === 'string'
        ? value.name
        : typeof value.title === 'string'
          ? value.title
          : typeof value.value === 'string'
            ? value.value
            : '';
    return normalizeStringList(name);
  }

  return [];
}

function splitKeywords(text) {
  const normalized = normalizeString(text);
  if (!normalized) return [];

  // Allow comma, semicolon, and newline-separated keywords.
  return normalized
    .split(/\s*(?:,|;|\n)\s*/g)
    .map((v) => v.trim())
    .filter(Boolean);
}

function parseKeywords(data) {
  const tokens = normalizeStringList(data?.keywords);
  const parsed = tokens.flatMap(splitKeywords);
  return Array.from(new Set(parsed));
}

function normalizePeopleToken(value) {
  if (typeof value === 'string' || typeof value === 'number') {
    const text = normalizeString(value);
    return text ? [text] : [];
  }

  if (Array.isArray(value)) {
    return value.flatMap(normalizePeopleToken);
  }

  if (value && typeof value === 'object') {
    const name =
      typeof value.name === 'string'
        ? value.name
        : typeof value.fullName === 'string'
          ? value.fullName
          : '';
    return normalizePeopleToken(name);
  }

  return [];
}

function parsePeopleList(values) {
  const rawTokens = values.flatMap(normalizePeopleToken).filter(Boolean);
  const parsed = rawTokens.flatMap((token) => parseAuthorsFromString(token));
  return Array.from(new Set(parsed));
}

function extractContributions(entry) {
  const text = normalizeString(entry);
  if (!text) return [];

  const m = text.match(
    /^(.*?)(?:\bwith\s+contributions?\s+(?:from|by)\b)\s+(.*)$/i,
  );
  if (!m) return [text];

  const base = normalizeString(m[1])
    .replace(/[,;:]\s*$/g, '')
    .trim();
  const rest = normalizeString(m[2])
    .replace(/[.]+\s*$/g, '')
    .trim();

  const contributors = rest
    .split(/\s*(?:,|;|\sand\s|\s&\s)\s*/i)
    .map((v) => v.trim())
    .filter(Boolean);

  return [base, ...contributors].filter(Boolean);
}

function parseAuthorsFromString(raw) {
  const text = normalizeString(raw);
  if (!text) return [];

  const normalizedSeparators = text
    .replace(/\)\s*(?=[A-ZÀ-ÖØ-Þ])/g, '); ')
    .replace(/\)\s*,\s*(?=[A-ZÀ-ÖØ-Þ])/g, '); ')
    .replace(/\s*\n\s*/g, '; ');

  const splitRegex = normalizedSeparators.includes('(')
    ? /\s*(?:;|\s&\s)\s*/i
    : /\s*(?:;|\sand\s|\s&\s)\s*/i;

  return normalizedSeparators
    .split(splitRegex)
    .flatMap((v) => extractContributions(v))
    .map((v) => v.trim())
    .filter(Boolean);
}

function mergeUniqueStrings(values) {
  return Array.from(
    new Set(values.map((v) => normalizeString(v)).filter(Boolean)),
  );
}

async function indexEvents(dir) {
  try {
    await fs.access(dir);
  } catch {
    return [];
  }

  const files = await listFilesRecursive(dir);
  const docs = [];

  for (const fullPath of files) {
    const slug = path.basename(fullPath).replace(/\.mdx?$/, '');

    try {
      const raw = await fs.readFile(fullPath, 'utf8');
      const { data, content } = matter(raw);

      const inferredType = inferEventType(data);

      const body = await markdownToPlainText(content);

      const title = normalizeString(data?.title ?? slug);

      const keywords = parseKeywords(data);

      const descriptionFromFrontmatter = normalizeString(
        data?.description ?? '',
      );
      const excerptFromFrontmatter = normalizeString(data?.excerpt ?? '');
      const excerpt = descriptionFromFrontmatter || excerptFromFrontmatter;

      const authors = Array.from(new Set(parseAuthors(data)));

      const baseTags = Array.isArray(data?.tags)
        ? data.tags.map((t) => normalizeString(t)).filter(Boolean)
        : [];

      const tags = mergeUniqueStrings([...baseTags, ...keywords]);

      const year =
        typeof data?.date === 'string'
          ? new Date(data.date).getFullYear()
          : undefined;

      docs.push({
        id: `events:${slug}`,
        slug,
        title,
        type: inferredType,
        href: hrefForEvent(inferredType, slug),
        date: typeof data?.date === 'string' ? data.date : undefined,
        year,
        authors,
        keywords: keywords.length > 0 ? keywords : undefined,
        tags,
        excerpt: clampText(excerpt, 280),
        body: clampText(body, 6000),
      });
    } catch (err) {
      console.error(`Failed to index file: ${fullPath} (slug: ${slug})`, err);
      continue;
    }
  }

  return docs;
}

async function main() {
  const docs = await indexEvents(CONTENT_EVENTS_DIR);

  const payload = {
    version: 1,
    docs,
  };

  await fs.mkdir(path.dirname(OUTPUT), { recursive: true });
  await fs.writeFile(OUTPUT, JSON.stringify(payload, null, 2), 'utf8');

  console.log(`Wrote ${docs.length} docs to ${OUTPUT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
