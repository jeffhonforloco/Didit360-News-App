import { Observable } from '@nativescript/core';
import { NewsSource } from '../shared/interfaces/news.interface';
import { ApiService } from './api.service';
import { CacheService } from './cache.service';

export class SourceService extends Observable {
  private static instance: SourceService;
  private apiService: ApiService;
  private cacheService: CacheService;

  private constructor() {
    super();
    this.apiService = ApiService.getInstance();
    this.cacheService = CacheService.getInstance();
  }

  public static getInstance(): SourceService {
    if (!SourceService.instance) {
      SourceService.instance = new SourceService();
    }
    return SourceService.instance;
  }

  async getSources(): Promise<NewsSource[]> {
    const cacheKey = 'news_sources';
    const cached = this.cacheService.get<NewsSource[]>(cacheKey);
    if (cached) return cached;

    const response = await this.apiService.get('/sources', {
      language: 'en',
      country: 'us'
    });

    const sources = response.sources.map(this.transformSource);
    this.cacheService.set(cacheKey, sources, 24 * 60 * 60 * 1000); // Cache for 24 hours
    return sources;
  }

  private transformSource(source: any): NewsSource {
    return {
      id: source.id,
      name: source.name,
      url: source.url
    };
  }
}