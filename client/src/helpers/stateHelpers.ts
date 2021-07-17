import { createRowObjects } from "../firebase/firestore";
import { getMissingScreenshots } from "../firebase/storage";
import { ScreenshotsByDate, WebsiteJointDataMap } from "../interfaces";
import merge from "deepmerge"

// TODO TESTS
export const getChosenScreenshotsFromData = (
  data: ScreenshotsByDate,
  names: string[]
) => {
  const res: string[][] = [[], [], []];
  const keys = Object.keys(data);
  const values = names;
  console.log(keys, values, "pary");
  for (let key in data) {
    res[0].push(data[key][values[0]]);
    res[1].push(data[key][values[1]]);
    res[2].push(data[key][values[2]]);
  }
  console.log(res,"RES")
  return res;
};

export const splitDataByRows = (webisteJointData: WebsiteJointDataMap) => {
  const politicsBasedOnRows = createRowObjects(webisteJointData);
  let temp = ["", "", ""];
  if (politicsBasedOnRows.leftRow.length !== 0) {
    temp = [
      politicsBasedOnRows.leftRow[0].imageName,
      politicsBasedOnRows.centerRow[0].imageName,
      politicsBasedOnRows.rightRow[0].imageName,
    ];
  }
  return temp;
};

export const checkIfShouldRequest = (
  names: string[],
  dates: Date[],
  screenshotsByDate: ScreenshotsByDate
) => {
  if (names[0] === "") {
    console.log("name error")
    return false;
  }

  const keys = Object.keys(screenshotsByDate);
  console.log(keys);
  if (dates.length > keys.length) {
    return true;
  }
  for(let key of keys){
    const dateKeys = Object.keys(screenshotsByDate[key]);
    console.log(key, "HALO",dateKeys);
    if (checkIfNamesAreMissing(dateKeys,names)) {
      console.log("XDDD");
      return true;
    }
  }
  return false;
};
export const checkIfNamesAreMissing = (keys:string[],names:string[]) =>{
  console.log(keys,names,"CHECK")
  for(let name of names){
    console.log(keys.indexOf(name))
    if(keys.indexOf(name) === -1){
      return true
    }
  }
  return false
}

export const cretaeImagesSources = async (
  names: string[],
  dates: Date[],
  screenshotsByDate : ScreenshotsByDate
) => {
  const missing = await getMissingScreenshots(names, dates, screenshotsByDate);
  const chosenScreenshotsFromData = getChosenScreenshotsFromData(missing, names);
  const newData = merge(screenshotsByDate, missing);

  return {
    chosenScreenshotsFromData: chosenScreenshotsFromData,
    newData : newData,
  };
};
