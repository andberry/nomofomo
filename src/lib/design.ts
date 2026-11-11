/** Design-system vocabulary shared by components. */

export const CATEGORY_HUES = ['blue', 'green', 'amber', 'rose', 'violet', 'slate'] as const;
export type CategoryHue = (typeof CATEGORY_HUES)[number];

/** Full class names (not built from strings) so Tailwind can detect them. */
export const hueClass: Record<CategoryHue, string> = {
  blue: 'cat-blue',
  green: 'cat-green',
  amber: 'cat-amber',
  rose: 'cat-rose',
  violet: 'cat-violet',
  slate: 'cat-slate'
};

/** The only words used for source types (brand book: content fundamentals). */
export const SOURCE_TYPES = ['Article', 'Newspaper', 'Social', 'Video', 'Newsletter', 'Blog'] as const;
export type SourceType = (typeof SOURCE_TYPES)[number];
