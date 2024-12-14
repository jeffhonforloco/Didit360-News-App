import { Observable } from '@nativescript/core';

export class AnalyticsService extends Observable {
  private static instance: AnalyticsService;

  private constructor() {
    super();
  }

  public static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  trackScreenView(screenName: string): void {
    console.log(`Screen viewed: ${screenName}`);
    // Implement actual analytics tracking
  }

  trackEvent(category: string, action: string, label?: string): void {
    console.log(`Event tracked: ${category} - ${action} ${label ? `(${label})` : ''}`);
    // Implement actual analytics tracking
  }

  trackError(error: Error, fatal: boolean = false): void {
    console.error(`Error tracked: ${error.message}`, { fatal });
    // Implement actual error tracking
  }
}