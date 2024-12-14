export interface NewsSource {
  id: string;
  name: string;
  url: string;
}

export interface NewsCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  sourceUrl: string;
  source: NewsSource;
  category: NewsCategory;
  publishedAt: Date;
  isCurated: boolean;
  readTime: number;
}