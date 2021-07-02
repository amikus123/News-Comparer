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
  frequencyOfWords: WordMap;
  wordCount: number;
  headingsData: headingData[];
  imageName: string;
  websiteName: string;
}
export interface headingData {
  emotions?: Emotions;
  text: string;
}

export interface WordMap {
  [key: string]: number;
}
export interface DailyEntry {
  averageEmotion?: Emotions;
  siteData: DailySiteData[];
  totalEmotionCount?: Emotions;
  totalWordCount: number;
  totalHeadingCount?: number;
  frequencyOfWords: any;
}
// websites
export interface PuppeteerData {
  allSiteData: SiteData[];
  screenshots: Screenshot[];
}
export interface Screenshot {
  imageName: string;
  imageUintData: Uint8Array;
}
export interface SiteData {
  headings: string[];
  imageName: string;
  analizeEmotions: boolean;
  nameToDisplay: string;
}
export interface SingleWebisteConstData {
  analizeEmotions: boolean;
  imageName: string;
  nameToDisplay: string;
  popupSelector: string;
  contentSelectors: string[];
  url: string;
  politicalOrientation: string;
}
// meta data
export interface ExcludedWords {
  Words: string[];
}
export interface WebisteInfo {
  [key: string]: SingleWebsiteInfo;
}
export interface SingleWebsiteInfo {
  frequencyOfWords: WordMap;
  totalEmotionCount: Emotions;
  totalHeadingCount: number;
  totalWordCount: number;
}
