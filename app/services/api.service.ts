import { Http } from '@nativescript/core';
import { API_CONFIG } from '../config/api.config';

export class ApiService {
  private static instance: ApiService;
  private apiKey: string;

  private constructor() {
    // TODO: Store API key securely
    this.apiKey = 'YOUR_API_KEY';
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  async get(endpoint: string, params: object = {}): Promise<any> {
    try {
      const url = this.buildUrl(endpoint, params);
      const response = await Http.request({
        url,
        method: 'GET',
        headers: this.getHeaders()
      });
      return response.content.toJSON();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  private buildUrl(endpoint: string, params: object): string {
    const queryParams = new URLSearchParams({
      ...API_CONFIG.defaultParams,
      ...params,
      apiKey: this.apiKey
    }).toString();
    
    return `${API_CONFIG.baseUrl}${endpoint}?${queryParams}`;
  }

  private getHeaders(): object {
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
  }
}