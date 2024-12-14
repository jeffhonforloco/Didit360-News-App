import { NavigatedData, Page } from '@nativescript/core';
import { HomeViewModel } from './home-view-model';

let viewModel: HomeViewModel;

export function onNavigatingTo(args: NavigatedData) {
  const page = <Page>args.object;
  viewModel = new HomeViewModel();
  page.bindingContext = viewModel;
}

export function onArticleTap(args: any) {
  const article = args.view.bindingContext;
  // TODO: Navigate to article detail page
  console.log('Article tapped:', article.title);
}

export function onRefresh() {
  viewModel.loadAllArticles();
}

export function onRetry() {
  viewModel.loadAllArticles();
}