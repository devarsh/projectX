import { useState, FC, Fragment, useEffect, useContext, Suspense } from "react";
import { Tab } from "components/styledComponent/tab";
import { Tabs } from "components/styledComponent/tabs";
import { useQuery } from "react-query";
import { queryClient, ClearCacheContext } from "cache";
import { API } from "pages_los/common/crud2";
import loaderGif from "assets/images/loader.gif";
import { CRUDComponentPicker } from "./crud";
import { useStyles } from "./style";

const TabPanel = ({ value, index, children }) => {
  return Number(value) === Number(index) ? children : null;
};

export const DetailsTabView: FC<{
  refID: string;
  moduleType: string;
  isDataChangedRef: any;
}> = ({ refID, moduleType, isDataChangedRef = { current: false } }) => {
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
    API.getCRUDTabsMetadata({ moduleType, refID })
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
    <span>{queryResult.error?.error_msg ?? "unknown error occured"}</span>
  ) : (
    <Fragment>
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
        <div className={classes.tabPanel}>
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
                secondaryProduct={one?.secondaryProductType}
                refID={refID}
                isDataChangedRef={isDataChangedRef}
                dataAlwaysExists={Boolean(one.dataAlwaysExists)}
                showDocuments={one?.document}
                disableCache={one?.disableCache}
                forRetail={one?.forRetail}
              />
            </TabPanel>
          ))}
        </div>
      </Suspense>
    </Fragment>
  );
  return result;
};
