import CloseIcon from "@material-ui/icons/Close";
import { useEffect, useState } from "react";
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
  const imageClick = (e: React.MouseEvent<HTMLElement>) => {
    // e.preventDefault();
    // e.stopPropagation();
  };
  // useEffect(() => {
  //   const app = document.getElementById("body");
  //   if (app) {
  //     app.classList.toggle("hideOverflowY");
  //   }
  // }, []);
  // useEffect(() => {
  //   const app = document.getElementById("body");
  //   if (app) {
  //     app.classList.toggle("hideOverflowY");
  //   }
  // }, [fullScreenImage]);

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
          onClick={imageClick}
        />
        <CloseIcon className="fullscreen--close-icon" />
      </div>
    </div>
  );
};

export default FullScreen;
