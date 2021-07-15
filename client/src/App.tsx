import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import {
  WebsiteJointDataMap,
  ScreenshotsData,
  FringeDates,
  Headings,
} from "./interfaces";
import {
  createRowObjects,
  createWebisteDataObject,
  fetchWebisteStaticData,
  getHeadingDailyData,
} from "./firebase/firestore";
import { fetchAllScreenshotsURLFromName } from "./firebase/storage";
import FullScreen from "./components/FullScreen/FullScreen";
import Screenshots from "./components/Screenshots/Screenshots";
import Topbar from "./components/Topbar/Topbar";
import WebsiteSelecotGroping from "./components/WebsiteSelector/WebsiteSelecotGroping";
import DateGroup from "./components/DateSelector/DateGroup";
import { returnMaxAndMinDateFromKeys,getPreviousDay } from "./helpers/dataCreation";

function App() {
  // STATES
  const [fullScreenImage, setFullScreenImage] = useState("");
  // array with 3 variables, which indicate which iamges to show
  const [namesOfWebiteesToDisplay, setNamesOfWebiteesToDisplay] = useState<
    string[]
  >(["", "", ""]);
  const [screenshots, setScreennshots] = useState<ScreenshotsData>({});
  // data of all websites
  const [webisteJointData, setWebisteJointData] = useState<WebsiteJointDataMap>(
    {}
  );
  const [headingMap, setHeadingMap] = useState<Headings>({});
  // fringe - based on databse, chosen - based on user input
  const [fringeDates, setFringeDates] = useState<FringeDates | null>(null);
  const [chosenDates, setChosenDates] = useState<FringeDates | null>(null);
  // FUNCTIONS

  const updateChosenDates = (
    obj:FringeDates
  ) => {
    setChosenDates(obj)
  };

  const updateFringesBasedOnHeadigs = (headings: Headings) => {
    const maxAndMin = returnMaxAndMinDateFromKeys(headings)
    setFringeDates(maxAndMin)
    updateChosenDates({max:maxAndMin.max,min: getPreviousDay(maxAndMin.max)})
  };
  const updateWebisteSSSelection = async (name: string, index: number) => {
    const temp = [...namesOfWebiteesToDisplay];
    temp[index] = name;
    setNamesOfWebiteesToDisplay(temp);
    await cretaeImagesSources(temp);
  };

  const cretaeImagesSources = async (names: string[]) => {
    const fetched = await fetchAllScreenshotsURLFromName(names);
    console.log(fetched, "res");
    const obj: { [k: string]: any } = {};
    for (let i = 0; i < names.length; i++) {
      let name = names[i];
      obj[name] = [fetched[i]];
    }
    setScreennshots({ ...screenshots, ...obj });
  };

  const setFellScreenAndResetPosition = (src: string) => {
    // by toggling the height of the fullscreen image scroll position is reseted
    const fullScreenImage = document.getElementById("fullScreenImage");
    fullScreenImage?.classList.toggle("fullScreen--image-off");
    setFullScreenImage(src);
  };
  // fetches static data
  // attept to grad todays data
  // EFFECTS //
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
        console.log(politicsBasedOnRows, "rows main");
        const temp = [
          politicsBasedOnRows.leftRow[0].imageName,
          politicsBasedOnRows.centerRow[0].imageName,
          politicsBasedOnRows.rightRow[0].imageName,
        ];
        setNamesOfWebiteesToDisplay(temp);
        await cretaeImagesSources(temp);
      }
    };
    y();
  }, [webisteJointData]);

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
      <Screenshots
        setFullScreenImage={setFellScreenAndResetPosition}
        imageSources={screenshots}
        namesOfWebiteesToDisplay={namesOfWebiteesToDisplay}
      />
    </>
  );
}

export default App;
