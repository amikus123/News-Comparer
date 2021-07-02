import { combineWordMaps, createWordMap, sumOfMapValues } from "./mapFunctions";
import {
  DailySiteData,
  DailyEntry,
  SiteData,
  SingleWebsiteInfo,
  headingData,
} from "../interfaces";
import "firebase/storage";
import {
  createEmotionsFromIBM,
  getEmotionsFromHeading,
  mergeEmotionCount,
} from "./generalHelpers";
import { translateText } from "../analizing/googleTranslate";
import { getTextEmotions } from "../analizing/IBMEmotions";

export const createSiteDailyEntry = async (
  data: SiteData,
  excludedWords: string[] = []
): Promise<DailySiteData> => {
  const { headings, analizeEmotions, nameToDisplay, imageName } = data;
  let headingsData: headingData[] = [];
  for (let i = 0; i < headings.length; i++) {
    headingsData.push({ text: headings[i] });
  }
  if (analizeEmotions && false) {
    const translatedHeadings = await translateText(headings);
    const emotionsData = await getTextEmotions(translatedHeadings);
    // if emotions fail we can still contiunue
    console.log(emotionsData)
    if (emotionsData !== undefined && Symbol.iterator in Object(emotionsData)){
    for (let headingEmotions of emotionsData) {
      if (headingEmotions.tones.length !== 0) {
        // console.log(headingEmotions.tones);
        headingsData[headingEmotions["sentence_id"]].emotions =
          createEmotionsFromIBM(headingEmotions.tones);
      }
    }
  }else{
    console.log("fail")
  }
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
  excludedWords: string[] = []
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

export const updateSiteData = (
  old: SingleWebsiteInfo,
  newData: DailySiteData
) => {
  old.frequencyOfWords = combineWordMaps([
    old.frequencyOfWords,
    newData.frequencyOfWords,
  ]);
  const emotionsCountFromHeadings = getEmotionsFromHeading(
    newData.headingsData
  );

  old.totalEmotionCount = mergeEmotionCount(
    old.totalEmotionCount,
    emotionsCountFromHeadings
  );
  old.totalHeadingCount += newData.headingsData.length;
  old.totalWordCount += sumOfMapValues([newData.frequencyOfWords]);
  return old;
};
