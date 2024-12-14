import { Observable } from '@nativescript/core';
import { Article } from '../../shared/interfaces/news.interface';
import { NewsService } from '../../services/news.service';
import { NEWS_CATEGORIES } from '../../shared/constants/categories';
import { AppError } from '../../shared/utils/error.utils';

export class HomeViewModel extends Observable {
  private _articles: Map<string, Article[]>;
  private _isLoading: boolean;
  private _error: string | null;
  private newsService: NewsService;

  constructor() {
    super();
    this._articles = new Map();
    this._isLoading = false;
    this._error = null;
    this.newsService = NewsService.getInstance();
    this.loadAllArticles();
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  get error(): string | null {
    return this._error;
  }

  get trendingArticles(): Article[] {
    return this._articles.get(NEWS_CATEGORIES.TRENDING) || [];
  }

  get celebrityArticles(): Article[] {
    return this._articles.get(NEWS_CATEGORIES.CELEBRITY) || [];
  }

  get entertainmentArticles(): Article[] {
    return this._articles.get(NEWS_CATEGORIES.ENTERTAINMENT) || [];
  }

  async loadAllArticles() {
    this._isLoading = true;
    this._error = null;
    this.notifyPropertyChange('isLoading', true);

    try {
      await Promise.all(
        Object.values(NEWS_CATEGORIES).map(category => 
          this.loadArticlesByCategory(category)
        )
      );
    } catch (error) {
      this._error = error instanceof AppError ? error.message : 'An unexpected error occurred';
      this.notifyPropertyChange('error', this._error);
    } finally {
      this._isLoading = false;
      this.notifyPropertyChange('isLoading', false);
    }
  }

  private async loadArticlesByCategory(category: string) {
    const articles = await this.newsService.getArticles(category);
    this._articles.set(category, articles);
    this.notifyPropertyChange(`${category}Articles`, articles);
  }
}