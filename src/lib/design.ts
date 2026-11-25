/** Design-system vocabulary shared by components. */

export const CATEGORY_HUES = ['blue', 'green', 'amber', 'rose', 'violet', 'slate'] as const;
export type CategoryHue = (typeof CATEGORY_HUES)[number];

/** The only words used for source types (brand book: content fundamentals). */
export const SOURCE_TYPES = ['Article', 'Newspaper', 'Social', 'Video', 'Newsletter', 'Blog'] as const;
export type SourceType = (typeof SOURCE_TYPES)[number];
