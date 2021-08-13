import React, { useState, useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Grid } from "@material-ui/core";
import { WebsiteJointData } from "../../interfaces";
import Switch from "@material-ui/core/Switch";
import {
  BrowserRouter as Router,
  useLocation
} from "react-router-dom";

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
  updateFunction,
}: {
  websiteSelectData: WebsiteJointData[];
  updateFunction: (data: boolean | string) => void;
}) {
  const classes = useStyles();
  const [age, setAge] = useState<string | number>(0);
  const [open, setOpen] = useState(false);
  const [toggled, setToggled] = useState(true);
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as number);
    const name = websiteSelectData[event.target.value as number].name;
    updateFunction(name);
  };

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToggled(event.target.checked);
    updateFunction(event.target.checked);
  };
  let location = useLocation();
 
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
                <img
                  src={`${item.name}_Logo.png`}
                  alt={item.name}
                  className="website-selector--image"
                />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      {location.pathname !== "/words" ? (
        <Switch
          checked={toggled}
          onChange={handleToggle}
          color="primary"
          name="checkedB"
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      ) : null}
    </Grid>
  );
}
