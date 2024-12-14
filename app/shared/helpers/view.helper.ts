import { ViewState } from '../types';
import { showToast } from '../utils';

export class ViewHelper {
  static handleError(error: Error): void {
    console.error('View Error:', error);
    showToast(error.message);
  }

  static getViewState(isLoading: boolean, hasError: boolean, hasData: boolean): ViewState {
    if (isLoading) return 'loading';
    if (hasError) return 'error';
    if (!hasData) return 'empty';
    return 'data';
  }
}