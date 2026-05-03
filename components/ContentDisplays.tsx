import type {
  ContentSection,
  ExtractedStatistic,
} from '@/lib/content-extractors';
import { BarChart3, FileText, TrendingUp, Users } from 'lucide-react';

interface StatisticsDisplayProps {
  statistics: ExtractedStatistic[];
}

export function StatisticsDisplay({ statistics }: StatisticsDisplayProps) {
  if (statistics.length === 0) return null;

  return (
    <section className="not-prose">
      <div className="text-center mb-6">
        <h2 className="text-xl lg:text-2xl font-merriweather font-bold text-foreground mb-2">
          Conference Impact at a Glance
        </h2>
        <p className="text-sm lg:text-base text-muted-foreground max-w-xl mx-auto">
          Key metrics from DH BeNeLux 2024
        </p>
      </div>

      {/* Compact single row of statistics */}
      <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
        {statistics.slice(0, 5).map((stat, index) => (
          <div
            key={`stat-${index}`}
            className="bg-card border border-border rounded-lg p-3 lg:p-4 text-center min-w-[120px] hover:shadow-md transition-shadow duration-200"
          >
            <div className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-primary text-primary-foreground mb-2">
              {stat.icon}
            </div>
            <div className="text-lg lg:text-xl font-bold text-foreground mb-1">
              {stat.value}
            </div>
            <div className="text-xs lg:text-sm text-muted-foreground font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

interface ResearchThemesDisplayProps {
  themes: string[];
}

export function ResearchThemesDisplay({ themes }: ResearchThemesDisplayProps) {
  if (themes.length === 0) return null;

  return (
    <section className="not-prose">
      <div className="bg-accent rounded-lg border border-border p-6 lg:p-8">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-primary rounded-lg flex items-center justify-center mr-3">
            <BarChart3 className="w-4 h-4 lg:w-5 lg:h-5 text-primary-foreground" />
          </div>
          <h3 className="text-lg lg:text-xl font-merriweather font-bold text-foreground">
            Key Research Themes
          </h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {themes.map((theme, index) => (
            <span
              key={`theme-${index}`}
              className="inline-flex items-center bg-primary/10 text-primary text-sm px-3 py-1 rounded-full border border-primary/20 font-medium"
            >
              {theme}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

interface ContentSectionDisplayProps {
  sections: ContentSection[];
}

export function ContentSectionDisplay({
  sections,
}: ContentSectionDisplayProps) {
  if (sections.length === 0) return null;

  return (
    <div className="space-y-8">
      {/* Main and Keynote sections */}
      {sections
        .filter((s) => s.type === 'main' || s.type === 'keynote')
        .map((section, index) => (
          <section
            key={`section-${section.type}-${index}`}
            className="bg-card border border-border rounded-lg p-6 lg:p-8"
          >
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-secondary rounded-lg flex items-center justify-center mr-3">
                <FileText className="w-4 h-4 lg:w-5 lg:h-5 text-secondary-foreground" />
              </div>
              <h2 className="text-lg lg:text-xl font-merriweather font-bold text-foreground">
                {section.title}
              </h2>
            </div>

            <div className="prose prose-stone max-w-none prose-headings:font-merriweather prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-li:text-muted-foreground prose-ul:space-y-1 prose-li:marker:text-primary">
              <div dangerouslySetInnerHTML={{ __html: section.content }} />
            </div>
          </section>
        ))}

      {/* Community Impact - Special treatment */}
      {sections
        .filter((s) => s.type === 'community')
        .map((section, index) => (
          <section
            key={`community-${index}`}
            className="bg-linear-to-br from-primary/5 to-accent rounded-xl border border-primary/20 p-6 lg:p-8"
          >
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-primary rounded-xl flex items-center justify-center mr-4">
                <Users className="w-5 h-5 lg:w-6 lg:h-6 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-xl lg:text-2xl font-merriweather font-bold text-foreground">
                  Building Our Research Community
                </h2>
                <p className="text-sm lg:text-base text-muted-foreground">
                  Connecting scholars and institutions across the BeNeLux region
                </p>
              </div>
            </div>

            <div className="prose prose-stone max-w-none prose-headings:font-merriweather prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-li:text-muted-foreground prose-ul:space-y-1 prose-li:marker:text-primary">
              <div dangerouslySetInnerHTML={{ __html: section.content }} />
            </div>
          </section>
        ))}

      {/* Looking Forward - Inspirational treatment */}
      {sections
        .filter((s) => s.type === 'future')
        .map((section, index) => (
          <section
            key={`future-${index}`}
            className="bg-linear-to-r from-primary to-primary/80 text-primary-foreground rounded-xl p-6 lg:p-8"
          >
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-primary-foreground/20 backdrop-blur rounded-xl flex items-center justify-center mr-4">
                <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-xl lg:text-2xl font-merriweather font-bold text-primary-foreground">
                  Shaping the Future of Digital Humanities
                </h2>
                <p className="text-sm lg:text-base text-primary-foreground/80">
                  Innovation, collaboration, and new horizons ahead
                </p>
              </div>
            </div>

            <div className="prose prose-stone max-w-none prose-headings:font-merriweather prose-headings:text-primary-foreground prose-p:text-primary-foreground/90 prose-p:leading-relaxed prose-a:text-primary-foreground prose-a:underline hover:prose-a:text-primary-foreground/80 prose-strong:text-primary-foreground prose-li:text-primary-foreground/90 prose-ul:space-y-1 prose-li:marker:text-primary-foreground">
              <div dangerouslySetInnerHTML={{ __html: section.content }} />
            </div>
          </section>
        ))}

      {/* Side Notes - Minimal treatment */}
      {sections.filter((s) => s.type === 'side-note').length > 0 && (
        <aside className="border-l-4 border-muted-foreground/20 pl-4 lg:pl-6">
          {sections
            .filter((s) => s.type === 'side-note')
            .map((section, index) => (
              <div key={`note-${index}`} className="mb-4">
                <h4 className="text-sm font-merriweather font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                  {section.title}
                </h4>
                <div className="prose prose-sm prose-stone max-w-none prose-headings:font-merriweather prose-headings:text-muted-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-muted-foreground prose-li:text-muted-foreground prose-ul:space-y-1 prose-li:marker:text-muted-foreground">
                  <div dangerouslySetInnerHTML={{ __html: section.content }} />
                </div>
              </div>
            ))}
        </aside>
      )}
    </div>
  );
}
