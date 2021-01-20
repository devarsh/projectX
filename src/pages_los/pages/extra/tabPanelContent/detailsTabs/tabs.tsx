import React from "react";
import { Tabs } from "components/styledComponent/tabs";
import { Tab } from "components/styledComponent/tab";
import Box from "@material-ui/core/Box";
import { LeadInformationTab } from "./tabInformation";
import { LeadCustomerTab } from "./tabCustomer";
import { useStyles } from "./style";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  const classes = useStyles();
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`lead-tabpanel-${index}`}
      aria-labelledby={`lead-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box py={2} className={classes.tabPanel}>
          <>{children}</>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `lead-tab-${index}`,
    "aria-controls": `lead-tabpanel-${index}`,
  };
}

export const DetailsTabContainer = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <Tabs value={value} onChange={handleChange} aria-label="lead tabs">
        <Tab label="Information" {...a11yProps(0)} />
        <Tab label="Customer" {...a11yProps(1)} />
      </Tabs>
      <div>
        <TabPanel value={value} index={0}>
          <LeadInformationTab />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <LeadCustomerTab />
        </TabPanel>
      </div>
    </>
  );
};
