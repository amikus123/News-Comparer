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
const merge = require("deepmerge");

function App() {
  // STATES
  const [fullScreenImage, setFullScreenImage] = useState("");
  // array with 3 variables, which indicate which iamges to show
  const [namesOfWebiteesToDisplay, setNamesOfWebiteesToDisplay] = useState<
    string[]
  >(["", "", ""]);
  const [screenshotsByDate, setScreenshotsByDate] = useState<ScreenshotsByDate>(
    {}
  );
  // data of all websites
  const [webisteJointData, setWebisteJointData] = useState<WebsiteJointDataMap>(
    {}
  );
  const [headingMap, setHeadingMap] = useState<Headings>({});
  // fringe - based on databse, chosen - based on user input
  const [fringeDates, setFringeDates] = useState<FringeDates | null>(null);
  const [chosenDates, setChosenDates] = useState<FringeDates | null>(null);

  // FUNCTIONS
  const updateChosenDates = (obj: FringeDates) => {
    setChosenDates(obj);
  };

  const updateFringesBasedOnHeadigs = (headings: Headings) => {
    const maxAndMin = returnMaxAndMinDateFromKeys(headings);
    setFringeDates(maxAndMin);
    updateChosenDates({
      max: maxAndMin.max,
      min: getPreviousDay(maxAndMin.max),
    });
  };
  const updateWebisteSSSelection = async (name: string, index: number) => {
    const temp = [...namesOfWebiteesToDisplay];
    temp[index] = name;
    setNamesOfWebiteesToDisplay(temp);
    // await cretaeImagesSources(temp);
  };

  const setFellScreenAndResetPosition = (src: string) => {
    // by toggling the height of the fullscreen image scroll position is reseted
    const fullScreenImage = document.getElementById("fullScreenImage");
    fullScreenImage?.classList.toggle("fullScreen--image-off");
    setFullScreenImage(src);
  };

  // EFFECTS //
  // fetches static data
  // attept to grad todays data
  useEffect(() => {
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
    const y = async () => {
      const politicsBasedOnRows = createRowObjects(webisteJointData);
      if (politicsBasedOnRows.leftRow.length !== 0) {
        const temp = [
          politicsBasedOnRows.leftRow[0].imageName,
          politicsBasedOnRows.centerRow[0].imageName,
          politicsBasedOnRows.rightRow[0].imageName,
        ];
        setNamesOfWebiteesToDisplay(temp);
        // await cretaeImagesSources(temp);
      }
    };
    y();
  }, [webisteJointData]);

  useEffect(() => {
    const cretaeImagesSources = async (names: string[], dates: Date[]) => {
      console.log(checkIfShouldRequest(names,dates,screenshotsByDate),"BOOL")
      if(checkIfShouldRequest(names,dates,screenshotsByDate)){
        const missing = await getMissingScreenshots(
          names,
          dates,
          screenshotsByDate
        );
        const newData = merge(screenshotsByDate, missing);
        setScreenshotsByDate(newData)
        console.log(newData,"nopwe",missing,"pauza",screenshotsByDate);
        debugger
      }
     
        
    };
    const a = async () => {
      if(namesOfWebiteesToDisplay[0] !== "" && chosenDates)
      cretaeImagesSources(namesOfWebiteesToDisplay, getAllDatesBetween(chosenDates.min,chosenDates.max));
    };
    a();
  }, [screenshotsByDate,namesOfWebiteesToDisplay,chosenDates]);
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
        updateChosenDates={updateChosenDates}
        chosenDates={chosenDates}
      />
      {/* <Screenshots
        setFullScreenImage={setFellScreenAndResetPosition}
        imageSources={screenshotsByDate}
        namesOfWebiteesToDisplay={namesOfWebiteesToDisplay}
      /> */}
    </>
  );
}

export default App;
