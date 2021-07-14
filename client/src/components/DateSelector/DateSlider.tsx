import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import {
  dateToDayAndMonth,
  getNPreviousDates,
} from "../../helpers/dataCreation";

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

function valuetext(value: number) {
  return `${value}°C`;
}
interface mark {
  label: string;
  value: number;
}
interface pog {
  marks: mark[];
  dates: Date[];
}
export default function RangeSlider() {
  const classes = useStyles();
  const [value, setValue] = React.useState<number[]>([60, 70]);
  const getSevenPreviousDays = (): pog => {
    const res = getNPreviousDates(7);
    const marks: mark[] = res.map((date, index) => {
      return {
        label: dateToDayAndMonth(date),
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
  // const [value, setValue] = React.useState<string[]>([]);
  // const marks =
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
