import { ListItem, Link } from "@material-ui/core/";
import Skeleton from "@material-ui/lab/Skeleton";
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
    <ListItem className="headings--list-item" button>
      <Link href={href} className="headings--link">
        {src === undefined || src === "" ? (
          <Skeleton variant="rect" height={200} />
        ) : src === "none" ? null : (
          <img
            id={href}
            className="headings--image"
            src={src}
            alt="original article illustration"
            onError={(e) => {
              // makes it that when image src in invalid, the image component is not shown
              console.log("fired");
              document.getElementById(href)?.classList.add("hide");
            }}
          />
        )}
        <p className="headings--text">{text}</p>
      </Link>
    </ListItem>
  );
};

export default SingleHeading;
