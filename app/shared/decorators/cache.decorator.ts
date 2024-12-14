import { CacheService } from '../../services';

export function cache(key: string, duration?: number) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    const cacheService = CacheService.getInstance();

    descriptor.value = async function (...args: any[]) {
      const cacheKey = `${key}_${JSON.stringify(args)}`;
      const cached = cacheService.get(cacheKey, duration);
      
      if (cached) return cached;

      const result = await originalMethod.apply(this, args);
      cacheService.set(cacheKey, result, duration);
      return result;
    };

    return descriptor;
  };
}