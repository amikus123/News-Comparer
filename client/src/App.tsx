import React, { useState } from "react";
import FullScreen from "./components/FullScreen/FullScreen";
import Screenshots from "./components/Screenshots/Screenshots";
import Topbar from "./components/topbar/Topbar";
import WebsiteSelecotGroping from "./components/WebsiteSelector/WebsiteSelecotGroping";
import { getHeadingDailyData, createRowObjects,getImgSrcFronName } from "./firebase/firebaseAccess";
import { imageSourceRows } from "./interfaces";


function App() {
  const [fullScreenImage, setFullScreenImage] = useState("");
  const [imageSources, setImagesSources] = useState<imageSourceRows>({
    leftRow: [],
    centerRow: [],
    rightRow: [],
  });
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
      <button onClick={() => getImgSrcFronName()}>asdsdaasda</button>
      <button onClick={() => createRowObjects()}>ewqweqweqwewqe</button>

      <WebsiteSelecotGroping setImagesSources={setImagesSources} />
      <Screenshots
        setFullScreenImage={setFellScreenAndResetPosition}
        imageSources={imageSources}
      />
    </>
  );
}

export default App;
