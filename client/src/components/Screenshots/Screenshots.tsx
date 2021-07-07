import { Grid } from "@material-ui/core";
import { imageSourceRows } from "../../interfaces";
import ScreenshotColumn from "./ScreenshotColumn";

const Screenshots = ({setFullScreenImage,imageSources} :{setFullScreenImage:(src: string) => void,imageSources:imageSourceRows} )  => {
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <ScreenshotColumn setFullScreenImage={setFullScreenImage} />
      <ScreenshotColumn setFullScreenImage={setFullScreenImage} />
      <ScreenshotColumn setFullScreenImage={setFullScreenImage} />
    </Grid>
  );
};

export default Screenshots;
