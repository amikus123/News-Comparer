import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import {
  DatabaseStaticDataInRows,
  WebisteImagesInRows,
} from "../../interfaces";
import WebsiteSelect from "./WebsiteSelector";

const WebsiteSelecotGroping = ({
  setImagesSources,
  databaseStaticDataInRows,
}: {
  setImagesSources: React.Dispatch<React.SetStateAction<WebisteImagesInRows>>;
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
      <WebsiteSelect websiteSelectData={databaseStaticDataInRows.leftRow} />
      <WebsiteSelect websiteSelectData={databaseStaticDataInRows.centerRow} />
      <WebsiteSelect websiteSelectData={databaseStaticDataInRows.rightRow} />
    </Grid>
  );
};

export default WebsiteSelecotGroping;
