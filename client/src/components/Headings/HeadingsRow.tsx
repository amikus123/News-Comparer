import { HeadingRow } from "./HeadingsFunctions";
import HeadingCell from "./HeadingCell";
import { WordToWordMap, SelectedWebsites } from "../../interfaces";
const HeadingsRow = ({
  headingsRow,
  selectedWebsites,
  downloadedHeadingImages,
  selectedWords,
}: {
  headingsRow: HeadingRow;
  selectedWebsites: SelectedWebsites;
  downloadedHeadingImages: WordToWordMap;
  selectedWords: string[];
}) => {
  // add placeholders
  return (
    <div className="headings-row-container">
      <p className="headings--date">{headingsRow.date}</p>
      <div className="headings--inner-container">
        {selectedWebsites.names.map((name, index) => {
          const pog = headingsRow[name];
          return typeof pog !== "string" &&
            typeof pog !== "undefined" &&
            selectedWebsites.show[index] ? (
            <HeadingCell
              selectedWords={selectedWords}
              name={name}
              headings={pog}
              key={index}
              downloadedHeadingImages={downloadedHeadingImages}
              link={selectedWebsites.links[index]}
            />
          ) : null;
        })}
      </div>
    </div>
  );
};

export default HeadingsRow;
