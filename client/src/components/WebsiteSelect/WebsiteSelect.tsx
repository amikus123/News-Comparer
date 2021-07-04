import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      display: "block",
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  })
);

export default function WebsiteSelect() {
  const classes = useStyles();
  // we can change wthe default option by changing initial state
  const [age, setAge] = React.useState<string | number>(1);
  const [open, setOpen] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as number);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Button className={classes.button} onClick={handleOpen}>
        Open the select
      </Button>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Age</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={age}
          onChange={handleChange}
        >
          <MenuItem value={1}>
            <img src="fronda.png" alt="company logo" />
          </MenuItem>
          <MenuItem value={2}>
            <img src="TVP.png" alt="company logo" />
          </MenuItem>
          <MenuItem value={3}>
            <img src="KP.png" alt="company logo" />
          </MenuItem>
          <MenuItem value={4}>
            <img src="onet.png" alt="company logo" />
          </MenuItem>
          <MenuItem value={5}>
            <img src="fronda.png" alt="company logo" />
          </MenuItem>
          <MenuItem value={6}>
            <img src="TVP.png" alt="company logo" />
          </MenuItem>
          <MenuItem value={7}>
            <img src="KP.png" alt="company logo" />
          </MenuItem>
          <MenuItem value={8}>
            <img src="onet.png" alt="company logo" />
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
