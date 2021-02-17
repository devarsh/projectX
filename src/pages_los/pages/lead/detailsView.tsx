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
import { LOSSDK } from "registry/fns/los";
import { CRUDContextProvider } from "pages_los/common/crud2";

import { useStyles } from "./style";

const TabPanel = ({ value, index, children }) => {
  return Number(value) === Number(index) ? children : null;
};

const crudAPIArgs = (moduleType, productType, refID) => ({
  insertFormData: {
    fn: LOSSDK.insertFormData,
    args: { moduleType, productType, refID },
  },
  checkFormDataExist: {
    fn: LOSSDK.checkFormDataExist,
    args: { moduleType, productType, refID },
  },
  deleteFormData: {
    fn: LOSSDK.deleteFormData,
    args: { moduleType, productType, refID },
  },
  updateFormData: {
    fn: LOSSDK.updateFormData,
    args: { moduleType, productType, refID },
  },
  getFormData: {
    fn: LOSSDK.getFormData,
    args: { moduleType, productType, refID },
  },
  getStaticGridData: {
    fn: LOSSDK.getStaticGridData,
    args: { moduleType, productType, refID },
  },
});

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
          <CRUDContextProvider {...crudAPIArgs(moduleType, "general", refID)}>
            <SimpleCRUD
              isProductEditedRef={isProductEditedRef}
              formMetaData={GeneralDetailsMetaData}
              dataAlwaysExists={true}
              closeDialog={undefined}
            />
          </CRUDContextProvider>
        </TabPanel>

        <TabPanel value={currentTab} index="1" key={1}>
          <CRUDContextProvider {...crudAPIArgs(moduleType, "bank", refID)}>
            <SimpleCRUD
              isProductEditedRef={isProductEditedRef}
              formMetaData={BankDetailsMetadata}
              dataAlwaysExists={false}
              closeDialog={undefined}
            />
          </CRUDContextProvider>
        </TabPanel>
        <TabPanel value={currentTab} index="2" key={2}>
          <CRUDContextProvider
            {...crudAPIArgs(moduleType, "management", refID)}
          >
            <GridCRUD
              isProductEditedRef={isProductEditedRef}
              formMetaData={ManagementInformationMetaData}
              gridMetaData={ManagementDetailsGridMetaData}
            />
          </CRUDContextProvider>
        </TabPanel>
        <TabPanel value={currentTab} index="3" key={3}>
          <CRUDContextProvider
            {...crudAPIArgs(moduleType, "collateral", refID)}
          >
            <SimpleCRUD
              isProductEditedRef={isProductEditedRef}
              formMetaData={CollateralDetailsMetaData}
              dataAlwaysExists={false}
              closeDialog={undefined}
            />
          </CRUDContextProvider>
        </TabPanel>
        <TabPanel value={currentTab} index="4" key={4}>
          <CRUDContextProvider {...crudAPIArgs(moduleType, "project", refID)}>
            <GridCRUD
              isProductEditedRef={isProductEditedRef}
              formMetaData={CollateralDetailsMetaData}
              gridMetaData={ProjectDetailsGridMetaData}
            />
          </CRUDContextProvider>
        </TabPanel>
        <TabPanel value={currentTab} index="5" key={5}>
          <CRUDContextProvider {...crudAPIArgs(moduleType, "financial", refID)}>
            <GridCRUD
              isProductEditedRef={isProductEditedRef}
              formMetaData={FinancialRatiosMetaData}
              gridMetaData={FinancialGridMetaData}
            />
          </CRUDContextProvider>
        </TabPanel>
      </Box>
    </Fragment>
  );
};
