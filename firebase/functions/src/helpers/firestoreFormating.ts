import { combineWordMaps, createWordMap, sumOfMapValues } from "./mapFunctions";
import { DailySiteData, DailyEntry, SiteData } from "../interfaces";
import "firebase/storage";

export const createSiteDailyEntry = async (
  data: SiteData,
  excludedWords: string[]
): Promise<DailySiteData> => {
  const { headings, analizeEmotions, nameToDisplay, imageName } = data;
  let headingsData = [];
  for (let i = 0; i < headings.length; i++) {
    headingsData.push({ text: headings[i] });
  }
  if (analizeEmotions) {
    // zwraca average sentiment i modyfikuje headings data
  }
  const frequencyOfWords = createWordMap(headings, excludedWords);
  const wordCount = sumOfMapValues([frequencyOfWords]);
  return {
    websiteName: nameToDisplay,
    imageName,
    frequencyOfWords,
    headingsData,
    wordCount,
  };
};
export const createArrayOfDailySiteData = async (
  allSiteData: SiteData[],
  excludedWords: string[]
) => {
  const listOfDailyEntries: DailySiteData[] = [];
  for (let i = 0; i < allSiteData.length; i++) {
    const newEntry = await createSiteDailyEntry(allSiteData[i], excludedWords);
    listOfDailyEntries.push(newEntry);
  }
  return listOfDailyEntries;
};

export const createDailyEntry = (
  listOfPageData: DailySiteData[]
): DailyEntry => {
  const arr: any[] = [];
  let totalWordCount = 0;
  for (let i = 0; i < listOfPageData.length; i++) {
    arr.push(listOfPageData[i].frequencyOfWords);
    totalWordCount += listOfPageData[i].wordCount;
  }
  const frequencyOfWordOverADay = combineWordMaps(arr);
  return {
    siteData: listOfPageData,
    frequencyOfWords: frequencyOfWordOverADay,
    totalWordCount,
  };
};
