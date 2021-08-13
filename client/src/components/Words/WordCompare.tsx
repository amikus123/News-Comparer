import { useEffect, useState } from "react";
import { NameToWordMap, WebsiteJointDataMap } from "../../interfaces";
import VirtualizedAutoComplete from "../General/VirtualizedAutoComplete";
import Graph from "./Graph";
import MobileGraphs from "./MobileGraphs";
import { OptionsMap } from "./WordsInterfaces";

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
      {suggestions.Total ? (
        <>
          <div className="words--compare-input-wrapper">
            <p className="words--compare-text">
              View graphs for selected words
            </p>

          
            <VirtualizedAutoComplete
              suggestions={suggestions}
              stateChange={setSelectedWords}
              label="View data for selected words"
            />
          </div>

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
          <MobileGraphs
            data={graphDataOfSelected}
            webisteJointDataMap={webisteJointDataMap}
            wordOrder={selectedWord}
            wordCount={selectedWord.length}
          />
          <MobileGraphs
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
