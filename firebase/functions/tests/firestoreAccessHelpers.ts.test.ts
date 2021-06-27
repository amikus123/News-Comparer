require("dotenv").config();
import admin from "firebase-admin";
import firebase from "firebase";
import "firebase/storage";
import * as functions from "firebase-functions";

import {
  getWebsitesInfo,
  getExcludedWords,
} from "../src/helpers/firestoreAccessHelpers";
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});
const db = admin.firestore();
const { apiKey, authDomain, storageBucket, projectId } = process.env;
const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
};
firebase.initializeApp(firebaseConfig);

describe("testing accessing firstore", () => {
  it("whole array should only have strings", async () => {
    const words = await getExcludedWords(db);
    let onlyString = true;

    for (let i = 0; i < words.length; i++) {
      if (typeof words[i] !== "string") {
        onlyString = false;
      }
    }
    expect(onlyString).toBe(true);
  });
});
