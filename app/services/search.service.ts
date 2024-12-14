import { Observable } from '@nativescript/core';
import { Article } from '../shared/interfaces/news.interface';
import { debounce } from '../shared/utils/performance.utils';

export class SearchService extends Observable {
  private static instance: SearchService;
  private searchIndex: Map<string, Article[]>;

  private constructor() {
    super();
    this.searchIndex = new Map();
  }

  public static getInstance(): SearchService {
    if (!SearchService.instance) {
      SearchService.instance = new SearchService();
    }
    return SearchService.instance;
  }

  indexArticles(articles: Article[]): void {
    articles.forEach(article => {
      const keywords = this.extractKeywords(article);
      keywords.forEach(keyword => {
        const existing = this.searchIndex.get(keyword) || [];
        this.searchIndex.set(keyword, [...existing, article]);
      });
    });
  }

  search(query: string): Article[] {
    if (!query.trim()) return [];

    const keywords = query.toLowerCase().split(/\s+/);
    const results = new Map<string, { article: Article; relevance: number }>();

    keywords.forEach(keyword => {
      this.searchIndex.forEach((articles, indexedKeyword) => {
        if (indexedKeyword.includes(keyword)) {
          articles.forEach(article => {
            const existing = results.get(article.id);
            const relevance = existing ? existing.relevance + 1 : 1;
            results.set(article.id, { article, relevance });
          });
        }
      });
    });

    return Array.from(results.values())
      .sort((a, b) => b.relevance - a.relevance)
      .map(result => result.article);
  }

  private extractKeywords(article: Article): string[] {
    const text = `${article.title} ${article.description} ${article.category.name}`.toLowerCase();
    return text.split(/\W+/).filter(word => word.length > 2);
  }
}