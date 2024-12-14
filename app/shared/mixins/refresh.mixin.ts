import { Observable } from '@nativescript/core';
import { debounce } from '../utils';

export function withRefresh<T extends new (...args: any[]) => Observable>(Base: T) {
  return class extends Base {
    private _isRefreshing: boolean = false;

    get isRefreshing(): boolean {
      return this._isRefreshing;
    }

    protected setRefreshing(value: boolean): void {
      this._isRefreshing = value;
      this.notifyPropertyChange('isRefreshing', value);
    }

    protected refresh = debounce(async () => {
      if (this._isRefreshing) return;
      
      this.setRefreshing(true);
      try {
        await this.onRefresh?.();
      } finally {
        this.setRefreshing(false);
      }
    }, 300);

    protected onRefresh?(): Promise<void>;
  };
}