export  interface imageSourceRows {
  leftRow: WebsiteData[];
  centerRow: WebsiteData[];
  rightRow: WebsiteData[];
}
export interface WebsiteData{
  analizeEmotions:boolean,
  contentSelectors:string[],
  imageName:string,
  politicalOrientation:string,
  popupSelector:string,
  url:string,
}