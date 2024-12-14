export function log() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      console.log(`Calling ${propertyKey} with:`, args);
      const start = Date.now();
      
      try {
        const result = await originalMethod.apply(this, args);
        console.log(`${propertyKey} completed in ${Date.now() - start}ms`);
        return result;
      } catch (error) {
        console.error(`${propertyKey} failed:`, error);
        throw error;
      }
    };

    return descriptor;
  };
}