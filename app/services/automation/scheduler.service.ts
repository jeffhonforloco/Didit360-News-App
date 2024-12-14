import { Observable } from '@nativescript/core';
import { AutomationConfig } from '../../shared/interfaces/automation.interface';

export class SchedulerService extends Observable {
  private static instance: SchedulerService;
  private timers: Map<string, number>;
  private config: AutomationConfig;

  private constructor() {
    super();
    this.timers = new Map();
    this.config = {
      updateInterval: 30 * 60 * 1000, // 30 minutes
      retryAttempts: 3,
      retryDelay: 5000
    };
  }

  public static getInstance(): SchedulerService {
    if (!SchedulerService.instance) {
      SchedulerService.instance = new SchedulerService();
    }
    return SchedulerService.instance;
  }

  scheduleTask(taskId: string, task: () => Promise<void>): void {
    this.clearTask(taskId);
    
    const timer = setInterval(async () => {
      try {
        await this.executeWithRetry(task);
      } catch (error) {
        console.error(`Task ${taskId} failed:`, error);
      }
    }, this.config.updateInterval);

    this.timers.set(taskId, timer);
  }

  clearTask(taskId: string): void {
    const timer = this.timers.get(taskId);
    if (timer) {
      clearInterval(timer);
      this.timers.delete(taskId);
    }
  }

  private async executeWithRetry(task: () => Promise<void>): Promise<void> {
    let attempts = 0;
    
    while (attempts < this.config.retryAttempts) {
      try {
        await task();
        return;
      } catch (error) {
        attempts++;
        if (attempts === this.config.retryAttempts) throw error;
        await new Promise(resolve => setTimeout(resolve, this.config.retryDelay));
      }
    }
  }

  updateConfig(config: Partial<AutomationConfig>): void {
    this.config = { ...this.config, ...config };
  }
}