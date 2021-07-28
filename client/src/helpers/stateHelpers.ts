import { createRowObjects } from "../firebase/firestore";
import { getMissingScreenshots } from "../firebase/storage";
import {
  TotalGraphData,
  WebsiteJointDataMap,
  HeadingsByDate,
  FringeDates,
  WordMap,
  ScreenshotsByDate,
  DailyWebsitesDataMap,
} from "../interfaces";
import merge from "deepmerge";
import { formatedYearsFromDates, getAllDatesBetween } from "./dataCreation";
import { combineWordMaps } from "./mapFunctions";

// TODO TESTS
export const getChosenScreenshotsFromData = (
  data: ScreenshotsByDate,
  names: string[],
  dates: Date[]
) => {
  const res: string[][] = [[], [], []];
  const formatedDates = formatedYearsFromDates(dates);
  const values = names;
  for (let date of formatedDates) {
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
      politicsBasedOnRows.leftRow[0].name,
      politicsBasedOnRows.centerRow[0].name,
      politicsBasedOnRows.rightRow[0].name,
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
  const formatedDates = formatedYearsFromDates(dates);
  // jesli nie ma tych ktorych suzkam to feczuje
  for (let i = 0; i < formatedDates.length; i++) {
    if (keys.indexOf(formatedDates[i]) === -1) {
      return true;
    }
  }

  for (let date of formatedDates) {
    const dateKeys = Object.keys(screenshotsByDate[date]);
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

