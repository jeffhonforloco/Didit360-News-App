import { Observable } from '@nativescript/core';
import { Article } from '../shared/interfaces/news.interface';
import { ApiService } from './api.service';
import { API_CONFIG } from '../config/api.config';
import { NEWS_CATEGORIES, CATEGORY_QUERIES } from '../shared/constants/categories';
import { handleApiError } from '../shared/utils/error.utils';
import { sanitizeHtml } from '../shared/utils/string.utils';
import { calculateReadTime } from '../shared/utils/date.utils';

export class NewsService extends Observable {
  private static instance: NewsService;
  private apiService: ApiService;
  private cache: Map<string, { data: Article[], timestamp: number }>;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
  
  private constructor() {
    super();
    this.apiService = ApiService.getInstance();
    this.cache = new Map();
  }

  public static getInstance(): NewsService {
    if (!NewsService.instance) {
      NewsService.instance = new NewsService();
    }
    return NewsService.instance;
  }

  async getArticles(category: string): Promise<Article[]> {
    try {
      const cachedData = this.getCachedData(category);
      if (cachedData) return cachedData;

      const endpoint = API_CONFIG.endpoints[category];
      const params = {
        category,
        q: CATEGORY_QUERIES[category]
      };

      const response = await this.apiService.get(endpoint, params);
      const articles = this.transformArticles(response.articles, category);
      
      this.cacheData(category, articles);
      return articles;
    } catch (error) {
      return handleApiError(error);
    }
  }

  private getCachedData(category: string): Article[] | null {
    const cached = this.cache.get(category);
    if (!cached) return null;

    const isExpired = Date.now() - cached.timestamp > this.CACHE_DURATION;
    if (isExpired) {
      this.cache.delete(category);
      return null;
    }

    return cached.data;
  }

  private cacheData(category: string, articles: Article[]): void {
    this.cache.set(category, {
      data: articles,
      timestamp: Date.now()
    });
  }

  private transformArticles(articles: any[], category: string): Article[] {
    return articles.map(article => ({
      id: article.url,
      title: article.title,
      description: sanitizeHtml(article.description || ''),
      content: sanitizeHtml(article.content || ''),
      imageUrl: article.urlToImage,
      sourceUrl: article.url,
      source: {
        id: article.source.id,
        name: article.source.name,
        url: article.url
      },
      category: {
        id: category,
        name: category.charAt(0).toUpperCase() + category.slice(1),
        slug: category,
        description: `${category} news`
      },
      publishedAt: new Date(article.publishedAt),
      isCurated: false,
      readTime: calculateReadTime(article.content || '')
    }));
  }
}