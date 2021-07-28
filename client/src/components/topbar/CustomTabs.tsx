import React, { useState, useEffect } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { NavLink, useLocation } from "react-router-dom";
import { WordMap } from "../../interfaces";

const CustomTabs = () => {
  let location = useLocation();
  const [val, setVal] = useState(0);
  useEffect(() => {
    setVal(getValue(location.pathname));
  }, [location]);
  const locationMap: WordMap = {
    "/words": 0,
    "/headings": 1,
    "/screenshots": 2,
  };
  const getValue = (locationString: string) => {
    const value = locationMap[locationString];
    return value  ;
  };
  function a11yProps(index: any) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  return (
    <div className="appbarr--left-container">
      <Tabs
        value={val<=3?val:false}
        aria-label="simple tabs example"
      >
        <Tab
          label="Word analysis"
          {...a11yProps(0)}
          component={NavLink}
          activeClassName="selected"
          to="/words"
        />

        <Tab
          label="Headings"
          {...a11yProps(1)}
          component={NavLink}
          activeClassName="selected"
          to="/headings"
        />

      
        <Tab
          label="Screenshots"
          {...a11yProps(2)}
          to="/screenshots"
          component={NavLink}
          activeClassName="selected"
        />
      </Tabs>
    </div>
  );
};

export default CustomTabs;
