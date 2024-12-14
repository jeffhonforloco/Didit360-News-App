export interface ApiResponse<T> {
  status: string;
  totalResults?: number;
  articles?: T[];
  message?: string;
  code?: string;
}

export interface ApiRequestConfig {
  endpoint: string;
  params?: Record<string, string | number>;
  headers?: Record<string, string>;
}