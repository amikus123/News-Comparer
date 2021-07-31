import { ListItem, Link, Typography } from "@material-ui/core/";
import Skeleton from "@material-ui/lab/Skeleton";
import { useEffect, useState } from "react";
const SingleHeading = ({
  src,
  href,
  text,
}: {
  src: string | undefined;
  href: string;
  text: string;
}) => {
  // const [minheight, setMinHeight] = useState<number>(250);
  // const [x, setX] = useState<boolean>(false);

  // useEffect(() => {
  //   if (src !== undefined && src !== "" && src === "none") {
  //     const img = new Image();
  //     // parent width = ?
  //     img.onload = () => {
  //       const originalHeight = img.height;
  //       const originalWidth = img.width;
  //       console.log(img, "zdjecie ", img.height, img.width);
  //       // H / W
  //       const ratio = originalHeight / originalWidth;
  //       const rowContainer = document.getElementById(href);
  //       const parentWidth = rowContainer?.offsetWidth;

  //       let actaulWidth;
  //       if (parentWidth) {
  //         const minWidth = parentWidth / 2;
  //         if (originalWidth <= minWidth) {
  //           actaulWidth = minWidth;
  //         } else if (originalWidth <= parentWidth) {
  //           actaulWidth = originalWidth;
  //         } else {
  //           actaulWidth = parentWidth;
  //         }
  //         if (isNaN(actaulWidth * ratio)) {
  //           console.log(
  //             "NAN ",
  //             actaulWidth,
  //             ratio,
  //             src,
  //             originalHeight,
  //             originalWidth
  //           );
  //         }
  //         setMinHeight(actaulWidth * ratio);
  //         setX(true);
  //       }
  //     };
  //     img.src = src;
  //   } else {
  //     console.log("src == undef");
  //   }
  // }, [src, href]);

  return (
    <ListItem className="headings--list-item" id={href} button>
      <Link href={href} className="headings--link">
        {src === undefined || src === "" ? (
          <Skeleton variant="rect" height={250} />
        ) : src === "none" ? null : (
          <img
            // style={{ minHeight: `${minheight}px` }}
            id={href}
            className="headings--image"
            src={src}
            alt="a"
          />
        )}
        <p  className="headings--text">
          {text}
        </p>
      </Link>
    </ListItem>
  );
};

export default SingleHeading;
/*  */
