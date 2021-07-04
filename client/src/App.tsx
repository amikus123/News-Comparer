import React,{useState} from "react";
import FullScreen from "./components/FullScreen/FullScreen";
import Screenshots from "./components/Screenshots/Screenshots";
import Topbar from "./components/topbar/Topbar";
import WebsiteSelecotGroping from "./components/WebsiteSelector/WebsiteSelecotGroping";
import { getHeadingDailyData } from "./firebase/getHeadingData";
function App() {
  const [fullScreenImage,setFullScreenImage] = useState("")
  return (
    // merge all selects in one if screen is small enough
    <>

    <FullScreen setFullScreenImage={setFullScreenImage} fullScreenImage={fullScreenImage}/>
      <Topbar />
      <WebsiteSelecotGroping  />
      <Screenshots setFullScreenImage={setFullScreenImage}/>
    </>
  );
}

export default App;
