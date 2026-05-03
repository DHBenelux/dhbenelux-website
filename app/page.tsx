import { Button } from '@/components/Button';
import { ConnectWithUs } from '@/components/ConnectWithUs';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { PostCard } from '@/components/PostCard';
import { getConferences, getNewsposts } from '@/lib/content';
import {
  ArrowRight,
  BookOpen,
  Calendar,
  MapPin,
  MicVocal,
  Shield,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import type React from 'react';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Digital Humanities Benelux',
  alternateName: 'DH BeNeLux',
  description:
    'The platform connecting digital humanities researchers, educators, and practitioners across Belgium, the Netherlands, and Luxembourg.',
  url: 'https://dhbenelux.org',
  logo: 'https://dhbenelux.org/logo.png',
  sameAs: [
    'https://twitter.com/dhbenelux',
    'https://zenodo.org/communities/dhbenelux2024',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'conference@dhbenelux.org',
  },
  areaServed: ['Belgium', 'Netherlands', 'Luxembourg'],
  knowsAbout: [
    'Digital Humanities',
    'Computational Humanities',
    'Academic Research',
    'Digital Scholarship',
  ],
};

function normalizeExternalUrl(value: string) {
  const raw = value.trim();
  if (!raw) return '';

  // Handle protocol-relative URLs (e.g. //example.com).
  if (raw.startsWith('//')) return `https:${raw}`;

  // Allow only http(s) (reject mailto:, javascript:, etc.).
  if (/^https?:\/\//i.test(raw)) return raw;
  if (/^[a-z][a-z0-9+.-]*:/i.test(raw)) return '';

  return `https://${raw}`;
}

function parseConferenceYear(value: unknown): number {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : Number.NaN;
  }
  if (typeof value === 'string') {
    const parsed = Number.parseInt(value, 10);
    return Number.isNaN(parsed) ? Number.NaN : parsed;
  }
  return Number.NaN;
}

