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
// name to display is just name with "_" replaced with " "

// Firebase Database Structure

// Websites => StaticWebsiteData
export interface TotalWebsiteStaticDataMap {
  [WebsiteName: string]: WebisteStaticData;
}

export interface WebisteStaticData {
  // should we analize emotions of this webiste
  analizeEmotions: boolean;
  popupSelector: string;
  contentSelectors: ContentSelector[];
  url: string;
  name:string;
  politicalOrientation: string;
  // hex color useed in graphs
  color: string;
}
// update selectors
export interface ContentSelector {
  // heading text
  h: string;
  // image
  i: string;
  // link to article
  l: string;
}

// => WebsiteWordData
export interface TotalWebisteWordData {
  [WebsiteName: string]: WebisteWordData;
}

export interface WebisteWordData {
  totalFrequencyOfWords: WordMap;
  totalEmotionMap: Emotions;
  totalHeadingCount: number;
  totalWordCount: number;
}
// Headings => FormatedDate
export interface HeadingsByDate {
  [FormatedDate: string]: DailyHeadingsEntry;
}

export interface DailyHeadingsEntry {
  dailyFrequencyOfWords: WordMap;
  dailyTotalWordCount: number;
  siteData: DailySiteData[];
}
export interface DailyWebsitesEntry {
  [WebsiteName: string]: DailySiteData;
}
export interface DailySiteData {
  frequencyOfWords: WordMap;
  wordCount: number;
  headings: Heading[];
  headingCoun: number;
  emotions?: Emotions;
  averageEmotion?: Emotions;
}

export interface Heading {
  text: string;
  image: string;
  link: string;
  emotions?: Emotions;
}

// Word to not count in word maps
export interface ExcludedWords {
  Words: string[];
}
// GENERAL



// emotion of selected heading
export interface Emotions {
  anger?: number;
  sadness?: number;
  fear?: number;
  joy?: number;
  analytical?: number;
  confident?: number;
  tentative?: number;
}

// CLIENT

export interface FringeDates {
  max: Date;
  min: Date;
}

export interface DatabaseStaticDataInRows {
  leftRow: WebisteStaticData[];
  centerRow: WebisteStaticData[];
  rightRow: WebisteStaticData[];
}

export interface ScreenshotDayData {
  [webisteName: string]: string;
}
//
export interface ScreenshostForColumns {
  websiteName: string;
  screenshots: string[];
}

///// SERVER
// PUPPETEER
export interface TotalPuppeteerData {
  [WebsiteName: string]: PuppeteerData;
}
export interface PuppeteerData {
  headingsData: Heading[];
  screenshots: Screenshot;
  images: Screenshot[];
}
export interface Screenshot {
  imageName: string;
  imageUintData: Uint8Array;
}
