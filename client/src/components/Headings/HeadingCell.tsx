import React, { useEffect, useState } from "react";
import { Heading } from "../../interfaces";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { ListItem, Link } from "@material-ui/core/";
import { VariableSizeList, ListChildComponentProps } from "react-window";
import { getImgSrcFromName } from "../../firebase/storage";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "33%",
      height: 400,
      maxWidth: 330,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

const HeadingCell = ({ headings }: { headings: Heading[] }) => {
  // TODO add caching
  useEffect(() => {
    const a = async ( )=>{
      const helper :string[]= []
      for(let i in headings){
        let src = headings[i].image
        const trueUrl = await getImgSrcFromName(src)
        helper[i] = trueUrl
        console.log("fetch")
      }
      setUrls(helper)
    }
    a()
  }, [headings])
  const [urls,setUrls] = useState<string[]>([])
  const classes = useStyles();
  const calcualteHeight = (index: number) => {
    const textLen = headings[index].text.length;
    return 20 + textLen * 1.1;
  };
  function renderRow(props: ListChildComponentProps) {
    const { index, style } = props;
    return (
      <ListItem style={style} key={index} button>
        {/* <ListItemText primary={}  /> */}
        <Link href={headings[index].link}>
          <img src={urls[index]} alt="XD" />
          <p>{headings[index].text}</p>
        </Link>
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
      itemCount={11}
      // {headings.length
    >
      {renderRow}
    </VariableSizeList>
  );
};

export default HeadingCell;
