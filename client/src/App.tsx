import React, { useEffect, useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import {
  WebsiteJointDataMap,
  FringeDates,
  Headings,
  ScreenshotsByDate,
} from "./interfaces";
import {
  createWebisteDataObject,
  fetchWebisteStaticData,
  getHeadingDailyData,
} from "./firebase/firestore";
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
import {
  splitDataByRows,
  checkIfShouldRequest,
  cretaeImagesSources,
} from "./helpers/stateHelpers";
import Words from "./components/Words/Words";
import Emotions from "./components/Emotions/Emotions";

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

  useEffect(() => {
    setNamesOfWebiteesToDisplay(splitDataByRows(webisteJointData));
  }, [webisteJointData]);

  // reacts to change of selected dates
  useEffect(() => {
    // const a = async () => {
    //   if (chosenDates) {
    //     const dates = getAllDatesBetween(chosenDates);
    //     if (
    //       checkIfShouldRequest(
    //         namesOfWebiteesToDisplay,
    //         dates,
    //         screenshotsByDate
    //       )
    //       ) {
    //       const newData = await cretaeImagesSources(
    //         namesOfWebiteesToDisplay,
    //         dates,
    //         screenshotsByDate
    //       );
    // debugger

    //       console.log(newData,"nowe")
    //       setChosenScreenshots(newData.chosenScreenshotsFromData);
    //       setScreenshotsByDate(newData.newData);
    //     }
    //     console.log(  checkIfShouldRequest(
    //       namesOfWebiteesToDisplay,
    //       dates,
    //       screenshotsByDate
    //     ))
    //   }else{
        
    //   }
    // };

        const a = async () => {
      if (chosenDates) {
        const dates = getAllDatesBetween(chosenDates);
          const newData = await cretaeImagesSources(
            namesOfWebiteesToDisplay,
            dates,
            screenshotsByDate
          )
          console.log(newData,"nowe")
          setChosenScreenshots(newData.chosenScreenshotsFromData)
          setScreenshotsByDate(newData.newData)
    }
    }

    a();
    debugger;
  }, [namesOfWebiteesToDisplay, chosenDates])
  return (
    // TODO
    // merge all selects in one if screen is small enough
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

      <Switch>
        <Route path="/words">
          {chosenDates !== null && Object.keys(headingMap).length > 0 ? (
            <Words
              names={namesOfWebiteesToDisplay}
              chosenDates={chosenDates}
              headingMap={headingMap}
            />
          ) : null}
        </Route>
        <Route path="/emotions">
          <Emotions />
        </Route>
        <Route path="/" exact>
          <Screenshots
            setFullScreenImage={setFellScreenAndResetPosition}
            chosenScreenshots={chosenScreenshots}
          />
        </Route>
      </Switch>
    </>
  );
}

export default App;