export default async function DHBeneluxOrgPage() {
  const newsPosts = await getNewsposts();
  const conferences = (await getConferences()).sort((a, b) => {
    const aDate = typeof a.date === 'string' ? a.date.trim() : '';
    const bDate = typeof b.date === 'string' ? b.date.trim() : '';

    const aYear = parseConferenceYear((a as { year?: unknown }).year);
    const bYear = parseConferenceYear((b as { year?: unknown }).year);

    if (aDate && bDate) {
      return new Date(bDate).getTime() - new Date(aDate).getTime();
    }
    if (aDate) return -1;
    if (bDate) return 1;

    if (!Number.isNaN(aYear) && !Number.isNaN(bYear) && aYear !== bYear) {
      return bYear - aYear;
    }

    return a.title.localeCompare(b.title);
  });
  const now = new Date().getTime();
  const upcomingConference = conferences
    .map((conf) => ({
      conf,
      time: typeof conf.date === 'string' ? Date.parse(conf.date.trim()) : NaN,
    }))
    .filter(({ time }) => Number.isFinite(time) && time >= now)
    .sort((a, b) => a.time - b.time)
    .at(0)?.conf;
  const latestConference = upcomingConference ?? conferences.at(0);

  const conferenceWebsite = latestConference
    ? normalizeExternalUrl(
        String(
          (latestConference as { websiteUrl?: string; website?: string })
            .websiteUrl ??
            latestConference.website ??
            '',
        ),
      )
    : '';

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Header />

      <main className="grow space-y-16 md:space-y-20" id="main-content">
        <section className="bg-teal-700 text-white py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-merriweather font-bold mb-6">
              DH BeNeLux
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10">
              Connecting digital humanities researchers, educators, and
              practitioners across Belgium, the Netherlands, and Luxembourg. We
              advance scholarship where digital technologies meet humanities
              research.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" variant="primaryOnDark">
                <Link href="#about-us">
                  About DH BeNeLux
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondaryOnDark">
                <Link href="#connect-with-us">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="about-us" className="py-16 md:py-20 bg-muted">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-merriweather font-bold text-foreground">
                What We Do
              </h2>
              <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
                Supporting digital humanities research and practice through
                conferences, publications, and community building.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ActivityCard
                icon={
                  <MicVocal className="w-10 h-10 text-primary-foreground mb-4" />
                }
                title="Annual Conference"
                description="Our annual conference brings together researchers from across the Benelux region to share research, methods, and collaborative opportunities."
                linkText="View Conferences"
                linkHref="/conferences"
              />
              <ActivityCard
                icon={
                  <BookOpen className="w-10 h-10 text-primary-foreground mb-4" />
                }
                title="DH BeNeLux Journal"
                description="Open-access, peer-reviewed publication advancing digital humanities scholarship across methodologies and applications."
                linkText="Visit Journal"
                linkHref="https://journal.dhbenelux.org"
                external
              />
              <ActivityCard
                icon={
                  <Shield className="w-10 h-10 text-primary-foreground mb-4" />
                }
                title="Executive Board"
                description="Led by a volunteer Chair with event, communication, and publication coordinators alongside a secretary, the Executive Board coordinates DH BeNeLux activities and represents the network."
                linkText="Meet the board"
                linkHref="/about#structure"
              />
              <ActivityCard
                icon={
                  <Users className="w-10 h-10 text-primary-foreground mb-4" />
                }
                title="Steering Group"
                description="A broad advisory committee of digital humanities researchers from across Belgium, the Netherlands, and Luxembourg who guide the network's long-term directions."
                linkText="Meet the steering group"
                linkHref="/about#structure"
              />
            </div>
          </div>
        </section>

        {latestConference && (
          <section className="py-16 md:py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-3xl font-merriweather font-bold text-foreground">
                  {upcomingConference
                    ? 'Upcoming Conference'
                    : 'Latest Conference'}
                </h2>
                <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
                  A quick snapshot of the next DH BeNeLux gathering with links
                  to dive into the full programme and history.
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="rounded-2xl border border-border bg-white p-8 shadow-sm space-y-6">
                  <div className="text-center space-y-2">
                    <div className="inline-flex items-center justify-center rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary">
                      DH BeNeLux{' '}
                      {latestConference.year ||
                        (latestConference.date
                          ? new Date(latestConference.date).getFullYear()
                          : '')}
                    </div>
                    {latestConference.theme && (
                      <p className="text-base text-muted-foreground">
                        {(latestConference as { theme?: string }).theme}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-xl border border-border bg-background p-5 flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-teal-700" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          Location
                        </p>
                        <p className="font-semibold text-foreground">
                          {latestConference.location}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {latestConference.city}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-xl border border-border bg-background p-5 flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                        <Calendar className="w-5 h-5 text-teal-700" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          Dates
                        </p>
                        <p className="font-semibold text-foreground">
                          {latestConference.dates || latestConference.date}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    {conferenceWebsite && (
                      <Button asChild size="sm" variant="secondary">
                        <Link
                          href={conferenceWebsite}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Visit Conference Website
                        </Link>
                      </Button>
                    )}
                    <Button asChild size="lg" variant="outline">
                      <Link href="/conferences">View all conferences</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="py-16 md:py-20 bg-stone-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-merriweather font-bold text-foreground">
                News & Updates
              </h2>
              <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
                Stay informed with the latest announcements from our community.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {newsPosts.slice(0, 4).map((post) => (
                <PostCard
                  key={`news-${post.slug}`}
                  post={{
                    ...post,
                    id: post.slug,
                    author: post.author || 'DH BeNeLux',
                    date: post.date || '',
                    excerpt:
                      post.excerpt || 'Update from the DH BeNeLux community.',
                  }}
                />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button asChild variant="outline" size="lg">
                <Link href="/news">View All News</Link>
              </Button>
            </div>
          </div>
        </section>

        <ConnectWithUs />
      </main>

      <Footer />
    </div>
  );
}

interface ActivityCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
  external?: boolean;
}

function ActivityCard({
  icon,
  title,
  description,
  linkText,
  linkHref,
  external,
}: ActivityCardProps) {
  return (
    <div className="border border-teal-700 rounded-2xl p-6 bg-teal-700 text-white shadow-sm hover:shadow-lg transition-shadow duration-200 flex flex-col h-full">
      {icon}
      <h3 className="text-xl font-merriweather font-semibold text-white mb-2">
        {title}
      </h3>
      <p className="text-teal-50/90 leading-relaxed grow">{description}</p>
      <div className="mt-6">
        <Button asChild size="lg" variant="primaryOnDark">
          <Link
            href={linkHref}
            target={external ? '_blank' : '_self'}
            rel={external ? 'noopener noreferrer' : ''}
          >
            {linkText} <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
