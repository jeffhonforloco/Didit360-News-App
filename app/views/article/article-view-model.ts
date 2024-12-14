import { Observable } from '@nativescript/core';
import { Article } from '../../shared/interfaces/news.interface';
import { AnalyticsService } from '../../services/analytics.service';

export class ArticleViewModel extends Observable {
  private _article: Article;
  private _isLoading: boolean;
  private analyticsService: AnalyticsService;

  constructor(article: Article) {
    super();
    this._article = article;
    this._isLoading = false;
    this.analyticsService = AnalyticsService.getInstance();
    this.trackArticleView();
  }

  get article(): Article {
    return this._article;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  private trackArticleView(): void {
    this.analyticsService.trackEvent(
      'article',
      'view',
      `${this._article.category.id}/${this._article.id}`
    );
  }

  async shareArticle(): Promise<void> {
    // Implement share functionality
    this.analyticsService.trackEvent('article', 'share', this._article.id);
  }
}