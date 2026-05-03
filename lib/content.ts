import fs, { promises as fsPromises } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import liveNewsSlugsArray from './live-news-slugs.json';

const contentDirectory = path.join(process.cwd(), 'content', 'events');

// Only surface news items that match the live DH Benelux site
const liveNewsSlugs = new Set(liveNewsSlugsArray);

export type TimelineSurface = 'about' | 'conferences' | 'news';

export type EventKind =
  | 'news'
  | 'journal'
  | 'conference'
  | 'timeline'
  | 'milestone'
  | 'publication'
  | 'partnership'
  | 'founding'
  | 'adaptation';

export interface BaseEvent {
  id: string;
  slug: string;
  title: string;
  date?: string;
  excerpt?: string;
  description?: string;
  content: string;
  kind?: EventKind;
  published?: boolean;
  surfaces?: TimelineSurface[];
  timelineSurfaces?: TimelineSurface[];
  timelineCategory?: TimelineEntry['category'];
  timelineIcon?: string;
  timelineLocation?: string;
  timelineDescription?: string;
  location?: string;
  city?: string;
  dates?: string;
  theme?: string;
  stats?: Record<string, unknown>;
  current?: boolean;
  type?: TimelineEntry['type'];
  category?: string;
  icon?: string;
  articles?: { title: string; link?: string; authors?: string }[];
}

export interface NewsPost extends BaseEvent {
  author?: string;
  category?: string;
  tags?: string[];
  featured?: boolean;
  zenodoUrl?: string;
  zenodoCommunity?: string;
  deprecatedLink?: boolean;
  sourceUrl?: string;
  summaryOnly?: boolean;
  link?: string;
}

export interface JournalArticle extends BaseEvent {
  authors?: string;
  journalVolume?: string;
  volumeTheme?: string;
  link?: string;
  imageUrl?: string;
  imageAlt?: string;
}

export interface Conference extends BaseEvent {
  year?: string;
  dates?: string;
  website?: string;
  callForPapers?: string;
  callForPapersDeadline?: string;
  registration?: string;
  registrationOpen?: boolean;
  author?: string;
  featured?: boolean;
  zenodoUrl?: string;
  zenodoCommunity?: string;
}

export interface TimelineEntry {
  id: string;
  title: string;
  date: string;
  year: string;
  category:
    | 'founding'
    | 'conference'
    | 'publication'
    | 'partnership'
    | 'milestone'
    | 'adaptation';
  location: string;
  type: 'milestone' | 'conference' | 'publication';
  icon: string;
  description: string;
  theme?: string;
  dates?: string;
  stats?: Record<string, unknown>;
  website?: string;
  zenodoUrl?: string;
  zenodoCommunity?: string;
  conferenceReport?: string;
  surfaces?: TimelineSurface[];
  volume?: string;
  volumeTheme?: string;
  papers?: { title: string; link?: string; slug?: string }[];
  slug: string;
  content: string;
}

interface RawEvent extends BaseEvent, NewsPost, JournalArticle, Conference {}

async function readAllEvents(): Promise<RawEvent[]> {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const fileNames = await fsPromises.readdir(contentDirectory);

  const parsed = await Promise.all(
    fileNames
      .filter((name) => name.endsWith('.mdx') || name.endsWith('.md'))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.mdx?$/, '');
        const fullFilePath = path.join(contentDirectory, fileName);
        const fileContents = await fsPromises.readFile(fullFilePath, 'utf8');
        const { data, content } = matter(fileContents);

        if (data.published === false) {
          return null;
        }

        return {
          id: typeof data.id === 'string' ? data.id : slug,
          slug,
          content,
          ...data,
        } as RawEvent;
      }),
  );

  const events = parsed.filter(Boolean) as RawEvent[];

  return events.sort((a, b) => {
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return 0;
  });
}

