import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Grid } from "@material-ui/core";
import { WebsiteData } from "../../interfaces";
import { getWebisteLogo } from "../../firebase/firebaseAccess";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      display: "block",
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 160,
    },
    formInpput: {
      minHeight: 70,
    },
  })
);

export default function WebsiteSelect({
  websiteSelectData,
}: {
  websiteSelectData: WebsiteData[];
}) {
  const classes = useStyles();
  const [age, setAge] = React.useState<string | number>(0);
  const [open, setOpen] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as number);
  };

  return (
    <Grid
      item
      xs
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <FormControl className={classes.formControl}>
        {/* <InputLabel id="demo-controlled-open-select-label">Left</InputLabel> */}
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          value={age}
          onChange={handleChange}
          className={classes.formInpput}
        >
          {websiteSelectData.map((item, index) => {
            return (
              <MenuItem value={index} key={index}>
                <img src={`${item.imageName}_Logo.png`} alt={item.imageName} />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Grid>
  );
}
