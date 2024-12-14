import { Observable } from '@nativescript/core';

export interface ThemeConfig {
  isDark: boolean;
  primaryColor: string;
  accentColor: string;
}

export class ThemeService extends Observable {
  private static instance: ThemeService;
  private currentTheme: ThemeConfig;

  private constructor() {
    super();
    this.currentTheme = {
      isDark: false,
      primaryColor: '#10B981',
      accentColor: '#4CAF50'
    };
  }

  public static getInstance(): ThemeService {
    if (!ThemeService.instance) {
      ThemeService.instance = new ThemeService();
    }
    return ThemeService.instance;
  }

  getTheme(): ThemeConfig {
    return { ...this.currentTheme };
  }

  toggleDarkMode(): void {
    this.currentTheme.isDark = !this.currentTheme.isDark;
    this.notifyPropertyChange('currentTheme', this.currentTheme);
  }

  setPrimaryColor(color: string): void {
    this.currentTheme.primaryColor = color;
    this.notifyPropertyChange('currentTheme', this.currentTheme);
  }
}