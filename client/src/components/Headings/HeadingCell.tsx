import { Heading, WordToWordMap } from "../../interfaces";
import { checkIfContainsWords } from "./HeadingsFunctions";
import SingleHeading from "./SingleHeading";

const HeadingCell = ({
  headings,
  downloadedHeadingImages,
  selectedWords
}: {
  headings: Heading[];
  downloadedHeadingImages: WordToWordMap;
  selectedWords:string[]
}) => {
  return (
    <ul className="headings--list">
      {headings.map((item, index) => {
        return (
          <>
            {checkIfContainsWords(headings[index].text, selectedWords) ? (
              <SingleHeading
                key={index}
                src={downloadedHeadingImages[headings[index].image]}
                href={headings[index].link}
                text={headings[index].text}
              />
            ) : null}
          </>
        );
      })}
    </ul>
  );
};

export default HeadingCell;
