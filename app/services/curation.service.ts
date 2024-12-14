import { Observable } from '@nativescript/core';
import { Article } from '../shared/interfaces/news.interface';
import { CacheService } from './cache.service';
import { validateArticle } from '../shared/utils/validation.utils';

export class CurationService extends Observable {
  private static instance: CurationService;
  private cacheService: CacheService;
  private curatedArticles: Map<string, Article[]>;

  private constructor() {
    super();
    this.cacheService = CacheService.getInstance();
    this.curatedArticles = new Map();
    this.loadCuratedArticles();
  }

  public static getInstance(): CurationService {
    if (!CurationService.instance) {
      CurationService.instance = new CurationService();
    }
    return CurationService.instance;
  }

  getCuratedArticles(category: string): Article[] {
    return this.curatedArticles.get(category) || [];
  }

  curateArticle(article: Article): void {
    if (!validateArticle(article)) {
      throw new Error('Invalid article data');
    }

    const categoryArticles = this.curatedArticles.get(article.category.id) || [];
    const updatedArticles = [
      { ...article, isCurated: true },
      ...categoryArticles
    ].slice(0, 20); // Keep only top 20 articles

    this.curatedArticles.set(article.category.id, updatedArticles);
    this.saveCuratedArticles();
  }

  removeCuratedArticle(articleId: string, category: string): void {
    const articles = this.curatedArticles.get(category) || [];
    const updatedArticles = articles.filter(article => article.id !== articleId);
    this.curatedArticles.set(category, updatedArticles);
    this.saveCuratedArticles();
  }

  private loadCuratedArticles(): void {
    const cached = this.cacheService.get<Map<string, Article[]>>('curated_articles');
    if (cached) {
      this.curatedArticles = new Map(cached);
    }
  }

  private saveCuratedArticles(): void {
    this.cacheService.set('curated_articles', Array.from(this.curatedArticles.entries()));
  }
}