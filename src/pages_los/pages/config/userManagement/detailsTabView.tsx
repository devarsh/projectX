import { useRef, Fragment, useContext, useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import { ClearCacheContext } from "cache";
import { GridCRUD, CRUDContextProvider, useStyles } from "pages_los/common";
import { queryClient, ClearCacheProvider } from "cache";
import { createRoleAssignmentContext } from "./context";

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
      <Box py={2} className={classes.tabPanel}>
        <CRUDContextProvider
          {...createRoleAssignmentContext("users/employee", "role", null, null)}
        >
          <GridCRUD isDataChangedRef={isDataEditedRef} />
        </CRUDContextProvider>
      </Box>
    </Fragment>
  );
};
