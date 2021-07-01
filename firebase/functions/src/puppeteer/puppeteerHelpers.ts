import { promises } from "fs";
import puppeteer from "puppeteer";
import os from "os";
import fs from "fs";
export const getScreenshotData = async (
  page: puppeteer.Page,
  imageName: string
) => {
  try {
    const downloadPath = `${os.tmpdir()}` + "/";
    const mypath = `${downloadPath}${imageName}.jpg`;
    await page.screenshot({
      path: mypath,
      fullPage: true,
      quality: 50,
      type: "jpeg",
    });
    console.log("ZDJECIE");

    const imageUintData = await promises
      .readFile(mypath)
      .then((result) => {
        console.log("CZYTANIE");
        if (fs.existsSync(mypath)) {
          console.log("exists:", mypath);
        } else {
          console.log("DOES NOT exist:", mypath);
        }
        return new Uint8Array(result);
      })
      .catch((error) => {
        console.log(error);
        return new Uint8Array();
      });
    return {
      imageName,
      imageUintData,
    };
  } catch (e) {
    console.error(e, "BLAD");
  }
  return {
    imageName: "e",
    imageUintData: new Uint8Array(),
  };
};

export const getHeadings = async (
  page: puppeteer.Page,
  contentSelectors: string[]
) => {
  return await page.evaluate(async (selectors) => {
    // TEMPORARY FIX FOR LAZY LOADING
    const distance = 100;
    const delay = 100;
    while (
      document.scrollingElement!.scrollTop + window.innerHeight <
      document.scrollingElement!.scrollHeight
    ) {
      document.scrollingElement!.scrollBy(0, distance);
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
