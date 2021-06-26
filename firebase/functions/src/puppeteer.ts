import puppeteer from "puppeteer";
import { v4 as uuidv4 } from "uuid";
import { getExcludedWords, getWebsitesInfo } from "./helpers";
import { PuppeteerData } from "./interfaces";
import {
  clickPopup,
  getHeadings,
  getScreenshotData,
} from "./puppeteerHelpers.js";

export const getPageData = async (db: FirebaseFirestore.Firestore) => {
  const staticDataOfAllPages = await getWebsitesInfo(db);
  const excludedWords = await getExcludedWords(db);
  const browser = await puppeteer.launch({});
  const page = await browser.newPage();
  const uniqueId = uuidv4();
  const dataToReturn: PuppeteerData = {
    headings: {},
    screenshots: [],
  };
  // temporaty type error
  // allows to see console logs on puppeteer websites
  // page.on("console", (msg) => {
  //   for (let i = 0; i < msg.args.length; ++i)
  //     console.log(`${i}: ${msg.args[i]}`);
  // });

  if (staticDataOfAllPages && excludedWords) {
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
        await page.goto(url, { waitUntil: "networkidle2" });
        await clickPopup(page, popupSelector);

        const headingsData = await getHeadings(page, contentSelectors);
        dataToReturn.headings[nameToDisplay] = headingsData;
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
