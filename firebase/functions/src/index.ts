import * as functions from "firebase-functions";
import { head } from "lodash";
import * as puppeteer from "puppeteer";
const fs = require("fs");

import { URLS } from "./URLS";
// export const ssr = functions
//   .runWith({ memory: "1GB" })
//   .https.onRequest(async (req, res) => {
//     const browser = await puppeteer.launch({});
//     const page = await browser.newPage();
//     for (let x in URLS) {
//       await page.goto(URLS[x], { waitUntil: "networkidle0" });
//       await page.screenshot({ path: `${x}.png` });
//     }
//     // waits 500ms after last network request

//     await browser.close();
//   });

const test = async () => {
  const browser = await puppeteer.launch({});
  const page = await browser.newPage();
  page.on("console", (msg) => {
    for (let i = 0; i < msg.args.length; ++i)
      console.log(`${i}: ${msg.args[i]}`);
  });
  for (let x in URLS) {
    try {
      const { url, popupSelector, validateElements, contentSelectors } =
        URLS[x];

      const saveData = (prefix: string, data: string) => {
        fs.writeFile(`${prefix}.txt`, data, (err: Error) => {
          err ? console.log(err) : console.log("success");
        });
      };
      // waits 500ms after last network request
      await page.goto(url, { waitUntil: "networkidle0" });
      if (popupSelector !== "") {
        // click popup
        await page.click(popupSelector, {});
      }

      await page.screenshot({
        path: `${x}.png`,
        fullPage: true,
        quality: 0,
      });

      await page.exposeFunction(
        `myfunction${x}`,
        (elementClasses, parentClasses) => {
          return validateElements(elementClasses, parentClasses);
        }
      );

      const data = await page.evaluate(
        async (selectors, num) => {
          let data: string[] = [];

          let target: any[] = [];
          for (let i = 0; i < selectors.length; i++) {
            target = [
              ...target,
              ...Array.from(document.querySelectorAll(selectors[i])),
            ];
          }
          for (const el of target) {
            console.log(el, Object.keys(el)[0], "petla", el.classList[0]);
            const elementClasses = Array.from(el.classList);
            const parentClasses = Array.from(el.parentElement.classList);
            const elementText = el.innerText.trim();
            const aa = await window[`myfunction${num}`](
              elementClasses,
              parentClasses
            );
            console.log(aa);
            if (aa) {
              if (elementText !== "") {
                data.push(elementText);
              }
            } else {
              data.push("f");
            }
          }
          data = [...new Set(data)];
          return JSON.stringify(data);
        },
        contentSelectors,
        x
      );
      console.log(data);
      saveData(x, data);
    } catch (e) {
      console.log(`failed to open the page: ${1} with the error: ${e}`);
    }
  }
  await browser.close();
};

test();
// await browser.process()!.kill("SIGKILL");
// const pages = await browser.pages();
// await Promise.all(pages.map((page) => page.close()));
