import React, { ChangeEvent, useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete, {
  AutocompleteChangeReason,
} from "@material-ui/lab/Autocomplete";
import { NameToWordMap, WebsiteJointDataMap } from "../../interfaces";
import Graph from "./Graph";
import { passOnlyChosenData, getFormatedDataToGraph } from "./WordsFunctions";
export interface WordOption {
  word: string;
  count: number;
}
export interface OptionsMap {
  [name: string]: WordOption[];
}
const WordCompare = ({
  wordData,
  webisteJointDataMap,
}: {
  wordData: NameToWordMap;
  webisteJointDataMap: WebsiteJointDataMap;
}) => {
  // Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
  const [suggestions, setSuggestions] = useState<OptionsMap>({});
  const [selectedWord, setSelectedWords] = useState<string[]>([]);
  const [graphData, setGraphData] = useState<NameToWordMap>({});

  useEffect(() => {
    const res: OptionsMap = {};
    for (const name in wordData) {
      res[name] = [];
    }
    const total = wordData["total"];
    for (const word in total) {
      for (const name in wordData) {
        let wordCount = wordData[name][word];
        if (wordCount === undefined) {
          wordCount = 0;
        }
        res[name].push({
          word: word,
          count: wordCount,
        });
      }
    }

    setSuggestions(res);
  }, [wordData]);

  useEffect(() => {
    const res: NameToWordMap = {};
    const allNames = Object.keys(wordData);
    allNames.push("total");
    for (let name of allNames) {
      res[name] = {};
    }
    for (const word of selectedWord) {
      for (let name of allNames) {
        console.log( res[name], wordData[name],"XDDDD")
        res[name][word] = wordData[name][word];
      }
    }
    setGraphData(res);
  }, [selectedWord,webisteJointDataMap,wordData]);

  const handleChange = (
    event: ChangeEvent<{}>,
    value: WordOption[],
    reason: AutocompleteChangeReason
  ) => {
    const words: string[] = [];
    for (let x of value) {
      words.push(x.word);
    }
    setSelectedWords(words);
  };
  return (
    <div>
      {suggestions.total ? (
        <div>
          <Autocomplete
            multiple
            options={suggestions.total}
            getOptionLabel={(option) => option.word}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Combo box" variant="outlined" />
            )}
            onChange={handleChange}
          />
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
