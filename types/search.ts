export type SearchDocType =
  | 'news'
  | 'journal-volume'
  | 'conference'
  | 'timeline';

export interface SearchDoc {
  id: string;
  slug?: string;
  title: string;
  type: SearchDocType;
  href: string;
  date?: string;
  year?: number;
  authors: string[];
  keywords?: string[];
  tags: string[];
  excerpt: string;
  body: string;
}

export interface SearchIndexFile {
  version: number;
  docs: SearchDoc[];
}
