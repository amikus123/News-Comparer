import { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import ScreenshotRow from "./ScreenshotRow";
import { DateTypo } from "../Typography/CustomTypo";
import { FringeDates, ScreenshotsByDate } from "../../interfaces";
import {
  getAllDatesBetween,
  formatedYearsFromDates,
} from "../../helpers/dataCreation";
import ShowMoreButton from "../General/ShowMoreButton";
const Screenshots = ({
  setFullScreenImage,
  screenshotsByDate,
  chosenDates,
  names,
  links
}: {
  setFullScreenImage: (src: string) => void;
  screenshotsByDate: ScreenshotsByDate;
  chosenDates: FringeDates;
  names: string[];
  links:string[]
}) => {
  const getSrc = (formatedDate: string, name: string): string => {
    let xd = "";
    try {
      xd = screenshotsByDate[formatedDate][name];
    } finally {
      console.log(xd, "res");
      return xd;
    }
  };
  const [formatedDates, setFormatedDates] = useState<string[]>([]);
  const [displayedCount, setDisplayedCount] = useState<number>(2);

  const reverseArrayInPlace = (array: any[]) => {
    for (let i = 0; i < array.length / 2; i++) {
      [array[i], array[array.length - 1 - i]] = [
        array[array.length - 1 - i],
        array[i],
      ];
    }
    return array;
  };

  useEffect(() => {
    setFormatedDates(
      reverseArrayInPlace(
        formatedYearsFromDates(getAllDatesBetween(chosenDates))
      )
    );
    // name
  }, [chosenDates]);
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignContent="center"
      alignItems="center"
    >
      {formatedDates.map((fortmatedDate, index) => {
        return (
          <>
            {index <= displayedCount ? (
              <Grid
                item
                container
                justify="center"
                alignItems="center"
                direction="column"
                key={index}
              >
                <DateTypo margin={true}>{fortmatedDate}</DateTypo>

                <ScreenshotRow
                  key={index}
                  setFullScreenImage={setFullScreenImage}
                  screenshots={[
                    getSrc(fortmatedDate, names[0]),
                    getSrc(fortmatedDate, names[1]),
                    getSrc(fortmatedDate, names[2]),
                  ]}
                  names = {names}
                  links={links}
                />
              </Grid>
            ) : null}
          </>
        );
      })}
      <ShowMoreButton
        state={displayedCount}
        setState={setDisplayedCount}
        className=""
        max={formatedDates.length}
      />
    </Grid>
  );
};

export default Screenshots;
