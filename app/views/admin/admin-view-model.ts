import { Observable } from '@nativescript/core';
import { Article } from '../../shared/interfaces/news.interface';
import { CurationService } from '../../services/curation.service';
import { NEWS_CATEGORIES } from '../../shared/constants/categories';
import { showToast } from '../../shared/utils/ui.utils';

export class AdminViewModel extends Observable {
  private _articles: Article[] = [];
  private _categories: { title: string }[] = [];
  private _selectedCategoryIndex: number = 0;
  private curationService: CurationService;

  constructor() {
    super();
    this.curationService = CurationService.getInstance();
    this.setupCategories();
    this.loadArticles();
  }

  get articles(): Article[] {
    return this._articles;
  }

  get categories(): { title: string }[] {
    return this._categories;
  }

  get selectedCategoryIndex(): number {
    return this._selectedCategoryIndex;
  }

  set selectedCategoryIndex(value: number) {
    if (this._selectedCategoryIndex !== value) {
      this._selectedCategoryIndex = value;
      this.notifyPropertyChange('selectedCategoryIndex', value);
      this.loadArticles();
    }
  }

  private setupCategories(): void {
    this._categories = Object.values(NEWS_CATEGORIES).map(category => ({
      title: category.charAt(0).toUpperCase() + category.slice(1)
    }));
    this.notifyPropertyChange('categories', this._categories);
  }

  private async loadArticles(): void {
    const category = Object.values(NEWS_CATEGORIES)[this._selectedCategoryIndex];
    this._articles = this.curationService.getCuratedArticles(category);
    this.notifyPropertyChange('articles', this._articles);
  }

  toggleCuration(args: any): void {
    const article: Article = args.object.bindingContext;
    try {
      if (article.isCurated) {
        this.curationService.removeCuratedArticle(article.id, article.category.id);
        showToast('Article removed from curation');
      } else {
        this.curationService.curateArticle(article);
        showToast('Article added to curation');
      }
      this.loadArticles();
    } catch (error) {
      showToast('Failed to update curation status');
      console.error('Curation error:', error);
    }
  }
}