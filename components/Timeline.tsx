import { TimelineEntry } from '@/lib/content';
import {
  ArrowRight,
  Book,
  Building,
  Calendar,
  Globe,
  Handshake,
  MapPin,
  Monitor,
  Presentation,
  Rocket,
  Users,
} from 'lucide-react';

const iconMap: Partial<Record<string, typeof Rocket>> = {
  rocket: Rocket,
  presentation: Presentation,
  book: Book,
  handshake: Handshake,
  monitor: Monitor,
  calendar: Calendar,
  building: Building,
  users: Users,
  globe: Globe,
};

const categoryColors: Partial<Record<string, string>> = {
  founding: 'bg-teal-50 border-teal-200 text-teal-800',
  conference: 'bg-teal-100 border-teal-300 text-teal-900',
  publication: 'bg-teal-100 border-teal-300 text-teal-900',
  partnership: 'bg-stone-100 border-stone-300 text-stone-900',
  milestone: 'bg-teal-100 border-teal-300 text-teal-900',
  adaptation: 'bg-slate-100 border-slate-300 text-slate-900',
};

const categoryIcons: Partial<Record<string, string>> = {
  founding: 'bg-teal-600',
  conference: 'bg-teal-700',
  publication: 'bg-teal-700',
  partnership: 'bg-stone-700',
  milestone: 'bg-teal-700',
  adaptation: 'bg-slate-700',
};

interface TimelineProps {
  entries: TimelineEntry[];
  showPapers?: boolean;
}

export function Timeline({ entries, showPapers = true }: TimelineProps) {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

        <div className="space-y-8">
          {entries.map((entry) => {
            const IconComponent = iconMap[entry.icon] ?? Rocket;
            const categoryColorClass =
              categoryColors[entry.category] ??
              'bg-muted text-foreground border-border';
            const iconTintClass =
              categoryIcons[entry.category] ?? 'bg-muted-foreground';
            const statsEntries = Object.entries(entry.stats ?? {}).filter(
              ([, value]) => value !== undefined && value !== null,
            );
            const isArchivedSite = entry.website?.includes('web.archive.org');
            const hasPapers =
              showPapers &&
              entry.category === 'publication' &&
              entry.papers?.length;
            const isPublication = entry.category === 'publication';
            const zenodoLinkRaw = entry.zenodoCommunity ?? entry.zenodoUrl;
            const zenodoLink = zenodoLinkRaw
              ? zenodoLinkRaw.startsWith('http')
                ? zenodoLinkRaw
                : `https://zenodo.org/communities/${zenodoLinkRaw}`
              : undefined;

            return (
              <div
                key={`timeline-${entry.id}`}
                id={`timeline-${entry.slug}`}
                className="relative flex items-start group"
              >
                <div
                  className={`relative z-10 flex items-center justify-center w-14 h-14 rounded-full border-4 border-background shadow-sm ${iconTintClass}`}
                >
                  <IconComponent className="w-6 h-6 text-white" />
                </div>

                <div className="ml-6 flex-1">
                  <div
                    className={`
                    bg-card rounded-2xl border border-border p-6 shadow-sm transition-all duration-200
                    group-hover:shadow-md group-hover:-translate-y-1
                    ${isPublication ? 'bg-stone-50 border-stone-200' : ''}
                  `}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${categoryColorClass}`}
                        >
                          {entry.category.toUpperCase()}
                        </span>
                        <span className="text-sm font-medium text-muted-foreground">
                          {entry.year}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl font-merriweather font-bold text-foreground mb-2">
                      {entry.title}
                    </h3>
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <MapPin className="w-4 h-4 mr-2" />
                      {entry.location}
                    </div>

                    {isPublication && (
                      <div className="flex flex-wrap items-center gap-2 mb-3 text-sm text-stone-700">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-xs font-semibold uppercase tracking-wide text-stone-800">
                          Journal volume
                        </span>
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-200 text-xs font-semibold text-stone-700">
                          <Calendar className="w-4 h-4 text-stone-600" />
                          {entry.year}
                        </span>
                        {entry.theme && (
                          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-xs font-semibold text-teal-800">
                            {entry.theme}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed">
                      {entry.description}
                    </p>

                    {entry.category === 'conference' && (
                      <div className="mt-4 space-y-3 border-t border-stone-100 pt-4">
                        <div className="flex flex-wrap gap-2">
                          {(entry.dates || entry.date) && (
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 text-sm font-medium text-stone-800">
                              <Calendar className="w-4 h-4 text-stone-600" />
                              {entry.dates ?? entry.date}
                            </span>
                          )}
                          {entry.theme && (
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-sm font-semibold text-teal-800">
                              <Presentation className="w-4 h-4 text-teal-600" />
                              {entry.theme}
                            </span>
                          )}
                        </div>

                        {statsEntries.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {statsEntries.map(([label, value]) => (
                              <span
                                key={`${entry.id}-${label}`}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white border border-stone-200 text-sm text-stone-800"
                              >
                                <span className="font-semibold capitalize">
                                  {label}:
                                </span>
                                <span className="text-stone-700">
                                  {String(value)}
                                </span>
                              </span>
                            ))}
                          </div>
                        )}

                        {(entry.website || zenodoLink) && (
                          <div className="flex flex-wrap gap-2">
                            {entry.website && (
                              <a
                                className="inline-flex items-center gap-2 rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm font-semibold text-stone-800 transition hover:border-stone-400 hover:bg-stone-50"
                                href={entry.website}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {isArchivedSite
                                  ? 'View archived site'
                                  : 'Open conference site'}
                                <ArrowRight className="w-4 h-4" />
                              </a>
                            )}

                            {zenodoLink && (
                              <a
                                className="inline-flex items-center gap-2 rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm font-semibold text-stone-800 transition hover:border-stone-400 hover:bg-stone-50"
                                href={zenodoLink}
                                target="_blank"
                                rel="noreferrer"
                              >
                                View proceedings
                                <ArrowRight className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {entry.website && isPublication && (
                      <div className="mt-4">
                        <a
                          className="inline-flex items-center gap-2 rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm font-semibold text-stone-800 transition hover:border-stone-400 hover:bg-stone-50"
                          href={entry.website}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Open journal volume
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    )}

                    {hasPapers && entry.papers && (
                      <div className="mt-4 space-y-2 border-t border-stone-100 pt-4">
                        <div className="text-sm font-semibold text-muted-foreground">
                          Papers in this volume
                        </div>
                        <ul className="space-y-1">
                          {entry.papers.map((paper) => (
                            <li
                              key={`${entry.id}-${paper.slug ?? paper.title}`}
                            >
                              {paper.link ? (
                                <a
                                  href={paper.link}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-sm font-semibold text-primary hover:text-primary/80"
                                >
                                  {paper.title}
                                </a>
                              ) : (
                                <span className="text-sm text-muted-foreground">
                                  {paper.title}
                                </span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* No external or deep links in compact timeline */}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
