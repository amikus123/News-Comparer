import { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import {
  HeadingsByDate,
  FringeDates,
  WebsiteJointDataMap,
  WordMap,
  DailyWebsitesDataMap,
  NameToWordMap,
  NameToWordMaps,
} from "../../interfaces";
import { combineWordMaps, sortKeysByCount } from "../../helpers/mapFunctions";
import PopularWords from "./PopularWords";
import {
  formatedYearsFromDates,
  getAllDatesBetween,
} from "../../helpers/dataCreation";
import WordCompare from "./WordCompare";
import GraphsByPopularity from "./GraphsByPopularity";
const Words = ({
  names,
  chosenDates,
  headingMap,
  webisteJointDataMap,
}: {
  names: string[];
  chosenDates: FringeDates;
  headingMap: HeadingsByDate;
  webisteJointDataMap: WebsiteJointDataMap;
}) => {
  const [wordDataOfAll, setWordDataOfAll] = useState<NameToWordMap>({});
  const [wordDataOfSelected, setWordDataOfSelected] = useState<NameToWordMap>(
    {}
  );
  const [sortedSelectedWordsByCount, setSortedSelectedByCount] = useState<
    string[]
  >([]);
  const [sortedAllWordsByCount, setSortedAllByCount] = useState<string[]>([]);

  useEffect(() => {
    // two states, one for all pagesand one for those selected
    const totalMap: NameToWordMap = {};
    const selectedMap: NameToWordMap = {};

    const allNames = Object.keys(webisteJointDataMap);
    // stores all the maps and megres themd
    const mapOfArr: NameToWordMaps = {};
    const datesBetween = formatedYearsFromDates(
      getAllDatesBetween(chosenDates)
    );
    // has key only for seleted names
    for (let name of names) {
      selectedMap[name] = {};
    }

    for (let name of allNames) {
      totalMap[name] = {};
      mapOfArr[name] = [];
    }

    for (const i of datesBetween) {
      const current: DailyWebsitesDataMap = headingMap[i].totalDailySiteData;
      for (const name in current) {
        console.log(name, "QQ", mapOfArr);
        mapOfArr[name].push(current[name].pageDailyFrequencyOfWords);
      }
    }

    const combinedForTotal: WordMap[] = [];
    const combinedForSelected: WordMap[] = [];
    for (let name of allNames) {
      const combinedForName = combineWordMaps(mapOfArr[name]);

      totalMap[name] = combinedForName;
      combinedForTotal.push(combinedForName);
      if (selectedMap[name] !== undefined) {
        selectedMap[name] = combinedForName;
        combinedForSelected.push(combinedForName);
      }
    }
    totalMap.total = combineWordMaps(combinedForTotal);
    selectedMap.total = combineWordMaps(combinedForSelected);
    setWordDataOfSelected(selectedMap);
    setWordDataOfAll(totalMap);
    setSortedSelectedByCount(sortKeysByCount(selectedMap.total));
    setSortedAllByCount(sortKeysByCount(totalMap.total));
  }, [webisteJointDataMap, headingMap, chosenDates, names]);

  return (
    <Grid className="words--container">
      {/* some kind of switch to chnage what is displayed */}
      <GraphsByPopularity
        wordDataOfAll={wordDataOfAll}
        wordDataOfSelected={wordDataOfSelected}
        webisteJointDataMap={webisteJointDataMap}
        sortedSelectedWordsByCount={sortedSelectedWordsByCount}
        sortedAllWordsByCount={sortedAllWordsByCount}
      />
      <p>Search for word</p>
      <WordCompare
        wordData={wordDataOfSelected}
        webisteJointDataMap={webisteJointDataMap}
      />
    </Grid>
  );
};
export default Words;
