import { createFormatedDate } from "../helpers/generalHelpers";
import { PuppeteerPageData, TotalPuppeteerData } from "../interfaces";
import { createDirs, dowloadFileAndStoreIt, getUnit8OFCompressed, uploadToStoarge } from "./firebaseWriteHelpers";
import firebase from "firebase";

export const uploadImagesFromPuppeteer = async (
  totalPuppeteerData: TotalPuppeteerData,
  storageRef:firebase.storage.Reference
) => {
  for (const name in totalPuppeteerData) {
    await handleSinglePuppeteerData(totalPuppeteerData[name],storageRef);
  }
};

export const handleSinglePuppeteerData = async (pupeteerData: PuppeteerPageData,storageRef:firebase.storage.Reference) => {
  const baseFileLocation = `${pupeteerData.name}-${createFormatedDate()}-`;
  const headings = pupeteerData.headingsData;

  if (headings) {
    const uncompressedFilePaths = [];
    const fileNames = [];
    await createDirs()
    for (let i in headings) {
      if (headings[i].image !== "") {
        // this is final storage url form compressed image
        const storageFileLoaction = baseFileLocation + `${i}.jpg`;
        const uncompressedFilePath = await dowloadFileAndStoreIt(
          headings[i].image,
          storageFileLoaction
        );
        fileNames.push(storageFileLoaction);
        uncompressedFilePaths.push(uncompressedFilePath);
        headings[i].image = storageFileLoaction;
      }
    }
    // compreession
    // await compressImage(uncompressedFilePaths);
    // getting unit8array data 
    const x = await getUnit8OFCompressed(uncompressedFilePaths)
    console.log("end",x)
    // await uploadToStoarge(x,storageRef)
  } else {
    console.error("PageData should include headings");
  }
};