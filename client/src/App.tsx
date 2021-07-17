import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import {
  WebsiteJointDataMap,
  FringeDates,
  Headings,
  ScreenshotsByDate,
} from "./interfaces";
import {
  createRowObjects,
  createWebisteDataObject,
  fetchWebisteStaticData,
  getHeadingDailyData,
} from "./firebase/firestore";
import { getMissingScreenshots } from "./firebase/storage";
import FullScreen from "./components/FullScreen/FullScreen";
import Screenshots from "./components/Screenshots/Screenshots";
import Topbar from "./components/Topbar/Topbar";
import WebsiteSelecotGroping from "./components/WebsiteSelector/WebsiteSelecotGroping";
import DateGroup from "./components/DateSelector/DateGroup";
import {
  returnMaxAndMinDateFromKeys,
  getPreviousDay,
  getAllDatesBetween,
} from "./helpers/dataCreation";
import { checkIfShouldRequest } from "./helpers/general";
import {
  chosenScreenshotsFromData,
  splitDataByRows,
} from "./helpers/stateHelpers";
const merge = require("deepmerge");

function App() {
  // STATES
  const [fullScreenImage, setFullScreenImage] = useState("");
  const [namesOfWebiteesToDisplay, setNamesOfWebiteesToDisplay] = useState<
    string[]
  >(["", "", ""]);
  const [screenshotsByDate, setScreenshotsByDate] = useState<ScreenshotsByDate>(
    {}
  );
  const [chosenScreenshots, setChosenScreenshots] = useState<string[][]>([]);
  const [webisteJointData, setWebisteJointData] = useState<WebsiteJointDataMap>(
    {}
  );
  const [headingMap, setHeadingMap] = useState<Headings>({});
  // fringe - based on databse, chosen - based on user input
  const [fringeDates, setFringeDates] = useState<FringeDates | null>(null);
  const [chosenDates, setChosenDates] = useState<FringeDates | null>(null);

  // FUNCTIONS
  const updateWebisteSSSelection = async (name: string, index: number) => {
    const temp = [...namesOfWebiteesToDisplay];
    temp[index] = name;
    setNamesOfWebiteesToDisplay(temp);
  };

  const setFellScreenAndResetPosition = (src: string) => {
    const fullScreenImage = document.getElementById("fullScreenImage");
    fullScreenImage?.classList.toggle("fullScreen--image-off");
    setFullScreenImage(src);
  };

  // EFFECTS //
  // fetches static data and inital date constraints
  useEffect(() => {
    const updateFringesBasedOnHeadigs = (headings: Headings) => {
      const maxAndMin = returnMaxAndMinDateFromKeys(headings);
      setFringeDates(maxAndMin);
      setChosenDates({
        max: maxAndMin.max,
        min: getPreviousDay(maxAndMin.max),
      });
    };
    const x = async () => {
      const headings = await getHeadingDailyData();
      const websiteStaticData = await fetchWebisteStaticData();
      const totalWebisteMap = createWebisteDataObject(websiteStaticData);
      setWebisteJointData(totalWebisteMap);
      updateFringesBasedOnHeadigs(headings);
      setHeadingMap(headings);
    };
    x();
  }, []);

  // splits based on rows
  useEffect(() => {
    setNamesOfWebiteesToDisplay(splitDataByRows(webisteJointData));
  }, [webisteJointData]);

  useEffect(() => {
    const cretaeImagesSources = async () => {
      if (namesOfWebiteesToDisplay[0] !== "" && chosenDates && checkIfShouldRequest(namesOfWebiteesToDisplay,getAllDatesBetween(chosenDates.min, chosenDates.max),screenshotsByDate)) {
        const dates = getAllDatesBetween(chosenDates.min, chosenDates.max);
        const names = namesOfWebiteesToDisplay;

        const missing = await getMissingScreenshots(
          names,
          dates,
          screenshotsByDate
        );
        setChosenScreenshots(
          chosenScreenshotsFromData(missing, namesOfWebiteesToDisplay)
        );
        const newData = merge(screenshotsByDate, missing);
        setScreenshotsByDate(newData);
      }
    };

    const a = async () => {
      cretaeImagesSources();
      debugger;
    };
    a();
  }, [namesOfWebiteesToDisplay, chosenDates, screenshotsByDate]);
  return (
    // TODO
    // merge all selects in one if screen is small enough
    // add diffrent section on the right side of the topbar
    <>
      <FullScreen
        setFullScreenImage={setFellScreenAndResetPosition}
        fullScreenImage={fullScreenImage}
      />
      <Topbar />
      <WebsiteSelecotGroping
        webisteJointData={webisteJointData}
        updateWebisteSSSelection={updateWebisteSSSelection}
      />
      <DateGroup
        fringeDates={fringeDates}
        updateChosenDates={setChosenDates}
        chosenDates={chosenDates}
      />
      <Screenshots
        setFullScreenImage={setFellScreenAndResetPosition}
        chosenScreenshots={chosenScreenshots}
      />
    </>
  );
}

export default App;
