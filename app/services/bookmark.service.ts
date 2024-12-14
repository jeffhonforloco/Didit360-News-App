import { Observable } from '@nativescript/core';
import { Article } from '../shared/interfaces/news.interface';
import { CacheService } from './cache.service';

export class BookmarkService extends Observable {
  private static instance: BookmarkService;
  private cacheService: CacheService;
  private readonly BOOKMARKS_KEY = 'user_bookmarks';
  private bookmarks: Map<string, Article>;

  private constructor() {
    super();
    this.cacheService = CacheService.getInstance();
    this.bookmarks = new Map();
    this.loadBookmarks();
  }

  public static getInstance(): BookmarkService {
    if (!BookmarkService.instance) {
      BookmarkService.instance = new BookmarkService();
    }
    return BookmarkService.instance;
  }

  getBookmarks(): Article[] {
    return Array.from(this.bookmarks.values());
  }

  addBookmark(article: Article): void {
    this.bookmarks.set(article.id, article);
    this.saveBookmarks();
    this.notifyPropertyChange('bookmarks', this.getBookmarks());
  }

  removeBookmark(articleId: string): void {
    this.bookmarks.delete(articleId);
    this.saveBookmarks();
    this.notifyPropertyChange('bookmarks', this.getBookmarks());
  }

  isBookmarked(articleId: string): boolean {
    return this.bookmarks.has(articleId);
  }

  private loadBookmarks(): void {
    const saved = this.cacheService.get<[string, Article][]>(this.BOOKMARKS_KEY);
    if (saved) {
      this.bookmarks = new Map(saved);
    }
  }

  private saveBookmarks(): void {
    this.cacheService.set(
      this.BOOKMARKS_KEY,
      Array.from(this.bookmarks.entries())
    );
  }
}