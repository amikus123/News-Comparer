import puppeteer from "puppeteer";
import os from "os";
import { promises } from "fs";
import { ContentSelector, Heading, PopupSelector } from "../interfaces";
import { createFormatedDate } from "../helpers/generalHelpers";
export const takeAndSaveScreenshot = async (
  page: puppeteer.Page,
  name: string
) => {
  const imageName = `${name}-${createFormatedDate()}.jpg`;
  const path = `${os.tmpdir}//{1//${imageName}`;
  try {
    await page.screenshot({
      path: path,
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
      imageUintData: new Uint8Array(),
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
      const goodContentSelectors: ContentSelector[] = JSON.parse(selectors);
      const goodPopupSelectors: PopupSelector[] = JSON.parse(popupSelectors);
      let linkElements: any[] = [];
      let textElements: any[] = [];
      let imageElements: any[] = [];
      for (const selector in goodContentSelectors) {
        // getting elemenst by selector defined in database
        if (name === "OKO.press") {
          if (goodContentSelectors[selector].i !== "") {
            imageElements.push(
              ...Array.from(
                document.querySelectorAll(goodContentSelectors[selector].i)
              )
            );
          }
        } else {
          if (goodContentSelectors[selector].l !== "") {
            linkElements.push(
              ...Array.from(
                document.querySelectorAll(goodContentSelectors[selector].l)
              )
            );
          }
          if (goodContentSelectors[selector].t !== "") {
            textElements.push(
              ...Array.from(
                document.querySelectorAll(goodContentSelectors[selector].t)
              )
            );
          }
          if (goodContentSelectors[selector].i !== "") {
            imageElements.push(
              ...Array.from(
                document.querySelectorAll(goodContentSelectors[selector].i)
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
      // certain pages may have some unique way to gather data
      // maxium prevents big differences in amount of headings between pages
      const maxLen = Math.min(linkElements.length, 20);
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
          if (imageElements[i].getAttribute("data-src")) {
            image = imageElements[i].getAttribute("data-src");
          } else if (imageElements[i].getAttribute("data-original")) {
            image = imageElements[i].getAttribute("data-original");
          } else {
            image = imageElements[i].src;
          }
          while(image[0] === "/"){
            image = image.substr(1,image.length-1)
          }
          if(image[0]!== "h"){
            image = "https://" + image;
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
      return res;
    },
    JSON.stringify(contentSelectors),
    JSON.stringify(popupSelectors),
    name
  );

  return { ...headings };
};
