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
  setDowloadedHeadingImages,
}: {
  names: string[];
  chosenDates: FringeDates;
  headingMap: HeadingsByDate;
  downloadedHeadingImages: WordToWordMap;
  setDowloadedHeadingImages: Dispatch<SetStateAction<WordToWordMap>>;
}) => {
  const [columnHeadingData, setColumnHeadingData] = useState<HeadingRow[]>([]);
  useEffect(() => {
    const res = getSelectedHeadings(names, chosenDates, headingMap);
    console.log(res, "headins");
    setColumnHeadingData(res);
  }, [names, chosenDates, headingMap]);

  useEffect(() => {
    const getURLPair = async (src: string) => {
      // pair of true storgae url and url stored in headings
      let trueUrl = "none";
      if (src !== "") {
        trueUrl = await getImgSrcFromName(src);
      }
      const res: WordToWordMap = {};
      res[src] = trueUrl;
      return res;
    };

    const downloadAndCacheImages =  () => {
      const promisesOfTrueURLS: (Promise<WordToWordMap> | WordToWordMap)[] = [];
      for (let headingsRow of columnHeadingData) {
        for (let name of names) {
          const headings = headingsRow[name];
          if (typeof headings === "string") {
            continue;
          }
          console.log(headings,"before crash")
          for (let heading of headings) {
            let src = heading.image;
            if (downloadedHeadingImages[src] === undefined) {
              const halo = getURLPair(src);
              promisesOfTrueURLS.push(halo);
            }
          }
        }
      }
      Promise.all(promisesOfTrueURLS).then((trueURLS) => {
        // merging all the urls adn updating the state
        const megaMap: WordToWordMap = Object.assign({}, ...trueURLS);
        setDowloadedHeadingImages({
          ...downloadedHeadingImages,
          ...megaMap,
        });
      });
    };
    downloadAndCacheImages();
  }, [setDowloadedHeadingImages, columnHeadingData]);

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
