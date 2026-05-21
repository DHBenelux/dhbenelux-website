import { Button } from '@/components/Button';
import { ConnectWithUs } from '@/components/ConnectWithUs';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { PostCard } from '@/components/PostCard';
import { getNewsposts } from '@/lib/content';
import { resolvePostDestination } from '@/lib/resolve-post-destination';
import { ArrowRight, CalendarDays } from 'lucide-react';
import Link from 'next/link';

type NewsPost = Awaited<ReturnType<typeof getNewsposts>>[number] & {
  link?: string;
};

export default async function NewsPage() {
  const newsPosts = await getNewsposts();

  const [featuredPost, ...rest] = newsPosts;
  const featuredPostMeta = newsPosts.length
    ? {
        destination: resolvePostDestination(featuredPost),
        category: featuredPost.category?.trim() || 'Announcement',
        excerpt:
          featuredPost.excerpt || 'Update from the DH BeNeLux community.',
        author: featuredPost.author || 'DH BeNeLux',
        date: featuredPost.date || '',
        title: featuredPost.title,
      }
    : null;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="grow space-y-16 md:space-y-20">
        <section className="bg-teal-700 text-white py-14 md:py-18 lg:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl font-merriweather font-bold mb-4">
                News & Updates
              </h1>
              <p className="text-lg md:text-xl max-w-3xl leading-relaxed">
                Announcements from DH BeNeLux: calls for papers, conference
                reports, and community partnerships for our non-profit
                organization.
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-6xl mx-auto space-y-12">
            {newsPosts.length > 0 && featuredPostMeta && (
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
                <div className="lg:col-span-3 rounded-2xl border border-teal-700 bg-teal-700 text-white p-6 shadow-md flex flex-col">
                  <div className="text-xs font-semibold text-teal-100 mb-3 uppercase tracking-wide">
                    Featured
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-teal-100/90 mb-3">
                    <span className="inline-flex items-center rounded-full bg-white/10 text-white px-3 py-1 font-semibold uppercase tracking-wide border border-white/20">
                      {featuredPostMeta.category}
                    </span>
                    <span className="flex items-center">
                      <CalendarDays className="w-3.5 h-3.5 mr-1.5" />
                      {featuredPostMeta.date}
                    </span>
                  </div>

                  <h3 className="text-2xl font-merriweather font-bold leading-tight mb-3">
                    {featuredPostMeta.destination ? (
                      <Link
                        href={featuredPostMeta.destination}
                        className="hover:text-teal-50 transition-colors"
                      >
                        {featuredPostMeta.title}
                      </Link>
                    ) : (
                      featuredPostMeta.title
                    )}
                  </h3>
                  <p className="text-teal-50/90 leading-relaxed mb-4 line-clamp-4">
                    {featuredPostMeta.excerpt}
                  </p>
                  <div className="text-sm text-teal-100/90 mb-6">
                    {featuredPostMeta.author}
                  </div>
                  <div className="mt-auto">
                    {featuredPostMeta.destination ? (
                      <Button asChild variant="primaryOnDark">
                        <Link href={featuredPostMeta.destination}>
                          Continue Reading
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    ) : (
                      <span className="text-sm text-teal-100/80">
                        Short update
                      </span>
                    )}
                  </div>
                </div>
                <div className="lg:col-span-2 bg-teal-700 text-white border border-teal-700 rounded-2xl p-6 flex flex-col shadow-md">
                  <div className="space-y-3 text-teal-50/90">
                    <h2 className="text-xl font-merriweather font-semibold text-white">
                      DH BeNeLux at a glance
                    </h2>
                    <p>
                      A volunteer-driven, non-profit collaboration across
                      Belgium, the Netherlands, and Luxembourg advancing digital
                      humanities.
                    </p>
                    <p className="text-sm text-teal-50/90">
                      Explore our history, people, and how to get involved on
                      the About page.
                    </p>
                  </div>
                  <div className="pt-4 mt-auto">
                    <Button asChild variant="primaryOnDark" className="w-full">
                      <Link href="/about">Learn about DH BeNeLux</Link>
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-merriweather font-bold text-foreground">
                  All announcements
                </h2>
                <div className="text-sm text-muted-foreground">
                  {newsPosts.length} posts
                </div>
              </div>

              {rest.map((post) => (
                <PostCard
                  key={`post-${post.id}`}
                  post={{
                    ...post,
                    author: post.author || 'DH BeNeLux',
                    date: post.date || '',
                    excerpt:
                      post.excerpt || 'Update from the DH BeNeLux community.',
                  }}
                />
              ))}
            </div>

            {newsPosts.length === 0 && (
              <div className="text-center py-16 bg-muted border border-dashed border-border rounded-xl">
                <p className="text-muted-foreground text-lg">
                  No news posts available at the moment.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Check back soon or subscribe to the mailing list for updates.
                </p>
              </div>
            )}
          </div>
        </div>
        <ConnectWithUs />
      </main>

      <Footer />
    </div>
  );
}
