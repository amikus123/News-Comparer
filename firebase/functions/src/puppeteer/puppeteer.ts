import puppeteer from "puppeteer";
import { createFormatedDate } from "../helpers/generalHelpers";
import {
  clickPopup,
  getHeadings,
  getScreenshotData,
} from "./puppeteerHelpers.js";
import { PuppeteerData, SingleWebisteConstData } from "../interfaces";
export const getPageData = async (
  accessDataOfPages: SingleWebisteConstData[]
) => {
  const browser = await puppeteer.launch({});
  const page = await browser.newPage();
  const dataToReturn: PuppeteerData = {
    allSiteData: [],
    screenshots: [],
  };
  if (accessDataOfPages) {
    for (let index in accessDataOfPages) {
      const {
        url,
        popupSelector,
        contentSelectors,
        nameToDisplay,
        imageName,
        analizeEmotions,
      } = accessDataOfPages[index];
      try {
        const screenshotFileName = `${createFormatedDate()}${imageName}`;
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
