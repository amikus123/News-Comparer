import { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { getFormatedDataToGraph, passOnlyChosenData } from "./WordsFunctions";
import {
  HeadingsByDate,
  FringeDates,
  AnyMap,
  WebsiteJointDataMap,
  WordMap,
  DailyWebsitesDataMap,
  NameToWordMap,
  NameToWordMaps,
} from "../../interfaces";
import {
  combineWordMaps,
  getMaxNValuesFromMap,
} from "../../helpers/mapFunctions";
import WordSlider from "./WordSlider";
import Graph from "./Graph";
import PopularWords from "./PopularWords";
import {
  formatedYearsFromDates,
  getAllDatesBetween,
} from "../../helpers/dataCreation";
import WordCompare from "./WordCompare";
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
  const [selectedGraphData, setSelectedGraphData] = useState<WordMap[]>([]);
  const [fullGrapghData, setFullGrapghData] = useState<WordMap[]>([]);
  const [wordDataOfAll, setWordDataOfAll] = useState<NameToWordMap>({});
  const [wordDataOfSelected, setWordDataOfSelected] = useState<NameToWordMap>(
    {}
  );

  const [value, setValue] = useState<number>(1);

  useEffect(() => {
    // two states, one for all pagesand one for those selected
    const totalMap: NameToWordMap = {};
    const selectedMap: NameToWordMap = {};

    const allNames = Object.keys(webisteJointDataMap);
    // stores all the maps and megres them
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
  }, [webisteJointDataMap, headingMap, chosenDates, names]);

  useEffect(() => {
    const allNames = Object.keys(webisteJointDataMap);
    const selectedGraphDataRaw = passOnlyChosenData(
      names,
      chosenDates,
      headingMap
    );
    console.log(selectedGraphDataRaw, "selectedGraphDataRaw");
    const fullGraphDataRaw = passOnlyChosenData(
      allNames,
      chosenDates,
      headingMap
    );
    const selected2 = getMaxNValuesFromMap(
      fullGraphDataRaw.total.frequencyOfWords,
      value
    );
    const selected = getMaxNValuesFromMap(
      selectedGraphDataRaw.total.frequencyOfWords,
      value
    );
    console.log(selected, "selected");
    setSelectedGraphData(
      getFormatedDataToGraph(selectedGraphDataRaw, selected)
    );
    setFullGrapghData(getFormatedDataToGraph(fullGraphDataRaw, selected2));
  }, [chosenDates, names, headingMap, value, webisteJointDataMap]);

  return (
    <Grid className="words--container">
      {/* some kind of switch to chnage what is displayed */}
      <WordSlider value={value} setValue={setValue} />
      <Graph
        data={selectedGraphData}
        names={names}
        webisteJointDataMap={webisteJointDataMap}
      />
      <Graph
        data={fullGrapghData}
        names={Object.keys(webisteJointDataMap)}
        webisteJointDataMap={webisteJointDataMap}
      />
      <p>Search for word</p>
      <WordCompare wordData={wordDataOfSelected} />
    </Grid>
  );
};
export default Words;
