import { Skeleton } from "@material-ui/lab";

const SingleScreenshot = ({
  setFullScreenImage,
  screenshot,
  name,
}: {
  setFullScreenImage: (src: string) => void;
  screenshot: string;
  name: string;
}) => {
  return (
    <div className="screenshots--wrapper">
    {/* zamien na link do strony */}
      <img
        src={`${name}_Logo.png`}
        alt={name}
        className="screenshots--logo-image"
      />

      <div className="screenshots--image-container">
        {screenshot ? (
          <img
            src={screenshot}
            className="screenshots--image"
            onClick={() => setFullScreenImage(screenshot)}
            alt="screens hot of webistie"
          />
        ) : (
          <Skeleton variant="rect" height={640} />
        )}
      </div>
    </div>
  );
};

export default SingleScreenshot;
