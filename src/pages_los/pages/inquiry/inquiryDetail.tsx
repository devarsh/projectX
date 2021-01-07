import { useState, FC, Fragment } from "react";
import Box from "@material-ui/core/Box";
import { Tab } from "components/styledComponent/tab";
import { Tabs } from "components/styledComponent/tabs";
import { InquiryEditFormWrapper } from "./formEdit";
import { InquiryViewFormWrapper } from "./formView";
import { useStyles } from "./style";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { queryClient } from "./cache";

const TabPanel = ({ value, index, children }) => {
  return Number(value) === Number(index) ? children : null;
};

export const InquiryDetails: FC<{ inquiryID?: string }> = ({ inquiryID }) => {
  inquiryID = "1406";
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
          <Tab label="Assign Inquiry" id="2" />
          <Tab label="Move To Lead" id="3" />
          <Tab label="Customer" id="4" />
          <Tab label="History" id="5" />
        </Tabs>
        <Box py={2} className={classes.tabPanel}>
          <TabPanel value={currentTab} index="0" key={0}>
            <InquiryViewFormWrapper
              key={0}
              inquiryID={inquiryID}
              inquiryType="inquiry"
            />
          </TabPanel>
          <TabPanel value={currentTab} index="1" key={1}>
            <InquiryViewFormWrapper
              inquiryID={inquiryID}
              inquiryType="questionnaire"
              key={1}
            />
          </TabPanel>
          <TabPanel value={currentTab} index="2" key={2}>
            <InquiryEditFormWrapper
              key={2}
              inquiryID={inquiryID}
              inquiryType="inquiry"
            />
          </TabPanel>
          <TabPanel value={currentTab} index="3" key={3}>
            <InquiryEditFormWrapper
              inquiryID={inquiryID}
              inquiryType="questionnaire"
              key={3}
            />
          </TabPanel>
        </Box>
      </Fragment>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
