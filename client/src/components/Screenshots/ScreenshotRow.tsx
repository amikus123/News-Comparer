import { useEffect } from "react";
import { Grid } from "@material-ui/core";
import SingleScreenshot from "./SingleScreenshot";

const ScreenshotRow = ({
  setFullScreenImage,
  screenshots,
  names,
  links
}: {
  setFullScreenImage: (src: string) => void;
  screenshots: string[];
  names: string[];
  links:string[]
}) => {

  return (
    <Grid
      item
      sm
      container
      direction="row"
      justify="flex-start"
      className="screenshots"
    >
      {screenshots.map((screenshot, index) => {
        return (
          <SingleScreenshot
          link={links[index]}
            key={index}
            setFullScreenImage={setFullScreenImage}
            screenshot={screenshot}
            name={names[index]}
          />
        );
      })}
    </Grid>
  );
};

export default ScreenshotRow;
