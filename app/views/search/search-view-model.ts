import { Observable } from '@nativescript/core';
import { SearchService } from '../../services/search.service';
import { Article } from '../../shared/interfaces/news.interface';
import { debounce } from '../../shared/utils/performance.utils';

export class SearchViewModel extends Observable {
  private searchService: SearchService;
  private _searchQuery: string = '';
  private _searchResults: Article[] = [];
  private _isLoading: boolean = false;

  constructor() {
    super();
    this.searchService = SearchService.getInstance();
    this.onSearchTextChanged = debounce(this.onSearchTextChanged.bind(this), 300);
  }

  get searchQuery(): string {
    return this._searchQuery;
  }

  set searchQuery(value: string) {
    this._searchQuery = value;
    this.notifyPropertyChange('searchQuery', value);
  }

  get searchResults(): Article[] {
    return this._searchResults;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  onSearchTextChanged(args: any): void {
    const searchBar = args.object;
    this.searchQuery = searchBar.text;
    this.performSearch();
  }

  async performSearch(): Promise<void> {
    if (!this.searchQuery.trim()) {
      this._searchResults = [];
      this.notifyPropertyChange('searchResults', this._searchResults);
      return;
    }

    this._isLoading = true;
    this.notifyPropertyChange('isLoading', true);

    try {
      this._searchResults = this.searchService.search(this.searchQuery);
      this.notifyPropertyChange('searchResults', this._searchResults);
    } finally {
      this._isLoading = false;
      this.notifyPropertyChange('isLoading', false);
    }
  }

  onArticleTap(args: any): void {
    const article = args.view.bindingContext;
    // Navigate to article detail
  }
}