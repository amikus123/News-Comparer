import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import ScreenshotRow from "./ScreenshotRow";
import { FringeDates, ScreenshotsByDate } from "../../interfaces";
import {
  getAllDatesBetween,
  formatedYearsFromDates,
} from "../../helpers/dataCreation";
import ShowMoreButton from "../General/ShowMoreButton";
import { reverseArrayInPlace } from "../../helpers/generalHelpers";
const Screenshots = ({
  setFullScreenImage,
  screenshotsByDate,
  chosenDates,
  names,
  links,
}: {
  setFullScreenImage: (src: string) => void;
  screenshotsByDate: ScreenshotsByDate;
  chosenDates: FringeDates;
  names: string[];
  links: string[];
}) => {
  const getSrc = (formatedDate: string, name: string): string => {
    // if image has no image in DB, we return empty string
    let src = "";
    try {
      src = screenshotsByDate[formatedDate][name];
    } finally {
      return src;
    }
  };
  const [formatedDates, setFormatedDates] = useState<string[]>([]);
  const [displayedCount, setDisplayedCount] = useState<number>(2);

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
          <React.Fragment key={index}>
            {index <= displayedCount ? (
              <Grid
                item
                container
                justify="center"
                alignItems="center"
                direction="column"
                key={index}
              >
                <p className="headings--date">{fortmatedDate}</p>

                <ScreenshotRow
                  key={index}
                  setFullScreenImage={setFullScreenImage}
                  screenshots={[
                    getSrc(fortmatedDate, names[0]),
                    getSrc(fortmatedDate, names[1]),
                    getSrc(fortmatedDate, names[2]),
                  ]}
                  names={names}
                  links={links}
                />
              </Grid>
            ) : null}
          </React.Fragment>
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
