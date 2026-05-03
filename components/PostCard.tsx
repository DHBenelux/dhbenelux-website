import { Button } from '@/components/Button';
import { resolvePostDestination } from '@/lib/resolve-post-destination';
import { CalendarDays } from 'lucide-react';
import Link from 'next/link';

interface Post {
  id: string;
  title: string;
  author: string;
  authors?: string;
  date: string;
  category?: string;
  excerpt?: string;
  link?: string;
  sourceUrl?: string;
  slug?: string;
  journalVolume?: string;
  deprecatedLink?: boolean;
  summaryOnly?: boolean;
}

const defaultPillClasses =
  'inline-flex items-center rounded-full bg-teal-50 text-teal-800 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide border border-teal-100';

export function PostCard({ post }: { post: Post }) {
  const isJournalArticle = !!post.journalVolume;
  const destination = resolvePostDestination(post);
  const hasLink = Boolean(destination);
  const categoryLabel = post.category?.trim() || 'Announcement';
  const buttonLabel = isJournalArticle ? 'Read Article' : 'Continue Reading';
  const volumeLabel = post.journalVolume;
  const hasExcerpt = Boolean(post.excerpt?.trim());

  return (
    <article className="border rounded-lg p-6 transition-all duration-300 hover:shadow-lg bg-card border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col gap-1">
          <span className={defaultPillClasses}>{categoryLabel}</span>
          {volumeLabel && (
            <span className="text-xs text-muted-foreground font-medium">
              {volumeLabel}
            </span>
          )}
        </div>
      </div>

      <header>
        <h3 className="text-xl font-merriweather font-bold text-card-foreground hover:text-primary transition-colors leading-tight mb-2">
          {destination ? (
            <Link href={destination}>{post.title}</Link>
          ) : (
            post.title
          )}
        </h3>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground mb-3">
          <span className="flex items-center">
            <CalendarDays className="w-3.5 h-3.5 mr-1.5" />
            {post.date}
          </span>
          <span className="flex items-center">
            {post.authors || post.author}
          </span>
        </div>
      </header>

      {hasExcerpt && (
        <div className="text-muted-foreground leading-relaxed mb-4">
          <p className="line-clamp-3">{post.excerpt}</p>
        </div>
      )}

      <footer>
        {hasLink ? (
          <Button asChild variant="secondary" size="sm">
            <Link href={destination ?? ''}>{buttonLabel}</Link>
          </Button>
        ) : (
          <span className="text-sm text-stone-500">Short update</span>
        )}
      </footer>
    </article>
  );
}
