import React from "react";
import Topbar from "./components/topbar/Topbar";
import {getHeadingDailyData} from "./firebase/getHeadingData"
function App() {
  return (
    <>
      <Topbar />
      <button onClick={getHeadingDailyData}>dasads</button>
    </>
  );
}

export default App;
