import { SocialShare } from '@nativescript/social-share';
import { Article } from '../shared/interfaces/news.interface';

export class ShareService {
  private static instance: ShareService;

  private constructor() {}

  public static getInstance(): ShareService {
    if (!ShareService.instance) {
      ShareService.instance = new ShareService();
    }
    return ShareService.instance;
  }

  async shareArticle(article: Article): Promise<void> {
    try {
      await SocialShare.shareText(
        `${article.title}\n\n${article.description}\n\nRead more at: ${article.sourceUrl}`,
        'Share Article'
      );
    } catch (error) {
      console.error('Error sharing article:', error);
      throw error;
    }
  }
}