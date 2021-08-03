import React, { ChangeEvent, useEffect, useState } from "react";
import { getSuggestions } from "../../helpers/stateHelpers";
import { NameToWordMap, WebsiteJointDataMap } from "../../interfaces";
import AutoComplete from "./AutoComplete";
import Graph from "./Graph";
import { OptionsMap, WordOption } from "./WordsInterfaces";

const WordCompare = ({
  wordDataOfAll,
  wordDataOfSelected,
  webisteJointDataMap,
  suggestions,
}: {
  wordDataOfAll: NameToWordMap;
  wordDataOfSelected: NameToWordMap;
  webisteJointDataMap: WebsiteJointDataMap;
  suggestions: OptionsMap;
}) => {
  // Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
  const [selectedWord, setSelectedWords] = useState<string[]>([]);
  const [graphDataOfAll, setGraphDataOfAll] = useState<NameToWordMap>({});
  const [graphDataOfSelected, setGrapDataOfSelected] = useState<NameToWordMap>(
    {}
  );

  useEffect(() => {
    // change to functions i guess
    const allNames = Object.keys(wordDataOfAll);
    const selectedNames = Object.keys(wordDataOfSelected);
    const allRes: NameToWordMap = {};
    const selectedRes: NameToWordMap = {};
    for (let name of allNames) {
      allRes[name] = {};
    }
    for (let name of selectedNames) {
      selectedRes[name] = {};
    }

    for (const word of selectedWord) {
      for (let name of allNames) {
        allRes[name][word] = wordDataOfAll[name][word];
      }
      for (let name of selectedNames) {
        selectedRes[name][word] = wordDataOfSelected[name][word];
      }
    }

    setGrapDataOfSelected(selectedRes);
    setGraphDataOfAll(allRes);
  }, [selectedWord, wordDataOfSelected, wordDataOfAll]);

  return (
    <div className="words--compare-container">
      {suggestions.total ? (
        <>
          <p className="words--compare-text"> Search for word</p>

          <AutoComplete
            suggestions={suggestions}
            stateChange={setSelectedWords}
          />
          <Graph
            data={graphDataOfSelected}
            webisteJointDataMap={webisteJointDataMap}
            wordOrder={selectedWord}
            wordCount={selectedWord.length}
          />

          <Graph
            data={graphDataOfAll}
            webisteJointDataMap={webisteJointDataMap}
            wordOrder={selectedWord}
            wordCount={selectedWord.length}
          />
        </>
      ) : null}
    </div>
  );
};

export default WordCompare;
