import { createFormatedDate } from "../helpers/generalHelpers";
import { DailyHeadingsEntry, PuppeteerPageData, TotalPuppeteerData, WebisteDataOfAllTime } from "../interfaces";
import {dowloadFileAndStoreIt, getUnit8OFCompressed, uploadToStoarge } from "./firebaseWriteHelpers";
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
  const {headings,screenshot} = pupeteerData;
  if (headings) {
    const uncompressedFilePaths:string[] = [];
    const fileNames:string[] = [];
    for (let i in headings) {
      console.log("ASDDSAASD " ,pupeteerData.name)
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
    if(screenshot){
      await uploadToStoarge(screenshot,storageRef)

    }
    // compreession TODO
    // getting unit8array data 
    const x = await getUnit8OFCompressed(uncompressedFilePaths,fileNames)
    console.log("end",x)
    await uploadToStoarge(x,storageRef)
  } else {
    console.error("PageData should include headings");
  }
};

export const writeDailyHeadings = async(headingsData :DailyHeadingsEntry,db:FirebaseFirestore.Firestore) =>{
  db.collection("Headings").doc(createFormatedDate()).set({
    ...headingsData
})
.then(() => {
    console.log("Document successfully written!");
})
.catch((error) => {
    console.error("Error writing document: ", error);
});
}

export const writeTotalDataOfAllTime = async(webisteDataOfAllTime :WebisteDataOfAllTime,db:FirebaseFirestore.Firestore) =>{
  db.collection("Websites").doc("DynamicWebsiteData").set(
    {...webisteDataOfAllTime}
)
.then(() => {
    console.log("Document successfully written!");
})
.catch((error) => {
    console.error("Error writing document: ", error);
});
}