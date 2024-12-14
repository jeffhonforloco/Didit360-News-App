import { Article } from '../interfaces/news.interface';

export function validateCurationRights(): boolean {
  // Implement actual admin rights validation
  return true;
}

export function filterCuratedArticles(articles: Article[]): Article[] {
  return articles.filter(article => article.isCurated);
}

export function sortArticlesByDate(articles: Article[]): Article[] {
  return [...articles].sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}