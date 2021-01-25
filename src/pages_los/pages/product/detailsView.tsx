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
import { ref } from "yup";

const TabPanel = ({ value, index, children }) => {
  return Number(value) === Number(index) ? children : null;
};

export const DetailsView: FC<{
  productGridData: any;
  refID: string;
  setDisableDialogClose: any;
  isProductEditedRef: any;
}> = ({
  refID,
  setDisableDialogClose,
  isProductEditedRef,
  productGridData,
}) => {
  const [currentTab, setCurrentTab] = useState(0);
  const handleChangeTab = (_, currentTab) => {
    setCurrentTab(currentTab);
  };
  const classes = useStyles();
  const productInquiry = "inquiry";
  const productInquiryQuestion = "inquiryQuestion";
  //Remove all the cached queries of all tabs when this component unmounts
  useEffect(() => {
    return () => {
      queryClient.removeQueries([
        "getDocumentListingTemplate",
        productInquiry,
        refID,
      ]);
      queryClient.removeQueries(["getDocumentsList", productInquiry, refID]);
      queryClient.removeQueries(["getEditMetaData", productInquiry, refID]);
      queryClient.removeQueries(["getEditData", productInquiry, refID]);
      queryClient.removeQueries(["getViewMetaData", productInquiry, refID]);
      queryClient.removeQueries(["getViewData", productInquiry, refID]);
      queryClient.removeQueries([
        "getEditMetaData",
        productInquiryQuestion,
        refID,
      ]);
      queryClient.removeQueries(["getEditData", productInquiryQuestion, refID]);
      queryClient.removeQueries([
        "getViewMetaData",
        productInquiryQuestion,
        refID,
      ]);
      queryClient.removeQueries(["getViewData", productInquiryQuestion, refID]);
    };
  }, []);

  return (
    <Fragment>
      <HeaderDetails productData={productGridData} />
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
            refID={refID}
            productType={productInquiry}
            setDisableDialogClose={setDisableDialogClose}
            isProductEditedRef={isProductEditedRef}
          />
        </TabPanel>
        <TabPanel value={currentTab} index="1" key={1}>
          <CRUD
            refID={refID}
            productType={productInquiryQuestion}
            setDisableDialogClose={setDisableDialogClose}
            isProductEditedRef={isProductEditedRef}
          />
        </TabPanel>
        <TabPanel value={currentTab} index="2" key={2}>
          <Documents refID={refID} productType={productInquiry} />
        </TabPanel>
        <TabPanel value={currentTab} index="3" key={3}>
          <CustomerDetails refID={refID} productType={productInquiry} />
        </TabPanel>
        <TabPanel value={currentTab} index="4" key={4}>
          <MoveInquiryToLead refID={refID} />
        </TabPanel>
      </Box>
    </Fragment>
  );
};
