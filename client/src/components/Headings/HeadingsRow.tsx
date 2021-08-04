import { HeadingRow } from "./HeadingsFunctions";
import HeadingCell from "./HeadingCell";
import { WordToWordMap } from "../../interfaces";
const HeadingsRow = ({
  headingsRow,
  names,
  downloadedHeadingImages,
  selectedWords,
}: {
  headingsRow: HeadingRow;
  names: string[];
  downloadedHeadingImages: WordToWordMap;
  selectedWords: string[];
}) => {
  // add placeholders
  return (
    <div className="headings-row-container">
      <p className="headings--date">{headingsRow.date}</p>
      <div className="headings--inner-container">
        {names.map((name, index) => {
          const pog = headingsRow[name];
          return typeof pog !== "string" && typeof pog !== "undefined" ? (
            <HeadingCell
              selectedWords={selectedWords}
              name={name}
              headings={pog}
              key={index}
              downloadedHeadingImages={downloadedHeadingImages}
            />
          ) : null;
        })}
      </div>
    </div>
  );
};

export default HeadingsRow;
