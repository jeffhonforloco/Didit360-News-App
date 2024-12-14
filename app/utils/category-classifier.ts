import * as natural from 'natural';
import { NEWS_CATEGORIES } from '../shared/constants/categories';

export class CategoryClassifier {
  private classifier: natural.BayesClassifier;
  private readonly trainingData: { [key: string]: string[] };

  constructor() {
    this.classifier = new natural.BayesClassifier();
    this.trainingData = {
      [NEWS_CATEGORIES.TRENDING]: [
        'breaking news', 'latest updates', 'current events',
        'top stories', 'viral news', 'trending topics'
      ],
      [NEWS_CATEGORIES.CELEBRITY]: [
        'celebrity news', 'famous people', 'stars',
        'hollywood', 'celebrity gossip', 'entertainment news'
      ],
      [NEWS_CATEGORIES.ENTERTAINMENT]: [
        'movies', 'music', 'television', 'shows',
        'entertainment industry', 'media news'
      ]
    };
    this.trainClassifier();
  }

  private trainClassifier(): void {
    Object.entries(this.trainingData).forEach(([category, phrases]) => {
      phrases.forEach(phrase => {
        this.classifier.addDocument(phrase, category);
      });
    });
    this.classifier.train();
  }

  async predict(text: string): Promise<string> {
    const classification = this.classifier.classify(text.toLowerCase());
    return classification || NEWS_CATEGORIES.TRENDING;
  }

  addTrainingData(category: string, phrases: string[]): void {
    phrases.forEach(phrase => {
      this.classifier.addDocument(phrase, category);
    });
    this.classifier.train();
  }
}