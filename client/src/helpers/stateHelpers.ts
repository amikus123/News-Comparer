import { createRowObjects } from "../firebase/firestore";
import { getMissingScreenshots } from "../firebase/storage";
import {
  ScreenshotsByDate,
  TotalWordSiteData,
  WebsiteJointDataMap,
  Headings,
  FringeDates,
  DailySiteData,
  WordSiteData,
  WordMap,
} from "../interfaces";
import merge from "deepmerge";
import { formatedYearsFromDates, getAllDatesBetween } from "./dataCreation";
import { combineWordMaps } from "./mapFunctions";

// TODO TESTS
export const getChosenScreenshotsFromData = (
  data: ScreenshotsByDate,
  names: string[]
) => {
  const res: string[][] = [[], [], []];
  const keys = Object.keys(data);
  const values = names;
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
  if (dates.length > keys.length) {
    return true;
  }
  for (let key of keys) {
    const dateKeys = Object.keys(screenshotsByDate[key]);
    if (checkIfNamesAreMissing(dateKeys, names)) {
      return true;
    }
  }
  return false;
};
export const checkIfNamesAreMissing = (keys: string[], names: string[]) => {
  for (let name of names) {
    if (keys.indexOf(name) === -1) {
      return true;
    }
  }
  return false;
};

export const cretaeImagesSources = async (
  names: string[],
  dates: Date[],
  screenshotsByDate: ScreenshotsByDate
) => {
  const missing = await getMissingScreenshots(names, dates, screenshotsByDate);
  const chosenScreenshotsFromData = getChosenScreenshotsFromData(
    missing,
    names
  );
  const newData = merge(screenshotsByDate, missing);

  return {
    chosenScreenshotsFromData: chosenScreenshotsFromData,
    newData: newData,
  };
};

export const passOnlyChosenData = (
  names: string[],
  fringeDates: FringeDates,
  fullHeadings: Headings
) => {
  const res: TotalWordSiteData = {};
  const dates = getAllDatesBetween(fringeDates);
  // webistes and "total"
  names.forEach(name=>{
    res[name] = {
      frequencyOfWords: {},
      totalWordCount: 0,
    };
  })
  res.total = {
    frequencyOfWords: {},
    totalWordCount: 0,
  };
  const formatedDates = formatedYearsFromDates(dates);
  formatedDates.forEach((date) => {
    // it should exists
    const data = fullHeadings[date].siteData;
    names.forEach(name=>{
      const found = findMAtch(name,data)
      const newMao = combineWordMaps([
        found.frequencyOfWords,
        res[name].frequencyOfWords,
      ]);
      const newCount = found.wordCount + res[name].totalWordCount;
      res[name] = {
        frequencyOfWords: newMao,
        totalWordCount: newCount,
      };
    })

  });
  let totalCount = 0;
  let totalMaps :WordMap[]= [];
  names.forEach(name=>{
    totalCount += res[name].totalWordCount;
    totalMaps.push(res[name].frequencyOfWords);
  })
  res.total = {
    frequencyOfWords: combineWordMaps(totalMaps),
    totalWordCount: totalCount,
  };
  return res;

  // keys : names of webistes
};

const findMAtch = (name:string,arr:DailySiteData[]) =>{
  let index = 0
for(let i=0;i<arr.length;i++){
  if(arr[i].imageName === name){
    index = i
    break
  }
}
  return arr[index]
}