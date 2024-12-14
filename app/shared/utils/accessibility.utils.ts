export function getAccessibilityLabel(element: string, context?: string): string {
  const labels = {
    refreshButton: 'Refresh news feed',
    articleCard: (title: string) => `Article: ${title}`,
    categoryTab: (category: string) => `${category} news category tab`,
    shareButton: 'Share article',
    errorRetry: 'Retry loading news'
  };

  return context ? labels[element](context) : labels[element];
}

export function announceForAccessibility(message: string): void {
  // Implementation for screen reader announcements
  console.log('Accessibility announcement:', message);
}