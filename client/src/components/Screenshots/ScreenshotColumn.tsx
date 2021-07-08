import { Grid } from "@material-ui/core";
import SingleScreenshot from "./SingleScreenshot";

const ScreenshotGroup = ({
  setFullScreenImage,
  imageSources,
}: {
  setFullScreenImage: (src: string) => void;
  imageSources: string[];
}) => {
  return (
    <Grid
      item
      sm
      container
      direction="column"
      justify="flex-start"
      alignItems="center"
    >
      {imageSources.map((image, index) => {
        return (
          <SingleScreenshot
            key={index}
            setFullScreenImage={setFullScreenImage}
            imageSrc={image}
          />
        );
      })}
      {/* <SingleScreenshot setFullScreenImage={setFullScreenImage} /> */}
    </Grid>
  );
};

export default ScreenshotGroup;
