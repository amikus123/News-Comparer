export interface Heading {
  text: string;
  image: string;
  link: string;
}

export interface DatabaseStaticDataInRows {
  leftRow: WebsiteStaticData[];
  centerRow: WebsiteStaticData[];
  rightRow: WebsiteStaticData[];
}

export interface WebsiteJointData extends WebsiteStaticData {
  websiteFetchedImagesURLS?: string[];
}

export interface WebsiteJointDataInRows {
  leftRow: WebsiteJointData[];
  centerRow: WebsiteJointData[];
  rightRow: WebsiteJointData[];
}
export interface WebsiteJointDataMap {
  [key: string]: WebsiteJointData;
}

//
export interface ScreenshostForColumns {
  websiteName: string;
  screenshots: string[];
}
// dates
export interface FringeDates {
  max: Date;
  min: Date;
}

// firestore
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
  imageName: string;
  emotions?: Emotions;
  averageEmotion?: Emotions;
}

export interface TotalGraphData {
  [name: string]: SingleGraphData;
}
export interface SingleGraphData {
  frequencyOfWords: WordMap;
  totalWordCount: number;
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
export interface WordToWordMap {
  [key: string]: string | undefined;
}
export interface AnyMap {
  [key: string]: any;
}
export interface ScreenshotsByDate {
  [date: string]: ScreenshotDayData;
}
export interface ScreenshotDayData {
  [webisteName: string]: string;
}

////////////

// Firebase Database Structure

// Websites => StaticWebsiteData
export interface TotalWebsiteStaticDataMap {
  [WebsiteName: string]: WebsiteStaticData;
}

export interface WebsiteStaticData {
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

// => WebsiteWordData

// Headings => FormatedDateexport

export interface WebisteDataOfAllTimeMap {
  [WebsiteName: string]: WebisteDataOfAllTime;
}
export interface WebisteDataOfAllTime {
  totalPageFrequencyOfWords: WordMap;
  totalPageWordCount: number;
  totalPageHeadingCount: number;
}

export interface ExcludedWords {
  [word: string]: string;
}

// emotion of selected heading

// CLIENT

export interface FringeDates {
  max: Date;
  min: Date;
}

export interface ScreenshostForColumns {
  websiteName: string;
  screenshots: string[];
}

export interface NameToWordMap {
  [websiteName: string]: WordMap;
}
export interface NameToWordMaps {
  [websiteName: string]: WordMap[];
}
export interface SelectedWebsites {
  show: boolean[];
  names: string[];
  links: string[];
}
