import { promises } from "fs";
import puppeteer from "puppeteer";

export const getScreenshotData = async (
  page: puppeteer.Page,
  imageName: string
) => {
  await page.screenshot({
    path: `./tmp/${imageName}.jpg`,
    fullPage: true,
    quality: 50,
    type: "jpeg",
  });
  0;
  const imageBuffer = await promises
    .readFile(`./tmp/${imageName}.jpg`)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
  // await promises.unlink(`./tmp/${imageName}.jpg`);
  return {
    imageName,
    imageBuffer,
  };
};

export const getHeadings = async (
  page: puppeteer.Page,
  contentSelectors: string[]
) => {
  return await page.evaluate(async (selectors) => {
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
    // TEMPORARY FIX FOR LAZY LOADING
    // const distance = 100;
    // const delay = 100;
    // while (
    //   document.scrollingElement!.scrollTop + window.innerHeight <
    //   document.scrollingElement!.scrollHeight
    // ) {
    //   document.scrollingElement!.scrollBy(0, distance);
    //   await new Promise((resolve) => {
    //     setTimeout(resolve, delay);
    //   });
    // }

    // removing duplictae headings
    return [...new Set(headingsText)];
  }, contentSelectors);
};

export const clickPopup = async (
  page: puppeteer.Page,
  popupSelector: string
) => {
  if (popupSelector != "") {
    try {
      await page.click(popupSelector, {});
      return;
    } catch (e) {
      console.log(`error with popup : ${e}`);
      return;
    }
  }
};
