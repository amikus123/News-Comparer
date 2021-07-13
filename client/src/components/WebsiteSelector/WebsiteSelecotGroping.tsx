import { Grid } from "@material-ui/core";
import {
  DatabaseStaticDataInRows,
} from "../../interfaces";
import WebsiteSelect from "./WebsiteSelector";

const WebsiteSelecotGroping = ({
  updateWebisteSSSelection,
  databaseStaticDataInRows,
}: {
  updateWebisteSSSelection: (name: string, index: number) => Promise<void>
  databaseStaticDataInRows: DatabaseStaticDataInRows;
}) => {
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={3}
    >
      <WebsiteSelect websiteSelectData={databaseStaticDataInRows.leftRow} index={0} updateWebisteSSSelection={updateWebisteSSSelection}/>
      <WebsiteSelect websiteSelectData={databaseStaticDataInRows.centerRow} index={1} updateWebisteSSSelection={updateWebisteSSSelection} />
      <WebsiteSelect websiteSelectData={databaseStaticDataInRows.rightRow} index={2} updateWebisteSSSelection={updateWebisteSSSelection} />
    </Grid>
  );
};

export default WebsiteSelecotGroping;
