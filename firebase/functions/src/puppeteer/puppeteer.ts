import puppeteer from "puppeteer";
import {
  getHeadings,
} from "./puppeteerHelpers.js";
import {
  TotalWebsiteStaticDataMap,
  TotalPuppeteerData,
  Heading,
} from "../interfaces";

export const getDataFromPages = async (
  totalWebsiteStaticDataMap: TotalWebsiteStaticDataMap
) => {
  const dataToReturn: TotalPuppeteerData = {};
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "'--start-maximized"],
  });
  const page = await browser.newPage();

  page.on("console", (msg) => {
    for (let i = 0; i < msg.args.length; ++i)
      console.log(`${i}: ${msg.args[i]}`);
  });

  page.on("pageerror", (err) => {
    console.error(err);
  });
  await page.setViewport({ width: 1024, height: 2048 });
  for (const key in totalWebsiteStaticDataMap) {
    if(key === "Onet"){
      continue
    }
      const { url, popupSelector, contentSelectors } =
        totalWebsiteStaticDataMap[key];
      try {
        // waits 500ms after last network request
        page.setDefaultNavigationTimeout(0);
        await page.goto(url, { waitUntil: "networkidle2" });
          const headingsData = await getHeadings(page, contentSelectors, key);
          console.log(headingsData)
          dataToReturn[key] = {
            headingsData: headingsData,
            name:key
          };
          
        // upload article images to stoarge
        // get screenshots
      } catch (e) {
        console.error(`Failed to open the page: ${url} with the error: ${e}`);
      }
    
  }
  console.log(dataToReturn)
  return dataToReturn;
};

// export const addImagesToStorage = async (
//   screenshots: ScreenshotToUpload[],
//   storageRef: firebase.storage.Reference
// ) => {
//   // for (let i = 0; i < screenshots.length; i++) {
//   //   // adds screenshots to firebase local storage
//   //   const screenshotRef = storageRef
//   //     .child(`${screenshots[i].imageName}.jpg`)
//   //     .put(screenshots[i].imageUintData)
//   //     .then((snapshot) => {
//   //       console.log(" file uploaded");
//   //     })
//   //     .catch((e) => {
//   //       console.log(e, "error while uploading");
//   //     });
//   // }
// };

// // adds heading entry for a given day to firestore db
// export const addDailyEntryFirebase = async (
//   db: FirebaseFirestore.Firestore,
//   dailyArray: DailySiteData[]
// ) => {
//   // const formatedDate = createFormatedDate();
//   // const dailyEntry = createDailyEntry(dailyArray);
//   // const docRef = db.collection("Headings").doc(formatedDate);
//   // await docRef.set(dailyEntry);
// };

// export const updateSingleWebsiteInfo = async (
//   db: FirebaseFirestore.Firestore,
//   newData: DailySiteData[]
// ) => {
//   // const oldData = await getPageMetaData(db);
//   // for (let siteData of newData) {
//   //   if (siteData.websiteName in oldData) {
//   //     updateSiteData(oldData[siteData.websiteName], siteData);
//   //   } else {
//   //   }
//   // }
//   // // console.log("NEW", oldData);
//   // const docRef = db.collection("MetaData").doc("WebsiteInfo");
//   // await docRef.set(oldData);
// };