function inferKind(event: RawEvent): EventKind {
  if (event.kind) return event.kind;
  if (event.journalVolume) return 'journal';
  if (
    event.dates ||
    event.callForPapers ||
    event.timelineCategory === 'conference' ||
    event.type === 'conference' ||
    event.category === 'conference'
  ) {
    return 'conference';
  }
  if (event.author && event.category) return 'news';
  if (event.timelineCategory === 'publication') return 'publication';
  if (event.timelineCategory === 'founding') return 'founding';
  if (event.timelineCategory === 'adaptation') return 'adaptation';
  if (event.timelineCategory === 'partnership') return 'partnership';
  return 'milestone';
}

function inferSurfaces(
  event: RawEvent,
  kind: EventKind,
): TimelineSurface[] | undefined {
  const explicitSurfaces = event.surfaces ?? event.timelineSurfaces;
  if (explicitSurfaces && explicitSurfaces.length > 0) {
    return explicitSurfaces;
  }

  if (kind === 'journal' || kind === 'publication') return ['about'];
  if (kind === 'conference') return ['conferences', 'about'];
  if (kind === 'news') return ['news'];

  return ['about'];
}

export async function getNewsposts(): Promise<NewsPost[]> {
  const events = await readAllEvents();
  return events
    .filter((event) => liveNewsSlugs.has(event.slug))
    .map((event) => ({ ...event, kind: inferKind(event) }))
    .filter((event) => event.kind === 'news') as NewsPost[];
}

export async function getConferences(): Promise<Conference[]> {
  const events = await readAllEvents();
  return events
    .map((event) => ({ ...event, kind: inferKind(event) }))
    .filter((event) => event.kind === 'conference') as Conference[];
}

