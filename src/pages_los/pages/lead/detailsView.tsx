import { useState, FC, Fragment, useEffect, useContext } from "react";
import Box from "@material-ui/core/Box";
import { Tab } from "components/styledComponent/tab";
import { Tabs } from "components/styledComponent/tabs";
import { useQuery } from "react-query";
import { queryClient, ClearCacheContext } from "cache";
import {
  GridCRUD,
  SimpleCRUD,
  CRUDContextProvider,
} from "pages_los/common/crud2";
import { DocumentGridCRUD } from "./documentsTab";
import { LOSSDK } from "registry/fns/los";
import { useStyles } from "./style";
import { HeaderDetails } from "./headerDetails";
import loaderGif from "assets/images/loader.gif";
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
  getFormMetaData: {
    fn: LOSSDK.getFormMetaData,
    args: { moduleType, productType, refID },
  },
  getGridFormMetaData: {
    fn: LOSSDK.getGridFormMetaData,
    args: { moduleType, productType, refID },
  },
});

export const DetailsView: FC<{
  refID: string;
  moduleType: string;
  productGridData: any;
  isProductEditedRef: any;
  handleDialogClose: any;
  setSnackBarMessage?: any;
}> = ({
  refID,
  moduleType,
  productGridData,
  isProductEditedRef,
  handleDialogClose,
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
      queryClient.removeQueries(["getCRUDTabsMetadata", moduleType, refID]);
    };
  }, [removeCache]);

  const queryResult = useQuery(
    ["getCRUDTabsMetadata", moduleType, refID],
    () => LOSSDK.getCRUDTabsMetadata({ moduleType, refID }),
    {
      cacheTime: 100000000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );
  let tabs: any[] = queryResult.data;
  if (queryResult.isSuccess) {
    if (!Array.isArray(tabs)) {
      tabs = [];
    } else {
      tabs = tabs.sort((a, b) =>
        a.sequence > b.sequence ? 1 : a.sequence < b.sequence ? -1 : 0
      );
    }
  }
  const result = queryResult.isLoading ? (
    <img src={loaderGif} alt="loader" width="50px" height="50px" />
  ) : queryResult.isError ? (
    //@ts-ignore
    queryResult.error?.error_msg ?? "unknown error occured"
  ) : (
    <Fragment>
      <HeaderDetails
        productData={productGridData}
        handleDialogClose={handleDialogClose}
      />
      <Tabs
        value={currentTab}
        onChange={handleChangeTab}
        variant="scrollable"
        scrollButtons="auto"
      >
        {tabs.map((one) => (
          <Tab key={one.sequence} label={one.label} id={`${one.sequence}`} />
        ))}
      </Tabs>
      <Box py={2} className={classes.tabPanel}>
        {tabs.map((one) => (
          <TabPanel
            value={currentTab}
            index={`${one.sequence}`}
            key={one.sequence}
          >
            {one.componentType === "simple" ? (
              <CRUDContextProvider
                {...crudAPIArgs(moduleType, one.productType, refID)}
              >
                <SimpleCRUD
                  isProductEditedRef={isProductEditedRef}
                  dataAlwaysExists={Boolean(one.dataAlwaysExists)}
                  closeDialog={undefined}
                  formState={{
                    refID,
                    moduleType,
                    productType: one.productType,
                  }}
                />
              </CRUDContextProvider>
            ) : one.componentType === "grid" ? (
              <CRUDContextProvider
                {...crudAPIArgs(moduleType, one.productType, refID)}
              >
                <GridCRUD
                  isProductEditedRef={isProductEditedRef}
                  refID={refID}
                />
              </CRUDContextProvider>
            ) : one.componentType === "document" ? (
              <DocumentGridCRUD refID={refID} moduleType={moduleType} />
            ) : null}
          </TabPanel>
        ))}
      </Box>
    </Fragment>
  );
  return result;
};
