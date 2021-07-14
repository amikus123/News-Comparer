import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Zoom from "@material-ui/core/Zoom";
import CustomTabs from "./CustomTabs";


function HideOnScroll() {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar>
        <Toolbar className="appbar--toolbar">
          <Typography variant="h6">News-Comparer</Typography>
          <CustomTabs/>
        </Toolbar>
      </AppBar>
    </Slide>
  );
}

function ScrollTop() {
  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },

  })
);
  const classes = useStyles();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).getElementById("back-to-top-anchor");
    console.log(anchor);
    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </div>
    </Zoom>
  );
}


export default function Topbar() {
  return (
    <>
      <HideOnScroll />
      <Toolbar id="back-to-top-anchor" />
      <ScrollTop />
    </>
  );
}
