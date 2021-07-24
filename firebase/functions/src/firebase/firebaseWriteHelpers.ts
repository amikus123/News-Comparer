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

export const getUnit8OFCompressed = async (
  pathsToFiles: string[],
  fileNames:string[]
  
): Promise<ScreenshotToUpload[]> => {
  const dirPath = `${os.tmpdir()}\\uncompressed`;
  const dataToUpload: ScreenshotToUpload[] = [];
  for (const index in pathsToFiles) {
    try {
      const imageName = fileNames[index];
      const mypath = pathsToFiles[index];
      const imageUintData = await fsPromises
        .readFile(mypath)
        .then((result) => {
          return new Uint8Array(result);
        })
        .catch((error) => {
          console.log("zjebalo sie w unit8", error);
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

export const removeFile = async (path: string) => {
  try {
    await fsPromises.unlink(path);
    return true;
  } catch (error) {
    console.error("removeFile " ,error);
    return false;
  }
};


export const uploadToStoarge = async (
  screenshots: ScreenshotToUpload[],
  storageRef: firebase.storage.Reference
) => {
  const metadata = {
    contentType: 'image/jpeg',
  };
  
  for (let i in screenshots) {
    const screenshotRef = storageRef
      .child(`${screenshots[i].imageName}`)
      .put(screenshots[i].imageUintData,metadata)
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
