import { useState, FC, Fragment, useEffect, useContext } from "react";
import Box from "@material-ui/core/Box";
import { Tab } from "components/styledComponent/tab";
import { Tabs } from "components/styledComponent/tabs";
import { queryClient } from "cache";
import { ClearCacheContext } from "cache";
import { HeaderDetails } from "./headerDetails";
import {
  BankDetailsMetadata,
  GeneralDetailsMetaData,
  ManagementInformationMetaData,
  CollateralDetailsMetaData,
  FinancialRatiosMetaData,
} from "registry/metaData";
import {
  FinancialGridMetaData,
  ManagementDetailsGridMetaData,
  ProjectDetailsGridMetaData,
} from "registry/metaData/grid";
import { GridCRUD, SimpleCRUD } from "pages_los/common/crud2";

import { useStyles } from "./style";

const TabPanel = ({ value, index, children }) => {
  return Number(value) === Number(index) ? children : null;
};

export const DetailsView: FC<{
  refID: string;
  moduleType: string;
  productGridData: any;
  isProductEditedRef: any;
  handleDialogClose: any;
  setSnackBarMessage: any;
}> = ({
  refID,
  moduleType,
  productGridData,
  isProductEditedRef,
  handleDialogClose,
  setSnackBarMessage,
}) => {
  const removeCache = useContext(ClearCacheContext);
  const [currentTab, setCurrentTab] = useState(0);
  const handleChangeTab = (_, currentTab) => {
    setCurrentTab(currentTab);
  };
  const classes = useStyles();
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
      <HeaderDetails
        productData={productGridData}
        handleDialogClose={handleDialogClose}
      />
      <Tabs value={currentTab} onChange={handleChangeTab}>
        <Tab label="General Details" id="0" />
        <Tab label="Bank Details" id="1" />
        <Tab label="Management Details" id="2" />
        <Tab label="Collateral Details" id="3" />
        <Tab label="Project Details" id="4" />
        <Tab label="Financial Details" id="5" />
      </Tabs>
      <Box py={2} className={classes.tabPanel}>
        <TabPanel value={currentTab} index="0" key={0}>
          <SimpleCRUD
            refID={refID}
            moduleType={moduleType}
            productType={"general"}
            isProductEditedRef={isProductEditedRef}
            formMetaData={GeneralDetailsMetaData}
            dataAlwaysExists={true}
            closeDialog={undefined}
          />
        </TabPanel>
        <TabPanel value={currentTab} index="1" key={1}>
          <SimpleCRUD
            refID={refID}
            moduleType={moduleType}
            productType={"bank"}
            isProductEditedRef={isProductEditedRef}
            formMetaData={BankDetailsMetadata}
            dataAlwaysExists={true}
            closeDialog={undefined}
          />
        </TabPanel>
        <TabPanel value={currentTab} index="2" key={2}>
          <GridCRUD
            refID={refID}
            moduleType={moduleType}
            productType={"management"}
            isProductEditedRef={isProductEditedRef}
            formMetaData={ManagementInformationMetaData}
            gridMetaData={ManagementDetailsGridMetaData}
          />
        </TabPanel>
        <TabPanel value={currentTab} index="3" key={3}>
          <SimpleCRUD
            refID={refID}
            moduleType={moduleType}
            productType={"collateral"}
            isProductEditedRef={isProductEditedRef}
            formMetaData={CollateralDetailsMetaData}
            dataAlwaysExists={true}
            closeDialog={undefined}
          />
        </TabPanel>
        <TabPanel value={currentTab} index="4" key={4}>
          <GridCRUD
            refID={refID}
            moduleType={moduleType}
            productType={"project"}
            isProductEditedRef={isProductEditedRef}
            formMetaData={CollateralDetailsMetaData}
            gridMetaData={ProjectDetailsGridMetaData}
          />
        </TabPanel>
        <TabPanel value={currentTab} index="5" key={5}>
          <GridCRUD
            refID={refID}
            moduleType={moduleType}
            productType={"financial"}
            isProductEditedRef={isProductEditedRef}
            formMetaData={FinancialRatiosMetaData}
            gridMetaData={FinancialGridMetaData}
          />
        </TabPanel>
      </Box>
    </Fragment>
  );
};
