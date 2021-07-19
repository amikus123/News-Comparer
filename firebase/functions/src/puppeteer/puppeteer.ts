import puppeteer from "puppeteer";
import { createFormatedDate } from "../helpers/generalHelpers";
import {
  clickPopup,
  getHeadings,
  getScreenshotData,
} from "./puppeteerHelpers.js";
import {TotalWebsiteStaticDataMap,TotalPuppeteerData,Screenshot,Heading} from "../interfaces"

// REMOVE AUTO SCROLL TO BOTTOM                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
export const getPageData = async (
  totalWebsiteStaticDataMap: TotalWebsiteStaticDataMap
) => {
  const dataToReturn: TotalPuppeteerData = {};
  const browser = await puppeteer.launch({});
  const page = await browser.newPage();
  await page.setViewport({ width: 1024, height: 2048 });
  for(const websiteStaticData  in totalWebsiteStaticDataMap ){
    const headingsData :Heading[] =[]
    const images :Screenshot[]= []
      const {
        url,
        popupSelector,
        contentSelectors,
        name,
      } = totalWebsiteStaticDataMap[websiteStaticData];
      try {
        const screenshotFileName = `${createFormatedDate()}-${name}`;
        // waits 500ms after last network request
        await page.setDefaultNavigationTimeout(0);
        await page.goto(url, { waitUntil: "networkidle2" });
        await clickPopup(page, popupSelector);
        const headingsData = await getHeadings(page, contentSelectors);
        await clickPopup(page, popupSelector);
        // dataToReturn.allSiteData.push({
        //   headings: headingsData,
        //   imageName,
        //   nameToDisplay,
        // });
        // const imgData = await getScreenshotData(page, screenshotFileName);
        // dataToReturn.screenshots.push(imgData);
      } catch (e) {
        console.error(`Failed to open the page: ${url} with the error: ${e}`);
      }
    
  }
  

  // console.log("end of puppeteer", dataToReturn);
  return dataToReturn;
};
