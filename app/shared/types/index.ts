// Export all types from a single entry point
export * from '../interfaces';
export * from '../constants';

// Define common types used across the app
export type Category = 'trending' | 'celebrity' | 'entertainment';
export type ViewState = 'loading' | 'error' | 'empty' | 'data';
export type SortOrder = 'asc' | 'desc';