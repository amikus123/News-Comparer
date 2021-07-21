import {
  DailySiteData,
  TotalPuppeteerData,
  PuppeteerPageData,
  ScreenshotToUpload,
} from "../interfaces";
import firebase from "firebase";
// may cause some bugs
// const fetch = require("node-fetch");
import fetch from "node-fetch";
import os from "os";
import fs, { promises } from "fs";
const fsPromises = require("fs").promises;

// import imagemin from "imagemin";
// import imageminMozjpeg from "imagemin-mozjpeg";
export const addImagesToStorage = async (
  screenshots: ScreenshotToUpload[],
  storageRef: firebase.storage.Reference
) => {
  // for (let i = 0; i < screenshots.length; i++) {
  //   // adds screenshots to firebase local storage
  //   const screenshotRef = storageRef
  //     .child(`${screenshots[i].imageName}.jpg`)
  //     .put(screenshots[i].imageUintData)
  //     .then((snapshot) => {
  //       console.log(" file uploaded");
  //     })
  //     .catch((e) => {
  //       console.log(e, "error while uploading");
  //     });
  // }
};

// adds heading entry for a given day to firestore db
export const addDailyEntryFirebase = async (
  db: FirebaseFirestore.Firestore,
  dailyArray: DailySiteData[]
) => {
  // const formatedDate = createFormatedDate();
  // const dailyEntry = createDailyEntry(dailyArray);
  // const docRef = db.collection("Headings").doc(formatedDate);
  // await docRef.set(dailyEntry);
};

export const updateSingleWebsiteInfo = async (
  db: FirebaseFirestore.Firestore,
  newData: DailySiteData[]
) => {
  // const oldData = await getPageMetaData(db);
  // for (let siteData of newData) {
  //   if (siteData.websiteName in oldData) {
  //     updateSiteData(oldData[siteData.websiteName], siteData);
  //   } else {
  //   }
  // }
  // // console.log("NEW", oldData);
  // const docRef = db.collection("MetaData").doc("WebsiteInfo");
  // await docRef.set(oldData);
};

export const createDirs = async () => {
  const tempDirPath1 = `${os.tmpdir()}\\uncompressed`;
  const tempDirPath2 = `${os.tmpdir()}\\compressed`;
  // make it

  const checkIfExists = async (path: string) => {
    try {
      await fsPromises.access(path);
      console.log("can access");
      return true;
    } catch {
      console.error("cannot access");
      await fsPromises.mkdir(path);
      return false;
    }
  };
  let y = await checkIfExists(tempDirPath1);
  let z = await checkIfExists(tempDirPath2);
 
  return [y, z];
};

export const dowloadFileAndStoreIt = async (
  foreignUrl: string,
  storageFileLoaction: string
) => {
  // add error hansling and compression
  const response = await fetch(foreignUrl);
  const buffer = await response.buffer();
  const tempDirPath = `${os.tmpdir()}\\uncompressed`;
  const uncompressedPath = `${tempDirPath}\\${storageFileLoaction}`;
  await fsPromises.writeFile(uncompressedPath, buffer, () =>
    console.log("finished dowloading and uploading !")
  );
  return uncompressedPath;
};

export const getUnit8OFCompressed = async (fileNames: string[]) => {
  const dirPath = `${os.tmpdir()}\\uncompressed`;
  const dataToUpload: ScreenshotToUpload[] = [];
  for (const index in fileNames) {
    try {
      const imageName = fileNames[index];
      const mypath = imageName;
      const imageUintData = await fsPromises
        .readFile(mypath)
        .then((result) => {
          console.log("CZYTANIE");
          return new Uint8Array(result);
        })
        .catch((error) => {
          console.log("zjebalo sie w unit8",error);
          return new Uint8Array();
        });
      dataToUpload.push({
        imageName,
        imageUintData,
      });
    } catch (e) {
      console.error(e, "BLAD");
    }
  }

  return dataToUpload;
};

export const uploadToStoarge = async (
  screenshots: ScreenshotToUpload[],
  storageRef: firebase.storage.Reference
) => {
  for (let i in screenshots) {
    const screenshotRef = storageRef
      .child(`${screenshots[i].imageName}`)
      .put(screenshots[i].imageUintData)
      .then((snapshot) => {
        console.log(" file uploaded");
      })
      .catch((e) => {
        console.log(e, "error while uploading");
      });
  }
};

export const s = async (
  screenshots: ScreenshotToUpload[],
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

export const getScreenshotData = async (imageName: string) => {
  try {
    const tempDirPath = `${os.tmpdir()}` + "/uncompressed/";
    const mypath = `${tempDirPath}${imageName}.jpg`;
    const imageUintData = await promises
      .readFile(mypath)
      .then((result) => {
        console.log("CZYTANIE");
        if (fs.existsSync(mypath)) {
          console.log("exists:", mypath);
        } else {
          console.log("DOES NOT exist:", mypath);
        }
        return new Uint8Array(result);
      })
      .catch((error) => {
        console.log(error);
        return new Uint8Array();
      });
    return {
      imageName,
      imageUintData,
    };
  } catch (e) {
    console.error(e, "BLAD");
  }
  return {
    imageName: "e",
    imageUintData: new Uint8Array(),
  };
};
