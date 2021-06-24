export interface WebsiteDatabaseEntry {
  analizeEmotions: boolean;
  url: string;
  popupSelector: string;
  imageName: string;
  nameToDisplay: string;
  contentSelectors: string[];
}
export interface Emotions {
  anger?: number;
  sadness?: number;
  fear?: number;
  joy?: number;
  analytical?: number;
  confident?: number;
  tentative?: number;
}

export interface DailySiteData {
  averageSentiment: number | null;
  frequencyOfWords: WordMap;
  headingsData: headingData[];
  imageFile: string;
}
export interface headingData {
  sentiment: number | null;
  emotions: Emotions | null;
  text: string;
}

export interface WordMap {
  [key: string]: string;
}
interface DailyEntry {
  averageSentiment: number;
  averageEmotion: Emotions;
  siteData: DailySiteData[];
  totalEmotionCount: Emotions;
  totalWordCount: number;
  totalHeadingCount: number;
  frequencyOfWords: WordMap;
}
// websites
export interface WebsitesConstData {
  [key: string]: SingleWebisteConstData;
}
export interface SingleWebisteConstData {
  analizeEmotions: boolean;
  imageName: string;
  nameToDisplat: string;
  popupSelector: string;
  selectors: string[];
  url: string;
}
// meta data
