import "date-fns";
import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { FringeDates } from "../../interfaces";
import { getPreviousDay } from "../../helpers/dataCreation";

export default function DateSelector({
  chosenDates,
  fringeDates,
  updateChosenDates,
}: {
  chosenDates: FringeDates | null;
  fringeDates: FringeDates | null;
  updateChosenDates: (obj: FringeDates) => void;
}) {
  // The first commit of Material-UI

  const [error, setError] = useState<string>("");
  const handleGenerator = (num: number) => {
    const handleDateChange = (date: MaterialUiPickersDate | null) => {
      if (date !== null && chosenDates !== null) {
        const normalDate = date.toDate();
        let res: FringeDates;
        if (num === 0) {
          res = {
            min: normalDate,
            max: chosenDates.max,
          };
        } else {
          res = {
            min: chosenDates.min,
            max: normalDate,
          };
        }

        if (res.min.getTime() > res.max.getTime()) {
          setError("The date on left should be before the one on the right");
        } else {
          updateChosenDates(res);
          setError("");
        }
      }else{
        setError("");
      }
    };
    return handleDateChange;
  };
  const handleClose = () =>{
    setError("");

  }
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <p>epxlatiation</p>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="DD/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={chosenDates ? chosenDates.min : new Date()}
          onChange={handleGenerator(0)}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
          maxDate={fringeDates ? fringeDates.max : new Date()}
          minDate={fringeDates ? fringeDates.min : new Date()}
          onClose = {handleClose}
        />
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="DD/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={chosenDates ? chosenDates.max : new Date()}
          onChange={handleGenerator(1)}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
          maxDate={fringeDates ? fringeDates.max : new Date()}
          minDate={fringeDates ? fringeDates.min : new Date()}
          onClose = {handleClose}

        />
      </Grid>
        <p> {error} </p>
    </MuiPickersUtilsProvider>
  );
}
