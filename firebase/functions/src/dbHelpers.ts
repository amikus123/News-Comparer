import { combineWordMaps, createWordMap, sumOfMapValues } from "./helpers";
import { DailySiteData, DailyEntry, SiteData } from "./interfaces";
import "firebase/storage";
import firebase from "firebase";

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
  const wordCount = sumOfMapValues(frequencyOfWords);
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

export const addImagesToStorage = async (
  screenshots: {
    imageName: string;
    imageBuffer: null | Buffer;
  }[],
  storageRef: firebase.storage.Reference
) => {
  for (let i = 0; i < screenshots.length; i++) {
    if (screenshots[i].imageBuffer !== null) {
      console.log("F");
      const arr = new Uint8Array(screenshots[i].imageBuffer);
      const screenshotRef = storageRef
        .child(`${screenshots[i].imageName}.jpg`)
        .put(arr)
        .then((s) => {
          console.log(1);
        })
        .catch((e) => {
          console.log(e);
        });
      // .put(`tmp/${screenshots[i].imageName}.jpg`)
      // // .putString(screenshots[i].imageBuffer!.toString("base64"), "base64", {
      // //   contentType: "image/jpg",
      // // })
      // .then((s: any) => {
      //   console.log("Image uploaded", s);
      // })
      // .catch((e: any) => {
      //   console.error("Eror while adding to storage: ", e);
      // });
    }
  }
};
