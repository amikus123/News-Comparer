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
    // adds screenshots to firebase local storage
    const screenshotRef = storageRef
      .child(`${screenshots[i].imageName}.jpg`)
      .put(screenshots[i].imageUintData)
      .then((snapshot) => {
        console.log(" file uploaded");
      })
      .catch((e) => {
        console.log(e, "error while uploading");
      });
  }
};

// adds heading entry for a given day to firestore db
export const addDailyEntryFirebase = async (
  db: FirebaseFirestore.Firestore,
  dailyArray: DailySiteData[]
) => {
  const formatedDate = createFormatedDate();
  const dailyEntry = createDailyEntry(dailyArray);
  const docRef = db.collection("Headings").doc(formatedDate);
  await docRef.set(dailyEntry);
};

export const updateSingleWebsiteInfo = async (
  db: FirebaseFirestore.Firestore,
  newData: DailySiteData[]
) => {
  const oldData = await getPageMetaData(db);
  for (let siteData of newData) {
    if (siteData.websiteName in oldData) {
      updateSiteData(oldData[siteData.websiteName], siteData);
    } else {
    }
  }
  // console.log("NEW", oldData);
  const docRef = db.collection("MetaData").doc("WebsiteInfo");
  await docRef.set(oldData);
};
