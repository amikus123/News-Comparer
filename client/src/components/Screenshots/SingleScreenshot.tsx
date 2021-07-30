import { Skeleton } from "@material-ui/lab";

const SingleScreenshot = ({
  setFullScreenImage,
  screenshot,
}: {
  setFullScreenImage: (src: string) => void;
  screenshot: string;
}) => {
  return (
    <div className="image-column--image-container">
      {screenshot ? (
        <img
          src={screenshot}
          className="image-column--image"
          onClick={() => setFullScreenImage(screenshot)}
          alt="screens hot of webistie"
        />
      ) : (
        <Skeleton variant="rect" height={640} width={300} />
      )}
    </div>
  );
};

export default SingleScreenshot;
