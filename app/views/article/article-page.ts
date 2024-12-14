import { NavigatedData, Page } from '@nativescript/core';
import { ArticleViewModel } from './article-view-model';
import { Article } from '../../shared/interfaces/news.interface';
import { utils } from '@nativescript/core';

let viewModel: ArticleViewModel;

export function onNavigatingTo(args: NavigatedData) {
  const page = <Page>args.object;
  const article = <Article>args.context;
  
  viewModel = new ArticleViewModel(article);
  page.bindingContext = viewModel;
}

export function onShare() {
  viewModel.shareArticle();
}

export function onReadFullArticle() {
  utils.openUrl(viewModel.article.sourceUrl);
}