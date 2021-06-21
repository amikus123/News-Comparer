import puppeteer from "puppeteer";
import { URLS } from "./URLS";

export const getHeadings = async () => {
  const browser = await puppeteer.launch({});
  const page = await browser.newPage();
  const dataToReturn = {};
  page.on("console", (msg) => {
    for (let i = 0; i < msg.args.length; ++i)
      console.log(`${i}: ${msg.args[i]}`);
  });

  for (let index in URLS) {
    try {
      const { url, popupSelector, contentSelectors, title } = URLS[index];

      // waits 500ms after last network request
      await page.goto(url, { waitUntil: "networkidle0" });
      if (popupSelector !== "") {
        // click popup
        try {
          await page.click(popupSelector, {});
        } catch (e) {
          console.log(`errpor with popup : ${e}`);
        }
      }

      await page.screenshot({
        path: `${index}.png`,
        fullPage: true,
        quality: 0,
      });

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
      console.log(data);
      dataToReturn[title] = data;
    } catch (e) {
      console.error(`failed to open the page: ${1} with the error: ${e}`);
    }
  }
  return dataToReturn;
  let pages = await browser.pages();
  await Promise.all(pages.map((page) => page.close()));
  await browser.close();
  await browser.close();
};
