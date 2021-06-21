import * as functions from "firebase-functions";
import { getHeadings } from "./puppeteer";
import admin from "firebase-admin";
import firebase from "firebase";
require("dotenv").config();

admin.initializeApp();
const db = admin.firestore();
const { apiKey, authDomain, databaseURL, storageBucket } = process.env;
var firebaseConfig = {
  apiKey,
  authDomain,
  databaseURL,
  storageBucket,
};
firebase.initializeApp(firebaseConfig);
const epi = async () => {};
epi();
export const test = functions
  .runWith({
    timeoutSeconds: 120,
    memory: "1GB",
  })
  .https.onRequest(async (req, res) => {
    const headings = await getHeadings();
    headings["data"] = admin.firestore.FieldValue.serverTimestamp();
    console.log(headings);

    const docRef = db.collection("headings").doc();
    await docRef.set({ headings });
  });
// export const ssr = functions
//   .runWith({ memory: "1GB" })
//   .https.onRequest(async (req, res) => {
//     const browser = await puppeteer.launch({});
//     const page = await browser.newPage();
//     for (let x in URLS) {
//       await page.goto(URLS[x], { waitUntil: "networkidle0" });
//       await page.screenshot({ path: `${x}.png` });
//     }
//     // waits 500ms after last network request

//     await browser.close();
//   });

// export const scheduled = functions.pubsub
//   .schedule("every 24 hours")
//   .onRun((context) => {
//     console.log("XD");
//     return null;
//   });
