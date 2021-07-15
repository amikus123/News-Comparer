import { Grid } from "@material-ui/core";
import React from "react";
import { ScreenshotsByDate } from "../../interfaces";
import ScreenshotColumn from "./ScreenshotColumn";
// this component is responsible for rendering screenshots, and allows to "fullscreen" them
// TODO do something for mobile
const Screenshots = ({
  setFullScreenImage,
  imageSources,
  namesOfWebiteesToDisplay,
}: {
  setFullScreenImage: (src: string) => void;
  imageSources: ScreenshotsByDate;
  namesOfWebiteesToDisplay: string[];
}) => {
  React.useEffect(()=>{
    console.log(namesOfWebiteesToDisplay,"wyzej")
  },[namesOfWebiteesToDisplay])
  return (  
    <Grid container direction="row" justify="center">
      {/* {namesOfWebiteesToDisplay.map((name, index) => {
        return (
          <ScreenshotColumn
            setFullScreenImage={setFullScreenImage}
            screenshots={imageSources[name]}
            key={index}
          />
        );
      })} */}
    
    </Grid>
  );
};

export default Screenshots;
