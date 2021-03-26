import { useState, FC, Fragment, useEffect, useContext, Suspense } from "react";
import Box from "@material-ui/core/Box";
import { Tab } from "components/styledComponent/tab";
import { Tabs } from "components/styledComponent/tabs";
import { ClearCacheContext, queryClient } from "cache";
import { useStyles } from "pages_los/common";
import { CRUD } from "./crud";

const TabPanel = ({ value, index, children }) => {
  return Number(value) === Number(index) ? children : null;
};

export const DetailsTabView: FC<{
  refID: string;
  moduleType: string;
  isDataChangedRef: any;
  handleDialogClose: any;
}> = ({ refID, moduleType, isDataChangedRef, handleDialogClose }) => {
  const removeCache = useContext(ClearCacheContext);
  const [currentTab, setCurrentTab] = useState(0);
  const handleChangeTab = (_, currentTab) => {
    setCurrentTab(currentTab);
  };
  const classes = useStyles();
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
      <Tabs value={currentTab} onChange={handleChangeTab}>
        <Tab label="Inquiry" id="0" />
        <Tab label="Questionnaire" id="1" />
      </Tabs>
      <Suspense fallback={"loading..."}>
        <Box py={2} className={classes.tabPanel}>
          <TabPanel value={currentTab} index="0" key={0}>
            <CRUD
              moduleType={moduleType}
              productType="main"
              refID={refID}
              dataAlwaysExists={true}
              isDataChangedRef={isDataChangedRef}
            />
          </TabPanel>
          <TabPanel value={currentTab} index="1" key={1}>
            <CRUD
              moduleType={moduleType}
              productType="question"
              refID={refID}
              dataAlwaysExists={false}
              isDataChangedRef={isDataChangedRef}
            />
          </TabPanel>
        </Box>
      </Suspense>
    </Fragment>
  );
};
