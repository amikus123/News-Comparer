import { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import {
  WebsiteJointDataMap,
  FringeDates,
  HeadingsByDate,
  ScreenshotsByDate,
  WordToWordMap,
  NameToWordMap,
  SelectedWebsites,
} from "./interfaces";
import {
  fetchStaticWebsiteDataMap,
  getHeadingDailyData,
} from "./firebase/firestore";
import FullScreen from "./components/FullScreen/FullScreen";
import Screenshots from "./components/Screenshots/Screenshots";
import Topbar from "./components/Topbar/Topbar";
import WebsiteSelectorGrouping from "./components/WebsiteSelector/WebsiteSelectorGrouping";
import DateGroup from "./components/DateSelector/DateGroup";
import {
  returnMaxAndMinDateFromKeys,
  getAllDatesBetween,
} from "./helpers/dataCreation";
import {
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
  const [selectedWebsites,setSelectedWebsites] = useState<SelectedWebsites>({
    show:[false,false,false],
    names:["", "", ""],
    links:["", "", ""]
  })
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
      console.log(headings,"headins")
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

        console.log(1111, "update", headings);
      } else {
        console.error("Failed to fetch data from database");
      }
    };
    console.log("XD")
    fetchAndSetStaticStates();
  }, []);

  
  // gets true urls of images and saves them
  useEffect(() => {
    const updateSreenshots = async () => {

      if (chosenDates && selectedWebsites.names[0] !== "") {
        const dates = getAllDatesBetween(chosenDates);
        const newData = await cretaeImagesSources(
          selectedWebsites.names,
          dates,
          screenshotsByDate
        );
        setScreenshotsByDate(newData);
      }
    };

    updateSreenshots();
    // inclusion of all of them creates infinite loop
  }, [selectedWebsites.names, chosenDates]);

  // creates suggestions and word data used in Words component
  useEffect(() => {
    if (chosenDates !== null && Object.keys(headingMap).length > 0) {
      const { selectedMap, totalMap } = getSelectedAndAllWordMap(
        webisteJointData,
        headingMap,
        chosenDates,
        selectedWebsites.names
      );
      setWordDataOfSelected(selectedMap);
      setWordDataOfAll(totalMap);

      setSelectedSuggsetions(getSuggestions(selectedMap));
      setAllSuggsetions(getSuggestions(totalMap));
    }
  }, [webisteJointData, headingMap, chosenDates, selectedWebsites.names]);
  return (
    <>
      <FullScreen
        setFullScreenImage={setFellScreenAndResetPosition}
        fullScreenImage={fullScreenImage}
      />

      <Topbar />

      <WebsiteSelectorGrouping
        webisteJointData={webisteJointData}
        setSelectedWebsites={setSelectedWebsites}
        selectedWebsites={selectedWebsites}
      />

      <DateGroup
        fringeDates={fringeDates}
        updateChosenDates={setChosenDates}
        chosenDates={chosenDates}
      />

      {/* checks if data has been fetched from db */}
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
 
          <Route path="/screenshots">
            <Screenshots
              selectedWebsites={selectedWebsites}
              setFullScreenImage={setFellScreenAndResetPosition}
              screenshotsByDate={screenshotsByDate}
              chosenDates={chosenDates}
            />
          </Route>

          <Route>
            <Headings
              suggestions={selectedSuggsetions}
              
              selectedWebsites={selectedWebsites}
              chosenDates={chosenDates}
              headingMap={headingMap}
              downloadedHeadingImages={downloadedHeadingImages}
              setDowloadedHeadingImages={setDowloadedHeadingImages}
            />
          </Route>
        </Switch>
      ) : null}
    </>
  );
}

export default App;
