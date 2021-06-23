require("dotenv").config();
// polyfil
(global as any).XMLHttpRequest = require("xhr2");
import { getPageData } from "./puppeteer";
import admin from "firebase-admin";
import firebase from "firebase";
import "firebase/storage";
import * as functions from "firebase-functions";

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
// uid is constant length

export const test = functions
  .runWith({
    timeoutSeconds: 120,
    memory: "1GB",
  })
  .https.onRequest(async (req, res) => {
    const { headings, screenshots } = await getPageData();
    // adding headings to db
    headings["data"] = admin.firestore.FieldValue.serverTimestamp();
    console.log(headings, screenshots, "DANE ");
    const docRef = db.collection("headings").doc();
    // ading screenshots to storage
    for (let i = 0; i < screenshots.length; i++) {
      const screenshotRef = storageRef
        .child(screenshots[i].fileName)
        .put(screenshots[i].imageBuffer)
        .then((s) => {
          console.log("win", s);
        });
    }
    await docRef.set({ headings });
  });

export const savePagesContent2 = functions
  .runWith({
    timeoutSeconds: 120,
    memory: "1GB",
  })
  .pubsub.schedule("every 24 hours")
  .onRun(async (context) => {
    const { headings, screenshots } = await getPageData();
    // adding headings to db
    headings["data"] = admin.firestore.FieldValue.serverTimestamp();
    console.log(headings, screenshots);
    const docRef = db.collection("headings").doc();
    // ading screenshots to storage
    for (let i = 0; i < screenshots.length; i++) {
      const screenshotRef = storageRef
        .child(screenshots[i].fileName)
        .put(screenshots[i].imageBuffer)
        .then((s) => {
          console.log("win", s);
        });
    }
    await docRef.set({ headings });
  });
// export const scheduled = functions.pubsub
//   .schedule("every 5 minutes")
//   .onRun((context) => {
//     console.log("XD");
//     return null;
//   });
