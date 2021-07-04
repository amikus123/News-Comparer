import { Grid } from "@material-ui/core";
import ScreenshotColumn from "./ScreenshotColumn";

const Screenshots = ({setFullScreenImage} :{setFullScreenImage:React.Dispatch<React.SetStateAction<string>>})  => {
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <ScreenshotColumn setFullScreenImage={setFullScreenImage} />
      <ScreenshotColumn setFullScreenImage={setFullScreenImage} />
      <ScreenshotColumn setFullScreenImage={setFullScreenImage} />

    </Grid>
  );
};

export default Screenshots;
