import { Observable } from '@nativescript/core';
import { BookmarkService } from '../../services/bookmark.service';
import { Article } from '../../shared/interfaces/news.interface';
import { showToast } from '../../shared/utils/ui.utils';

export class BookmarksViewModel extends Observable {
  private bookmarkService: BookmarkService;
  private _bookmarks: Article[] = [];

  constructor() {
    super();
    this.bookmarkService = BookmarkService.getInstance();
    this.loadBookmarks();
  }

  get bookmarks(): Article[] {
    return this._bookmarks;
  }

  loadBookmarks(): void {
    this._bookmarks = this.bookmarkService.getBookmarks();
    this.notifyPropertyChange('bookmarks', this._bookmarks);
  }

  onRemoveBookmark(args: any): void {
    const article = args.object.bindingContext;
    this.bookmarkService.removeBookmark(article.id);
    this.loadBookmarks();
    showToast('Bookmark removed');
  }

  onArticleTap(args: any): void {
    const article = args.view.bindingContext;
    // Navigate to article detail
  }
}