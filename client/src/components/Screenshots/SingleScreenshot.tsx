import { Skeleton } from "@material-ui/lab";
import PageLogoLink from "../General/PageLogoLink";

const SingleScreenshot = ({
  setFullScreenImage,
  screenshot,
  name,
  link
}: {
  setFullScreenImage: (src: string) => void;
  screenshot: string;
  name: string;
  link:string
}) => {
  return (
    <div className="screenshots--wrapper">
  <PageLogoLink name={name} link={link}/>

      <div className="screenshots--image-container">
        {screenshot  !== "" ? (
          <img
            src={screenshot}
            className="screenshots--image"
            onClick={() => setFullScreenImage(screenshot)}
            alt="screenshot of website"
          />
        ) : (
          <Skeleton variant="rect" height={640} width="80%" />
        )}
      </div>
    </div>
  );
};

export default SingleScreenshot;
