import { useState, FC, Fragment } from "react";
import Box from "@material-ui/core/Box";
import { Tab } from "components/styledComponent/tab";
import { Tabs } from "components/styledComponent/tabs";
import { useStyles } from "./style";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { CustomerDetails } from "./customerDetails";
import { AssignInquiryToEmployee } from "./convertInquirytolead";
import { queryClient } from "./cache";
import { ViewEditCompositeComponent } from "./viewEditCompositeComponent";
import Alert from "@material-ui/lab/Alert";

const TabPanel = ({ value, index, children }) => {
  return Number(value) === Number(index) ? children : null;
};

export const InquiryDetails: FC<{
  inquiryID: string;
  setDisableDialogClose: any;
  isInquiryEditedRef: any;
}> = ({ inquiryID, setDisableDialogClose, isInquiryEditedRef }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const handleChangeTab = (_, currentTab) => {
    setCurrentTab(currentTab);
  };
  const classes = useStyles();

  return (
    <QueryClientProvider client={queryClient}>
      <Fragment>
        <Tabs value={currentTab} onChange={handleChangeTab}>
          <Tab label="Inquiry" id="0" />
          <Tab label="Questionnaire" id="1" />
          <Tab label="Customer" id="2" />
          <Tab label="Assign Inquiry" id="3" />
        </Tabs>
        <Box py={2} className={classes.tabPanel}>
          <Alert icon={false} severity="info">
            <b>InquiryID #{inquiryID}</b>
          </Alert>
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
            <CustomerDetails inquiryID={inquiryID} inquiryType="inquiry" />
          </TabPanel>
          <TabPanel value={currentTab} index="3" key={3}>
            <AssignInquiryToEmployee inquiryID={inquiryID} key={3} />
          </TabPanel>
        </Box>
      </Fragment>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
