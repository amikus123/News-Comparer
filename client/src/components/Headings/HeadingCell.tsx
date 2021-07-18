import React from "react";
import { HeadingData } from "../../interfaces";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { VariableSizeList , ListChildComponentProps } from "react-window";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "33%",
      height: 400,
      maxWidth:330,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

const HeadingCell = ({ headings }: { headings: HeadingData[] }) => {
  // TODO add links
  const classes = useStyles();
  const calcualteHeight = (index:number) =>{
    const textLen = headings[index].text.length
    return 20 + textLen*1.1
  }
  function renderRow(props: ListChildComponentProps) {
    const { index, style } = props;
    return (
      <ListItem style={style} key={index}>
        <ListItemText primary={headings[index].text} />
      </ListItem>
    );
  }

  return (
      <VariableSizeList  
        className={classes.root}
        height={400}
        width={"100%"}
        estimatedItemSize={70}
        itemSize={calcualteHeight}
        itemCount={headings.length}
      >
        {renderRow}
      </VariableSizeList>
  );
};

export default HeadingCell;
