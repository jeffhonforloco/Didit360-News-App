export const NEWS_CATEGORIES = {
  TRENDING: 'trending',
  CELEBRITY: 'celebrity',
  ENTERTAINMENT: 'entertainment'
} as const;

export type NewsCategory = typeof NEWS_CATEGORIES[keyof typeof NEWS_CATEGORIES];

export const CATEGORY_QUERIES = {
  [NEWS_CATEGORIES.TRENDING]: '',
  [NEWS_CATEGORIES.CELEBRITY]: 'celebrity OR famous OR star',
  [NEWS_CATEGORIES.ENTERTAINMENT]: 'entertainment OR movie OR music OR tv'
};