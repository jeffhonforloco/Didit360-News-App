import { Article } from '../interfaces';
import { formatPublishDate, calculateReadTime } from '../utils';

export class ArticleHelper {
  static enrichArticle(article: Article): Article {
    return {
      ...article,
      formattedDate: formatPublishDate(article.publishedAt),
      readTime: calculateReadTime(article.content)
    };
  }

  static sortByDate(articles: Article[], order: 'asc' | 'desc' = 'desc'): Article[] {
    return [...articles].sort((a, b) => {
      const comparison = new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      return order === 'desc' ? comparison : -comparison;
    });
  }

  static filterByCategory(articles: Article[], category: string): Article[] {
    return articles.filter(article => article.category.id === category);
  }
}