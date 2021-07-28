import {
  formatedYearsFromDates,
} from "../helpers/dataCreation";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { ScreenshotsByDate } from "../interfaces";

const storage = getStorage();

// return src of image from firebase storage
export const getImgSrcFromName = async (fileName: string): Promise<string> => {
  const x = getDownloadURL(ref(storage, fileName))
    .then((url) => {
      return url;
    })
    .catch((error) => {
      console.error("failed fetching", error);
      return "";
      // Handle any errors
    });
  return x;
};
export const fetchAllScreenshotsURLFromName = async (
  names: string[],
  dates: Date[],
  currentData: ScreenshotsByDate
): Promise<string[]> => {
  const ret: string[] = [];
  // change to dynamic
  console.log("should not fire")
  for (let name of names) {
    const url = await getImgSrcFromName(`10-6-2021-${name}.jpg`);
    ret.push(url);
  }
  return ret;
  // check
};

const getScreenshotURL = async (name: string, formatedDate: string) => {
  const url = await getImgSrcFromName(`${name}-${formatedDate}.jpg`);
  return url;
};
export const getMissingScreenshots = async (
  names: string[],
  dates: Date[],
  currentData: ScreenshotsByDate
) => {
  console.log("input", names, dates, currentData);
  const toReturn: ScreenshotsByDate = {};
  const formatedDates: string[] = formatedYearsFromDates(dates);
    for(let formatedDate of formatedDates){
    toReturn[formatedDate] = {};
    for(let name of names){
      if (
        currentData[formatedDate] &&
        currentData[formatedDate][name]
      ) {
        // already present so we dont do anything
        console.log(currentData[formatedDate][name],"PRZED")
      } else {
        toReturn[formatedDate][name] = await getScreenshotURL(
          name,
          formatedDate
        );
      }
    }
  }

  console.log(toReturn, "KONIEC");
  return toReturn;
};
// probmelm with promises
