import {
  createFileNames,
  formatedYearsFromDates,
} from "../helpers/dataCreation";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { ScreenshotsByDate } from "../interfaces";
import { format } from "path/posix";

const storage = getStorage();

// return src of image from firebase storage
export const getImgSrcFromName = async (fileName: string): Promise<string> => {
  const x = getDownloadURL(ref(storage, fileName))
    .then((url) => {
      console.log(url, "success");
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
  for (let name of names) {
    const url = await getImgSrcFromName(`10-6-2021-${name}.jpg`);
    ret.push(url);
  }
  return ret;
  // check
};
// export const fetchScreenshotsFromNDays =async (name:string,n:number) => {
//   const names = createFileNames(name,n)
//   console.log(names)
//   const res =  await fetchAllScreenshotsURLFromName(names)
//   return res
// }
const getScreenshotURL = async (name: string, formatedDate: string) => {
  const url = await getImgSrcFromName(`${formatedDate}-${name}.jpg`);
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
  formatedDates.forEach((formatedDate) => {
    toReturn[formatedDate] = {};
    console.log(toReturn, "poczatek");
    names.forEach(async (name: string) => {
      if (
        currentData.hasOwnProperty(formatedDate) &&
        currentData.formatedDate.hasOwnProperty(name)
      ) {
        // already present so we dont do anything
      } else {
        toReturn[formatedDate][name] = await getScreenshotURL(
          name,
          formatedDate
        );
      }
    });
  });
  console.log(toReturn, "KONIEC");
  return toReturn;
};
