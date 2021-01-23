import { useState, FC, Fragment } from "react";
import Box from "@material-ui/core/Box";
import { Tab } from "components/styledComponent/tab";
import { Tabs } from "components/styledComponent/tabs";
import { useStyles } from "./style";
import { CustomerDetails } from "./customerDetails";
import { AssignInquiryToEmployee } from "./convertInquirytolead";

import { ViewEditCompositeComponent } from "./viewEditCompositeComponent";
import { InquiryDetailsTab } from "./inquiryDetailsTab";
import { Documents } from "./documents";

const TabPanel = ({ value, index, children }) => {
  return Number(value) === Number(index) ? children : null;
};

export const InquiryDetails: FC<{
  inquiryData: any;
  inquiryID: string;
  setDisableDialogClose: any;
  isInquiryEditedRef: any;
}> = ({
  inquiryID,
  setDisableDialogClose,
  isInquiryEditedRef,
  inquiryData,
}) => {
  const [currentTab, setCurrentTab] = useState(0);
  const handleChangeTab = (_, currentTab) => {
    setCurrentTab(currentTab);
  };
  const classes = useStyles();

  return (
    <Fragment>
      <InquiryDetailsTab inquiryData={inquiryData} />
      <Tabs value={currentTab} onChange={handleChangeTab}>
        <Tab label="Inquiry" id="0" />
        <Tab label="Questionnaire" id="1" />
        <Tab label="Documents" id="2" />
        <Tab label="Customer" id="3" />
        <Tab label="Assign Inquiry" id="4" />
      </Tabs>
      <Box py={2} className={classes.tabPanel}>
        <TabPanel value={currentTab} index="0" key={0}>
          <ViewEditCompositeComponent
            inquiryID={inquiryID}
            inquiryType="inquiry"
            setDisableDialogClose={setDisableDialogClose}
            isInquiryEditedRef={isInquiryEditedRef}
          />
        </TabPanel>
        <TabPanel value={currentTab} index="1" key={1}>
          <ViewEditCompositeComponent
            inquiryID={inquiryID}
            inquiryType="questionnaire"
            setDisableDialogClose={setDisableDialogClose}
            isInquiryEditedRef={isInquiryEditedRef}
          />
        </TabPanel>
        <TabPanel value={currentTab} index="2" key={2}>
          <Documents />
        </TabPanel>
        <TabPanel value={currentTab} index="3" key={3}>
          <CustomerDetails inquiryID={inquiryID} inquiryType="inquiry" />
        </TabPanel>
        <TabPanel value={currentTab} index="4" key={4}>
          <AssignInquiryToEmployee inquiryID={inquiryID} key={3} />
        </TabPanel>
      </Box>
    </Fragment>
  );
};
