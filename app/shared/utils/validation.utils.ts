export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function isValidDate(date: string): boolean {
  const timestamp = Date.parse(date);
  return !isNaN(timestamp);
}

export function validateArticle(article: any): boolean {
  return (
    article &&
    typeof article.title === 'string' &&
    typeof article.url === 'string' &&
    isValidUrl(article.url) &&
    isValidDate(article.publishedAt)
  );
}