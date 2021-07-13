import React, { useEffect, useState } from "react";
import FullScreen from "./components/FullScreen/FullScreen";
import Screenshots from "./components/Screenshots/Screenshots";
import Topbar from "./components/topbar/Topbar";
import WebsiteSelecotGroping from "./components/WebsiteSelector/WebsiteSelecotGroping";
import {
  DatabaseStaticDataInRows,
  WebsiteJointDataMap,
  ScreenshotsData,
} from "./interfaces";
import {
  createRowObjects,
  createWebisteDataObject,
  fetchAllScreenshotsURLFromName,
  fetchWebisteStaticData,
} from "./firebase/firebaseAccess";

function App() {
  const [fullScreenImage, setFullScreenImage] = useState("");
  // array with 3 variables, which indicate which iamges to show
  const [namesOfWebiteesToDisplay, setNamesOfWebiteesToDisplay] = useState<
    string[]
  >(["", "", ""]);
  const [screenshots, setScreennshots] = useState<ScreenshotsData>({});
  // static website data based on political orientaion
  const [databaseStaticDataInRows, setDatabaseStaticDataInRows] =
    useState<DatabaseStaticDataInRows>({
      leftRow: [],
      centerRow: [],
      rightRow: [],
    });
  // data of all websites
  const [webisteJointData, setWebisteJointData] = useState<WebsiteJointDataMap>(
    {}
  );
  const updateWebisteSSSelection = async (name: string, index: number) => {
    const temp = [...namesOfWebiteesToDisplay];
    temp[index] = name;
    setNamesOfWebiteesToDisplay(temp);
    await cretaeImagesSources(temp);
  };
  const cretaeImagesSources = async (names: string[]) => {
      const fetched = await fetchAllScreenshotsURLFromName(names);
      console.log(fetched,"res")
      const obj:{[k: string]: any} = {}
      for(let i=0;i<names.length;i++){
        let name = names[i]
        obj[name]= [fetched[i]]
      }
      setScreennshots({ ...screenshots,...obj});
    }
  

  // fetches static data
  useEffect(() => {
    const x = async () => {
      const websiteStaticData = await fetchWebisteStaticData();
      const totalWebisteMap = createWebisteDataObject(websiteStaticData);
      const politicsBasedOnRows = createRowObjects(websiteStaticData);
      console.log(politicsBasedOnRows);
      const temp = [
        politicsBasedOnRows.leftRow[0].imageName,
        politicsBasedOnRows.centerRow[0].imageName,
        politicsBasedOnRows.rightRow[0].imageName,
      ];
      setNamesOfWebiteesToDisplay(temp);
      setDatabaseStaticDataInRows(politicsBasedOnRows);
      setWebisteJointData(totalWebisteMap);
      await cretaeImagesSources(temp)
    };
    x();
  }, []);

  const setFellScreenAndResetPosition = (src: string) => {
    // by toggling the height of the fullscreen image scroll position is reseted
    const fullScreenImage = document.getElementById("fullScreenImage");
    fullScreenImage?.classList.toggle("fullScreen--image-off");
    setFullScreenImage(src);
  };
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
        databaseStaticDataInRows={databaseStaticDataInRows}
        updateWebisteSSSelection={updateWebisteSSSelection}
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
