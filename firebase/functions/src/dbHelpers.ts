import { createWordMap } from "./helpers";
import { PuppeteerData, DailySiteData } from "./interfaces";

export const createSiteDailyEntry = async (
  headings: string[],
  analizeEmotions: boolean,
  nameToDisplay: string,
  imageFile: string,
  excludedWords: string[]
): Promise<DailySiteData> => {
  let headingsData = [];
  for (let i = 0; i < headings.length; i++) {
    headingsData.push({ text: headings[i] });
  }
  if (analizeEmotions) {
    // zwraca average sentiment i modyfikuje headings data
  }
  const frequencyOfWords = createWordMap(headings, excludedWords);
  return {
    websiteName: nameToDisplay,
    imageFile,
    frequencyOfWords,
    headingsData,
  };
};
