import { Screenshot } from "../interfaces";
import firebase from "firebase";

export const addImagesToStorage = async (
  screenshots: Screenshot[],
  storageRef: firebase.storage.Reference
) => {
  for (let i = 0; i < screenshots.length; i++) {
    const screenshotRef = storageRef
      .child(`${screenshots[i].imageName}.jpg`)
      .put(screenshots[i].imageUintData)
      .then((snapshot) => {
        console.log(snapshot, " file uploaded");
      })
      .catch((e) => {
        console.log(e);
      });
  }
};
