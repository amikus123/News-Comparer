import { getFirestore, collection, getDocs } from "firebase/firestore";
import {
  WebsiteJointDataMap,
  TotalWebsiteStaticDataMap,  
  DailyHeadingsEntry,
  HeadingsByDate,
  WebsiteJointData,
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
): WebsiteJointData[][] => {
  const toReturn  :WebsiteJointData[][] = [[],[],[]]
    for (let entry in arr) {
      const item = arr[entry];
      console.log(item,arr,entry,"robienie")
      if (item!.politicalOrientation === "left") {
        toReturn[0].push(item);
      } else if (item!.politicalOrientation === "center") {
        toReturn[1].push(item);
      } else {
        toReturn[2].push(item);
      }
    }
  
  return toReturn;
};
