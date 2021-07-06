import { Grid } from "@material-ui/core";
import SingleScreenshot from "./SingleScreenshot";

const ScreenshotGroup = ({setFullScreenImage} :{setFullScreenImage:(src: string) => void}) => {
  return (
    <Grid
      item
      sm
      container
      direction="column"
      justify="flex-start"
      alignItems="center"
    >
      <SingleScreenshot setFullScreenImage={setFullScreenImage} />
    </Grid>
  );
};

export default ScreenshotGroup;
