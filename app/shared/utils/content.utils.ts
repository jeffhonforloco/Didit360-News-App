import { sanitizeHtml } from './string.utils';
import { Article } from '../interfaces/news.interface';

export function enrichArticleContent(article: Article): Article {
  return {
    ...article,
    description: sanitizeHtml(article.description),
    content: sanitizeHtml(article.content),
    readTime: calculateReadTime(article.content),
    imageUrl: ensureImageUrl(article.imageUrl)
  };
}

export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

export function ensureImageUrl(url: string): string {
  if (!url || !isValidImageUrl(url)) {
    return 'res://placeholder_article';
  }
  return url;
}

function isValidImageUrl(url: string): boolean {
  if (!url) return false;
  return /\.(jpg|jpeg|png|webp|gif)$/i.test(url);
}