import { useState, FC, Fragment, useEffect, useContext, Suspense } from "react";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import { Tab } from "components/styledComponent/tab";
import { Tabs } from "components/styledComponent/tabs";
import { useQuery } from "react-query";
import { queryClient, ClearCacheContext } from "cache";
import { LOSSDK } from "registry/fns/los";
import { useStyles } from "pages_los/common";
import loaderGif from "assets/images/loader.gif";
import { HeaderDetails } from "../headerDetails";
import { CRUDComponentPicker } from "./crud";

const TabPanel = ({ value, index, children }) => {
  return Number(value) === Number(index) ? children : null;
};

export const DetailsTabView: FC<{
  refID: string;
  moduleType: string;
  productGridData: any;
  isDataChangedRef: any;
  handleDialogClose: any;
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
  }, [removeCache, moduleType, refID]);

  const queryResult = useQuery(["getCRUDTabsMetadata", moduleType, refID], () =>
    LOSSDK.getCRUDTabsMetadata({ moduleType, refID })
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
    <>
      <img src={loaderGif} alt="loader" width="50px" height="50px" />
      {typeof handleDialogClose === "function" ? (
        <div style={{ position: "absolute", right: 0, top: 0 }}>
          <IconButton onClick={handleDialogClose}>
            <HighlightOffOutlinedIcon />
          </IconButton>
        </div>
      ) : null}
    </>
  ) : queryResult.isError ? (
    <>
      {/* @ts-ignore */}
      <span>{queryResult.error?.error_msg ?? "unknown error occured"}</span>
      {typeof handleDialogClose === "function" ? (
        <div style={{ position: "absolute", right: 0, top: 0 }}>
          <IconButton onClick={handleDialogClose}>
            <HighlightOffOutlinedIcon />
          </IconButton>
        </div>
      ) : null}
    </>
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
              <CRUDComponentPicker
                componentType={one.componentType}
                productType={one.productType}
                moduleType={moduleType}
                refID={refID}
                isDataChangedRef={isDataChangedRef}
                dataAlwaysExists={Boolean(one.dataAlwaysExists)}
                showDocuments={one?.document}
              />
            </TabPanel>
          ))}
        </Box>
      </Suspense>
    </Fragment>
  );
  return result;
};
