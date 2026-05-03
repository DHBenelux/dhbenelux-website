import { Button } from '@/components/Button';
import { ConferenceMap } from '@/components/ConferenceMap';
import { ConnectWithUs } from '@/components/ConnectWithUs';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Timeline } from '@/components/Timeline';
import { TocNav } from '@/components/TocNav';
import { getConferences, getTimelineEntries } from '@/lib/content';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Conferences | DH BeNeLux',
  description:
    'Annual DH BeNeLux conferences bringing together digital humanities researchers across Belgium, the Netherlands, and Luxembourg.',
  openGraph: {
    title: 'DH BeNeLux Conferences',
    description:
      'Explore upcoming and past annual conferences, locations, and proceedings.',
    url: '/conferences',
    images: ['/opengraph-image'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DH BeNeLux Conferences',
    description:
      'Explore upcoming and past annual conferences, locations, and proceedings.',
    images: ['/opengraph-image'],
  },
};

export default async function ConferencesPage() {
  const conferences = (await getConferences()).sort((a, b) => {
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return 0;
  });

  const upcomingConference = conferences.find(
    (conf) => conf.date && new Date(conf.date) >= new Date(),
  );
  const currentConference = upcomingConference ?? conferences.at(0);

  const conferenceMapData = conferences
    .map((conf) => {
      const year = conf.year
        ? Number(conf.year)
        : conf.date
          ? new Date(conf.date).getFullYear()
          : NaN;

      return {
        year,
        city: conf.city || conf.location || '',
        location: conf.location || conf.timelineLocation || '',
        theme: (conf as { theme?: string }).theme,
      };
    })
    .filter((conf) => conf.city && conf.location && Number.isFinite(conf.year));

  const timelineEntries = await getTimelineEntries('conferences');
  const tocItems = [
    { id: 'upcoming', label: 'Upcoming conference' },
    { id: 'map', label: 'Locations map' },
    { id: 'timeline', label: 'Conference timeline' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="grow space-y-16 md:space-y-20">
        <section className="bg-teal-700 text-white py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Calendar className="w-12 h-12 mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-merriweather font-bold mb-6">
                DH BeNeLux Conferences
              </h1>
              <p className="text-lg md:text-xl max-w-3xl mx-auto">
                Since 2014, our annual conference has been the meeting point for
                digital humanities researchers across Belgium, the Netherlands,
                and Luxembourg.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 lg:gap-16">
              <div className="space-y-16">
                {currentConference && (
                  <section
                    id="upcoming"
                    className="bg-linear-to-br from-accent to-background rounded-2xl p-8 md:p-12 border border-accent shadow-sm"
                  >
                    <div className="text-center mb-8">
                      <div className="inline-block bg-primary text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wider">
                        Upcoming Conference
                      </div>
                      <h2 className="text-3xl md:text-4xl font-merriweather font-bold text-foreground mb-3">
                        DH BeNeLux{' '}
                        {currentConference.year ||
                          (currentConference.date
                            ? new Date(currentConference.date).getFullYear()
                            : '')}
                      </h2>
                      {currentConference.theme && (
                        <div className="mt-4 pt-4 border-t border-primary/20">
                          <p className="text-sm font-semibold text-primary mb-1 uppercase tracking-wide">
                            Theme
                          </p>
                          <p className="text-lg md:text-xl text-muted-foreground font-medium">
                            {(currentConference as { theme?: string }).theme}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-8 bg-card rounded-lg p-6 border border-border">
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mr-4 shrink-0">
                          <MapPin className="w-5 h-5 text-teal-600" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-1">
                            Location
                          </h3>
                          <p className="text-foreground font-semibold">
                            {currentConference.location}
                          </p>
                          <p className="text-sm text-stone-600">
                            {currentConference.city}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mr-4 shrink-0">
                          <Calendar className="w-5 h-5 text-teal-600" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-1">
                            Dates
                          </h3>
                          <p className="text-foreground font-semibold">
                            {currentConference.dates || currentConference.date}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button asChild size="lg">
                        <Link
                          href={currentConference.website || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Visit Conference Website
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                      <Button asChild size="lg" variant="outline">
                        <Link
                          href="https://groups.google.com/forum/#!forum/dh-benelux-mailinglist"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Join Mailing List
                        </Link>
                      </Button>
                    </div>
                  </section>
                )}

                {conferenceMapData.length > 0 && (
                  <section id="map" className="bg-card rounded-2xl p-8">
                    <div className="text-center mb-10">
                      <h2 className="text-3xl md:text-4xl font-merriweather font-bold text-foreground mb-2">
                        Conference locations map
                      </h2>
                      <p className="text-lg text-stone-600 max-w-3xl mx-auto">
                        Explore where DH BeNeLux conferences have been hosted
                        across the region.
                      </p>
                    </div>
                    <ConferenceMap conferences={conferenceMapData} />
                  </section>
                )}

                <section id="timeline" className="bg-card rounded-2xl p-8 ">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-merriweather font-bold text-foreground mb-3">
                      Conference timeline
                    </h2>
                    <p className="text-lg text-stone-600 max-w-3xl mx-auto">
                      Key moments from DH BeNeLux conferences across the years.
                    </p>
                  </div>
                  <Timeline entries={timelineEntries} />
                </section>
              </div>

              <div className="order-first lg:order-0">
                <div className="sticky top-24">
                  <TocNav items={tocItems} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <ConnectWithUs />
      </main>

      <Footer />
    </div>
  );
}
