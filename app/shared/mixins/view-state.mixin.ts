import { Observable } from '@nativescript/core';
import { ViewState } from '../types';

export function withViewState<T extends new (...args: any[]) => Observable>(Base: T) {
  return class extends Base {
    private _viewState: ViewState = 'loading';
    private _error: string | null = null;

    get viewState(): ViewState {
      return this._viewState;
    }

    get error(): string | null {
      return this._error;
    }

    protected setViewState(state: ViewState, error?: string): void {
      this._viewState = state;
      this._error = error || null;
      this.notifyPropertyChange('viewState', state);
      this.notifyPropertyChange('error', this._error);
    }
  };
}