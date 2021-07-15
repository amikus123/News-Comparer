import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { createRowObjects } from "../../firebase/firestore";
import {
WebsiteJointDataMap,WebsiteJointDataInRows
} from "../../interfaces";
import WebsiteSelect from "./WebsiteSelector";

const WebsiteSelecotGroping = ({
  updateWebisteSSSelection,
  webisteJointData,
}: {
  updateWebisteSSSelection: (name: string, index: number) => Promise<void>
  webisteJointData: WebsiteJointDataMap;
}) => {
  const [webisteDataInRows, setWebisteDataInRows] = useState<WebsiteJointDataInRows>({
    leftRow: [],
    centerRow: [],
    rightRow: [],
  });
  useEffect(()=>{
    const politicsBasedOnRows = createRowObjects(webisteJointData);
    setWebisteDataInRows(politicsBasedOnRows)

  },[webisteJointData])
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={3}
    >
      <WebsiteSelect websiteSelectData={webisteDataInRows.leftRow} index={0} updateWebisteSSSelection={updateWebisteSSSelection}/>
      <WebsiteSelect websiteSelectData={webisteDataInRows.centerRow} index={1} updateWebisteSSSelection={updateWebisteSSSelection} />
      <WebsiteSelect websiteSelectData={webisteDataInRows.rightRow} index={2} updateWebisteSSSelection={updateWebisteSSSelection} />
    </Grid>
  );
};

export default WebsiteSelecotGroping;
