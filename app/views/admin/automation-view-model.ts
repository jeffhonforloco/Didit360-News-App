import { Observable } from '@nativescript/core';
import { AutomationService } from '../../services/automation.service';
import { CategoryClassifier } from '../../utils/category-classifier';
import { NEWS_CATEGORIES } from '../../shared/constants/categories';
import { showToast } from '../../shared/utils/ui.utils';

export class AutomationViewModel extends Observable {
  private automationService: AutomationService;
  private categoryClassifier: CategoryClassifier;
  private _updateInterval: number = 30;
  private _newPhrase: string = '';
  private _selectedCategoryIndex: number = 0;
  private _categories: string[] = [];
  private _trainingPhrases: { phrase: string; category: string }[] = [];

  constructor() {
    super();
    this.automationService = AutomationService.getInstance();
    this.categoryClassifier = new CategoryClassifier();
    this.setupCategories();
  }

  get updateInterval(): number {
    return this._updateInterval;
  }

  set updateInterval(value: number) {
    this._updateInterval = value;
    this.notifyPropertyChange('updateInterval', value);
  }

  get newPhrase(): string {
    return this._newPhrase;
  }

  set newPhrase(value: string) {
    this._newPhrase = value;
    this.notifyPropertyChange('newPhrase', value);
  }

  get categories(): string[] {
    return this._categories;
  }

  get selectedCategoryIndex(): number {
    return this._selectedCategoryIndex;
  }

  set selectedCategoryIndex(value: number) {
    this._selectedCategoryIndex = value;
    this.notifyPropertyChange('selectedCategoryIndex', value);
  }

  get trainingPhrases(): { phrase: string; category: string }[] {
    return this._trainingPhrases;
  }

  onStartAutomation(): void {
    this.automationService.setUpdateInterval(this._updateInterval);
    this.automationService.startAutomation();
  }

  onStopAutomation(): void {
    this.automationService.stopAutomation();
  }

  onAddPhrase(): void {
    if (!this._newPhrase.trim()) {
      showToast('Please enter a training phrase');
      return;
    }

    const category = Object.values(NEWS_CATEGORIES)[this._selectedCategoryIndex];
    this.categoryClassifier.addTrainingData(category, [this._newPhrase]);
    
    this._trainingPhrases.push({
      phrase: this._newPhrase,
      category
    });
    
    this.notifyPropertyChange('trainingPhrases', this._trainingPhrases);
    this._newPhrase = '';
    this.notifyPropertyChange('newPhrase', '');
    
    showToast('Training phrase added');
  }

  onRemovePhrase(args: any): void {
    const index = args.index;
    this._trainingPhrases.splice(index, 1);
    this.notifyPropertyChange('trainingPhrases', this._trainingPhrases);
    showToast('Training phrase removed');
  }

  private setupCategories(): void {
    this._categories = Object.values(NEWS_CATEGORIES).map(
      category => category.charAt(0).toUpperCase() + category.slice(1)
    );
    this.notifyPropertyChange('categories', this._categories);
  }
}