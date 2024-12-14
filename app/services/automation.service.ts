import { Observable } from '@nativescript/core';
import { NewsService } from './news.service';
import { ContentFilterService } from './content-filter.service';
import { CategoryClassifier } from '../utils/category-classifier';
import { NEWS_CATEGORIES } from '../shared/constants/categories';
import { Article } from '../shared/interfaces/news.interface';
import { showToast } from '../shared/utils/ui.utils';

export class AutomationService extends Observable {
  private static instance: AutomationService;
  private newsService: NewsService;
  private contentFilter: ContentFilterService;
  private categoryClassifier: CategoryClassifier;
  private updateInterval: number;
  private isRunning: boolean;

  private constructor() {
    super();
    this.newsService = NewsService.getInstance();
    this.contentFilter = ContentFilterService.getInstance();
    this.categoryClassifier = new CategoryClassifier();
    this.updateInterval = 30 * 60 * 1000; // 30 minutes
    this.isRunning = false;
  }

  public static getInstance(): AutomationService {
    if (!AutomationService.instance) {
      AutomationService.instance = new AutomationService();
    }
    return AutomationService.instance;
  }

  startAutomation(): void {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.scheduleUpdates();
    showToast('News automation started');
  }

  stopAutomation(): void {
    this.isRunning = false;
    showToast('News automation stopped');
  }

  private scheduleUpdates(): void {
    if (!this.isRunning) return;

    this.updateNews()
      .then(() => {
        setTimeout(() => this.scheduleUpdates(), this.updateInterval);
      })
      .catch(error => {
        console.error('Automation error:', error);
        this.stopAutomation();
      });
  }

  private async updateNews(): Promise<void> {
    try {
      for (const category of Object.values(NEWS_CATEGORIES)) {
        const articles = await this.newsService.getArticles(category);
        const filteredArticles = this.contentFilter.filterArticles(articles);
        const categorizedArticles = await this.categorizeArticles(filteredArticles);
        
        // Update articles in the news service
        await this.updateArticleCategories(categorizedArticles);
      }
    } catch (error) {
      console.error('Update news error:', error);
      throw error;
    }
  }

  private async categorizeArticles(articles: Article[]): Promise<Article[]> {
    return Promise.all(
      articles.map(async article => {
        const predictedCategory = await this.categoryClassifier.predict(
          `${article.title} ${article.description}`
        );
        
        return {
          ...article,
          category: {
            ...article.category,
            id: predictedCategory
          }
        };
      })
    );
  }

  private async updateArticleCategories(articles: Article[]): Promise<void> {
    // Implementation for updating article categories in the storage
    console.log('Updated articles with new categories:', articles.length);
  }

  setUpdateInterval(minutes: number): void {
    this.updateInterval = minutes * 60 * 1000;
    showToast(`Update interval set to ${minutes} minutes`);
  }
}