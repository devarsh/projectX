import { useState, FC, Fragment, useEffect, useContext } from "react";
import Box from "@material-ui/core/Box";
import { Tab } from "components/styledComponent/tab";
import { Tabs } from "components/styledComponent/tabs";
import { queryClient } from "cache";
import { CRUD } from "pages_los/common/crud";
import { Documents } from "pages_los/common/documents";
import { RemoveCacheRegisterContext } from "pages_los/common/removeCacheRegisterContext";
import { HeaderDetails } from "./headerDetails";

import { useStyles } from "./style";

const TabPanel = ({ value, index, children }) => {
  return Number(value) === Number(index) ? children : null;
};

export const DetailsView: FC<{
  productGridData: any;
  refID: string;
  disableDialogCloseRef: any;
  isProductEditedRef: any;
  handleDialogClose: any;
  setSnackBarMessage: any;
}> = ({
  refID,
  disableDialogCloseRef,
  isProductEditedRef,
  productGridData,
  handleDialogClose,
  setSnackBarMessage,
}) => {
  const removeCache = useContext(RemoveCacheRegisterContext);
  const [currentTab, setCurrentTab] = useState(0);
  const handleChangeTab = (_, currentTab) => {
    setCurrentTab(currentTab);
  };
  const classes = useStyles();
  const productInquiry = "inquiry";
  const productInquiryQuestion = "inquiryQuestion";
  const productAdditionalQuestion = "additionalQuestion";
  //Remove all the cached queries of all tabs when this component unmounts
  useEffect(() => {
    return () => {
      let entries = removeCache?.getEntries() as any[];
      entries.forEach((one) => {
        queryClient.removeQueries(one);
      });
    };
  }, []);

  return (
    <Fragment>
      <HeaderDetails productData={productGridData} />
      <Tabs value={currentTab} onChange={handleChangeTab}>
        <Tab label="Inquiry" id="0" />
        <Tab label="Questionnaire" id="1" />
        <Tab label="Additional Questions" id="2" />
        <Tab label="Documents" id="3" />
        <Tab label="Customer" id="4" />
      </Tabs>
      <Box py={2} className={classes.tabPanel}>
        <TabPanel value={currentTab} index="0" key={0}>
          <CRUD
            refID={refID}
            productType={productInquiry}
            disableDialogCloseRef={disableDialogCloseRef}
            isProductEditedRef={isProductEditedRef}
            setSnackBarMessage={setSnackBarMessage}
            dataAlwaysExists={true}
          />
        </TabPanel>
        <TabPanel value={currentTab} index="1" key={1}>
          <CRUD
            refID={refID}
            productType={productInquiryQuestion}
            disableDialogCloseRef={disableDialogCloseRef}
            isProductEditedRef={isProductEditedRef}
            setSnackBarMessage={setSnackBarMessage}
            dataAlwaysExists={false}
          />
        </TabPanel>
        <TabPanel value={currentTab} index="2" key={2}>
          <CRUD
            refID={refID}
            productType={productAdditionalQuestion}
            disableDialogCloseRef={disableDialogCloseRef}
            isProductEditedRef={isProductEditedRef}
            setSnackBarMessage={setSnackBarMessage}
            dataAlwaysExists={false}
          />
        </TabPanel>
        <TabPanel value={currentTab} index="3" key={3}>
          <Documents
            refID={refID}
            productType={productInquiry}
            disableDialogCloseRef={disableDialogCloseRef}
            isProductEditedRef={isProductEditedRef}
            setSnackBarMessage={setSnackBarMessage}
          />
        </TabPanel>
      </Box>
    </Fragment>
  );
};
