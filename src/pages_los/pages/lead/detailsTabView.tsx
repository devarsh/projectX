import {
  useState,
  FC,
  Fragment,
  useEffect,
  useContext,
  lazy,
  Suspense,
} from "react";
import Box from "@material-ui/core/Box";
import { Tab } from "components/styledComponent/tab";
import { Tabs } from "components/styledComponent/tabs";
import { useQuery } from "react-query";
import { queryClient, ClearCacheContext } from "cache";
import { LOSSDK } from "registry/fns/los";
import { CRUDContextProvider, useStyles } from "pages_los/common/crud2";
import loaderGif from "assets/images/loader.gif";
import { HeaderDetails } from "./headerDetails";

const GridCRUD = lazy(() =>
  import("pages_los/common/crud2").then((module) => ({
    default: module.GridCRUD,
  }))
);
const SimpleCRUD = lazy(() =>
  import("pages_los/common/crud2").then((module) => ({
    default: module.SimpleCRUD,
  }))
);
const DocumentGridCRUD = lazy(() =>
  import("pages_los/common/documents").then((module) => ({
    default: module.DocumentGridCRUD,
  }))
);

const TabPanel = ({ value, index, children }) => {
  return Number(value) === Number(index) ? children : null;
};

const crudAPIArgs = (moduleType, productType, refID) => ({
  context: { moduleType, productType, refID },
  // call to save form data
  insertFormData: {
    fn: LOSSDK.insertFormData,
    args: { moduleType, productType, refID },
  },
  // to check if form data exist or not
  checkFormDataExist: {
    fn: LOSSDK.checkFormDataExist,
    args: { moduleType, productType, refID },
  },
  // delete record from the grid for a particular form record
  deleteFormData: {
    fn: LOSSDK.deleteFormData,
    args: { moduleType, productType, refID },
  },
  // update form data
  updateFormData: {
    fn: LOSSDK.updateFormData,
    args: { moduleType, productType, refID },
  },
  // get form data for (View and Edit)
  getFormData: {
    fn: LOSSDK.getFormData,
    args: { moduleType, productType, refID },
  },
  // get grid listing data
  getGridFormData: {
    fn: LOSSDK.getGridFormData,
    args: { moduleType, productType, refID },
  },
  // get form metaData for (new/view/edit)
  getFormMetaData: {
    fn: LOSSDK.getFormMetaData,
    args: { moduleType, productType, refID },
  },
  // get grid metaData
  getGridFormMetaData: {
    fn: LOSSDK.getGridFormMetaData,
    args: { moduleType, productType, refID },
  },
});

export const DetailsTabView: FC<{
  refID: string;
  moduleType: string;
  productGridData: any;
  isDataChangedRef: any;
  handleDialogClose: any;
  setSnackBarMessage?: any;
}> = ({
  refID,
  moduleType,
  productGridData,
  isDataChangedRef,
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
      <Suspense fallback={"loading..."}>
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
                    isDataChangedRef={isDataChangedRef}
                    dataAlwaysExists={Boolean(one.dataAlwaysExists)}
                  />
                </CRUDContextProvider>
              ) : one.componentType === "grid" ? (
                <CRUDContextProvider
                  {...crudAPIArgs(moduleType, one.productType, refID)}
                >
                  <GridCRUD
                    isDataChangedRef={isDataChangedRef}
                    showDocuments={one?.document}
                  />
                </CRUDContextProvider>
              ) : one.componentType === "document" ? (
                <DocumentGridCRUD refID={refID} moduleType={moduleType} />
              ) : null}
            </TabPanel>
          ))}
        </Box>
      </Suspense>
    </Fragment>
  );
  return result;
};
