import { createRowObjects } from "../firebase/firestore";
import { ScreenshotsByDate,WebsiteJointDataMap } from "../interfaces";

export const chosenScreenshotsFromData = (data:ScreenshotsByDate,names:string[]) =>{
  const res: string[][] = [[], [], []];
  const keys = Object.keys(data);
  const values = names;
  console.log(keys,values,"pary")
  for(let key in data){
    res[0].push(data[key][values[0]]);
    res[1].push(data[key][values[1]]);
    res[2].push(data[key][values[2]]);
  }
  return res
}


export const splitDataByRows =  (webisteJointData: WebsiteJointDataMap) =>{
  const politicsBasedOnRows = createRowObjects(webisteJointData);
  let temp = ["","",""]
  if (politicsBasedOnRows.leftRow.length !== 0) {
     temp = [
      politicsBasedOnRows.leftRow[0].imageName,
      politicsBasedOnRows.centerRow[0].imageName,
      politicsBasedOnRows.rightRow[0].imageName,
    ];
  }
  return temp
}


