import { Grid } from "@material-ui/core";
import { SelectedWebsites } from "../../interfaces";
import SingleScreenshot from "./SingleScreenshot";
import { Fragment } from "react";
const ScreenshotRow = ({
  setFullScreenImage,
  screenshots,
  selectedWebsites,
}: {
  setFullScreenImage: (src: string) => void;
  screenshots: string[];
  selectedWebsites: SelectedWebsites;
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
          <Fragment key={index}>
            {selectedWebsites.show[index] ? (
              <SingleScreenshot
                link={selectedWebsites.links[index]}
                key={index}
                setFullScreenImage={setFullScreenImage}
                screenshot={screenshot}
                name={selectedWebsites.names[index]}
              />
            ) : null}
          </Fragment>
        );
      })}
    </Grid>
  );
};

export default ScreenshotRow;
