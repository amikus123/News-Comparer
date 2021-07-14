import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


const CustomTabs = () => {
  function a11yProps(index: any) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div className="appbarr--left-container">

        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Screenshots" {...a11yProps(0)} />
          <Tab label="Word analysis" {...a11yProps(1)} />
          <Tab label="Emotions" {...a11yProps(2)} />
        </Tabs>
    </div>
  );
}

export default CustomTabs

