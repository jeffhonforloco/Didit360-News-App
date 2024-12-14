import { Observable } from '@nativescript/core';
import { NewsService } from '../news.service';
import { ContentFilterService } from '../content-filter.service';
import { CurationService } from '../curation.service';
import { NEWS_CATEGORIES } from '../../shared/constants/categories';
import { Article } from '../../shared/interfaces/news.interface';

export class NewsUpdaterService extends Observable {
  private static instance: NewsUpdaterService;
  private newsService: NewsService;
  private contentFilter: ContentFilterService;
  private curationService: CurationService;

  private constructor() {
    super();
    this.newsService = NewsService.getInstance();
    this.contentFilter = ContentFilterService.getInstance();
    this.curationService = CurationService.getInstance();
  }

  public static getInstance(): NewsUpdaterService {
    if (!NewsUpdaterService.instance) {
      NewsUpdaterService.instance = new NewsUpdaterService();
    }
    return NewsUpdaterService.instance;
  }

  async updateAllCategories(): Promise<void> {
    await Promise.all(
      Object.values(NEWS_CATEGORIES).map(category => 
        this.updateCategory(category)
      )
    );
  }

  private async updateCategory(category: string): Promise<void> {
    const articles = await this.newsService.getArticles(category);
    const filteredArticles = this.contentFilter.filterArticles(articles);
    
    // Update curated articles if they meet criteria
    filteredArticles.forEach(article => {
      if (this.shouldCurate(article)) {
        this.curationService.curateArticle(article);
      }
    });
  }

  private shouldCurate(article: Article): boolean {
    // Implement curation criteria
    return article.title.length > 0 && 
           article.description.length > 0 && 
           article.imageUrl.length > 0;
  }
}