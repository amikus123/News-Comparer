import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import ScreenshotRow from "./ScreenshotRow";
import {
  FringeDates,
  ScreenshotsByDate,
  SelectedWebsites,
} from "../../interfaces";
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
  selectedWebsites,
}: {
  setFullScreenImage: (src: string) => void;
  screenshotsByDate: ScreenshotsByDate;
  chosenDates: FringeDates;
  selectedWebsites: SelectedWebsites;
}) => {
  const getSrcFromMap = (formatedDate: string, name: string): string => {
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
  }, [chosenDates]);
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignContent="center"
      alignItems="center"
    >
      <p className="headings--tip">
        Click on the image to make it full screen, click again to close it
      </p>
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
                    getSrcFromMap(fortmatedDate, selectedWebsites.names[0]),
                    getSrcFromMap(fortmatedDate, selectedWebsites.names[1]),
                    getSrcFromMap(fortmatedDate, selectedWebsites.names[2]),
                  ]}
                  selectedWebsites={selectedWebsites}
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
