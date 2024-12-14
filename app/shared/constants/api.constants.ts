export const API_ENDPOINTS = {
  TOP_HEADLINES: '/top-headlines',
  EVERYTHING: '/everything'
} as const;

export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
} as const;

export const API_ERROR_CODES = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  API_ERROR: 'API_ERROR',
  RATE_LIMIT_EXCEEDED: 'rateLimitExceeded',
  API_KEY_INVALID: 'apiKeyInvalid',
  PARAMETER_INVALID: 'parameterInvalid'
} as const;