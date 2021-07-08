import { Grid } from "@material-ui/core";
import { WebisteImagesInRows } from "../../interfaces";
import ScreenshotColumn from "./ScreenshotColumn";
// this component is responsible for rendering screenshots, and allows to "fullscreen" them
// TODO do something for mobile
const Screenshots = ({setFullScreenImage,imageSources} :{setFullScreenImage:(src: string) => void,imageSources:WebisteImagesInRows} )  => {
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <ScreenshotColumn setFullScreenImage={setFullScreenImage} imageSources={imageSources.leftRow} />
      <ScreenshotColumn setFullScreenImage={setFullScreenImage} imageSources={imageSources.centerRow} />
      <ScreenshotColumn setFullScreenImage={setFullScreenImage} imageSources={imageSources.rightRow}/>
    </Grid>
  );
};

export default Screenshots;
