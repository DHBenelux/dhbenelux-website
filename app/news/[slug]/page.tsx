import { Button } from '@/components/Button';
import { ConnectWithUs } from '@/components/ConnectWithUs';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import type { NewsPost } from '@/lib/content';
import { getContentBySlug, getNewsposts } from '@/lib/content';
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock,
  FolderOpen,
  Share2,
  User,
} from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getNewsposts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const posts = await getNewsposts();
  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    return {
      title: 'News',
      description: 'News and updates from DH BeNeLux.',
    };
  }

  const description =
    post.description || post.excerpt || 'News and updates from DH BeNeLux.';
  const canonicalUrl = `/news/${post.slug}`;

  return {
    title: post.title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'article',
      url: canonicalUrl,
      title: post.title,
      description,
      publishedTime: post.date,
      images: [
        {
          url: `/news/${post.slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [`/news/${post.slug}/opengraph-image`],
    },
  };
}

function formatDate(dateStr?: string) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function getReadingTime(html: string) {
  const text = html.replace(/<[^>]+>/g, ' ');
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default async function NewsPostPage({ params }: PageProps) {
  const { slug } = await params;
  const allPosts = await getNewsposts();
  const meta = allPosts.find((p) => p.slug === slug);
  if (!meta) {
    notFound();
  }

  const contentPost = await getContentBySlug<NewsPost>(slug);
  const post: NewsPost = {
    ...meta,
    ...contentPost,
    content:
      contentPost?.content ||
      `<p>${meta.excerpt || 'This is a short update from DH BeNeLux.'}</p>`,
  };

  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const prevPost =
    currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 3);

  const shareUrl = `https://dhbenelux.org/news/${post.slug}`;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="grow space-y-12 md:space-y-16">
        <section className="bg-teal-700 text-white py-14 md:py-18 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-6">
              <Button asChild variant="secondaryOnDark" size="sm">
                <Link href="/news">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to news
                </Link>
              </Button>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                {post.category && (
                  <span className="inline-flex items-center rounded-full bg-primary-foreground/10 px-3 py-1 font-semibold uppercase tracking-wide">
                    <FolderOpen className="w-4 h-4 mr-2" />
                    {post.category}
                  </span>
                )}
                <span className="inline-flex items-center">
                  <CalendarDays className="w-4 h-4 mr-2" />
                  {formatDate(post.date)}
                </span>
                <span className="inline-flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {getReadingTime(post.content)} min read
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-merriweather font-bold leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4">
                <div className="inline-flex items-center text-base">
                  <User className="w-5 h-5 mr-2" />
                  {post.author}
                </div>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={`tag-${tag}`}
                        className="inline-flex items-center bg-card/10 text-xs px-3 py-1 rounded-full border border-white/20"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <Button asChild size="sm" variant="secondaryOnDark">
                <Link
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    post.title,
                  )}&url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share update
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 lg:py-20 bg-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <article className="prose prose-lg prose-stone max-w-none prose-headings:font-merriweather prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-ul:space-y-1">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </article>
            </div>
          </div>
        </section>

        {(nextPost || prevPost) && (
          <section className="py-10 bg-card border-t border-border">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                {prevPost && (
                  <Link
                    href={`/news/${prevPost.slug}`}
                    className="group block rounded-xl border border-border p-6 hover:border-primary hover:shadow-md transition-all"
                  >
                    <p className="text-sm text-muted-foreground mb-2">
                      Previous
                    </p>
                    <div className="flex items-center text-primary mb-2">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      <span className="text-sm font-medium">
                        Earlier update
                      </span>
                    </div>
                    <h3 className="font-merriweather font-semibold text-foreground group-hover:text-primary line-clamp-2">
                      {prevPost.title}
                    </h3>
                  </Link>
                )}
                {nextPost && (
                  <Link
                    href={`/news/${nextPost.slug}`}
                    className="group block rounded-xl border border-border p-6 hover:border-primary hover:shadow-md transition-all md:text-right"
                  >
                    <p className="text-sm text-muted-foreground mb-2">Next</p>
                    <div className="flex items-center justify-end text-primary mb-2">
                      <span className="text-sm font-medium">More updates</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                    <h3 className="font-merriweather font-semibold text-foreground group-hover:text-primary line-clamp-2">
                      {nextPost.title}
                    </h3>
                  </Link>
                )}
              </div>
            </div>
          </section>
        )}

        {relatedPosts.length > 0 && (
          <section className="py-12 bg-muted">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-2xl font-merriweather font-bold text-foreground mb-6">
                  Related updates
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={`related-${relatedPost.slug}`}
                      href={`/news/${relatedPost.slug}`}
                      className="group block bg-card rounded-xl p-5 border border-border hover:border-primary hover:shadow-md transition-all"
                    >
                      <p className="text-sm text-muted-foreground mb-1">
                        {formatDate(relatedPost.date)}
                      </p>
                      <h3 className="font-merriweather font-semibold text-foreground group-hover:text-primary line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                        {relatedPost.excerpt}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        <ConnectWithUs />
      </main>

      <Footer />
    </div>
  );
}
