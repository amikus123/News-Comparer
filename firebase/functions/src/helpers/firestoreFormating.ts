import { combineWordMaps, createWordMap, sumOfMapValues } from "./mapFunctions";
import {
  DailySiteData,
  ExcludedWords,
  TotalPuppeteerData,
  WordMap,
  PuppeteerPageData,
  DailyHeadingsEntry,
  DailyWebsitesDataMap,
  WebisteDataOfAllTime,
} from "../interfaces";
import "firebase/storage";
import {
  createEmotionsFromIBM,
  getEmotionsFromHeading,
  mergeEmotionCount,
} from "./generalHelpers";
import { translateText } from "../analizing/googleTranslate";
import { getTextEmotions } from "../analizing/IBMEmotions";

// export const createSiteDailyEntry = async (
//   data: SiteData,
//   excludedWords: string[] = []
// ): Promise<DailySiteData> => {
//   const { headings, analizeEmotions, nameToDisplay, imageName } = data;
//   let headingsData: headingData[] = [];
//   for (let i = 0; i < headings.length; i++) {
//     headingsData.push({ text: headings[i] });
//   }
//   if (analizeEmotions && false) {
//     const translatedHeadings = await translateText(headings);
//     const emotionsData = await getTextEmotions(translatedHeadings);
//     // if emotions fail we can still contiunue
//     console.log(emotionsData);
//     if (emotionsData !== undefined && Symbol.iterator in Object(emotionsData)) {
//       for (let headingEmotions of emotionsData) {
//         if (headingEmotions.tones.length !== 0) {
//           // console.log(headingEmotions.tones);
//           headingsData[headingEmotions["sentence_id"]].emotions =
//             createEmotionsFromIBM(headingEmotions.tones);
//         }
//       }
//     } else {
//       console.log("fail");
//     }
//   }

//   const frequencyOfWords = createWordMap(headings, excludedWords);
//   const wordCount = sumOfMapValues([frequencyOfWords]);
//   return {
//     websiteName: nameToDisplay,
//     imageName,
//     frequencyOfWords,
//     headingsData,
//     wordCount,
//   };
// };

export const createDailyHeadings = (
  totalData: TotalPuppeteerData,
  excluded: ExcludedWords
): DailyHeadingsEntry => {
  const websiteEntries: DailyWebsitesDataMap = {};
  for (let entry in totalData) {
    const pageData: PuppeteerPageData = totalData[entry];
    websiteEntries[entry] = getDailyEntry(pageData, excluded);
  }

  const { totalWordCount, totalHeadingCount } =
    getTotalWordAndHeadingCount(websiteEntries);
  const totalFrequencyOfWords: WordMap =
    getTotalFrequencyOfWords(websiteEntries);
  return {
    totalDailySiteData: websiteEntries,
    totalDailyFrequencyOfWords: totalFrequencyOfWords,
    totalDailyWordCount: totalWordCount,
    totalDailyHeadingCount: totalHeadingCount,
  };
};

export const getTotalWordAndHeadingCount = (
  websiteEntries: DailyWebsitesDataMap
) => {
  let totalHeadingCount = 0;
  let totalWordCount = 0;

  for (let heading in websiteEntries) {
    totalWordCount += websiteEntries[heading].pageDailyWordCount;
    totalHeadingCount += websiteEntries[heading].pageDailyHeadingCount;
  }
  return {
    totalWordCount,
    totalHeadingCount,
  };
};

export const getDailyEntry = (
  websiteEntries: PuppeteerPageData,
  excluded: ExcludedWords
): DailySiteData => {
  const words = [];
  for (let heading of websiteEntries.headings) {
    words.push(heading.text);
  }

  const { wordMap, wordCount } = createWordMap(words, excluded);

  return {
    pageDailyFrequencyOfWords: wordMap,
    pageDailyWordCount: wordCount,
    headings: websiteEntries.headings,
    pageDailyHeadingCount: websiteEntries.headings.length,
  };
};

export const getTotalFrequencyOfWords = (
  websiteEntries: DailyWebsitesDataMap
) => {
  const frequencies: WordMap[] = [];
  for (let name in websiteEntries) {
    // console.log(name,)
    frequencies.push(websiteEntries[name].pageDailyFrequencyOfWords);
  }
  const res = combineWordMaps(frequencies);
  return res;
};

/// update data of all time
export const updateWebisteDataOfAllTime = (
  dailyHeadingsEntry: DailyHeadingsEntry,
  webisteDataOfAllTime: WebisteDataOfAllTime
) => {
  for (let name in dailyHeadingsEntry.totalDailySiteData) {
    const headingData = dailyHeadingsEntry.totalDailySiteData[name];
    console.log(dailyHeadingsEntry.totalDailySiteData[name],webisteDataOfAllTime[name])
    if (webisteDataOfAllTime[name]) {
      webisteDataOfAllTime[name] = {
        totalPageFrequencyOfWords: combineWordMaps([
          headingData.pageDailyFrequencyOfWords,
          webisteDataOfAllTime[name].totalPageFrequencyOfWords,
        ]),
        totalPageWordCount:
          headingData.pageDailyWordCount +
          webisteDataOfAllTime[name].totalPageWordCount,
        totalPageHeadingCount:
          headingData.pageDailyHeadingCount +
          webisteDataOfAllTime[name].totalPageHeadingCount,
      };
    } else {
      // creating new entry
      webisteDataOfAllTime[name] = {
        totalPageFrequencyOfWords: headingData.pageDailyFrequencyOfWords,
        totalPageWordCount: headingData.pageDailyWordCount,
        totalPageHeadingCount: headingData.pageDailyHeadingCount,
      };
    }
  }

  return webisteDataOfAllTime;
};
