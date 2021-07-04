import { Grid } from "@material-ui/core";
import WebsiteSelect from "./WebsiteSelector";

const WebsiteSelecotGroping = () => {
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={3}
    >
      <WebsiteSelect />
      <WebsiteSelect />
      <WebsiteSelect />
    </Grid>
  );
};

export default WebsiteSelecotGroping;
