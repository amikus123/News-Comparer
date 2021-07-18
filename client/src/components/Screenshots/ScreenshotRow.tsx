import { Grid } from "@material-ui/core";
import SingleScreenshot from "./SingleScreenshot";

const ScreenshotRow = ({
  setFullScreenImage,
  screenshots,
}: {
  setFullScreenImage: (src: string) => void;
  screenshots: string[];
}) => {

  return (
    <Grid item sm container direction="row" justify="flex-start" >
      {
        screenshots.map((screenshot, index) => {
            return (
              <SingleScreenshot
                key={index}
                setFullScreenImage={setFullScreenImage}
                screenshot={screenshot}
              />
            );
          })
        }
    </Grid>
  );
};

export default ScreenshotRow;
