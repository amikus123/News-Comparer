import puppeteer from "puppeteer";
import { v4 as uuidv4 } from "uuid";
import { URLS } from "./URLS.js";
import { promises } from "fs";
import imagemin from "imagemin";
import imageminJpegtran from "imagemin-jpegtran";
const getScreenshotData = async (page: puppeteer.Page, fileName: string) => {
  await page.screenshot({
    path: `./tmp/${fileName}`,
    fullPage: true,
    quality: 50,
    type: "jpeg",
  });
  0;
  const imageBuffer = await promises
    .readFile(`./tmp/${fileName}`)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log(error);
    });
  // await promises.unlink(fileName);
  return {
    fileName,
    imageBuffer,
  };
};

const getHeadings = async (
  page: puppeteer.Page,
  contentSelectors: string[]
) => {
  return await page.evaluate(async (selectors) => {
    // TEMPORARY FIX FOR LAZY LOADING
    const distance = 100;
    const delay = 100;
    while (
      document.scrollingElement.scrollTop + window.innerHeight <
      document.scrollingElement.scrollHeight
    ) {
      document.scrollingElement.scrollBy(0, distance);
      await new Promise((resolve) => {
        setTimeout(resolve, delay);
      });
    }

    let headingsText: string[] = [];
    let chosenElements: any[] = [];
    for (let i = 0; i < selectors.length; i++) {
      chosenElements = [
        ...chosenElements,
        ...Array.from(document.querySelectorAll(selectors[i])),
      ];
    }
    for (const el of chosenElements) {
      const elementText = el.innerText.trim();
      if (elementText !== "") {
        headingsText.push(elementText);
      }
    }
    // removing duplictae headings
    return [...new Set(headingsText)];
  }, contentSelectors);
};
const clickPopup = async (page: puppeteer.Page, popupSelector: string) => {
  if (popupSelector !== "") {
    try {
      await page.click(popupSelector, {});
      return;
    } catch (e) {
      console.log(`error with popup : ${e}`);
      return;
    }
  }
};

export const getPageData = async () => {
  const browser = await puppeteer.launch({});
  const page = await browser.newPage();
  const uniqueId = uuidv4();
  const dataToReturn = {
    headings: {},
    screenshots: [],
  };
  // allows to see console logs on puppeteer websites
  page.on("console", (msg) => {
    for (let i = 0; i < msg.args.length; ++i)
      console.log(`${i}: ${msg.args[i]}`);
  });

  for (let index in URLS) {
    const { url, popupSelector, contentSelectors, title, imageName } =
      URLS[index];
    try {
      const screenshotFileName = `${uniqueId}${imageName}.jpg`;
      // waits 500ms after last network request
      await page.goto(url, { waitUntil: "networkidle2" });
      await clickPopup(page, popupSelector);

      const headingsData = await getHeadings(page, contentSelectors);
      dataToReturn.headings[title] = headingsData;
      const imgData = await getScreenshotData(page, screenshotFileName);
      dataToReturn.screenshots.push(imgData);
    } catch (e) {
      console.error(`Failed to open the page: ${url} with the error: ${e}`);
    }
  }
  console.log("end of puppeteer", dataToReturn);
  return dataToReturn;
};

getPageData();
