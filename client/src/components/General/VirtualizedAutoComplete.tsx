import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { AutocompleteRenderGroupParams } from '@material-ui/lab/Autocomplete';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ListSubheader from '@material-ui/core/ListSubheader';
import { useTheme, } from '@material-ui/core/styles';
import { VariableSizeList, ListChildComponentProps } from 'react-window';
import { Typography } from '@material-ui/core';
import { Chip } from "@material-ui/core";
import { ChangeEvent } from "react";
import { OptionsMap, WordOption } from "../Words/WordsInterfaces";

const LISTBOX_PADDING = 8; // px

function renderRow(props: ListChildComponentProps) {
  const { data, index, style } = props;
  return React.cloneElement(data[index], {
    style: {
      ...style,
      top: (style.top as number) + LISTBOX_PADDING,
    },
  });
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data: any) {
  const ref = React.useRef<VariableSizeList>(null);
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

// Adapter for react-window
const ListboxComponent = React.forwardRef<HTMLDivElement>(function ListboxComponent(props, ref) {
  const { children, ...other } = props;
  const itemData = React.Children.toArray(children);
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'), { noSsr: true });
  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 40;

  const getChildSize = (child: React.ReactNode) => {
    if (React.isValidElement(child) && child.type === ListSubheader) {
      return 40;
    }

    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  const gridRef = useResetCache(itemCount);

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
          className="remove-scroll"
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});







export default function VirtualizedAutoComplete({suggestions,
  stateChange,
  label,}:{ suggestions: OptionsMap;
    stateChange: React.Dispatch<React.SetStateAction<string[]>>;
    label: string;
}) {

  const handleChange = (
    event: ChangeEvent<{}>,
    value: (string | WordOption)[]
  ) => {
    // console.log(event,value, "XDD")f
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
    <Autocomplete
    debug
      id="virtualize-demo"
      style={{ width: 300 }}
      disableListWrap
      multiple
      freeSolo={true}
      ListboxComponent={ListboxComponent as React.ComponentType<React.HTMLAttributes<HTMLElement>>}
      options={suggestions.Total.map((item) => item.word)}
      renderInput={(params) => (
        <TextField {...params} label={label} variant="outlined" />
      )}
      renderOption={(option) => <Typography noWrap>{option}</Typography>}
      onChange={handleChange}

      renderTags={(value: string[], getTagProps) =>
        value.map((option: string, index: number) => (
          <Chip
            variant="outlined"
            label={option}
            {...getTagProps({ index })}
          />
        ))

      }
      
    />
  );
}