import React, { useEffect, useState } from "react";
import FullScreen from "./components/FullScreen/FullScreen";
import Screenshots from "./components/Screenshots/Screenshots";
import Topbar from "./components/topbar/Topbar";
import WebsiteSelecotGroping from "./components/WebsiteSelector/WebsiteSelecotGroping";
import { DatabaseStaticDataInRows, WebisteImagesInRows } from "./interfaces";
import { createRowObjects, createWebisteDataObject, fetchWebisteStaticData } from "./firebase/firebaseAccess";

function App() {
  const [fullScreenImage, setFullScreenImage] = useState("");
  const [imageSources, setImagesSources] = useState<WebisteImagesInRows>({
    leftRow: [],
    centerRow: [],
    rightRow: [],
  });
  const [databaseStaticDataInRows, setDatabaseStaticDataInRows] =
    useState<DatabaseStaticDataInRows>({
      leftRow: [],
      centerRow: [],
      rightRow: [],
    });
  useEffect(() => {
    const x = async () => {
      const websiteStaticData = await fetchWebisteStaticData();
      const totalWebisteMap = createWebisteDataObject(websiteStaticData);
      const politicsBasedOnRows = createRowObjects(websiteStaticData);
      setDatabaseStaticDataInRows(politicsBasedOnRows);
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
      <button onClick={() => createRowObjects()}>ewqweqweqwewqe</button>

      <WebsiteSelecotGroping
        setImagesSources={setImagesSources}
        databaseStaticDataInRows={databaseStaticDataInRows}
      />
      <Screenshots
        setFullScreenImage={setFellScreenAndResetPosition}
        imageSources={imageSources}
      />
    </>
  );
}

export default App;
