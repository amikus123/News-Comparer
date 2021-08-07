import {
  formatedYearsFromDates,
} from "../helpers/dataCreation";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { ScreenshotsByDate } from "../interfaces";

const storage = getStorage();

// return src of image from firebase storage
export const getImgSrcFromName = async (fileName: string): Promise<string> => {
  const childRef = ref(storage, fileName)
  const trueURL = getDownloadURL(childRef)
    .then((url) => {
      return url;
    })
    .catch((error) => {
      console.error("failed fetching", error);
      return "";
      // Handle any errors
    });
  return trueURL;
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
      } else {
        toReturn[formatedDate][name] = await getScreenshotURL(
          name,
          formatedDate
        );
      }
    }
  }

  return toReturn;
};
