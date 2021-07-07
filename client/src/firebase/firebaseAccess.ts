import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { imageSourceRows, WebsiteData } from "../interfaces";

const firebaseConfig = {
  apiKey: "AIzaSyDQoHVRwE1UXiAuIbU5YU3fJL3iDzmSx_I",
  authDomain: "newscomparer.firebaseapp.com",
  projectId: "newscomparer",
  storageBucket: "newscomparer.appspot.com",
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage();

export const getHeadingDailyData = async () => {
  const querySnapshot = await getDocs(collection(db, "Headings"));
  console.log("click");
  console.log(querySnapshot);
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });
};

export const getWebisteStaticData = async () => {
  let toReturn: WebsiteData[] | undefined;
  const querySnapshot = await getDocs(collection(db, "Websites"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    if (doc.id === "WebsiteData") {
      toReturn = doc.data()["listOfWebsites"];
    }
  });
  console.log(toReturn);
  return toReturn;
};
export const createRowObjects = async () => {
  const arr = await getWebisteStaticData();
  const toReturn: imageSourceRows = {
    leftRow: [],
    centerRow: [],
    rightRow: [],
  };
  if (arr !== undefined) {
    for (let entry of arr) {
      if (entry!.politicalOrientation === "left") {
        toReturn.leftRow.push(entry);
      } else if (entry!.politicalOrientation === "center") {
        toReturn.centerRow.push(entry);
      } else {
        toReturn.rightRow.push(entry);
      }
    }
  }

  console.log(toReturn);
  return toReturn;
};
// Get a reference to the storage service, which is used to create references in your storage bucket

// Create a storage reference from our storage service
export const getImgSrcFronName = async (fileName = "4-6-2021-TVP_info.jpg") => {
  console.log(fileName);
  const x = getDownloadURL(ref(storage, fileName))
    .then((url) => {
      console.log(url,"cp wyszlo");
      return url;
    })
    .catch((error) => {
      console.error("failed fetching", error);
      return "";
      // Handle any errors
    });
    return x
};
export const getWebisteLogo = async (name: string) => {
  const x = await getImgSrcFronName(`${name}_Logo.png`);
  console.log("lofo", x,`${name}_Logo.png`);
  console.log(x)
  return x;
};
