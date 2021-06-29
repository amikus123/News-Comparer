require("dotenv").config();
// polyfil
(global as any).XMLHttpRequest = require("xhr2");

import admin from "firebase-admin";
import firebase from "firebase";
import "firebase/storage";
import * as functions from "firebase-functions";

import { getPageData } from "./puppeteer/puppeteer";
import {
  getExcludedWords,
  getWebsitesInfo,
} from "./firebase/firestoreAccessHelpers";
import {
  addDailyEntryFirebase,
  addImagesToStorage,
  updateSingleWebsiteInfo,
} from "./firebase/firebaseWriteHelpers";
import { createArrayOfDailySiteData } from "./helpers/firestoreFormating";

// INITIAL SETUP
admin.initializeApp();
const db = admin.firestore();
const { apiKey, authDomain, databaseURL, storageBucket } = process.env;
const firebaseConfig = {
  apiKey,
  authDomain,
  databaseURL,
  storageBucket,
};
firebase.initializeApp(firebaseConfig);
const storageRef = firebase.storage().ref();
// add testes, clean up code, add assertions,clean up "frequency of words"
export const test = functions
  .runWith({
    timeoutSeconds: 400,
    memory: "1GB",
  })
  .https.onRequest(async (req, res) => {
    const websiteInfo = await getWebsitesInfo(db);
    const excludedWords = await getExcludedWords(db);
    if (websiteInfo && excludedWords) {
      // checking if we d access data from db
      const { allSiteData, screenshots } = await getPageData(websiteInfo!);
      const dailyArray = await createArrayOfDailySiteData(
        allSiteData,
        excludedWords
      );
      await addImagesToStorage(screenshots, storageRef);
      await addDailyEntryFirebase(db, dailyArray);
      // await updateSingleWebsiteInfo(db, dailyArray);
    } else {
      console.log("Unsuccessful fetching of webiste const info");
    }
  });

export const savePagesContent2 = functions
  .runWith({
    timeoutSeconds: 400,
    memory: "1GB",
  })
  .pubsub.schedule("every 24 hours")
  .onRun(async (context) => {
    const websiteInfo = await getWebsitesInfo(db);
    const excludedWords = await getExcludedWords(db);
    if (websiteInfo && excludedWords) {
      // checking if we can access data from db
      const { allSiteData, screenshots } = await getPageData(websiteInfo!);
      const dailyArray = await createArrayOfDailySiteData(
        allSiteData,
        excludedWords
      );
      await addImagesToStorage(screenshots, storageRef);
      await addDailyEntryFirebase(db, dailyArray);
      await updateSingleWebsiteInfo(db, dailyArray);
    } else {
      console.log("Unsuccessful fetching of webiste const info");
    }
  });
