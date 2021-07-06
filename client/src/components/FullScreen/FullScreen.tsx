import CloseIcon from "@material-ui/icons/Close";
const FullScreen = ({
  fullScreenImage,
  setFullScreenImage,
}: {
  fullScreenImage: string;
  setFullScreenImage: (src: string) => void;
}) => {
  const close = (e: React.MouseEvent<HTMLElement>) => {
    setFullScreenImage("");
  };
  const imageClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  return (
    <div
      className={`fullScreen ${fullScreenImage === "" ? "hide" : ""}`}
      onClick={close}
    >
      <img
        src={fullScreenImage}
        alt="test"
        className="fullScreen--image fullScreen--image-off"
        id="fullScreenImage"
        onClick={imageClick}
      />
      {/* i doubt whether this is necessary */}
      {/* <CloseIcon className="fullScreen--closeIcon" /> */}
    </div>
  );
};

export default FullScreen;
