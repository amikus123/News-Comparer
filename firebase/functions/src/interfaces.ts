// export interface Emotions {
//   anger?: number;
//   sadness?: number;
//   fear?: number;
//   joy?: number;
//   analytical?: number;
//   confident?: number;
//   tentative?: number;
// }

// export interface DailySiteData {
//   frequencyOfWords: WordMap;
//   wordCount: number;
//   headingsData: headingData[];
//   imageName: string;
//   websiteName: string;
// }
// export interface headingData {
//   emotions?: Emotions;
//   text: string;
// }

// export interface WordMap {
//   [key: string]: number;
// }
// export interface DailyEntry {
//   averageEmotion?: Emotions;
//   siteData: DailySiteData[];
//   totalEmotionCount?: Emotions;
//   totalWordCount: number;
//   totalHeadingCount?: number;
//   frequencyOfWords: any;
// }
// // websites
// export interface PuppeteerData {
//   allSiteData: SiteData[];
//   screenshots: Screenshot[];
// }
// export interface Screenshot {
//   imageName: string;
//   imageUintData: Uint8Array;
// }
// export interface SiteData {
//   headings: string[];
//   imageName: string;
//   analizeEmotions: boolean;
//   nameToDisplay: string;
// }
// export interface SingleWebisteConstData {
//   analizeEmotions: boolean;
//   imageName: string;
//   nameToDisplay: string;
//   popupSelector: string;
//   contentSelectors: string[];
//   url: string;
//   politicalOrientation: string;
// }
// // meta data
// export interface ExcludedWords {
//   Words: string[];
// }
// export interface WebisteInfo {
//   [key: string]: SingleWebsiteInfo;
// }
// export interface SingleWebsiteInfo {
//   frequencyOfWords: WordMap;
//   totalEmotionCount: Emotions;
//   totalHeadingCount: number;
//   totalWordCount: number;
// }

// name to display is just name with "_" replaced with " "

// Firebase Database Structure

// Websites => StaticWebsiteData
export interface TotalWebsiteStaticDataMap {
  [WebsiteName: string]: WebisteStaticData;
}

export interface WebisteStaticData {
  // should we analize emotions of this webiste
  analizeEmotions: boolean;
  popupSelector: PopupSelector[];
  contentSelectors: ContentSelector[];
  url: string;
  name: string;
  politicalOrientation: string;
  // hex color useed in graphs
  color: string;
}
// update selectors
export interface PopupSelector {
  property: string;
  selector: string;
  important?: boolean;
  value: string;
}
export interface ContentSelector {
  // heading text
  t: string;
  // image
  i: string;
  // link to article
  l: string;
  // exluded classes
  e?: string;
}
export interface AnyMap {
  [word: string]: any;
}
// => WebsiteWordData

// Headings => FormatedDateexport


export interface WebisteDataOfAllTimeMap {
  [WebsiteName: string]: WebisteDataOfAllTime;}
export interface WebisteDataOfAllTime {
  totalPageFrequencyOfWords: WordMap;
  totalPageWordCount: number;
  totalPageHeadingCount: number;
}

export interface HeadingsByDate {
  [FormatedDate: string]: DailyHeadingsEntry;
}
export interface DailyHeadingsEntry {
  totalDailyFrequencyOfWords: WordMap;
  totalDailyWordCount: number;
  totalDailyHeadingCount: number;
  totalDailySiteData: DailyWebsitesDataMap;
}
export interface DailyWebsitesDataMap {
  [WebsiteName: string]: DailySiteData;
}
export interface DailySiteData {
  pageDailyFrequencyOfWords: WordMap;
  pageDailyWordCount: number;
  headings: Heading[];
  pageDailyHeadingCount: number;
  emotions?: Emotions;
  averageEmotion?: Emotions;
}

export interface Heading {
  text: string;
  image: string;
  link: string;
  emotions?: Emotions;
}

export interface WordMap {
  [key: string]: number;
}
export interface ExcludedWords {
  [word: string]: string;
}

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
  [WebsiteName: string]: PuppeteerPageData;
}

export interface PuppeteerPageData {
  headings: Heading[];
  screenshot: ScreenshotToUpload;
  name: string;
}
export interface ScreenshotToUpload {
  imageName: string;
  imageUintData: Uint8Array;
}
