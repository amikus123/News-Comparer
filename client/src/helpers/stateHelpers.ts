import { createRowObjects } from "../firebase/firestore";
import { getMissingScreenshots } from "../firebase/storage";
import { ScreenshotsByDate, WebsiteJointDataMap } from "../interfaces";
const merge = require("deepmerge");

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
    return false;
  }

  const keys = Object.keys(screenshotsByDate);
  console.log(keys);
  if (dates.length > keys.length) {
    return true;
  }
  keys.forEach((key) => {
    const dateKeys = Object.keys(screenshotsByDate[key]);
    console.log(key, "HALO");
    if (dateKeys.length !== names.length) {
      console.log("XDDD");
      return true;
    }
  });
  return false;
};

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
