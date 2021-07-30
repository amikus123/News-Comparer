import "date-fns";
import { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Typography from "@material-ui/core/Typography";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

import { FringeDates } from "../../interfaces";

export default function DateSelector({
  chosenDates,
  fringeDates,
  updateChosenDates,
}: {
  chosenDates: FringeDates;
  fringeDates: FringeDates;
  updateChosenDates: (obj: FringeDates) => void;
}) {
  const [error, setError] = useState<string>("");
  const [localDates, setLocalDates] = useState<FringeDates>(chosenDates);

  const handleGenerator = (num: number) => {
    const handleDateChange = (date: MaterialUiPickersDate | null) => {
      if (date !== null) {
        const normalDate = date.toDate();
        let res: FringeDates;

        if (num === 0) {
          res = {
            min: normalDate,
            max: localDates.max,
          };
        } else {
          res = {
            min: localDates.min,
            max: normalDate,
          };
        }

        setLocalDates(res);
        if (res.min.getTime() > res.max.getTime()) {
          // change classes
          setError("The date on right should be before the one on the left");
        } else {
          updateChosenDates(res);
          setError("");
        }
      } else {
        setError("");
      }
    };
    return handleDateChange;
  };
  useEffect(() => {
    setLocalDates(chosenDates);
    if (chosenDates.min.getTime() > chosenDates.max.getTime()) {
      setError("The date on right should be before the one on the left");
    } else {
      // user cant select date that is in out of bound hen we have more than 7 heading in DB
      setError("");
    }
  }, [chosenDates]);
  return (
    // TODO ERROR CLASS
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Grid container justify="space-around">
        <div className="dateSelector--wraper">
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="DD/MM/yyyy"
            margin="normal"
            label="Start date"
            value={localDates.max}
            onChange={handleGenerator(1)}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            maxDate={fringeDates.max}
            minDate={fringeDates.min}
            className={error !== "" ? "date-group--date-selector--error" : ""}
          />
          <p className="date-group--date-selector-text">Choose start date</p>
        </div>
        <div className="dateSelector--wraper">
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="DD/MM/yyyy"
            margin="normal"
            label="End date"
            value={localDates.min}
            onChange={handleGenerator(0)}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            maxDate={fringeDates.max}
            minDate={fringeDates.min}
            // onClose={handleClose}
            className={error !== "" ? "date-group--date-selector--error" : ""}
          />
          <p className="date-group--date-selector-text">Choose end date</p>
        </div>
      </Grid>
      <Typography gutterBottom> {error} </Typography>
    </MuiPickersUtilsProvider>
  );
}
