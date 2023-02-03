import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import {
  HeadingsByDate,
  FringeDates,
  WordToWordMap,
  SelectedWebsites,
} from "../../interfaces";
import HeadingsRow from "./HeadingsRow";
import { HeadingRow, getSelectedHeadings } from "./HeadingsFunctions";
import { getImgSrcFromName } from "../../firebase/storage";
import VirtualizedAutoComplete from "../General/VirtualizedAutoComplete";
import { OptionsMap } from "../Words/WordsInterfaces";
import ShowMoreButton from "../General/ShowMoreButton";
import { reverseArrayInPlace } from "../../helpers/generalHelpers";
const Headings = ({
  chosenDates,
  headingMap,
  downloadedHeadingImages,
  setDowloadedHeadingImages,
  suggestions,
  selectedWebsites,
}: {
  chosenDates: FringeDates;
  headingMap: HeadingsByDate;
  downloadedHeadingImages: WordToWordMap;
  setDowloadedHeadingImages: Dispatch<SetStateAction<WordToWordMap>>;
  suggestions: OptionsMap;
  selectedWebsites: SelectedWebsites;
}) => {
  const [columnHeadingData, setColumnHeadingData] = useState<HeadingRow[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [displayedCount, setDisplayedCount] = useState<number>(2);
  useEffect(() => {
    // sets columnHeadingData to have only chosen dates
    const res = reverseArrayInPlace(
      getSelectedHeadings(selectedWebsites.names, chosenDates, headingMap)
    );
    setColumnHeadingData(res);
  }, [selectedWebsites.names, chosenDates, headingMap]);

  useEffect(() => {
    const getURLPair = async (src: string) => {
      // pair of true storage url and url stored in headings
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
        for (let name of selectedWebsites.names) {
          const headings = headingsRow[name];
          if (typeof headings === "string") {
            continue;
          }
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
        // merging all the urls and updating the state
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
    <div className="headings">
      <p className="headings--tip">Scroll collumns to see more headings</p>

      {columnHeadingData.map((row, index) => {
        return (
          <React.Fragment key={index}>
            {index <= displayedCount ? (
              <HeadingsRow
                headingsRow={row}
                key={index}
                selectedWebsites={selectedWebsites}
                downloadedHeadingImages={downloadedHeadingImages}
                selectedWords={selectedWords}
              />
            ) : null}
          </React.Fragment>
        );
      })}
      <VirtualizedAutoComplete
        suggestions={suggestions}
        stateChange={setSelectedWords}
        label="Filter headings by words"
      />

      <ShowMoreButton
        state={displayedCount}
        setState={setDisplayedCount}
        className=""
        max={columnHeadingData.length}
      />
    </div>
  );
};

export default Headings;
