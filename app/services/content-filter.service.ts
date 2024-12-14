import { Observable } from '@nativescript/core';
import { Article } from '../shared/interfaces/news.interface';
import { sanitizeHtml } from '../shared/utils/string.utils';

export class ContentFilterService extends Observable {
  private static instance: ContentFilterService;
  private blockedKeywords: Set<string>;
  private blockedSources: Set<string>;

  private constructor() {
    super();
    this.blockedKeywords = new Set();
    this.blockedSources = new Set();
  }

  public static getInstance(): ContentFilterService {
    if (!ContentFilterService.instance) {
      ContentFilterService.instance = new ContentFilterService();
    }
    return ContentFilterService.instance;
  }

  filterArticles(articles: Article[]): Article[] {
    return articles.filter(article => 
      this.isValidContent(article) &&
      !this.containsBlockedKeywords(article) &&
      !this.isBlockedSource(article.source.id)
    );
  }

  private isValidContent(article: Article): boolean {
    return (
      article.title?.trim().length > 0 &&
      article.description?.trim().length > 0 &&
      article.imageUrl?.trim().length > 0
    );
  }

  private containsBlockedKeywords(article: Article): boolean {
    const content = [
      article.title,
      article.description,
      article.content
    ].join(' ').toLowerCase();

    return Array.from(this.blockedKeywords).some(keyword => 
      content.includes(keyword.toLowerCase())
    );
  }

  private isBlockedSource(sourceId: string): boolean {
    return this.blockedSources.has(sourceId);
  }

  addBlockedKeyword(keyword: string): void {
    this.blockedKeywords.add(keyword.toLowerCase());
  }

  removeBlockedKeyword(keyword: string): void {
    this.blockedKeywords.delete(keyword.toLowerCase());
  }

  addBlockedSource(sourceId: string): void {
    this.blockedSources.add(sourceId);
  }

  removeBlockedSource(sourceId: string): void {
    this.blockedSources.delete(sourceId);
  }
}