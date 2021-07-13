import { Grid } from "@material-ui/core";
import React from "react"
import SingleScreenshot from "./SingleScreenshot";

const ScreenshotGroup = ({
  setFullScreenImage,
  screenshots,
}: {
  setFullScreenImage: (src: string) => void;
  screenshots: string[];

}) => {
React.useEffect(()=>{
  console.log(screenshots,"doszlo")
},[screenshots])
  return (
    <Grid
      item
      sm
      container
      direction="column"
      justify="flex-start"
    >
      
      {screenshots.map((screenshot, index) => {
        return (
          <SingleScreenshot
            key={index}
            setFullScreenImage={setFullScreenImage}
            screenshot={screenshot}
          />
        );
      })}
      {/* <SingleScreenshot setFullScreenImage={setFullScreenImage} /> */}
    </Grid>
  );
};

export default ScreenshotGroup;
