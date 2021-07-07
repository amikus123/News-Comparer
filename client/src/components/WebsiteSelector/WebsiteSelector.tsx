import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import { WebsiteData } from "../../interfaces";
import { getWebisteLogo } from "../../firebase/firebaseAccess";
import WebisteImage from "./WebisteImage";

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
    formInpput:{
      minHeight:70,
    
    }
  })
);

export default function WebsiteSelect({websiteSelectData} : {websiteSelectData:WebsiteData[]}) {
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
    <Grid item xs container direction="column" justify="center" alignItems="center">
      <FormControl className={classes.formControl}>
        {/* <InputLabel id="demo-controlled-open-select-label">Left</InputLabel> */}
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={age}
          onChange={handleChange}
          className={classes.formInpput}
        >
          {/* <MenuItem value={1}>
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
          </MenuItem> */}
    {websiteSelectData.map((item,index)=>{
      return(
        <MenuItem value={index}>
            {/* <img src={`${getWebisteLogo(item.imageName) || ""}`} alt="company logo" /> */
            }
            <WebisteImage name={item.imageName}/>
          </MenuItem>
      )
    })}
        </Select>
      </FormControl>
    </Grid>
  );
}
