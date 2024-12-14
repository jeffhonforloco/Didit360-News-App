export interface AppState {
  isLoading: boolean;
  error: string | null;
  currentCategory: string;
  refreshTimestamp: number;
}

export interface ViewState extends AppState {
  hasData: boolean;
  isRefreshing: boolean;
}