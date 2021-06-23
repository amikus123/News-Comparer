import puppeteer from "puppeteer";

import { v4 as uuidv4 } from "uuid";
import { URLS } from "./URLS.js";
import { readFile } from "fs/promises";
import base64 from "base-64";
// import imagemin from "imagemin";
// import imageminMozjpeg from "imagemin-mozjpeg";
// const compressImages = async () => {
//   const files = await imagemin(["*.jpg"], {
//     destination: "",
//     plugins: [imageminMozjpeg({ quality: 50 })],
//   });
// };

export const getHeadings = async () => {
  const browser = await puppeteer.launch({});
  const page = await browser.newPage();
  const uniqueId = uuidv4();
  const dataToReturn = {
    headings: { uniqueId: uniqueId },
    screenshots: [],
  };

  page.on("console", (msg) => {
    for (let i = 0; i < msg.args.length; ++i)
      console.log(`${i}: ${msg.args[i]}`);
  });

  for (let index in URLS) {
    try {
      const { url, popupSelector, contentSelectors, title, imageName } =
        URLS[index];

      // waits 500ms after last network request
      await page.goto(url, { waitUntil: "networkidle0" });
      if (popupSelector !== "") {
        // click popup
        try {
          await page.click(popupSelector, {});
        } catch (e) {
          console.log(`error with popup : ${e}`);
        }
      }

      await page.screenshot({
        path: `${uniqueId}${imageName}.jpg`,
        fullPage: true,
        quality: 10,
        type: "jpeg",
      });
      const conent = await readFile(`${uniqueId}${imageName}.jpg`)
        .then(function (result) {
          return result;
        })
        .catch(function (error) {
          console.log(error);
        });

      const img = {
        location: `${uniqueId}${imageName}.jpg`,
        data: conent,
      };
      debugger;

      dataToReturn.screenshots.push(img);

      const data = await page.evaluate(
        async (selectors, num) => {
          let data: string[] = [];
          let chosenElements: any[] = [];
          for (let i = 0; i < selectors.length; i++) {
            chosenElements = [
              ...chosenElements,
              ...Array.from(document.querySelectorAll(selectors[i])),
            ];
          }
          for (const el of chosenElements) {
            const elementClasses = Array.from(el.classList);
            const parentClasses = Array.from(el.parentElement.classList);
            const elementText = el.innerText.trim();

            if (elementText !== "") {
              data.push(elementText);
            }
          }
          data = [...new Set(data)];
          return data;
        },
        contentSelectors,
        index
      );

      // console.log(data);
      dataToReturn.headings[title] = data;
    } catch (e) {
      console.error(`failed to open the page: ${1} with the error: ${e}`);
    }
  }
  // compressImages();
  console.log("ENd");
  return dataToReturn;
  let pages = await browser.pages();
  await Promise.all(pages.map((page) => page.close()));
  await browser.close();

  await browser.close();
};
// getHeadings();
