'use client';

import type { SearchIndexFile } from '@/types/search';
import MiniSearch from 'minisearch';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

type LoadState =
  | { status: 'idle' | 'loading' }
  | { status: 'ready'; index: SearchIndexFile }
  | { status: 'error'; message: string };

function formatTypeLabel(type: string) {
  switch (type) {
    case 'news':
      return 'News';
    case 'journal-volume':
      return 'Journal';
    case 'conference':
      return 'Conference';
    case 'timeline':
      return 'Timeline';
    default:
      return 'Result';
  }
}

function joinStringArray(value: unknown): string {
  if (!Array.isArray(value)) return '';
  return value.filter((v): v is string => typeof v === 'string').join(' ');
}

export function SearchClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialQuery = searchParams.get('q') ?? '';
  const [query, setQuery] = useState(initialQuery);
  const [loadState, setLoadState] = useState<LoadState>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoadState({ status: 'loading' });
        const res = await fetch('/data/search-index.json', {
          cache: 'no-store',
        });
        if (!res.ok) {
          throw new Error(`Failed to load search index (${res.status})`);
        }
        const data = (await res.json()) as SearchIndexFile;

        if (cancelled) return;
        setLoadState({ status: 'ready', index: data });
      } catch (err) {
        if (cancelled) return;
        setLoadState({
          status: 'error',
          message:
            err instanceof Error
              ? err.message
              : 'Failed to load the search index.',
        });
      }
    }

    void load().catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const miniSearch = useMemo(() => {
    if (loadState.status !== 'ready') return null;

    const ms = new MiniSearch({
      fields: ['title', 'authorsText', 'tagsText', 'body', 'excerpt'],
      storeFields: [
        'title',
        'href',
        'type',
        'date',
        'year',
        'authors',
        'tags',
        'excerpt',
      ],
      searchOptions: {
        boost: {
          title: 4,
          authorsText: 2,
          tagsText: 2,
          excerpt: 1.5,
          body: 1,
        },
        fuzzy: 0.2,
        prefix: true,
      },
    });

    ms.addAll(
      loadState.index.docs.map((doc) => ({
        ...doc,
        authorsText: joinStringArray(doc.authors),
        tagsText: joinStringArray(doc.tags),
      })),
    );

    return ms;
  }, [loadState]);

  const results = useMemo(() => {
    if (!miniSearch) return [];
    const q = query.trim();
    if (!q) return [];

    return miniSearch.search(q, { combineWith: 'AND' }).slice(0, 40);
  }, [miniSearch, query]);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const next = query.trim();
    const params = new URLSearchParams(searchParams.toString());
    if (next) {
      params.set('q', next);
    } else {
      params.delete('q');
    }

    const qs = params.toString();
    router.replace(qs ? `/search?${qs}` : '/search');
  };

  return (
    <div className="space-y-6">
      <form onSubmit={onSubmit} className="space-y-3">
        <label id="search-label" htmlFor="search-input" className="sr-only">
          Search
        </label>
        <input
          id="search-input"
          aria-labelledby="search-label"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search news, journal volumes, conferences, and timeline entries…"
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <div className="text-sm text-muted-foreground">
          {loadState.status === 'loading' && 'Loading search index…'}
          {loadState.status === 'error' && (
            <span>
              {loadState.message} To build the index, run{' '}
              <span className="font-mono">pnpm build:search-index</span>.
            </span>
          )}
          {loadState.status === 'ready' && (
            <span>Indexed {loadState.index.docs.length} items.</span>
          )}
        </div>
      </form>

      {query.trim() && loadState.status === 'ready' && (
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            {results.length === 0
              ? 'No results.'
              : `Showing ${results.length} result${
                  results.length === 1 ? '' : 's'
                }.`}
          </div>

          <div className="space-y-3">
            {results.map((r) => (
              <div
                key={`search-${String(r.id)}`}
                className="rounded-2xl border border-border bg-card p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="inline-flex items-center rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800 border border-teal-100">
                    {formatTypeLabel(String(r.type))}
                  </span>
                  {(r.year || r.date) && (
                    <span className="text-xs text-muted-foreground">
                      {r.year ?? ''}
                      {r.date ? ` · ${r.date}` : ''}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="text-lg font-merriweather font-bold text-foreground">
                    {String(r.title)}
                  </div>
                  {r.authors &&
                    Array.isArray(r.authors) &&
                    r.authors.length > 0 && (
                      <div className="text-sm text-muted-foreground">
                        {r.authors.join(', ')}
                      </div>
                    )}
                </div>

                {r.excerpt && (
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {String(r.excerpt)}
                  </p>
                )}

                <div className="mt-4">
                  {String(r.href).startsWith('http') ? (
                    <a
                      href={String(r.href)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-primary hover:underline underline-offset-4"
                    >
                      Open
                    </a>
                  ) : (
                    <Link
                      href={String(r.href)}
                      className="text-sm font-semibold text-primary hover:underline underline-offset-4"
                    >
                      Open
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!query.trim() && (
        <div className="rounded-2xl border border-border bg-muted p-6 text-sm text-muted-foreground">
          Tip: try author names, conference years, paper titles, or keywords.
        </div>
      )}
    </div>
  );
}
