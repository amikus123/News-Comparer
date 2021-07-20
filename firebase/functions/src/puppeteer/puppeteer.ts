import puppeteer from "puppeteer";
import { createFormatedDate } from "../helpers/generalHelpers";
import {
  clickPopup,
  getHeadings,
  getScreenshotData,
} from "./puppeteerHelpers.js";
import {
  TotalWebsiteStaticDataMap,
  TotalPuppeteerData,
  Screenshot,
  Heading,
} from "../interfaces";

// REMOVE AUTO SCROLL TO BOTTOM
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
      const headingsData: Heading[] = [];
      const images: Screenshot[] = [];
      const { url, popupSelector, contentSelectors, } =
        totalWebsiteStaticDataMap[key];
      try {
        // waits 500ms after last network request
        page.setDefaultNavigationTimeout(0);
        await page.goto(url, { waitUntil: "networkidle2" });
          const headingsData = await getHeadings(page, contentSelectors, key);
          dataToReturn[key] = {
            headingsData: headingsData,
          };
        
      } catch (e) {
        console.error(`Failed to open the page: ${url} with the error: ${e}`);
      }
    
  }
  console.log(dataToReturn)
  return dataToReturn;
};

