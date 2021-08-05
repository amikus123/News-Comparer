import React, { useEffect } from "react";
import { Button } from "@material-ui/core";
import Slider from "@material-ui/core/Slider";
import {
  dateToFormatedMonth,
  getNPreviousDates,
  checkIfSameDay,
} from "../../helpers/dataCreation";
import { FringeDates } from "../../interfaces";

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
  const [value, setValue] = React.useState<number[]>([0, 10]);

  const [dates, setDates] = React.useState<pog | null>(null);

  useEffect(() => {
    const getSevenPreviousDays = (): pog => {
      const res = getNPreviousDates(7);
      if (fringeDates?.max.getDay() === new Date().getDay()) {
        res.pop();
      } else {
        res.shift();
      }
      const marks: mark[] = [];
      for (let i = 0; i < 7; i++) {
        marks.push({
          label: dateToFormatedMonth(res[i]),
          value: i * 10,
        });
      }
      return {
        dates: res,
        marks: marks,
      };
    };

    setDates(getSevenPreviousDays());
  }, [fringeDates]);
  useEffect(() => {
    if (dates) {
      const arr = dates.dates;
      let num1 = 0;
      let num2 = 0;
      const first = arr.map((item) => {
        return checkIfSameDay(item, chosenDates.max);
      });
      const second = arr.map((item) => {
        return checkIfSameDay(item, chosenDates.min);
      });
      const firstIndex = first.indexOf(true);
      const secondIndex = second.indexOf(true);

      if (firstIndex === -1) {
        num1 = 70;
      } else {
        num1 = firstIndex * 10;
      }

      if (secondIndex === -1) {
        num2 = 70;
      } else {
        num2 = secondIndex * 10;
      }

      setValue([num1, num2]);
    }
  }, [chosenDates, dates]);

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };
  const handleChangeEnd = (event: any, newValue: number | number[]) => {
    setValue(newValue as number[]);
    if (dates) {
      updateChosenDates({
        min: dates.dates[value[1] / 10],
        max: dates.dates[value[0] / 10],
      });
    }
  };

  const selectAllDates = () => {
    if (fringeDates) {
      updateChosenDates(fringeDates);
    }
  };
  const selectToday = () => {
    if (fringeDates) {
      updateChosenDates({
        max: fringeDates.max,
        min: fringeDates.max,
      });
    }
  };

  return (
    <div className="slider--wrapper">
      {dates ? (
        <Slider
          value={value}
          onChange={handleChange}
          onChangeCommitted={handleChangeEnd}
          marks={dates.marks}
          max={60}
          step={10}
        />
      ) : null}
      <div className="slider--button-wrapper">
        <Button
          variant="contained"
          color="primary"
          onClick={selectAllDates}
          className="slider--button"
        >
          Select all dates
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={selectToday}
          className="slider--button"
        >
          Select newest date
        </Button>
      </div>
    </div>
  );
}
