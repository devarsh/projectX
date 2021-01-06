import { useState, FC, Fragment } from "react";
import Box from "@material-ui/core/Box";
import { Tab } from "components/styledComponent/tab";
import { Tabs } from "components/styledComponent/tabs";
import { useStyles } from "./style";

const TabPanel = (props) => {
  const { value, index, classes, children, ...others } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`lead-tabpanel-${index}`}
      aria-labelledby={`lead-tab-${index}`}
      {...others}
    >
      {value === index && (
        <Box py={2} className={classes.tabPanel}>
          <>{children}</>
        </Box>
      )}
    </div>
  );
};

export const InquiryDetails: FC<{ inquiryID: string }> = ({ inquiryID }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const handleChangeTab = (_, currentTab) => {
    setCurrentTab(currentTab);
  };
  const classes = useStyles();
  return (
    <Fragment>
      <Tabs value={currentTab} onChange={handleChangeTab}>
        <Tab label="Inquiry" id="0" />
        <Tab label="Questionnair" id="1" />
        <Tab label="Assignment" id="2" />
        <Tab label="Customer" id="3" />
        <Tab label="History" id="4" />
      </Tabs>
      <TabPanel value={currentTab} index={0} classes={classes}></TabPanel>
      <TabPanel value={currentTab} index={1} classes={classes}></TabPanel>
    </Fragment>
  );
};
