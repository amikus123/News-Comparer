import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {Grid } from "@material-ui/core";
import { HeadingRow } from "./HeadingsFunctions";
import HeadingCell from "./HeadingCell";
import {DateTypo} from "../Typography/CustomTypo"
const HeadingsRow = ({
  headingsRow,
  names,
}: {
  headingsRow: HeadingRow;
  names: string[];
}) => {

  return (
    <Grid container justify="center">
      <DateTypo margin={true}>{headingsRow.date}</DateTypo>
      <Grid justify="center" container item spacing={2}>
        {names.map((name, index) => {
          const pog = headingsRow[name];
          return typeof pog === "string" ? null : (
            <Grid item xs={4} key={index} container justify="center">
              <HeadingCell headings={pog} key={index} />
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default HeadingsRow;
