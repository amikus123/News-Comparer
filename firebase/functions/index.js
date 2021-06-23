"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduled = exports.test = void 0;
require("dotenv").config();
global.XMLHttpRequest = require("xhr2");
const functions = __importStar(require("firebase-functions"));
const puppeteer_1 = require("./puppeteer");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const firebase_1 = __importDefault(require("firebase"));
require("firebase/storage");
firebase_admin_1.default.initializeApp();
const db = firebase_admin_1.default.firestore();
const { apiKey, authDomain, databaseURL, storageBucket } = process.env;
var firebaseConfig = {
    apiKey,
    authDomain,
    databaseURL,
    storageBucket,
};
firebase_1.default.initializeApp(firebaseConfig);
const storage = firebase_1.default.storage();
var storageRef = firebase_1.default.storage().ref();
// uid is constant length
exports.test = functions
    .runWith({
    timeoutSeconds: 120,
    memory: "1GB",
})
    .https.onRequest(async (req, res) => {
    const { headings, screenshots } = await puppeteer_1.getHeadings();
    // adding headings to db
    headings["data"] = firebase_admin_1.default.firestore.FieldValue.serverTimestamp();
    console.log(headings, screenshots);
    const docRef = db.collection("headings").doc();
    // ading screenshots to storage
    for (let i = 0; i < screenshots.length; i++) {
        var mountainsRef = storageRef
            .child(screenshots[i].location)
            .put(screenshots[i].data)
            .then((s) => {
            console.log("win", s);
        });
    }
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
exports.scheduled = functions.pubsub
    .schedule("every 24 hours")
    .onRun((context) => {
    console.log("XD");
    return null;
});
