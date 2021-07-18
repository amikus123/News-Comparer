import { createRowObjects } from "../firebase/firestore";
import { getMissingScreenshots } from "../firebase/storage";
import {
  ScreenshotsByDate,
  TotalWordSiteData,
  WebsiteJointDataMap,
  HeadingsByDate,
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
  names: string[],
  dates:Date[]
) => {
  const res: string[][] = [[], [], []];
  const formatedDates = formatedYearsFromDates(dates)
  const values = names;
  for (let date of formatedDates) {
    console.log(data,date,"CRASH")
    res[0].push(data[date][values[0]]);
    res[1].push(data[date][values[1]]);
    res[2].push(data[date][values[2]]);
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
    console.log("name error")
    return false;
  }

  const keys = Object.keys(screenshotsByDate);
  const formatedDates = formatedYearsFromDates(dates)
  // jesli nie ma tych ktorych suzkam to feczuje 
    for(let i =0;i<formatedDates.length;i++ ){
      if(keys.indexOf(formatedDates[i]) === -1){
        console.log("BRAKUJE CZEGOS")
        return true
      }
    }
  
  console.log("the same",keys,formatedDates)
  for (let date of formatedDates) {
    const dateKeys = Object.keys(screenshotsByDate[date]);
    if (checkIfNamesAreMissing(dateKeys, names)) {
      console.log("STOP, missing name")
      return true;
    }
  }
  return false;
};
export const checkIfNamesAreMissing = (keys: string[], names: string[]) => {
  for (let name of names) {
    if (keys.indexOf(name) === -1) {
      // console.log(" founc")

      return true;
    }else{
      // console.log("not founc")
    }
    console.log(keys.indexOf(name),name)
  }
  return false;
};

export const cretaeImagesSources = async (
  names: string[],
  dates: Date[],
  screenshotsByDate: ScreenshotsByDate
) => {
  const missing = await getMissingScreenshots(names, dates, screenshotsByDate);
  // what if object should be smaller?
  const newData = merge(screenshotsByDate, missing);
  const chosenScreenshotsFromData = getChosenScreenshotsFromData(
    newData,
    names,
    dates
  );

  return {
    chosenScreenshotsFromData: chosenScreenshotsFromData,
    newData: newData,
  };
};

export const passOnlyChosenData = (
  names: string[],
  fringeDates: FringeDates,
  fullHeadings: HeadingsByDate
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