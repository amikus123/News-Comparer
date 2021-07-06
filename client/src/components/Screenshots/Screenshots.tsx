import { Grid } from "@material-ui/core";
import ScreenshotColumn from "./ScreenshotColumn";

const Screenshots = ({setFullScreenImage} :{setFullScreenImage:(src: string) => void})  => {
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <ScreenshotColumn setFullScreenImage={setFullScreenImage} />
      <ScreenshotColumn setFullScreenImage={setFullScreenImage} />
      <ScreenshotColumn setFullScreenImage={setFullScreenImage} />

    </Grid>
  );
};

export default Screenshots;
