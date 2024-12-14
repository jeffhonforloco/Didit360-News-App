import { NavigatedData, Page } from '@nativescript/core';
import { AdminViewModel } from './admin-view-model';

export function onNavigatingTo(args: NavigatedData) {
  const page = <Page>args.object;
  page.bindingContext = new AdminViewModel();
}

export function onArticleTap(args: any) {
  const article = args.view.bindingContext;
  // Handle article tap if needed
  console.log('Article tapped:', article.title);
}