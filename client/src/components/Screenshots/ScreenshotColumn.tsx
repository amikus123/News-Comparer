import { Grid } from "@material-ui/core";
import SingleScreenshot from "./SingleScreenshot";

const ScreenshotGroup = ({setFullScreenImage} :{setFullScreenImage:React.Dispatch<React.SetStateAction<string>>}) => {
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
