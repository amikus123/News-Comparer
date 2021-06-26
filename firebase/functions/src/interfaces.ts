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
  averageSentiment?: number;
  frequencyOfWords: Map<string, number>;
  headingsData: headingData[];
  imageFile: string;
  websiteName: string;
}
export interface headingData {
  sentiment?: number;
  emotions?: Emotions;
  text: string;
}
export interface ExcludedWords {
  Words: string[];
}
export interface DailyEntry {
  averageSentiment: number;
  averageEmotion: Emotions;
  siteData: DailySiteData[];
  totalEmotionCount: Emotions;
  totalWordCount: number;
  totalHeadingCount: number;
  frequencyOfWords: Map<string, number>;
}
// websites
export interface PuppeteerData {
  headings: {
    [key: string]: any;
  };
  screenshots: {
    fileName: string;
    imageBuffer: null | Buffer;
  }[];
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
