export const API_CONFIG = {
  baseUrl: 'https://newsapi.org/v2',
  endpoints: {
    trending: '/top-headlines',
    celebrity: '/everything',
    entertainment: '/everything'
  },
  defaultParams: {
    language: 'en',
    pageSize: 20
  }
};