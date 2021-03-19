import { useRef, Fragment, useContext, useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import { Tab } from "components/styledComponent/tab";
import { Tabs } from "components/styledComponent/tabs";
import { ClearCacheContext } from "cache";
import { GridCRUD, CRUDContextProvider, useStyles } from "pages_los/common";
import { queryClient, ClearCacheProvider } from "cache";
import { createRoleAssignmentContext } from "./context";

const TabPanel = ({ value, index, children }) => {
  return Number(value) === Number(index) ? children : null;
};

export const DetailsTabView = () => {
  const isDataEditedRef = useRef(false);
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
      <Tabs value={currentTab} onChange={handleChangeTab}>
        <Tab label="Role Assignment" id="0" />
        <Tab label="Team Assignment" id="1" />
      </Tabs>
      <Box py={2} className={classes.tabPanel}>
        <TabPanel value={currentTab} index="0" key={0}>
          <CRUDContextProvider
            {...createRoleAssignmentContext(
              "users/employee",
              "role",
              null,
              null
            )}
          >
            <GridCRUD isDataChangedRef={isDataEditedRef} />
          </CRUDContextProvider>
        </TabPanel>
        <TabPanel value={currentTab} index="1" key={1}>
          <CRUDContextProvider
            {...createRoleAssignmentContext(
              "users/employee",
              "team",
              null,
              null
            )}
          >
            <GridCRUD
              isDataChangedRef={isDataEditedRef}
              disableActions={["Add"]}
              setEditFormStateFromInitValues={(data) => {
                return { data };
              }}
            />
          </CRUDContextProvider>
        </TabPanel>
      </Box>
    </Fragment>
  );
};
