import { Grid } from "@material-ui/core";
import { ScreenshotsData } from "../../interfaces";
import ScreenshotColumn from "./ScreenshotColumn";
// this component is responsible for rendering screenshots, and allows to "fullscreen" them
// TODO do something for mobile
const Screenshots = ({setFullScreenImage,imageSources} :{setFullScreenImage:(src: string) => void,imageSources:ScreenshotsData} )  => {
  return (
    <Grid container direction="row" justify="center" >
    
      {Object.keys(imageSources).map((name: string, index:number) => {
        return (
      <ScreenshotColumn setFullScreenImage={setFullScreenImage} screenshots={imageSources[name]} key={index}/>
        )}
      )}
      {/* <ScreenshotColumn setFullScreenImage={setFullScreenImage} imageSources={screenshots.rightRow}/> */}
    </Grid>
  );
};

export default Screenshots;
