import { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import {
  WebsiteJointDataMap,
  FringeDates,
  HeadingsByDate,
  ScreenshotsByDate,
  WordToWordMap,
  NameToWordMap,
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
  getPreviousDay,
} from "./helpers/dataCreation";
import {
  splitDataByRows,
  cretaeImagesSources,
  getSelectedAndAllWordMap,
  getSuggestions,
} from "./helpers/stateHelpers";
import Words from "./components/Words/Words";
import Headings from "./components/Headings/Headings";
import { OptionsMap } from "./components/Words/WordsInterfaces";

function App() {
  // STATES
  const [fullScreenImage, setFullScreenImage] = useState("");
  const [namesOfWebiteesToDisplay, setNamesOfWebiteesToDisplay] = useState<
    string[]
  >(["", "", ""]);
  const [screenshotsByDate, setScreenshotsByDate] = useState<ScreenshotsByDate>(
    {}
  );
  const [webisteJointData, setWebisteJointData] = useState<WebsiteJointDataMap>(
    {}
  );
  const [headingMap, setHeadingMap] = useState<HeadingsByDate>({});
  // fringe - based on databse, chosen - based on user input
  const [fringeDates, setFringeDates] = useState<FringeDates | null>(null);
  const [chosenDates, setChosenDates] = useState<FringeDates | null>(null);
  // used to prevent needles fetching of iamges in Headings
  const [downloadedHeadingImages, setDowloadedHeadingImages] =
    useState<WordToWordMap>({});
  // used in haeading in words
  const [wordDataOfAll, setWordDataOfAll] = useState<NameToWordMap>({});
  const [wordDataOfSelected, setWordDataOfSelected] = useState<NameToWordMap>(
    {}
  );
  const [selectedSuggsetions, setSelectedSuggsetions] = useState<OptionsMap>(
    {}
  );
  const [allSuggsetions, setAllSuggsetions] = useState<OptionsMap>({});
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
        min: getPreviousDay(maxAndMin.max),
      });
    };

    const x = async () => {
      const headings = await getHeadingDailyData();
      const totalWebisteMap = await fetchStaticWebsiteDataMap();
      if (headings !== null && totalWebisteMap !== null) {
        setWebisteJointData(totalWebisteMap);
        updateFringesBasedOnHeadigs(headings);
        setHeadingMap(headings);
        console.log(1111, "update", headings);
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
        setScreenshotsByDate(newData.newData);
      }
    };

    a();
    // inclusion of all of them creates infinite loop
  }, [namesOfWebiteesToDisplay, chosenDates]);

  useEffect(() => {
    if (chosenDates !== null && Object.keys(headingMap).length > 0) {
      const { selectedMap, totalMap } = getSelectedAndAllWordMap(
        webisteJointData,
        headingMap,
        chosenDates,
        namesOfWebiteesToDisplay
      );
      setWordDataOfSelected(selectedMap);
      setWordDataOfAll(totalMap);

      setSelectedSuggsetions(getSuggestions(selectedMap));
      setAllSuggsetions(getSuggestions(totalMap));
    }
  }, [webisteJointData, headingMap, chosenDates, namesOfWebiteesToDisplay]);
  return (
    // domsylnym zakresem  beda wszystkie daty, ale nie wsyzstkie ss i headingui beda wyswietlane
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
      {/* // load more button  for images and screenshots*/}
      {chosenDates !== null && Object.keys(headingMap).length > 0 ? (
        <Switch>
          <Route path="/words">
            <Words
              suggestions={allSuggsetions}
              wordDataOfAll={wordDataOfAll}
              wordDataOfSelected={wordDataOfSelected}
              webisteJointData={webisteJointData}
            />
          </Route>
          <Route path="/headings">
            <Headings
              suggestions={selectedSuggsetions}
              names={namesOfWebiteesToDisplay}
              chosenDates={chosenDates}
              headingMap={headingMap}
              downloadedHeadingImages={downloadedHeadingImages}
              setDowloadedHeadingImages={setDowloadedHeadingImages}
            />
          </Route>
          <Route path="/screenshots">
            <Screenshots
              setFullScreenImage={setFellScreenAndResetPosition}
              screenshotsByDate={screenshotsByDate}
              chosenDates={chosenDates}
              names={namesOfWebiteesToDisplay}
            />
          </Route>
        </Switch>
      ) : null}
    </>
  );
}

export default App;
