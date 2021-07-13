import { Grid } from "@material-ui/core";
import React from "react";
import { ScreenshotsData } from "../../interfaces";
import ScreenshotColumn from "./ScreenshotColumn";
// this component is responsible for rendering screenshots, and allows to "fullscreen" them
// TODO do something for mobile
const Screenshots = ({
  setFullScreenImage,
  imageSources,
  namesOfWebiteesToDisplay,
}: {
  setFullScreenImage: (src: string) => void;
  imageSources: ScreenshotsData;
  namesOfWebiteesToDisplay: string[];
}) => {
  React.useEffect(()=>{
    console.log(namesOfWebiteesToDisplay,"wyzej")
  },[namesOfWebiteesToDisplay])
  return (  
    <Grid container direction="row" justify="center">
      {namesOfWebiteesToDisplay.map((name, index) => {
        return (
          <ScreenshotColumn
            setFullScreenImage={setFullScreenImage}
            screenshots={imageSources[name]}
            key={index}
          />
        );
      })}
      {/* {Object.keys(imageSources).map((name: string, index:number) => {
        return (
      <ScreenshotColumn setFullScreenImage={setFullScreenImage} screenshots={imageSources[name]} key={index}/>
        )}
      )} */}
    </Grid>
  );
};

export default Screenshots;
