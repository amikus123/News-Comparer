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
import { OptionsMap } from "./WordsInterfaces";

import WordCompare from "./WordCompare";
import GraphsByPopularity from "./GraphsByPopularity";
const Words = ({
  webisteJointData,
  wordDataOfAll,
  wordDataOfSelected,
  suggestions,
}: {
  webisteJointData: WebsiteJointDataMap;
  wordDataOfAll: NameToWordMap;
  wordDataOfSelected: NameToWordMap;
  suggestions: OptionsMap;
}) => {
  const [sortedSelectedWordsByCount, setSortedSelectedByCount] = useState<
    string[]
  >([]);
  const [sortedAllWordsByCount, setSortedAllByCount] = useState<string[]>([]);

  useEffect(() => {
    // two states, one for all pagesand one for those selected

    setSortedSelectedByCount(sortKeysByCount(wordDataOfAll.total));
    setSortedAllByCount(sortKeysByCount(wordDataOfSelected.total));
  }, [wordDataOfAll, wordDataOfSelected]);

  return (
    <Grid className="words--container">
      {/* some kind of switch to chnage what is displayed */}
      <GraphsByPopularity
        wordDataOfAll={wordDataOfAll}
        wordDataOfSelected={wordDataOfSelected}
        webisteJointDataMap={webisteJointData}
        sortedSelectedWordsByCount={sortedSelectedWordsByCount}
        sortedAllWordsByCount={sortedAllWordsByCount}
      />
      <p>Search for word</p>
      <WordCompare
        suggestions={suggestions}
        wordData={wordDataOfSelected}
        webisteJointDataMap={webisteJointData}
      />
    </Grid>
  );
};
export default Words;
