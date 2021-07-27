import puppeteer from "puppeteer";
import os from "os";
import fs, { promises } from "fs";
import { ContentSelector, Heading, PopupSelector } from "../interfaces";
import {createFormatedDate} from "../helpers/generalHelpers"
export const takeAndSaveScreenshot = async (
  page: puppeteer.Page,
  name: string
) => {
  const imageName = `${name}-${createFormatedDate()}.jpg`
  const path = `${os.tmpdir}//{1//${imageName}`;
  try {
    await page.screenshot({
      path: path,
      // fullPage: true,
      quality: 50,
      omitBackground: true,
      type: "jpeg",
    });
    const imageUintData = await promises
      .readFile(path)
      .then((result) => {
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
    return {
      imageName,
      imageUintData :new Uint8Array(),
    };
  }

};

export const getHeadings = async (
  page: puppeteer.Page,
  contentSelectors: ContentSelector[],
  popupSelectors: PopupSelector[],
  name: string
): Promise<Heading[]> => {
  const headings = await page.evaluate(
    async (selectors, popupSelectors, name) => {
      const res: Heading[] = [];
      const goodSelectors: ContentSelector[] = JSON.parse(selectors);
      const goodPopupSelectors: PopupSelector[] = JSON.parse(popupSelectors);
      // i use any for elements chosen by selectors
      let linkElements: any[] = [];
      let textElements: any[] = [];
      let imageElements: any[] = [];

      for (const selector in goodSelectors) {
        // getting elemenst by selector defined in database
        if (name === "OKO.press") {
          if (goodSelectors[selector].i !== "") {
            imageElements.push(
              ...Array.from(
                document.querySelectorAll(goodSelectors[selector].i)
              )
            );
          }
        } else {
          if (goodSelectors[selector].l !== "") {
            linkElements.push(
              ...Array.from(
                document.querySelectorAll(goodSelectors[selector].l)
              )
            );
          }
          if (goodSelectors[selector].t !== "") {
            textElements.push(
              ...Array.from(
                document.querySelectorAll(goodSelectors[selector].t)
              )
            );
          }
          if (goodSelectors[selector].i !== "") {
            imageElements.push(
              ...Array.from(
                document.querySelectorAll(goodSelectors[selector].i)
              )
            );
          }
        }
      }
      for (const popupSelector of goodPopupSelectors) {
        const element: HTMLElement = document.querySelector(
          popupSelector.selector
        );
        if (element) {
          element.style[popupSelector.property] = popupSelector.value;
          if (popupSelector.important) {
            element.style.setProperty(popupSelector.property, "important");
          }
        }
      }

      // EXTRA FILLTERING
      if (name === "OKO.press") {
        linkElements = imageElements.map((img) => img.parentElement);
        textElements = imageElements.map(
          (img) =>
            img.parentElement.nextElementSibling.nextElementSibling.children[0]
        );
      }

      // return [imageElements.length,linkElements.length,textElements.length]

      // certain pages may have some unique way to gather data

      const maxLen = Math.min(linkElements.length, 10);

      if (name === "Krytyka_Polityczna") {
        const imageMap = {};
        //getting images
        imageElements.forEach((item) => {
          let src: string;
          if (item.className === "mp-bg-url") {
            src = item.parentElement.style["background-image"];
            // removes "url:( ... )"" from string
            src = src.slice(5, src.length - 2);
            imageMap[item.href] = src;
          } else {
            src = item.firstChild.firstChild.src;
            imageMap[item.href] = src;
          }
        });

        for (let i = 0; i < maxLen; i++) {
          let image = "";
          if (imageMap[linkElements[i].href]) {
            image = imageMap[linkElements[i].href];
            delete imageMap[linkElements[i].href];
          }
          const heading = {
            text: linkElements[i].innerText,
            link: linkElements[i].href,
            image,
          };
          res.push(heading);
        }
      } else {
        for (let i = 0; i < maxLen; i++) {
          let text = "";
          if (textElements[i].innerText) {
            text = textElements[i].innerText.trim();
          } else if (textElements[i].title) {
            text = textElements[i].title.trim();
          }
          let image = "";
          // fiexd for lazy loading in WP
          if (imageElements[i].getAttribute("data-src")) {
            image = imageElements[i].getAttribute("data-src");
          } else {
            image = imageElements[i].src;
          }
          // when text is empty, it may be an advert
          if (text !== "") {
            res.push({
              text,
              image,
              link: linkElements[i].href,
            });
          }
        }
      }
      console.log(res, "internal end");
      return res;
    },
    JSON.stringify(contentSelectors),
    JSON.stringify(popupSelectors),
    name
  );

  return { ...headings };
};
