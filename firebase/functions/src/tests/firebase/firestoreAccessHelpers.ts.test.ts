// require("dotenv").config();
// import admin from "firebase-admin";
// import firebase from "firebase";
// import "firebase/storage";

// import {
//   getWebsitesInfo,
//   getExcludedWords,
// } from "../../firebase/firestoreAccessHelpers";
// var serviceAccount = require("../../.../../../../../secret.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });
// const db = admin.firestore();
// const { apiKey, authDomain, storageBucket, projectId } = process.env;
// const firebaseConfig = {
//   apiKey,
//   authDomain,
//   projectId,
//   storageBucket,
// };
// firebase.initializeApp(firebaseConfig);

// describe("testing accessing firstore", () => {
//   it("whole array should only have strings and should be longer than 0", async () => {
//     const words = await getExcludedWords(db);
//     let onlyString = true;

//     for (let i = 0; i < words.length; i++) {
//       if (typeof words[i] !== "string") {
//         onlyString = false;
//       }
//     }
//     expect(onlyString && words.length > 0).toBe(true);
//   });

//   it("should return cont webiste data from a databse", async () => {
//     const webisteData = await getWebsitesInfo(db);
//     expect(webisteData !== null && webisteData?.length > 0).toBe(true);
//   });
// });
