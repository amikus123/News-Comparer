export interface DatabaseStaticDataInRows {
  leftRow: WebsiteStaticData[];
  centerRow: WebsiteStaticData[];
  rightRow: WebsiteStaticData[];
}

export interface WebsiteStaticData {
  analizeEmotions: boolean;
  contentSelectors: string[];
  imageName: string;
  politicalOrientation: string;
  popupSelector: string;
  url: string;
}
export interface WebsiteJointDataInRows {
  leftRow: WebsiteJointData[];
  centerRow: WebsiteJointData[];
  rightRow: WebsiteJointData[];
}
export interface WebsiteJointDataMap {
  [key: string]: WebsiteJointData;
}
export interface WebsiteJointData extends WebsiteStaticData {
  websiteFetchedImagesURLS?: string[];
}
export interface ScreenshotsByDate {
  [date:string] : ScreenshotDayData
}
export interface ScreenshotDayData {
  [webisteName: string]: string;
}
// 
export interface ScreenshostForColumns{
  websiteName:string,
  screenshots:string[]
}
// dates
export interface FringeDates {
  max: Date;
  min: Date;
}

// firestore
export interface Headings{
  [key:string] : DailyHeadings
} 
export interface DailyHeadings {
  frequencyOfWords: WordMap;
  totalWordCount: number;
  siteData: DailySiteData[];
}

export interface DailySiteData {
  frequencyOfWords: WordMap;
  wordCount: number;
  headingsData: HeadingData[];
  imageName: string;
  websiteName: string;
}

export interface HeadingData {
  emotions?: Emotions;
  text: string;
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
export interface WordMap {
  [key: string]: number;
}
export interface AnyMap {
  [key:string] : any
}