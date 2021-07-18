import React, { useEffect } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { NavLink, useLocation } from "react-router-dom";
import { WordMap } from "../../interfaces";

const CustomTabs = () => {
  let location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
  }, [location]);
  const locationMap  : WordMap= {
    "/" : 0,
    "/words":1,
    "/headings":2,
    "/emotions":3,
  }
  const getValue = (locationString:string) =>{
    const value = locationMap[locationString]
    return value?value:false
  }
  function a11yProps(index: any) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  return (
    <div className="appbarr--left-container">
      <Tabs
        value={getValue(location.pathname)}
        aria-label="simple tabs example"
      >
        <Tab
          label="Screenshots"
          {...a11yProps(0)}
          to="/"
          component={NavLink}
        />
        <Tab
          label="Word analysis"
          {...a11yProps(1)}
          component={NavLink}
          activeClassName="selected"
          to="/words"

        />
        <Tab
          label="Headings"
          {...a11yProps(2)}
          component={NavLink}
          activeClassName="selected"
          to="/headings"
        />
            <Tab
          label="Emotions"
          {...a11yProps(3)}
          component={NavLink}
          activeClassName="selected"
          to="/emotions"
        />
      </Tabs>
    </div>
  );
};

export default CustomTabs;
