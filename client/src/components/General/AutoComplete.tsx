import { Chip, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { ChangeEvent } from "react";
import { OptionsMap, WordOption } from "../Words/WordsInterfaces";

const AutoComplete = ({
  suggestions,
  stateChange,
  label,
}: {
  suggestions: OptionsMap;
  stateChange: React.Dispatch<React.SetStateAction<string[]>>;
  label: string;
}) => {
  const handleChange = (
    event: ChangeEvent<{}>,
    value: (string | WordOption)[]
  ) => {
    const words: string[] = [];
    for (let x of value) {
      if (typeof x === "string") {
        words.push(x.toLowerCase());
      } else {
        words.push(x.word.toLowerCase());
      }
    }
    stateChange(words);
  };

  return (
    <>
      {suggestions.Total ? (
        <Autocomplete
          multiple
          freeSolo={true}
          options={suggestions.Total.map((item) => item.word)}
          style={{ width: 300 }}
          className="autocomplete a"
          renderTags={(value: string[], getTagProps) =>
            value.map((option: string, index: number) => (
              <Chip
                variant="outlined"
                label={option}
                {...getTagProps({ index })}
              />
            ))
          }
          renderInput={(params) => (
            <TextField {...params} label={label} variant="outlined" />
          )}
          onChange={handleChange}
        />
      ) : null}
    </>
  );
};

export default AutoComplete;
