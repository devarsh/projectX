import { useState, FC, Fragment, useEffect, useContext } from "react";
import Box from "@material-ui/core/Box";
import { Tab } from "components/styledComponent/tab";
import { Tabs } from "components/styledComponent/tabs";
import { queryClient } from "cache";
import { CRUD2 } from "pages_los/common/crud2";
import { Documents } from "pages_los/common/documents";
import { ClearCacheContext } from "cache";
import { HeaderDetails } from "./headerDetails";
import {
  BussinessDetailsMetadata,
  GeneralDetailsMetaData,
  ManagementInformationMetaData,
  CollateralDetailsMetaData,
} from "registry/metaData";

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
  const removeCache = useContext(ClearCacheContext);
  const [currentTab, setCurrentTab] = useState(0);
  const handleChangeTab = (_, currentTab) => {
    setCurrentTab(currentTab);
  };
  const classes = useStyles();
  const productInquiry = "lead";
  const productInquiryQuestion = "leadQuestion";
  const productAdditionalQuestion = "leadadditional";
  //Remove all the cached queries of all tabs when this component unmounts
  useEffect(() => {
    return () => {
      let entries = removeCache?.getEntries() as any[];
      entries.forEach((one) => {
        queryClient.removeQueries(one);
      });
    };
  }, [removeCache]);

  return (
    <Fragment>
      <HeaderDetails productData={productGridData} />
      <Tabs value={currentTab} onChange={handleChangeTab}>
        <Tab label="General Details" id="0" />
        <Tab label="Business Details" id="1" />
        <Tab label="Management Details" id="2" />
        <Tab label="Collateral Details" id="3" />
        <Tab label="Project Details" id="4" />
        <Tab label="Financial Details" id="5" />
      </Tabs>
      <Box py={2} className={classes.tabPanel}>
        <TabPanel value={currentTab} index="0" key={0}>
          <CRUD2
            refID={refID}
            productType={"general"}
            disableDialogCloseRef={disableDialogCloseRef}
            isProductEditedRef={isProductEditedRef}
            setSnackBarMessage={setSnackBarMessage}
            dataAlwaysExists={true}
            newMetaData={GeneralDetailsMetaData}
            editMetaData={GeneralDetailsMetaData}
            viewMetaData={GeneralDetailsMetaData}
          />
        </TabPanel>
        <TabPanel value={currentTab} index="1" key={1}>
          <CRUD2
            refID={refID}
            productType={"business"}
            disableDialogCloseRef={disableDialogCloseRef}
            isProductEditedRef={isProductEditedRef}
            setSnackBarMessage={setSnackBarMessage}
            dataAlwaysExists={true}
            newMetaData={BussinessDetailsMetadata}
            editMetaData={BussinessDetailsMetadata}
            viewMetaData={BussinessDetailsMetadata}
          />
        </TabPanel>
        <TabPanel value={currentTab} index="2" key={2}>
          <CRUD2
            refID={refID}
            productType={"management"}
            disableDialogCloseRef={disableDialogCloseRef}
            isProductEditedRef={isProductEditedRef}
            setSnackBarMessage={setSnackBarMessage}
            dataAlwaysExists={true}
            newMetaData={ManagementInformationMetaData}
            editMetaData={ManagementInformationMetaData}
            viewMetaData={ManagementInformationMetaData}
          />
        </TabPanel>
        <TabPanel value={currentTab} index="3" key={3}>
          <CRUD2
            refID={refID}
            productType={"collateral"}
            disableDialogCloseRef={disableDialogCloseRef}
            isProductEditedRef={isProductEditedRef}
            setSnackBarMessage={setSnackBarMessage}
            dataAlwaysExists={true}
            newMetaData={CollateralDetailsMetaData}
            editMetaData={CollateralDetailsMetaData}
            viewMetaData={CollateralDetailsMetaData}
          />
        </TabPanel>
        <TabPanel value={currentTab} index="4" key={4}>
          <CRUD2
            refID={refID}
            productType={"project"}
            disableDialogCloseRef={disableDialogCloseRef}
            isProductEditedRef={isProductEditedRef}
            setSnackBarMessage={setSnackBarMessage}
            dataAlwaysExists={true}
            newMetaData={CollateralDetailsMetaData}
            editMetaData={CollateralDetailsMetaData}
            viewMetaData={CollateralDetailsMetaData}
          />
        </TabPanel>
        <TabPanel value={currentTab} index="5" key={5}>
          <CRUD2
            refID={refID}
            productType={"financial"}
            disableDialogCloseRef={disableDialogCloseRef}
            isProductEditedRef={isProductEditedRef}
            setSnackBarMessage={setSnackBarMessage}
            dataAlwaysExists={true}
            newMetaData={CollateralDetailsMetaData}
            editMetaData={CollateralDetailsMetaData}
            viewMetaData={CollateralDetailsMetaData}
          />
        </TabPanel>
      </Box>
    </Fragment>
  );
};
