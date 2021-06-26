import puppeteer from "puppeteer";
import { v4 as uuidv4 } from "uuid";

import {
  clickPopup,
  getHeadings,
  getScreenshotData,
} from "./puppeteerHelpers.js";
import { PuppeteerData, SingleWebisteConstData } from "./interfaces";
export const getPageData = async (
  db: FirebaseFirestore.Firestore,
  staticDataOfAllPages: SingleWebisteConstData[]
) => {
  const browser = await puppeteer.launch({});
  const page = await browser.newPage();
  const uniqueId = uuidv4();
  const dataToReturn: PuppeteerData = {
    allSiteData: [],
    screenshots: [],
  };
  // temporaty type error
  // allows to see console logs on puppeteer websites
  // page.on("console", (msg) => {
  //   for (let i = 0; i < msg.args.length; ++i)
  //     console.log(`${i}: ${msg.args[i]}`);
  // });

  if (staticDataOfAllPages) {
    for (let index in staticDataOfAllPages) {
      const {
        url,
        popupSelector,
        contentSelectors,
        nameToDisplay,
        imageName,
        analizeEmotions,
      } = staticDataOfAllPages[index];
      try {
        const screenshotFileName = `${uniqueId}${imageName}`;
        // waits 500ms after last network request
        await page.setDefaultNavigationTimeout(0);
        await page.goto(url, { waitUntil: "networkidle2" });
        await clickPopup(page, popupSelector);
        const headingsData = await getHeadings(page, contentSelectors);
        await clickPopup(page, popupSelector);
        dataToReturn.allSiteData.push({
          headings: headingsData,
          imageName,
          analizeEmotions,
          nameToDisplay,
        });
        const imgData = await getScreenshotData(page, screenshotFileName);
        dataToReturn.screenshots.push(imgData);
      } catch (e) {
        console.error(`Failed to open the page: ${url} with the error: ${e}`);
      }
    }
  }

  console.log("end of puppeteer", dataToReturn);
  return dataToReturn;
};
