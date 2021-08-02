import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { HeadingsByDate, FringeDates, WordToWordMap } from "../../interfaces";
import HeadingsRow from "./HeadingsRow";
import { HeadingRow, getSelectedHeadings } from "./HeadingsFunctions";
import { getImgSrcFromName } from "../../firebase/storage";
import AutoComplete from "../Words/AutoComplete";
import { OptionsMap } from "../Words/WordsInterfaces";
const Headings = ({
  names,
  chosenDates,
  headingMap,
  downloadedHeadingImages,
  setDowloadedHeadingImages,
  suggestions
}: {
  names: string[];
  chosenDates: FringeDates;
  headingMap: HeadingsByDate;
  downloadedHeadingImages: WordToWordMap;
  setDowloadedHeadingImages: Dispatch<SetStateAction<WordToWordMap>>;
  suggestions:OptionsMap;
}) => {
  const [columnHeadingData, setColumnHeadingData] = useState<HeadingRow[]>([]);
  const [selectedWords,setSelectedWords] = useState<string[]>([])
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

    const downloadAndCacheImages = () => {
      const promisesOfTrueURLS: (Promise<WordToWordMap> | WordToWordMap)[] = [];
      for (let headingsRow of columnHeadingData) {
        for (let name of names) {
          const headings = headingsRow[name];
          if (typeof headings === "string") {
            continue;
          }
          console.log(headings, "before crash");
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
    <div className="headings reverse">
      {columnHeadingData.map((row, index) => {
        return (
          <HeadingsRow
            headingsRow={row}
            key={index}
            names={names}
            downloadedHeadingImages={downloadedHeadingImages}
            selectedWords={selectedWords}
          />
        );
      })}
      <p className="headings--tip">Scroll on collumns to see more</p>
      <AutoComplete suggestions={suggestions}  stateChange={setSelectedWords} />
    </div>
  );
};

export default Headings;
