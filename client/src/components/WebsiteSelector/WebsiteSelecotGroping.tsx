import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { createRowObjects } from "../../firebase/firebaseAccess";
import { imageSourceRows } from "../../interfaces";
import WebsiteSelect from "./WebsiteSelector";

const WebsiteSelecotGroping = ({
  setImagesSources,
}: {
  setImagesSources: React.Dispatch<React.SetStateAction<imageSourceRows>>;
}) => {
  const [data, setData] = useState<imageSourceRows>({
    leftRow: [],
    centerRow: [],
    rightRow: [],
  });
  useEffect(() => {
    const x = async () => {
      const x = await createRowObjects();
      setData(x);
    };
    x();
  }, []);

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={3}
    >
      <WebsiteSelect websiteSelectData={data.leftRow} />
      <WebsiteSelect websiteSelectData={data.centerRow} />
      <WebsiteSelect websiteSelectData={data.rightRow} />
    </Grid>
  );
};

export default WebsiteSelecotGroping;
