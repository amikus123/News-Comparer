import { promises } from "fs";
import puppeteer from "puppeteer";
import os from "os";
import fs from "fs";
import { ContentSelector, Heading } from "../interfaces";

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
  contentSelectors: ContentSelector[],
  name: string
) => {
  const x = await page.evaluate(
    async (selectors, name) => {
      const res: Heading[] = [];
      const goodSelectors: ContentSelector[] = JSON.parse(selectors);
      let linkElements: any[] = [];
      let textElements: any[] = [];
      let imageElements: any[] = [];
      window.scrollBy(0, document.body.scrollHeight);

      for (const selector in goodSelectors) {
        // getting elemenst by selector defined in database
        if (goodSelectors[selector].l !== "") {
          linkElements.push(
            ...Array.from(document.querySelectorAll(goodSelectors[selector].l))
          );
        }
        if (goodSelectors[selector].t !== "") {
          textElements.push(
            ...Array.from(document.querySelectorAll(goodSelectors[selector].t))
          );
        }
        if (goodSelectors[selector].i !== "") {
          imageElements.push(
            ...Array.from(document.querySelectorAll(goodSelectors[selector].i))
          );
        }
      }

      
      const q = linkElements.length
      const w = textElements.length
      const e = imageElements.length
      // return [q,w,e]
   
      // return [linkElements.length,textElements.length,imageElements.length,q,w,e]
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
        linkElements.forEach((item) => {
          let image = "";
          if (imageMap[item.href]) {
            image = imageMap[item.href];
            delete imageMap[item.href];
          }

          const heading = {
            text: item.innerText,
            link: item.href,
            image,
          };
          res.push(heading);
        });
      }
      else {
        for (let i = 0; i < linkElements.length; i++) {
            let text = "";
            if (textElements[i].innerText) {
              text = textElements[i].innerText.trim();
            } else if (textElements[i].title) {
              text = textElements[i].title.trim();
            }
            // when text is empty, it may be an advert
            if (text !== "") {
              res.push({
                text: text,
                image: imageElements[i].src,
                link: linkElements[i].href,
              });
            }
          
        }
      }
      console.log(res, "internal end");
      return res
    },
    JSON.stringify(contentSelectors),
    name
  );

  return {...x};
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

/*
onet 


.mediumNewsBox 

link : href
image:  .imageContainer > imageWrapper > img.src
text  >h3 > span . innerText

.itembox
  link : href
  img : > img original || src
  text: div > h3 > span innerText



.news__box

i  >a>img
l  > div > a > h3

popular__box  news__mr > .popular__image > img
popular__box  
popular__box > .popular__description
i > 
l  . 
t > .popular__description
*/
