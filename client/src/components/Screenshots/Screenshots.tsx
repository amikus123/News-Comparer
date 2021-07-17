import { Grid } from "@material-ui/core";
import ScreenshotColumn from "./ScreenshotColumn";
// this component is responsible for rendering screenshots, and allows to "fullscreen" them
// TODO do something for mobile
const Screenshots = ({
  setFullScreenImage,
  chosenScreenshots
}: {
  setFullScreenImage: (src: string) => void;
  chosenScreenshots: string[][];
}) => {

  return (  
    <Grid container direction="row" justify="center">
      {chosenScreenshots.length !== 0?
        chosenScreenshots.map((arr, index) => {
          return (
            <ScreenshotColumn
              setFullScreenImage={setFullScreenImage}
              screenshots={arr}
              key={index}
            />
          );
        })
      :null}
    
    </Grid>
  );
};

export default Screenshots;
