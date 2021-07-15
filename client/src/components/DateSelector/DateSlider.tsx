import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import {
  dateToFormatedMonth,
  getNPreviousDates,
} from "../../helpers/dataCreation";
import { FringeDates } from "../../interfaces";

const useStyles = makeStyles({
  root: {
    width: 250,
  },
});

interface mark {
  label: string;
  value: number;
}
interface pog {
  marks: mark[];
  dates: Date[];
}
export default function DateSlider({
  fringeDates,
  updateChosenDates,
  chosenDates,
}: {
  chosenDates: FringeDates;
  fringeDates: FringeDates;
  updateChosenDates: (obj: FringeDates) => void;
}) {
  const classes = useStyles();
  const [value, setValue] = React.useState<number[]>([30, 40]);

  const getSevenPreviousDays = (): pog => {
    console.log("WTRF");
    const res = getNPreviousDates(7);
    // revesring
    const copy :Date[] =[]
   
    if (fringeDates?.max.getDay() === new Date().getDay()) {
      res.pop();
    } else {
      res.shift();
    }
    for(let i =0;i<res.length;i++){
      copy.unshift(res[i])
    }
    const marks: mark[] = [];
    for (let i = 0; i < 7; i++) {
      marks.push({
        label: dateToFormatedMonth(copy[i]),
        value: i * 10,
      });
    }

    return {
      dates: copy,
      marks: marks,
    };
  };

  const [dates, setDates] = React.useState<pog>(getSevenPreviousDays());

  useEffect(() => {
    // setDates(getSevenPreviousDays());
  }, []);
  useEffect(() => {
    // what to do when they are out of bounds
  }, [chosenDates]);

  // 0 min
  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number[]);
    updateChosenDates({
      max: dates.dates[value[1] / 10],
      min: dates.dates[value[0] / 10],
    });
  };

  return (
    <div className={classes.root}>
      {dates ? (
        <>
          <Typography id="range-slider" gutterBottom>
            Temperature range
          </Typography>
          <Slider
            value={value}
            onChange={handleChange}
            marks={dates.marks}
            max={60}
            step={10}
          />
        </>
      ) : null}
    </div>
  );
}
