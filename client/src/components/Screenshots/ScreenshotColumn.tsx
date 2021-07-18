import { Grid } from "@material-ui/core";
import React from "react";
import SingleScreenshot from "./SingleScreenshot";

const ScreenshotGroup = ({
  setFullScreenImage,
  screenshots,
}: {
  setFullScreenImage: (src: string) => void;
  screenshots: string[];
}) => {
  React.useEffect(() => {
    console.log(screenshots, "doszlo");
  }, [screenshots]);
  return (
    // prevents from crashing
    <Grid item sm container direction="column-reverse" justify="flex-start" >
      {screenshots
        ? screenshots.map((screenshot, index) => {
            return (
              <SingleScreenshot
                key={index}
                setFullScreenImage={setFullScreenImage}
                screenshot={screenshot}
              />
            );
          })
        : null}
    </Grid>
  );
};

export default ScreenshotGroup;
