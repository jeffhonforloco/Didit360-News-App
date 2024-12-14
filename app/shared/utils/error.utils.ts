export class AppError extends Error {
  constructor(message: string, public code?: string, public originalError?: any) {
    super(message);
    this.name = 'AppError';
  }
}

export function handleApiError(error: any): never {
  console.error('API Error:', error);
  
  if (error.response) {
    throw new AppError(
      'Failed to fetch news data',
      'API_ERROR',
      error
    );
  }
  
  throw new AppError(
    'Network error occurred',
    'NETWORK_ERROR',
    error
  );
}