import { DailySiteData, Screenshot, SingleWebsiteInfo } from "../interfaces";
import firebase from "firebase";
import {
  createDailyEntry,
  updateSiteData,
} from "../helpers/firestoreFormating";
import { createFormatedDate } from "../helpers/generalHelpers";
import { getPageMetaData } from "./firestoreAccessHelpers";

export const addImagesToStorage = async (
  screenshots: Screenshot[],
  storageRef: firebase.storage.Reference
) => {
  for (let i = 0; i < screenshots.length; i++) {
    // const formatedDate = createFormatedDate();
    const screenshotRef = storageRef
      .child(`${screenshots[i].imageName}.jpg`)
      .put(screenshots[i].imageUintData)
      .then((snapshot) => {
        console.log(snapshot, " file uploaded");
      })
      .catch((e) => {
        console.log(e);
      });
  }
};

export const addDailyEntryFirebase = async (
  db: FirebaseFirestore.Firestore,
  dailyArray: DailySiteData[]
) => {
  const formatedDate = createFormatedDate();
  const dailyEntry = createDailyEntry(dailyArray);
  const docRef = db.collection("Headings").doc(formatedDate);
  console.log("NEW", dailyEntry);
  await docRef.set(dailyEntry);
};

export const updateSingleWebsiteInfo = async (
  db: FirebaseFirestore.Firestore,
  newData: DailySiteData[]
) => {
  const oldData = await getPageMetaData(db);
  console.log(oldData, "OLD");
  for (let siteData of newData) {
    if (siteData.websiteName in oldData) {
      updateSiteData(oldData[siteData.websiteName], siteData);
    }
  }
  console.log("NEW", oldData);
  const docRef = db.collection("MetaData").doc("WebsiteInfo");
  await docRef.set(oldData);
};
