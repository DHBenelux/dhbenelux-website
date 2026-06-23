import './globals.css';
import { DraftNotice } from '@/components/DraftNotice';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Lato, Merriweather } from 'next/font/google';
import type React from 'react';

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-lato',
});

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-merriweather',
});

const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === 'true';
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const basePath = isGitHubPagesBuild && repoName ? `/${repoName}` : '';
const withBasePath = (path: string) => `${basePath}${path}`;

// For GitHub Pages deployment, use the actual deployed URL; otherwise use primary domain
const metadataBaseUrl =
  isGitHubPagesBuild && repoName
    ? `https://dhbenelux.github.io/${repoName}`
    : 'https://dhbenelux.org';

export const metadata: Metadata = {
  metadataBase: new URL(metadataBaseUrl),
  title: {
    default: 'Digital Humanities BeNeLux',
    template: '%s | Digital Humanities BeNeLux',
  },
  description:
    'The official hub for the Digital Humanities BeNeLux community, connecting researchers, educators, and practitioners across Belgium, the Netherlands, and Luxembourg through annual conferences, scholarly publications, and collaborative research in digital humanities.',
  keywords: [
    'digital humanities',
    'DH BeNeLux',
    'academic conference',
    'scholarly research',
    'computational humanities',
    'Netherlands',
    'Belgium',
    'Luxembourg',
    'digital scholarship',
    'humanities computing',
  ],
  authors: [{ name: 'DH BeNeLux Organization' }],
  creator: 'DH BeNeLux',
  publisher: 'DH BeNeLux',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: metadataBaseUrl,
    siteName: 'Digital Humanities BeNeLux',
    title: 'Digital Humanities BeNeLux',
    description:
      'The official hub for the Digital Humanities BeNeLux community, connecting researchers across Belgium, the Netherlands, and Luxembourg.',
    images: [
      {
        url: `${metadataBaseUrl}${withBasePath('/opengraph-image')}`,
        width: 1200,
        height: 630,
        alt: 'Digital Humanities BeNeLux',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@dhbenelux',
    creator: '@dhbenelux',
    title: 'Digital Humanities BeNeLux',
    description:
      'The official hub for the Digital Humanities BeNeLux community, connecting researchers across Belgium, the Netherlands, and Luxembourg.',
    images: [`${metadataBaseUrl}${withBasePath('/opengraph-image')}`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      {
        url: withBasePath('/favicon-32x32.png'),
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: withBasePath('/favicon-16x16.png'),
        sizes: '16x16',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: withBasePath('/apple-touch-icon.png'),
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn('scroll-smooth', lato.variable, merriweather.variable)}
    >
      <body
        className={cn(
          'min-h-screen bg-stone-50 font-sans text-stone-800 antialiased',
        )}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:px-4 focus:py-2 focus:bg-white focus:text-teal-700 focus:shadow-lg focus:rounded-md focus:ring-2 focus:ring-teal-500"
        >
          Skip to main content
        </a>
        <DraftNotice />
        {children}
      </body>
    </html>
  );
}
