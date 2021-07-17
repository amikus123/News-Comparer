import { getFirestore, collection, getDocs } from "firebase/firestore";
import {
  DailyHeadings,
  Headings,
  WebsiteJointDataInRows,
  WebsiteJointDataMap,
  WebsiteStaticData,
} from "../interfaces";
// initial configuration
import { initializeApp } from "firebase/app";
import {firebaseConfig} from "./secret"

initializeApp(firebaseConfig)
const db = getFirestore();
function isDailyHEadings(object: any): object is DailyHeadings {
  return 'frequencyOfWords' in object;
}


export const getHeadingDailyData = async () :Promise<Headings> => {
  const res :Headings  = {}
  const querySnapshot = await getDocs(collection(db, "Headings"));
  querySnapshot.forEach((doc) => {
    const d = doc.data()
    if(isDailyHEadings(d)){
      res[doc.id] = d
    }
  });
  return res
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
  if (arr !== undefined) {
    for (let entry of arr) {
      let temp: any = entry;
      temp["WebsiteFetchedImagesURLS"] = [];
      mapOfWebisteData[entry.imageName] = temp;
    }
  }
  return mapOfWebisteData;
};
//categorizes website data based on political orientation
export const createRowObjects = (
  arr: WebsiteJointDataMap
): WebsiteJointDataInRows => {
  const toReturn: WebsiteJointDataInRows = {
    leftRow: [],
    centerRow: [],
    rightRow: [],
  };
  if (arr !== undefined) {
    for (let entry in arr) {
      const item = arr[entry]
      if (item!.politicalOrientation === "left") {
        toReturn.leftRow.push(item);
      } else if (item!.politicalOrientation === "center") {
        toReturn.centerRow.push(item);
      } else {
        toReturn.rightRow.push(item);
      }
    }
  }
  return toReturn;
};

