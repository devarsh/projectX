import { useState, FC, Fragment, useEffect } from "react";
import Box from "@material-ui/core/Box";
import { Tab } from "components/styledComponent/tab";
import { Tabs } from "components/styledComponent/tabs";
import { queryClient } from "cache";
import { useStyles } from "./style";
import { CustomerDetails } from "./customerDetails";
import { MoveInquiryToLead } from "./moveInquiryToLead";
import { CRUD } from "./crud";
import { HeaderDetails } from "./headerDetails";
import { Documents } from "./documents";

const TabPanel = ({ value, index, children }) => {
  return Number(value) === Number(index) ? children : null;
};

export const DetailsView: FC<{
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
  const inquiryType = "inquiry";
  const inquiryQuestionType = "inquiryQuestion";
  //Remove all the cached queries of all tabs when this component unmounts
  useEffect(() => {
    return () => {
      queryClient.removeQueries([
        "getDocumentListingTemplate",
        inquiryType,
        inquiryID,
      ]);
      queryClient.removeQueries(["getDocumentsList", inquiryType, inquiryID]);
      queryClient.removeQueries(["getEditMetaData", inquiryType, inquiryID]);
      queryClient.removeQueries(["getEditData", inquiryType, inquiryID]);
      queryClient.removeQueries(["getViewMetaData", inquiryType, inquiryID]);
      queryClient.removeQueries(["getViewData", inquiryType, inquiryID]);
      queryClient.removeQueries([
        "getEditMetaData",
        inquiryQuestionType,
        inquiryID,
      ]);
      queryClient.removeQueries([
        "getEditData",
        inquiryQuestionType,
        inquiryID,
      ]);
      queryClient.removeQueries([
        "getViewMetaData",
        inquiryQuestionType,
        inquiryID,
      ]);
      queryClient.removeQueries([
        "getViewData",
        inquiryQuestionType,
        inquiryID,
      ]);
    };
  }, []);

  return (
    <Fragment>
      <HeaderDetails inquiryData={inquiryData} />
      <Tabs value={currentTab} onChange={handleChangeTab}>
        <Tab label="Inquiry" id="0" />
        <Tab label="Questionnaire" id="1" />
        <Tab label="Documents" id="2" />
        <Tab label="Customer" id="3" />
        <Tab label="Move To Lead" id="4" />
      </Tabs>
      <Box py={2} className={classes.tabPanel}>
        <TabPanel value={currentTab} index="0" key={0}>
          <CRUD
            inquiryID={inquiryID}
            inquiryType={inquiryType}
            setDisableDialogClose={setDisableDialogClose}
            isInquiryEditedRef={isInquiryEditedRef}
          />
        </TabPanel>
        <TabPanel value={currentTab} index="1" key={1}>
          <CRUD
            inquiryID={inquiryID}
            inquiryType={inquiryQuestionType}
            setDisableDialogClose={setDisableDialogClose}
            isInquiryEditedRef={isInquiryEditedRef}
          />
        </TabPanel>
        <TabPanel value={currentTab} index="2" key={2}>
          <Documents inquiryID={inquiryID} inquiryType={inquiryType} />
        </TabPanel>
        <TabPanel value={currentTab} index="3" key={3}>
          <CustomerDetails inquiryID={inquiryID} inquiryType={inquiryType} />
        </TabPanel>
        <TabPanel value={currentTab} index="4" key={4}>
          <MoveInquiryToLead inquiryID={inquiryID} key={3} />
        </TabPanel>
      </Box>
    </Fragment>
  );
};
