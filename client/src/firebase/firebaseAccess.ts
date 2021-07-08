import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import {
  DatabaseStaticDataInRows,
  WebsiteJointDataMap,
  WebsiteJointDataTemp,
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
// gets static wbesite data in form of an array
export const fetchWebisteStaticData = async (): Promise<WebsiteStaticData[]> => {
  let toReturn: WebsiteStaticData[] = [];
  const querySnapshot = await getDocs(collection(db, "Websites"));
  querySnapshot.forEach((doc) => {
    if (doc.id === "WebsiteData") {
      toReturn = doc.data()["listOfWebsites"];
    }
  });
  return toReturn;
};

export const createWebisteDataObject =
   (arr:WebsiteStaticData[]): WebsiteJointDataMap => {
    const mapOfWebisteData: WebsiteJointDataMap = {};
    if (arr !== undefined) {
      for (let entry of arr) {
        mapOfWebisteData[entry.imageName] = entry;
        mapOfWebisteData[entry.imageName]["WebsiteFetchedImagesURLS"] = [];
      }
    }
    return mapOfWebisteData;
  };
// gets static wbesite data, and categorizes them based on political orientation
export const createRowObjects =  (arr:WebsiteStaticData[]): DatabaseStaticDataInRows => {
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
      console.log(url, "cp wyszlo");
      return url;
    })
    .catch((error) => {
      console.error("failed fetching", error);
      return "";
      // Handle any errors
    });
  return x;
};
