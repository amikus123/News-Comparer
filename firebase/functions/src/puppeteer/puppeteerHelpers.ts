import puppeteer from "puppeteer";

import { ContentSelector, Heading } from "../interfaces";

// export const getScreenshotData = async (
//   page: puppeteer.Page,
//   imageName: string
// ) => {
//   try {
//     const downloadPath = `${os.tmpdir()}` + "/";
//     const mypath = `${downloadPath}${imageName}.jpg`;
//     await page.screenshot({
//       path: mypath,
//       fullPage: true,
//       quality: 50,
//       type: "jpeg",
//     });
//     console.log("ZDJECIE");

//     const imageUintData = await promises
//       .readFile(mypath)
//       .then((result) => {
//         console.log("CZYTANIE");
//         if (fs.existsSync(mypath)) {
//           console.log("exists:", mypath);
//         } else {
//           console.log("DOES NOT exist:", mypath);
//         }
//         return new Uint8Array(result);
//       })
//       .catch((error) => {
//         console.log(error);
//         return new Uint8Array();
//       });
//     return {
//       imageName,
//       imageUintData,
//     };
//   } catch (e) {
//     console.error(e, "BLAD");
//   }
//   return {
//     imageName: "e",
//     imageUintData: new Uint8Array(),
//   };
// };

export const getHeadings = async (
  page: puppeteer.Page,
  contentSelectors: ContentSelector[],
  name: string
): Promise<Heading[]> => {
  const headings = await page.evaluate(
    async (selectors, name) => {
      const res: Heading[] = [];
      const goodSelectors: ContentSelector[] = JSON.parse(selectors);
      // i use any for elements chosen by selectors
      let linkElements: any[] = [];
      let textElements: any[] = [];
      let imageElements: any[] = [];

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
      // return [imageElements.length,linkElements.length,textElements.length]

      // certain pages may have some unique way to gather data
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
      return res;
    },
    JSON.stringify(contentSelectors),
    name
  );

  return { ...headings };
};
