import { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import {
  WebsiteJointDataMap,
  FringeDates,
  HeadingsByDate,
  ScreenshotsByDate,
} from "./interfaces";
import {
  fetchStaticWebsiteDataMap,
  getHeadingDailyData,
} from "./firebase/firestore";
import FullScreen from "./components/FullScreen/FullScreen";
import Screenshots from "./components/Screenshots/Screenshots";
import Topbar from "./components/Topbar/Topbar";
import WebsiteSelecotGroping from "./components/WebsiteSelector/WebsiteSelecotGroping";
import DateGroup from "./components/DateSelector/DateGroup";
import {
  returnMaxAndMinDateFromKeys,
  getAllDatesBetween,
} from "./helpers/dataCreation";
import { splitDataByRows, cretaeImagesSources } from "./helpers/stateHelpers";
import Words from "./components/Words/Words";
import Headings from "./components/Headings/Headings";

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
  const [headingMap, setHeadingMap] = useState<HeadingsByDate>({});
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
    const updateFringesBasedOnHeadigs = (headings: HeadingsByDate) => {
      const maxAndMin = returnMaxAndMinDateFromKeys(headings);
      setFringeDates(maxAndMin);
      setChosenDates({
        max: maxAndMin.max,
        min: maxAndMin.max,
      });
    };

    const x = async () => {
      const headings = await getHeadingDailyData();
      const totalWebisteMap = await fetchStaticWebsiteDataMap();
      if (headings !== null && totalWebisteMap !== null) {
        setWebisteJointData(totalWebisteMap);
        updateFringesBasedOnHeadigs(headings);
        setHeadingMap(headings);
        console.log(1111,"update",headings)
      }
    };
    x();
  }, []);

  useEffect(() => {
    setNamesOfWebiteesToDisplay(splitDataByRows(webisteJointData));

  }, [webisteJointData]);

  // reacts to change of selected dates

  useEffect(() => {
    const a = async () => {
      if (chosenDates) {
        const dates = getAllDatesBetween(chosenDates);
        const newData = await cretaeImagesSources(
          namesOfWebiteesToDisplay,
          dates,
          screenshotsByDate
        );
        setChosenScreenshots(newData.chosenScreenshotsFromData);
        setScreenshotsByDate(newData.newData);
      }
    };

    a();
  }, [namesOfWebiteesToDisplay, chosenDates]);
  return (
    // TODO
    // add single page view, both for small screens and for on toggle
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
              webisteJointDataMap={webisteJointData}
            />
          ) : null}
        </Route>
        <Route path="/headings">
          {chosenDates !== null && Object.keys(headingMap).length > 0 ? (
            <Headings
              names={namesOfWebiteesToDisplay}
              chosenDates={chosenDates}
              headingMap={headingMap}
            />
          ) : null}
        </Route>
        <Route path="/screenshots">
          {chosenDates !== null && chosenScreenshots.length > 0 ? (
            <Screenshots
              setFullScreenImage={setFellScreenAndResetPosition}
              chosenScreenshots={chosenScreenshots}
              chosenDates={chosenDates}
            />
          ) : null}
        </Route>
      </Switch>
    </>
  );
}

export default App;
