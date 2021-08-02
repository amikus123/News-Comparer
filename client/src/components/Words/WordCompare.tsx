import React, { ChangeEvent, useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete, { AutocompleteChangeReason } from "@material-ui/lab/Autocomplete";
import { NameToWordMap } from "../../interfaces";
interface WordOption {
  word: string;
  count: number;
}
interface OptionsMap {
  [name: string]: WordOption[];
}
const WordCompare = ({ wordData }: { wordData: NameToWordMap }) => {
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
  const handleChange = (event: ChangeEvent<{}>, value: WordOption[], reason: AutocompleteChangeReason) =>{
    const words:string[] = []
    for(let x of value){
      words.push(x.word)
    }
    setSelectedWords(words)
  }
  return (
    <div>
      {suggestions.total ? (
        <Autocomplete
          multiple
          options={suggestions.total}
          getOptionLabel={(option) => option.word}
          style={{ width: 300 }}
          onChange = {handleChange}
          renderInput={(params) => (
            <TextField {...params} label="Combo box" variant="outlined" />
          )}
        />
      ) : null}
    </div>
  );
};

export default WordCompare;
{/* <Autocomplete
  id="virtualize-demo"
  style={{ width: 300 }}
  disableListWrap
  classes={classes}
  ListboxComponent={ListboxComponent as React.ComponentType<React.HTMLAttributes<HTMLElement>>}
  renderGroup={renderGroup}
  options={OPTIONS}
  groupBy={(option) => option[0].toUpperCase()}
  renderInput={(params) => <TextField {...params} variant="outlined" label="10,000 options" />}
  renderOption={(option) => <Typography noWrap>{option}</Typography>}
/> */}