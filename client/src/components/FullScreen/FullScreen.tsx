import CloseIcon from "@material-ui/icons/Close";
const FullScreen = ({
  fullScreenImage,
  setFullScreenImage,
}: {
  fullScreenImage: string;
  setFullScreenImage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const close = (e: React.MouseEvent<HTMLElement>) => {
    setFullScreenImage("");
  };
  const imageClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation()
  };
  return (
    <div
      className={`fullScreen ${fullScreenImage === "" ? "hide" : ""}`}
      onClick={close}
    >
      <CloseIcon className="fullScreen--closeIcon" />
      <img src={fullScreenImage} alt="test" className="fullScreen--image" onClick={imageClick} />
    </div>
  );
};

export default FullScreen;
