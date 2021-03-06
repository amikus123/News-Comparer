
const FullScreen = ({
  fullScreenImage,
  setFullScreenImage,
}: {
  fullScreenImage: string;
  setFullScreenImage: (src: string) => void;
}) => {
  const close = (e: React.MouseEvent<HTMLElement>) => {
    setFullScreenImage("");
    const fullscreen = document.getElementById("fullscreen");
    if (fullscreen) {
      fullscreen.scroll(0, 0);
    }
  };
 

  return (
    <div
      className={`fullscreen ${fullScreenImage === "" ? "hide" : ""}`}
      id="fullscreen"
      onClick={close}
    >
      <div className="fullscreen--wrrapper">
        <img
          src={fullScreenImage}
          alt="test"
          className={`fullscreen--image ${
            fullScreenImage === "" ? "hide" : ""
          }`}
          id="fullScreenImage"
        />
      </div>
    </div>
  );
};

export default FullScreen;
