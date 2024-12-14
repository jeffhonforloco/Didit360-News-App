export interface AutomationConfig {
  updateInterval: number;
  retryAttempts: number;
  retryDelay: number;
}

export interface AutomationStatus {
  isRunning: boolean;
  lastUpdate: Date;
  nextUpdate: Date;
  errors: AutomationError[];
}

export interface AutomationError {
  timestamp: Date;
  message: string;
  category?: string;
}