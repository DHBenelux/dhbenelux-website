import { ConnectWithUs } from '@/components/ConnectWithUs';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { SearchClient } from '@/components/SearchClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search | DH BeNeLux',
  description:
    'Search across news, journal volumes, conferences, and timeline entries.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function SearchPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="grow space-y-16 md:space-y-20">
        <section className="bg-teal-700 text-white py-14 md:py-18">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-4">
              <h1 className="text-4xl font-merriweather font-bold md:text-5xl leading-tight">
                Search
              </h1>
              <p className="text-lg text-teal-50/90 leading-relaxed">
                Find news, journal volumes, conferences, and timeline entries.
              </p>
            </div>
          </div>
        </section>

        <section className="py-10 md:py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <SearchClient />
            </div>
          </div>
        </section>

        <ConnectWithUs />
      </main>

      <Footer />
    </div>
  );
}
