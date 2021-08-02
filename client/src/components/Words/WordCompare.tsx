import React, { ChangeEvent, useEffect, useState } from "react";
import { getSuggestions } from "../../helpers/stateHelpers";
import { NameToWordMap, WebsiteJointDataMap } from "../../interfaces";
import AutoComplete from "./AutoComplete";
import Graph from "./Graph";
import { OptionsMap, WordOption } from "./WordsInterfaces";

const WordCompare = ({
  wordData,
  webisteJointDataMap,
  suggestions
}: {
  wordData: NameToWordMap;
  webisteJointDataMap: WebsiteJointDataMap;
  suggestions:OptionsMap;
}) => {
  // Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
  const [selectedWord, setSelectedWords] = useState<string[]>([]);
  const [graphData, setGraphData] = useState<NameToWordMap>({});

  useEffect(() => {
    const res: NameToWordMap = {};
    const allNames = Object.keys(wordData);
    allNames.push("total");
    for (let name of allNames) {
      res[name] = {};
    }
    for (const word of selectedWord) {
      for (let name of allNames) {
        res[name][word] = wordData[name][word];
      }
    }
    setGraphData(res);
  }, [selectedWord,webisteJointDataMap,wordData]);


  return (
    <div>
      {suggestions.total ? (
        <div>
        <AutoComplete suggestions={suggestions}  stateChange={setSelectedWords} />
          <Graph
            data={graphData}
            webisteJointDataMap={webisteJointDataMap}
            wordOrder={selectedWord}
            wordCount={selectedWord.length}
          />
        </div>
      ) : null}
    </div>
  );
};

export default WordCompare;
