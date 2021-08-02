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

  return (
    <ListItem className="headings--list-item" id={href} button>
      <Link href={href} className="headings--link">
        {src === undefined || src === "" ? (
          <Skeleton variant="rect" height={250} />
        ) : src === "none" ? null : (
          <img
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
