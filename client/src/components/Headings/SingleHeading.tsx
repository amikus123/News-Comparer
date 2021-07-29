import { ListItem, Link, Typography } from "@material-ui/core/";
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
      <Link href={href}>
        {src === undefined ? (
          <Skeleton variant="rect" height={200} />
        ) : src === "none" ? null : (
          <img className="headings--image" src={src} alt="a" />
        )}
        <Typography variant="h6" className="headings--text">{text}</Typography>
      </Link>
    </ListItem>
  );
};

export default SingleHeading;
