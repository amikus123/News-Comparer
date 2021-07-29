import { Dispatch, SetStateAction, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { HeadingRow } from "./HeadingsFunctions";
import HeadingCell from "./HeadingCell";
import { DateTypo } from "../Typography/CustomTypo";
import { WordToWordMap } from "../../interfaces";
import { getImgSrcFromName } from "../../firebase/storage";
const HeadingsRow = ({
  headingsRow,
  names,
  downloadedHeadingImages,
  setDowloadedHeadingImages,
}: {
  headingsRow: HeadingRow;
  names: string[];
  downloadedHeadingImages: WordToWordMap;
  setDowloadedHeadingImages: Dispatch<SetStateAction<WordToWordMap>>;
}) => {
  useEffect(() => {
    const downloadAndCacheImages = async () => {
      const tempMap: WordToWordMap = {};

      for (let i in names) {
        const headings = headingsRow[names[i]];
        if (typeof headings === "string") {
          continue;
        }
        for (let i in headings) {
          let src = headings[i].image;
          if (downloadedHeadingImages[src] === undefined ) {
            if(src === ""){
              // or placeholder, idk
              tempMap[src] = "";
            }else{
              const trueUrl = await getImgSrcFromName(src);
              tempMap[src] = trueUrl;
              console.log("fetch");
            }
           
            
          }
        }
        setDowloadedHeadingImages({ ...downloadedHeadingImages, ...tempMap });
      }
    };

    downloadAndCacheImages();
  }, [headingsRow, setDowloadedHeadingImages, names]);
  // add placeholders
  return (
    <Grid container justify="center">
      <DateTypo margin={true}>{headingsRow.date}</DateTypo>
      <Grid justify="center" container item spacing={2}>
        {names.map((name, index) => {
          const pog = headingsRow[name];
          return typeof pog !== "string" && typeof pog !== "undefined" ? (
            <Grid item xs={4} key={index} container justify="center">
              <HeadingCell
                headings={pog}
                key={index}
                downloadedHeadingImages={downloadedHeadingImages}
              />
            </Grid>
          ) : null;
        })}
      </Grid>
    </Grid>
  );
};

export default HeadingsRow;
