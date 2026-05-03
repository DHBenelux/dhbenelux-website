import { getTimelineEntries } from '@/lib/content';
import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

interface TimelineEntryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return getTimelineEntries('about').then((entries) => {
    const uniqueSlugs = Array.from(
      new Set(entries.map((entry) => entry.slug).filter(Boolean)),
    );

    return uniqueSlugs.map((slug) => ({ slug }));
  });
}

export async function generateMetadata({
  params,
}: TimelineEntryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entries = await getTimelineEntries('about');
  const entry = entries.find((item) => item.slug === slug);

  if (!entry) {
    return {
      title: 'Timeline',
      description: 'Timeline entries from DH BeNeLux history.',
    };
  }

  return {
    title: `${entry.title} | Timeline`,
    description:
      entry.description ||
      'Timeline entry from the DH BeNeLux community history.',
    openGraph: {
      title: entry.title,
      description:
        entry.description ||
        'Timeline entry from the DH BeNeLux community history.',
      images: ['/opengraph-image'],
    },
    twitter: {
      card: 'summary_large_image',
      title: entry.title,
      description:
        entry.description ||
        'Timeline entry from the DH BeNeLux community history.',
      images: ['/opengraph-image'],
    },
  };
}

export default async function TimelineEntryPage({
  params,
}: TimelineEntryPageProps) {
  const { slug } = await params;
  const entries = await getTimelineEntries('about');
  const validSlugs = new Set(entries.map((entry) => entry.slug));

  if (!validSlugs.has(slug)) {
    notFound();
  }

  redirect(`/about#timeline-${slug}`);
}
