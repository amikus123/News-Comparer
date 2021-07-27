require("dotenv").config();
// polyfil
(global as any).XMLHttpRequest = require("xhr2");

import admin from "firebase-admin";
import firebase from "firebase";
import "firebase/storage";
import * as functions from "firebase-functions";

import { getDataFromPages } from "./puppeteer/puppeteer";
import {
  getExcludedWords,
  getTotalWebsiteStaticData,
  getWebisteDataOfAllTime,
} from "./firebase/firestoreAccessHelpers";
import {
  uploadImagesFromPuppeteer,
  writeDailyHeadings,
  writeTotalDataOfAllTime,
} from "./firebase/firebaseWrite";
import {
  createDailyHeadings,
  updateWebisteDataOfAllTime,
} from "./helpers/firestoreFormating";

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

export const test = functions
  .runWith({
    timeoutSeconds: 540,
    memory: "2GB",
  })
  .https.onRequest(async (req, res) => {
    const websiteInfo = await getTotalWebsiteStaticData(db);
    const excludedWords = await getExcludedWords(db);
    const webisteDataOfAllTime = await getWebisteDataOfAllTime(db);
    console.log(webisteDataOfAllTime, "Sstart")
    if (websiteInfo && excludedWords && webisteDataOfAllTime) {
      const totalPuppeteerData = await getDataFromPages(websiteInfo!);
      // chnages links in articles to link to storage, and puts images in storage
      // console.log(totalPuppeteerData);

      const headingsData = createDailyHeadings(
        totalPuppeteerData,
        excludedWords
      );
      // console.log("headings", headingsData);

      // update old data
      const updatedWebisteDataOfAllTime = updateWebisteDataOfAllTime(
        headingsData,
        webisteDataOfAllTime
      );
      console.log("all time", updatedWebisteDataOfAllTime);

      await writeTotalDataOfAllTime(updatedWebisteDataOfAllTime, db);
      await writeDailyHeadings(headingsData, db);
      return;
    } else {
      console.log("Unsuccessful fetching of webiste const info");
    }
  });

// export const savePagesContent = functions
//   .runWith({
//     timeoutSeconds: 360,
//     memory: "1GB",
//   })
//   .pubsub.schedule("every 24 hours")
//   .onRun(async (context) => {
//     const websiteInfo = await getWebsitesInfo(db);
//     const excludedWords = await getExcludedWords(db);
//     if (websiteInfo && excludedWords) {
//       // checking if we can access data from db
//       const { allSiteData, screenshots } = await getPageData(websiteInfo!);
//       const dailyArray = await createArrayOfDailySiteData(
//         allSiteData,
//         excludedWords
//       );
//       await addImagesToStorage(screenshots, storageRef);
//       await addDailyEntryFirebase(db, dailyArray);
//       await updateSingleWebsiteInfo(db, dailyArray);
//     } else {
//       console.log("Unsuccessful fetching of webiste const info");
//     }
//   });
