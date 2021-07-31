import { Grid } from "@material-ui/core";
import { HeadingRow } from "./HeadingsFunctions";
import HeadingCell from "./HeadingCell";
import { DateTypo } from "../Typography/CustomTypo";
import { WordToWordMap } from "../../interfaces";
const HeadingsRow = ({
  headingsRow,
  names,
  downloadedHeadingImages,
}: {
  headingsRow: HeadingRow;
  names: string[];
  downloadedHeadingImages: WordToWordMap;
}) => {
  
  // add placeholders
  return (
    <div className="headings-row-container">
      <p className="headings--date">{headingsRow.date}</p>
      <div className="headings--inner-container">
        {names.map((name, index) => {
          // REVERSE ORDER
          const pog = headingsRow[name];
          return typeof pog !== "string" && typeof pog !== "undefined" ? (
              <HeadingCell
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
