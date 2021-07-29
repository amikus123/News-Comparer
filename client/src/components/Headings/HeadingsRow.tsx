import { Dispatch, SetStateAction, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { HeadingRow } from "./HeadingsFunctions";
import HeadingCell from "./HeadingCell";
import { DateTypo } from "../Typography/CustomTypo";
import { WordToWordMap } from "../../interfaces";
const HeadingsRow = ({
  headingsRow,
  names,
  downloadedHeadingImages,
}: {
  headingsRow: HeadingRow;
  names: string[];
  downloadedHeadingImages: WordToWordMap;
}) => {
  
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
