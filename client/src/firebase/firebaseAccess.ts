import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import {
  DatabaseStaticDataInRows,
  WebsiteJointDataMap,
  WebsiteStaticData,
} from "../interfaces";
import { firebaseConfig } from "./secret";
// initial configuration
// const firebaseApp = initializeApp(firebaseConfig);
initializeApp(firebaseConfig);

const db = getFirestore();
const storage = getStorage();

export const getHeadingDailyData = async () => {
  const querySnapshot = await getDocs(collection(db, "Headings"));
  console.log("click");
  console.log(querySnapshot);
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });
};
// fetches static wbesite data in form of an array
export const fetchWebisteStaticData = async (): Promise<
  WebsiteStaticData[]
> => {
  let toReturn: WebsiteStaticData[] = [];
  const querySnapshot = await getDocs(collection(db, "Websites"));
  querySnapshot.forEach((doc) => {
    if (doc.id === "WebsiteData") {
      toReturn = doc.data()["listOfWebsites"];
    }
  });
  return toReturn;
};
// creates map of all of webistes data
export const createWebisteDataObject = (
  arr: WebsiteStaticData[]
): WebsiteJointDataMap => {
  const mapOfWebisteData: WebsiteJointDataMap = {};
  console.log(arr);
  if (arr !== undefined) {
    for (let entry of arr) {
      let temp: any = entry;
      temp["WebsiteFetchedImagesURLS"] = [];

      mapOfWebisteData[entry.imageName] = temp;
    }
  }
  console.log("returnes ", mapOfWebisteData);
  return mapOfWebisteData;
};
//categorizes website data based on political orientation
export const createRowObjects = (
  arr: WebsiteStaticData[]
): DatabaseStaticDataInRows => {
  const toReturn: DatabaseStaticDataInRows = {
    leftRow: [],
    centerRow: [],
    rightRow: [],
  };
  if (arr !== undefined) {
    for (let entry of arr) {
      if (entry!.politicalOrientation === "left") {
        toReturn.leftRow.push(entry);
      } else if (entry!.politicalOrientation === "center") {
        toReturn.centerRow.push(entry);
      } else {
        toReturn.rightRow.push(entry);
      }
    }
  }
  return toReturn;
};

// return src of image from firebase storage
export const getImgSrcFronName = async (fileName: string): Promise<string> => {
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
  names: string[]
): Promise<string[]> => {
  const ret: string[] = [];
// change to dynamic
for( let name of names){

  const url = await getImgSrcFronName(`10-6-2021-${name}.jpg`);
  ret.push(url);
}

  return ret;
  // check
};
