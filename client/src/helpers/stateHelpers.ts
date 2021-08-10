import { createRowObjects } from "../firebase/firestore";
import { getMissingScreenshots } from "../firebase/storage";
import {
  WebsiteJointDataMap,
  HeadingsByDate,
  FringeDates,
  WordMap,
  ScreenshotsByDate,
  DailyWebsitesDataMap,
  NameToWordMap,
  NameToWordMaps,
} from "../interfaces";
import merge from "deepmerge";
import { formatedYearsFromDates, getAllDatesBetween } from "./dataCreation";
import { combineWordMaps } from "./mapFunctions";
import { OptionsMap } from "../components/Words/WordsInterfaces";



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
  // if searched data is missing, it fetches data from db
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
  const newData = merge(screenshotsByDate, missing);
  return newData;
};


export const getSelectedAndAllWordMap = (
  webisteJointDataMap: WebsiteJointDataMap,
  headingMap: HeadingsByDate,
  chosenDates: FringeDates,
  names: string[]
) => {
  const totalMap: NameToWordMap = {};
  const selectedMap: NameToWordMap = {};

  const allNames = Object.keys(webisteJointDataMap);
  // stores all the maps and megres themd
  const mapOfArr: NameToWordMaps = {};
  const datesBetween = formatedYearsFromDates(getAllDatesBetween(chosenDates));

  for (let name of names) {
    selectedMap[name] = {};
  }

  for (let name of allNames) {
    totalMap[name] = {};
    mapOfArr[name] = [];
  }

  for (const i of datesBetween) {
    const current: DailyWebsitesDataMap = headingMap[i].totalDailySiteData;
    for (const name in current) {
      mapOfArr[name].push(current[name].pageDailyFrequencyOfWords);
    }
  }

  const combinedForTotal: WordMap[] = [];
  const combinedForSelected: WordMap[] = [];
  for (let name of allNames) {
    const combinedForName = combineWordMaps(mapOfArr[name]);

    totalMap[name] = combinedForName;
    combinedForTotal.push(combinedForName);
    if (selectedMap[name] !== undefined) {
      selectedMap[name] = combinedForName;
      combinedForSelected.push(combinedForName);
    }
  }
  totalMap.Total = combineWordMaps(combinedForTotal);
  selectedMap.Total = combineWordMaps(combinedForSelected);
  return { selectedMap, totalMap };
};

export const getSuggestions = (wordData: NameToWordMap): OptionsMap => {
  const res: OptionsMap = {};
  for (const name in wordData) {
    res[name] = [];
  }
  const total = wordData["Total"];
  for (const word in total) {
    for (const name in wordData) {
      let wordCount = wordData[name][word];
      if (wordCount === undefined) {
        wordCount = 0;
      }
      res[name].push({
        word: word,
        count: wordCount,
      });
    }
  }
  return res;
};
