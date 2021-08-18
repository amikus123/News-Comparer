import puppeteer from "puppeteer";
import { getHeadings, takeAndSaveScreenshot } from "./puppeteerHelpers.js";
import { TotalWebsiteStaticDataMap, TotalPuppeteerData } from "../interfaces";

export const getDataFromPages = async (
  totalWebsiteStaticDataMap: TotalWebsiteStaticDataMap
) => {
  const dataToReturn: TotalPuppeteerData = {};
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "'--start-maximized"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 3200 });

  for (const name in totalWebsiteStaticDataMap) {
    // popupSelector should be named popupSelectors
    const { url, popupSelector, contentSelectors } =
      totalWebsiteStaticDataMap[name];
      console.log('name',name)
  
    try {
      // waits 500ms after last network request
      page.setDefaultNavigationTimeout(0);
      await page.goto(url, { waitUntil: "networkidle2" });
      const headingsData = await getHeadings(page, contentSelectors ,popupSelector, name);
      // transforming heading data to array
      const x = []
      Object.keys(headingsData).forEach(entry=>{
        x.push(headingsData[entry])
      })
      const screenshot = await takeAndSaveScreenshot(page, name);
      dataToReturn[name] = {
        headings: x,
        screenshot: screenshot,
        name: name,
      };
    } catch (e) {
      console.error(`Failed to open the page: ${url} with the error: ${e}`);
    }
  }
  return dataToReturn;
};
