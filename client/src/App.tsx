import React, { useState } from "react";
import FullScreen from "./components/FullScreen/FullScreen";
import Screenshots from "./components/Screenshots/Screenshots";
import Topbar from "./components/topbar/Topbar";
import WebsiteSelecotGroping from "./components/WebsiteSelector/WebsiteSelecotGroping";
import { getHeadingDailyData } from "./firebase/getHeadingData";
function App() {
  const [fullScreenImage, setFullScreenImage] = useState("");
  const setFellScreenAndResetPosition = (src: string) => {
    // by toggling the height of the fullscreen image scroll position is reseted
    const fullScreenImage = document.getElementById("fullScreenImage");
    fullScreenImage?.classList.toggle("fullScreen--image-off");
    setFullScreenImage(src);
  };
  return (
    // TODO
    // merge all selects in one if screen is small enough
    <>
      <FullScreen
        setFullScreenImage={setFellScreenAndResetPosition}
        fullScreenImage={fullScreenImage}
      />
      <Topbar />
      <WebsiteSelecotGroping />
      <Screenshots setFullScreenImage={setFellScreenAndResetPosition} />
    </>
  );
}

export default App;
