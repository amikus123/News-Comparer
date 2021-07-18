import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";

import { HeadingRow } from "./HeadingsFunctions";
import HeadingCell from "./HeadingCell";
const HeadingsRow = ({
  headingsRow,
  names,
}: {
  headingsRow: HeadingRow;
  names: string[];
}) => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        marginBottom: "2rem",
      },
      date:{
        fontSize:"2rem",
        margin:"1.2rem"
      }
    })
  );
  const classes = useStyles();

  return (
    <Grid container justify="center" className={classes.root}>
      <Typography className={classes.date}>{headingsRow.date}</Typography>
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
