export interface Article {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  sourceUrl: string;
  sourceName: string;
  category: 'trending' | 'celebrity' | 'entertainment';
  publishedAt: Date;
  isCurated: boolean;
}