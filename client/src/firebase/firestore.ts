import { getFirestore, collection, getDocs } from "firebase/firestore";
import {
    WebsiteJointDataInRows,
  WebsiteJointDataMap,
  TotalWebsiteStaticDataMap,  
  DailyHeadingsEntry,
  HeadingsByDate,
} from "../interfaces";
// initial configuration
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./secret";
import { doc, getDoc } from "firebase/firestore";

initializeApp(firebaseConfig);
const db = getFirestore();
function isDailyHEadings(object: any): object is DailyHeadingsEntry {
  return 'totalDailyFrequencyOfWords' in object;
}

export const getHeadingDailyData = async (): Promise<HeadingsByDate | null>  => {
  const res :HeadingsByDate = {};
  const querySnapshot = await getDocs(collection(db, "Headings"));
  querySnapshot.forEach((doc) => {
    const a = doc.data()
    if(isDailyHEadings(a)){
      res[doc.id] = a;
    }
  });
  return res;
};
// fetches static wbesite data in form of an array
export const fetchStaticWebsiteDataMap =
  async (): Promise<TotalWebsiteStaticDataMap | null>  => {
    const docRef = doc(db, "Websites", "StaticWebisteData");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
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
      const item = arr[entry];
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
