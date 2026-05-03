import {
  BarChart3,
  BookOpen,
  Download,
  MapPin,
  TrendingUp,
  Users,
} from 'lucide-react';
import type React from 'react';

export interface ExtractedStatistic {
  label: string;
  value: string;
  icon: React.ReactNode;
}

/**
 * Extract statistics from HTML content
 */
export function extractStatistics(htmlContent: string): ExtractedStatistic[] {
  const stats: ExtractedStatistic[] = [];

  const patterns = [
    {
      regex: /(\d+)\s*total publications/gi,
      label: 'Publications',
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      regex: /(\d+)\s*presentations/gi,
      label: 'Presentations',
      icon: <Users className="w-5 h-5" />,
    },
    {
      regex: /over\s*(\d+[,\d]*)\s*combined downloads/gi,
      label: 'Downloads',
      icon: <Download className="w-5 h-5" />,
    },
    {
      regex: /(\d+[,\d]*)\+?\s*total views/gi,
      label: 'Views',
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      regex: /(\d+)\+?\s*institutions/gi,
      label: 'Institutions',
      icon: <MapPin className="w-5 h-5" />,
    },
    {
      regex: /(\d+)\s*research areas/gi,
      label: 'Research Areas',
      icon: <BarChart3 className="w-5 h-5" />,
    },
  ];

  patterns.forEach((pattern) => {
    const matches = htmlContent.match(pattern.regex);
    if (matches) {
      matches.forEach((match) => {
        const valueMatch = match.match(/(\d+[,\d]*)/);
        if (valueMatch) {
          stats.push({
            label: pattern.label,
            value: valueMatch[1].includes(',')
              ? valueMatch[1]
              : parseInt(valueMatch[1]).toLocaleString(),
            icon: pattern.icon,
          });
        }
      });
    }
  });

  return stats;
}

/**
 * Extract research themes from content
 */
export function extractResearchThemes(htmlContent: string): string[] {
  const themes: string[] = [];

  const researchPatterns = [
    /AI and Digital Humanities/gi,
    /Cultural Heritage/gi,
    /Global Perspectives/gi,
    /Methodological Innovation/gi,
    /Medieval Digital Humanities/gi,
    /Postcolonial Digital Studies/gi,
    /Data Visualization/gi,
    /Artificial Intelligence applications/gi,
    /Digital Literary Studies/gi,
    /Text Mining/gi,
    /Network Analysis/gi,
    /Computational Linguistics/gi,
  ];

  researchPatterns.forEach((pattern) => {
    const matches = htmlContent.match(pattern);
    if (matches) {
      matches.forEach((match) => {
        const cleanMatch = match.replace(/\*/g, '').trim();
        if (!themes.includes(cleanMatch)) {
          themes.push(cleanMatch);
        }
      });
    }
  });

  return themes.slice(0, 8);
}

export interface ContentSection {
  title: string;
  content: string;
  type: 'main' | 'keynote' | 'community' | 'side-note' | 'future';
  priority: number;
}

/**
 * Extract and categorize content sections
 */
export function extractContentSections(htmlContent: string): ContentSection[] {
  const sections: ContentSection[] = [];

  const h2Matches = htmlContent.split(/<h2[^>]*>/gi);

  if (h2Matches.length > 1) {
    for (let i = 1; i < h2Matches.length; i++) {
      const section = h2Matches[i];
      const titleMatch = section.match(/^([^<]+)</);
      const contentMatch = section.replace(/^[^<]+<\/h2>/i, '');

      if (titleMatch && contentMatch) {
        const title = titleMatch[1].trim();
        let type: ContentSection['type'] = 'main';
        let priority = 1;

        if (title.toLowerCase().includes('keynote')) {
          type = 'keynote';
          priority = 1;
        } else if (
          title.toLowerCase().includes('open access') ||
          title.toLowerCase().includes('commitment')
        ) {
          type = 'side-note';
          priority = 3;
        } else if (
          title.toLowerCase().includes('looking forward') ||
          title.toLowerCase().includes('future')
        ) {
          type = 'future';
          priority = 2;
        } else if (
          title.toLowerCase().includes('community') ||
          title.toLowerCase().includes('impact')
        ) {
          type = 'community';
          priority = 2;
        }

        sections.push({
          title,
          content: contentMatch.trim(),
          type,
          priority,
        });
      }
    }
  }

  return sections.sort((a, b) => a.priority - b.priority);
}
