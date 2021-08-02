import React, { ChangeEvent, useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete, { AutocompleteChangeReason } from "@material-ui/lab/Autocomplete";
import { NameToWordMap,WebsiteJointDataMap } from "../../interfaces";
export interface WordOption {
  word: string;
  count: number;
}
export interface OptionsMap {
  [name: string]: WordOption[];
}
const WordCompare = ({ wordData,webisteJointDataMap }: { wordData: NameToWordMap,webisteJointDataMap:WebsiteJointDataMap }) => {
  // Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
  const [suggestions, setSuggestions] = useState<OptionsMap>({});
  const [selectedWord,setSelectedWords] = useState<string[]>([])

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

  // useEffect(() => {
  //   const allNames = Object.keys(webisteJointDataMap);

  //   console.log(selectedGraphDataRaw, "selectedGraphDataRaw");
  //   const fullGraphDataRaw = passOnlyChosenData(
  //     allNames,
  //     chosenDates,
  //     headingMap
  //   );
  //   const selected2 = getMaxNValuesFromMap(
  //     fullGraphDataRaw.total.frequencyOfWords,
  //     value
  //   );
  //   const selected = getMaxNValuesFromMap(
  //     selectedGraphDataRaw.total.frequencyOfWords,
  //     value
  //   );
  //   console.log(selected, "selected");
  //   setSelectedGraphData(
  //     getFormatedDataToGraph(selectedGraphDataRaw, selected)
  //   );
  //   setFullGrapghData(getFormatedDataToGraph(fullGraphDataRaw, selected2));
  // }, [chosenDates, names, headingMap, value, webisteJointDataMap]);


  const handleChange = (event: ChangeEvent<{}>, value: WordOption[], reason: AutocompleteChangeReason) =>{
    const words:string[] = []
    for(let x of value){
      words.push(x.word)
    }
    setSelectedWords(words)
  }
  return (
    <div>
      {/* {suggestions.total ? (
        <Autocomplete
          multiple
          options={suggestions.total}
          getOptionLabel={(option) => option.word}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Combo box" variant="outlined" />
          )}
        />
      ) : null}

      {
        null? <Graph
        data={graphData}
        webisteJointDataMap={webisteJointDataMap}
      />:null
      } */}
    </div>
  );
};

export default WordCompare;