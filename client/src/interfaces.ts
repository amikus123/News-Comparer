export  interface DatabaseStaticDataInRows {
  leftRow: WebsiteStaticData[];
  centerRow: WebsiteStaticData[];
  rightRow: WebsiteStaticData[];
}

export interface WebsiteStaticData{
  analizeEmotions:boolean,
  contentSelectors:string[],
  imageName:string,
  politicalOrientation:string,
  popupSelector:string,
  url:string,
}
export  interface WebsiteJointDataInRows {
  leftRow: WebsiteJointData[];
  centerRow: WebsiteJointData[];
  rightRow: WebsiteJointData[];
}
export  interface WebsiteJointDataMap {
  [key: string]: WebsiteJointData;
}
export interface WebsiteJointData  extends WebsiteStaticData{
  websiteFetchedImagesURLS?:string[]
}
export interface ScreenshotsData {
  [key:string]: string[]
}
