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

  page.on("console", (msg) => {
    for (let i = 0; i < msg.args.length; ++i)
      console.log(`${i}: ${msg.args[i]}`);
  });

  page.on("pageerror", (err) => {
    console.error(err);
  });

  await page.setViewport({ width: 800, height: 2400 });

  for (const name in totalWebsiteStaticDataMap) {
    // popupSelector shhould be named popupSelectors
    const { url, popupSelector, contentSelectors } =
      totalWebsiteStaticDataMap[name];
    // if (name !== "Wirtualna_Polska") {
    //   continue;
    // }
    try {
      // waits 500ms after last network request
      page.setDefaultNavigationTimeout(0);
      await page.goto(url, { waitUntil: "networkidle2" });
      const headingsData = await getHeadings(page, contentSelectors ,popupSelector, name);
      const fullScreenshot = await takeAndSaveScreenshot(page, name);
      console.log(headingsData);
      console.log(fullScreenshot);
      dataToReturn[name] = {
        headings: headingsData,
        fullScreenshot: fullScreenshot,
        name: name,
      };

      // upload article images to stoarge
      // get screenshots
    } catch (e) {
      console.error(`Failed to open the page: ${url} with the error: ${e}`);
    }
  }
  console.log(dataToReturn);
  return dataToReturn;
};