export async function getTimelineEntries(
  surface?: TimelineSurface,
): Promise<TimelineEntry[]> {
  const events = await readAllEvents();
  const mapped = mapEventsToTimelineEntries(events);

  const filtered = surface
    ? mapped.filter((entry) => {
        if (!entry.surfaces || entry.surfaces.length === 0) {
          return true;
        }
        return entry.surfaces.includes(surface);
      })
    : mapped;

  return filtered.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

function mapEventsToTimelineEntries(events: RawEvent[]): TimelineEntry[] {
  const entries: TimelineEntry[] = [];
  const journalVolumes = new Map<
    string,
    {
      volume: string;
      theme?: string;
      date: string;
      year: string;
      surfaces: TimelineSurface[];
      papers: { title: string; link?: string; slug?: string }[];
      slug?: string;
    }
  >();

  events.forEach((item) => {
    const kind = inferKind(item);
    const surfaces = inferSurfaces(item, kind);
    const date = item.date;

    if (!surfaces || surfaces.length === 0 || !date) {
      return;
    }

    // Volume-level MDX: use articles array directly and push a single timeline entry
    if (
      (kind === 'journal' || kind === 'publication') &&
      item.articles &&
      item.articles.length > 0
    ) {
      entries.push({
        id: item.id,
        title: item.title,
        date,
        year: String(new Date(date).getFullYear()),
        category: 'publication',
        location:
          item.location ?? item.timelineLocation ?? 'DH Benelux Journal',
        type: 'publication',
        icon: item.icon ?? item.timelineIcon ?? 'book',
        description:
          item.description ?? item.excerpt ?? item.timelineDescription ?? '',
        theme: item.volumeTheme ?? item.theme,
        dates: item.dates ?? item.date,
        stats: item.stats,
        website: item.website,
        surfaces,
        slug: item.slug,
        content: item.content,
        papers: item.articles,
        volume: item.journalVolume ?? item.title,
        volumeTheme: item.volumeTheme ?? item.theme,
      });

      return;
    }

    // Aggregate journal articles by volume so timeline shows volumes, not individual papers
    if ((kind === 'journal' || kind === 'publication') && item.journalVolume) {
      const volumeName = item.journalVolume ?? 'DH Benelux Journal';
      const existing = journalVolumes.get(volumeName);
      const paper = {
        title: item.title,
        link: item.link,
        slug: item.slug,
      };

      if (existing) {
        existing.papers.push(paper);

        // Use the earliest publication date as the volume date
        if (new Date(date).getTime() < new Date(existing.date).getTime()) {
          existing.date = date;
          existing.year = String(new Date(date).getFullYear());
        }

        // Merge surfaces to keep visibility consistent
        existing.surfaces = Array.from(
          new Set([...existing.surfaces, ...surfaces]),
        );
      } else {
        journalVolumes.set(volumeName, {
          volume: volumeName,
          theme: item.volumeTheme,
          date,
          year: String(new Date(date).getFullYear()),
          surfaces,
          papers: [paper],
          slug: item.slug,
        });
      }

      return;
    }

    const entry = mapToTimelineEntryFromContent(item, kind, surfaces, date);
    if (entry) {
      entries.push(entry);
    }
  });

  journalVolumes.forEach((volume) => {
    entries.push({
      id: volume.slug ?? volume.volume,
      title: volume.volume,
      date: volume.date,
      year: volume.year,
      category: 'publication',
      location: 'DH Benelux Journal',
      type: 'publication',
      icon: 'book',
      description: volume.theme ?? 'Journal volume publication',
      theme: volume.theme,
      dates: volume.date,
      surfaces: volume.surfaces,
      slug: volume.slug ?? volume.volume,
      content: '',
      papers: volume.papers,
      volume: volume.volume,
      volumeTheme: volume.theme,
    });
  });

  return entries;
}

function mapToTimelineEntryFromContent(
  item: RawEvent,
  kind: EventKind,
  surfaces: TimelineSurface[],
  date: string,
): TimelineEntry | null {
  const year = String(new Date(date).getFullYear());

  const fallbackCategory: TimelineEntry['category'] = (() => {
    if (item.timelineCategory) return item.timelineCategory;
    if (kind === 'conference') return 'conference';
    if (kind === 'journal' || kind === 'publication') return 'publication';
    if (kind === 'founding') return 'founding';
    if (kind === 'adaptation') return 'adaptation';
    if (kind === 'partnership') return 'partnership';
    return 'milestone';
  })();

  const entryType: TimelineEntry['type'] = (() => {
    if (fallbackCategory === 'conference') return 'conference';
    if (fallbackCategory === 'publication') return 'publication';
    return 'milestone';
  })();

  return {
    id: item.id,
    title: item.title,
    date,
    year,
    category: fallbackCategory,
    location: item.location ?? item.timelineLocation ?? 'Online',
    type: entryType,
    icon: item.icon ?? item.timelineIcon ?? 'presentation',
    description:
      item.description ?? item.excerpt ?? item.timelineDescription ?? '',
    theme: item.theme,
    dates: item.dates ?? item.date,
    stats: item.stats,
    website: item.website,
    zenodoUrl: item.zenodoUrl,
    zenodoCommunity: item.zenodoCommunity,
    surfaces,
    slug: item.slug,
    content: item.content,
  };
}

export async function getContentBySlug<T>(slug: string): Promise<T | null> {
  try {
    const candidatePaths = [
      path.join(contentDirectory, `${slug}.mdx`),
      path.join(contentDirectory, `${slug}.md`),
    ];

    const fullPath = candidatePaths.find((candidate) =>
      fs.existsSync(candidate),
    );

    if (!fullPath) {
      return null;
    }

    const fileContents = await fsPromises.readFile(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    return {
      slug,
      content: contentHtml,
      ...data,
    } as T;
  } catch {
    return null;
  }
}

export function getAllContentSlugs(): string[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(contentDirectory);
  return fileNames
    .filter((name) => name.endsWith('.mdx') || name.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.mdx?$/, ''));
}

export async function getConferenceBySlug(
  slug: string,
): Promise<Conference | null> {
  return await getContentBySlug<Conference>(slug);
}

export async function getNewsPostBySlug(
  slug: string,
): Promise<NewsPost | null> {
  return await getContentBySlug<NewsPost>(slug);
}
