import type { CategoryHue, SourceType } from './design';

export interface Category {
  id: string;
  name: string;
  hue: CategoryHue;
}

export interface Source {
  id: string;
  name: string;
  type: SourceType;
  categoryId: string;
  url: string;
}

export interface NewsItem {
  id: string;
  sourceId: string;
  title: string;
  excerpt?: string;
  url: string;
  publishedAt: Date;
  image?: { src: string; alt: string };
  /** Videos only, e.g. "18:42". */
  duration?: string;
  unread: boolean;
}

/** An item joined with its source and category, ready for display. */
export interface ResolvedItem extends NewsItem {
  source: Source;
  category: Category;
}

export interface CategorySummary {
  category: Category;
  newCount: number;
  latest?: ResolvedItem;
  sources: Source[];
}
