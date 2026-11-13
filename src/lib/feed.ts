/**
 * Data access for pages. For now everything comes from the static mocks in
 * src/data/mocks; later this is where real fetching from sources plugs in,
 * keeping the same return shapes.
 */
import categoriesJson from '../data/mocks/categories.json';
import itemsJson from '../data/mocks/items.json';
import sourcesJson from '../data/mocks/sources.json';
import type { Category, CategorySummary, NewsItem, ResolvedItem, Source } from './types';

const FEATURED_COUNT = 8;

interface MockItem extends Omit<NewsItem, 'publishedAt'> {
  /** Mock-only: minutes before "now", so relative times stay realistic. */
  ageMinutes: number;
}

export interface HomepageData {
  featured: ResolvedItem[];
  categories: CategorySummary[];
  sourceCount: number;
  fetchedAt: Date;
}

export async function getHomepageData(now: Date = new Date()): Promise<HomepageData> {
  const categories = categoriesJson as Category[];
  const sources = sourcesJson as Source[];

  const categoryById = new Map(categories.map((c) => [c.id, c]));
  const sourceById = new Map(sources.map((s) => [s.id, s]));

  const items: ResolvedItem[] = (itemsJson as MockItem[])
    .map(({ ageMinutes, ...item }) => {
      const source = sourceById.get(item.sourceId);
      const category = source && categoryById.get(source.categoryId);
      if (!source || !category) return undefined;
      return { ...item, publishedAt: new Date(now.getTime() - ageMinutes * 60_000), source, category };
    })
    .filter((item): item is ResolvedItem => item !== undefined)
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());

  const summaries: CategorySummary[] = categories.map((category) => {
    const inCategory = items.filter((i) => i.category.id === category.id);
    return {
      category,
      newCount: inCategory.filter((i) => i.unread).length,
      latest: inCategory[0],
      sources: sources.filter((s) => s.categoryId === category.id)
    };
  });

  // Most new items first; caught-up categories last. Stable sort keeps file order on ties.
  summaries.sort((a, b) => b.newCount - a.newCount);

  return {
    featured: items.slice(0, FEATURED_COUNT),
    categories: summaries,
    sourceCount: sources.length,
    fetchedAt: now
  };
}
