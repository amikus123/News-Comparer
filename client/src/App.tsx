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
  // image shown when clicking on screenshot
  const [fullScreenImage, setFullScreenImage] = useState("");
  // data of three webistes chosen in WebisteSelector
  const [chosenNames, setChosenNames] = useState<string[]>(["", "", ""]);
  const [chosenLinks, setChosenLinks] = useState<string[]>(["", "", ""]);
  // map of for headings and screenshot data for webistes
  const [screenshotsByDate, setScreenshotsByDate] = useState<ScreenshotsByDate>(
    {}
  );
  const [webisteJointData, setWebisteJointData] = useState<WebsiteJointDataMap>(
    {}
  );
  // headings data based, formtated dates serve as keys
  const [headingMap, setHeadingMap] = useState<HeadingsByDate>({});
  // fringe - based on databse, chosen - based on user input
  const [fringeDates, setFringeDates] = useState<FringeDates | null>(null);
  const [chosenDates, setChosenDates] = useState<FringeDates | null>(null);
  // used to prevent needless fetching of iamges in Headings
  const [downloadedHeadingImages, setDowloadedHeadingImages] =
    useState<WordToWordMap>({});
  // word data for websites, prevents needless expensive calculations
  const [wordDataOfAll, setWordDataOfAll] = useState<NameToWordMap>({});
  const [wordDataOfSelected, setWordDataOfSelected] = useState<NameToWordMap>(
    {}
  );
  // suggesstions for autocomplete components
  const [selectedSuggsetions, setSelectedSuggsetions] = useState<OptionsMap>(
    {}
  );
  const [allSuggsetions, setAllSuggsetions] = useState<OptionsMap>({});

  // FUNCTIONS

  const updateWebisteSSSelection = async (name: string, index: number) => {
    const temp = [...chosenNames];
    temp[index] = name;
    if (Object.keys(webisteJointData).length > 3 && chosenNames[0] !== "") {
      const res: string[] = [];
      for (const name of chosenNames) {
        console.log(name, webisteJointData, "XDD");
        res.push(webisteJointData[name].url);
      }
      setChosenLinks(res);
    }

    setChosenNames(temp);
  };
  // changes selected fullscreen image and restes the scroll position
  const setFellScreenAndResetPosition = (src: string) => {
    const fullScreenImage = document.getElementById("fullScreenImage");
    fullScreenImage?.classList.toggle("fullScreen--image-off");
    setFullScreenImage(src);
  };

  // EFFECTS //

  // fetches static data and inital date constraints and inital names
  useEffect(() => {
    const updateFringesBasedOnHeadigs = (headings: HeadingsByDate) => {
      const maxAndMin = returnMaxAndMinDateFromKeys(headings);
      setFringeDates(maxAndMin);
      setChosenDates({
        max: maxAndMin.max,
        min: maxAndMin.min,
      });
    };

    const fetchAndSetStaticStates = async () => {
      const headings = await getHeadingDailyData();
      const totalWebisteMap = await fetchStaticWebsiteDataMap();
      if (headings !== null && totalWebisteMap !== null) {
        setWebisteJointData(totalWebisteMap);

        updateFringesBasedOnHeadigs(headings);
        setHeadingMap(headings);
        setChosenNames(splitDataByRows(totalWebisteMap));

        console.log(1111, "update", headings);
      } else {
        console.error("Failed to fetch data from database");
      }
    };
    fetchAndSetStaticStates();
  }, []);

  
  // gets true urls if images and saves them
  useEffect(() => {
    const updateSreenshots = async () => {
      if (chosenDates) {
        const dates = getAllDatesBetween(chosenDates);
        const newData = await cretaeImagesSources(
          chosenNames,
          dates,
          screenshotsByDate
        );
        setScreenshotsByDate(newData);
      }
    };

    updateSreenshots();
    // inclusion of all of them creates infinite loop
  }, [chosenNames, chosenDates]);

  // creates suggestions and word data used in Words component
  useEffect(() => {
    if (chosenDates !== null && Object.keys(headingMap).length > 0) {
      const { selectedMap, totalMap } = getSelectedAndAllWordMap(
        webisteJointData,
        headingMap,
        chosenDates,
        chosenNames
      );
      setWordDataOfSelected(selectedMap);
      setWordDataOfAll(totalMap);

      setSelectedSuggsetions(getSuggestions(selectedMap));
      setAllSuggsetions(getSuggestions(totalMap));
    }
  }, [webisteJointData, headingMap, chosenDates, chosenNames]);
  return (
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
      {chosenDates !== null &&
      Object.keys(headingMap).length > 0 &&
      Object.keys(wordDataOfAll).length > 0 ? (
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
              names={chosenNames}
              chosenDates={chosenDates}
              headingMap={headingMap}
              downloadedHeadingImages={downloadedHeadingImages}
              setDowloadedHeadingImages={setDowloadedHeadingImages}
              links={chosenLinks}
            />
          </Route>
          <Route path="/screenshots">
            <Screenshots
              links={chosenLinks}
              setFullScreenImage={setFellScreenAndResetPosition}
              screenshotsByDate={screenshotsByDate}
              chosenDates={chosenDates}
              names={chosenNames}
            />
          </Route>
        </Switch>
      ) : null}
    </>
  );
}

export default App;
