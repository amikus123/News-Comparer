import { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import {
  WebsiteJointDataMap,
  DailyWebsitesDataMap,
  NameToWordMap,
  NameToWordMaps,
} from "../../interfaces";
import { sortKeysByCount } from "../../helpers/mapFunctions";
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
    setSortedSelectedByCount(sortKeysByCount(wordDataOfSelected.total));
    setSortedAllByCount(sortKeysByCount(wordDataOfAll.total));
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
      <WordCompare
        suggestions={suggestions}
        wordDataOfAll={wordDataOfAll}
        wordDataOfSelected={wordDataOfSelected}
        webisteJointDataMap={webisteJointData}
      />
    </Grid>
  );
};
export default Words;
