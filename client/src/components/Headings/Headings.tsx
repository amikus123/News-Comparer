import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { HeadingsByDate, FringeDates, WordToWordMap } from "../../interfaces";
import HeadingsRow from "./HeadingsRow";
import { HeadingRow, getSelectedHeadings } from "./HeadingsFunctions";
import { getImgSrcFromName } from "../../firebase/storage";
const Headings = ({
  names,
  chosenDates,
  headingMap,
  downloadedHeadingImages,
  setDowloadedHeadingImages
}: {
  names: string[];
  chosenDates: FringeDates;
  headingMap: HeadingsByDate;
  downloadedHeadingImages: WordToWordMap;
  setDowloadedHeadingImages :Dispatch<SetStateAction<WordToWordMap>>;
}) => {
  const [columnHeadingData, setColumnHeadingData] = useState<HeadingRow[]>([]);
  useEffect(() => {
    const res = getSelectedHeadings(names, chosenDates, headingMap);
    console.log(res, "headins");
    setColumnHeadingData(res);
  }, [names, chosenDates, headingMap]);

  useEffect(() => {
    const downloadAndCacheImages = async () => {
            const tempMap: WordToWordMap = {};
      for (let index in columnHeadingData) {
        const headingsRow = columnHeadingData[columnHeadingData.length-Number(index) -1]
        for (let i in names) {
          const headings = headingsRow[names[i]];
          if (typeof headings === "string") {
            continue;
          }
          for (let i in headings) {
            let src = headings[i].image;
            if (downloadedHeadingImages[src] === undefined) {
              if (src === "") {
                // or placeholder, idk
                tempMap[src] = "";
              } else {
                const trueUrl = await getImgSrcFromName(src);
                tempMap[src] = trueUrl;
                console.log("fetch");
              }
            }
          }
          setDowloadedHeadingImages({ ...downloadedHeadingImages, ...tempMap });
        }
      }
    };

    downloadAndCacheImages();
  }, [setDowloadedHeadingImages, names,columnHeadingData]);

  return (
    <div className="reverse">
      {columnHeadingData.map((row, index) => {
        return (
          <HeadingsRow
            headingsRow={row}
            key={index}
            names={names}
            downloadedHeadingImages={downloadedHeadingImages}
          />
        );
      })}
    </div>
  );
};

export default Headings;
