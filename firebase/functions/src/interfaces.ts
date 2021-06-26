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
  frequencyOfWords: any;
  wordCount: number;
  headingsData: headingData[];
  imageName: string;
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
  averageSentiment?: number;
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
  screenshots: {
    imageName: string;
    imageBuffer: null | Buffer;
  }[];
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
}
// meta data
