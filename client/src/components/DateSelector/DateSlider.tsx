import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import {
  dateToFormatedMonth,
  getNPreviousDates,
} from "../../helpers/dataCreation";
import { FringeDates } from "../../interfaces"

const useStyles = makeStyles({
  root: {
    width: 300,
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
export default function DateSlider({fringeDates,updateChosenDates,chosenDates}:{chosenDates:FringeDates | null,fringeDates :FringeDates | null,updateChosenDates:(min?: Date | null, max?: Date | null) => void}) {
  const classes = useStyles();
  const [value, setValue] = React.useState<number[]>([60, 70]);
  const getSevenPreviousDays = (): pog => {
    const res = getNPreviousDates(7);
    if(fringeDates?.min.getDay() === new Date().getDay()){
      res.pop()
      }else{
      res.shift()
    }
    const marks: mark[] = res.map((date, index) => {
      return {
        label: dateToFormatedMonth(date),
        value: index * 10,
      };
    });

    return {
      dates: res,
      marks: marks,
    };
  };
  useEffect(() => {
    setDates(getSevenPreviousDays());
  }, []);
  const [dates, setDates] = React.useState<pog | null>(null);

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number[]);
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
            max={70}
            step={10}
          />
        </>
      ) : null}
    </div>
  );
}
