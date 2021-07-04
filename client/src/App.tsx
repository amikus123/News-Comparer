import React from "react";
import Topbar from "./components/topbar/Topbar";
import WebsiteSelect from "./components/WebsiteSelect/WebsiteSelect";
import {getHeadingDailyData} from "./firebase/getHeadingData"
function App() {
  return (
    <>
      <Topbar />
      <WebsiteSelect/>
    </>
  );
}

export default App;
