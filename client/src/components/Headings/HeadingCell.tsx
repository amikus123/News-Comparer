import { Heading, WordToWordMap } from "../../interfaces";
import SingleHeading from "./SingleHeading";

const HeadingCell = ({
  headings,
  downloadedHeadingImages,
}: {
  headings: Heading[];
  downloadedHeadingImages: WordToWordMap;
}) => {
  return (
    <ul className="headings--list">
      {headings.map((item, index) => {
        return (
          <SingleHeading
            key={index}
            src={downloadedHeadingImages[headings[index].image]}
            href={headings[index].link}
            text={headings[index].text}
          />
        );
      })}
    </ul>
  );
};

export default HeadingCell;
