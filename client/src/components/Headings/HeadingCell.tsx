import { Heading, WordToWordMap } from "../../interfaces";
import { checkIfContainsWords } from "./HeadingsFunctions";
import SingleHeading from "./SingleHeading";

const HeadingCell = ({
  headings,
  downloadedHeadingImages,
  selectedWords,
  rowIndex,
  name
}: {
  headings: Heading[];
  downloadedHeadingImages: WordToWordMap;
  selectedWords:string[];
  rowIndex:number,
name:string
}) => {
  return (
    <ul className="headings--list">
       <img src={`${name}_Logo.png`} alt={name} className="heading--logo-image" />
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
