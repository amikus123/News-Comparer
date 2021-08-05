import react from "react"
import { Heading, WordToWordMap } from "../../interfaces";
import { checkIfContainsWords } from "./HeadingsFunctions";
import SingleHeading from "./SingleHeading";
import PageLogoLink from "../General/PageLogoLink";

const HeadingCell = ({
  headings,
  downloadedHeadingImages,
  selectedWords,
  name,
  link
}: {
  headings: Heading[];
  downloadedHeadingImages: WordToWordMap;
  selectedWords:string[];
name:string;
link:string
}) => {
  return (
    <ul className="headings--list">
       <PageLogoLink name={name} link={link}/>

      {headings.map((item, index) => {
        return (
          <react.Fragment key={index}>
            {checkIfContainsWords(headings[index].text, selectedWords) ? (
              <SingleHeading
                key={index}
                src={downloadedHeadingImages[headings[index].image]}
                href={headings[index].link}
                text={headings[index].text}
              />
            ) : null}
          </react.Fragment>
        );
      })}
    </ul>
  );
};

export default HeadingCell;
