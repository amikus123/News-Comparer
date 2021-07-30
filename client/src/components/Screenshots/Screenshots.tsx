import { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import ScreenshotRow from "./ScreenshotRow";
import { DateTypo } from "../Typography/CustomTypo";
import { FringeDates, ScreenshotsByDate } from "../../interfaces";
import {
  getAllDatesBetween,
  formatedYearsFromDates,
} from "../../helpers/dataCreation";
const Screenshots = ({
  setFullScreenImage,
  screenshotsByDate,
  chosenDates,
  names,
}: {
  setFullScreenImage: (src: string) => void;
  screenshotsByDate: ScreenshotsByDate;
  chosenDates: FringeDates;
  names: string[];
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
  useEffect(() => {
    setFormatedDates(formatedYearsFromDates(getAllDatesBetween(chosenDates)));
    // name
  }, [chosenDates]);
  return (
    <Grid container direction="column-reverse" justifyContent="center">
      {formatedDates.map((fortmatedDate, index) => {
        return (
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
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Screenshots;
