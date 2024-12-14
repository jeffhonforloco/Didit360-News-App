export interface CacheItem<T> {
  data: T;
  timestamp: number;
}

export class CacheService {
  private static instance: CacheService;
  private cache: Map<string, CacheItem<any>>;
  private readonly defaultDuration: number;

  private constructor(defaultDuration: number = 5 * 60 * 1000) {
    this.cache = new Map();
    this.defaultDuration = defaultDuration;
  }

  public static getInstance(): CacheService {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService();
    }
    return CacheService.instance;
  }

  set<T>(key: string, data: T, duration?: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  get<T>(key: string, duration: number = this.defaultDuration): T | null {
    const item = this.cache.get(key);
    if (!item) return null;

    const isExpired = Date.now() - item.timestamp > duration;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  remove(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }
}