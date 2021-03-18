import { useRef, Fragment, useContext, useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import { Tab } from "components/styledComponent/tab";
import { Tabs } from "components/styledComponent/tabs";
import { ClearCacheContext } from "cache";
import { GridCRUD, CRUDContextProvider, useStyles } from "pages_los/common";
import * as API from "./api";
import { API as CRUD2API } from "pages_los/common/crud2";
import { queryClient, ClearCacheProvider } from "cache";

const TabPanel = ({ value, index, children }) => {
  return Number(value) === Number(index) ? children : null;
};

const roleAssignmentCrudAPIArgs = (
  moduleType,
  productType,
  refID,
  productCode
) => ({
  context: {
    moduleType,
    productType,
    refID,
    productCode,
  },
  insertFormData: {
    fn: API.insertData,
    args: { moduleType, productType, refID },
  },
  checkFormDataExist: {
    fn: CRUD2API.checkFormDataExist,
    args: { moduleType, productType, refID },
  },
  deleteFormData: {
    fn: API.deleteData,
    args: { moduleType, productType, refID },
  },
  updateFormData: {
    fn: API.updateData,
    args: { moduleType, productType, refID },
  },
  getFormData: {
    fn: API.getData,
    args: { moduleType, productType, refID },
  },
  getGridFormData: {
    fn: API.getGridData,
    args: { moduleType, productType, refID },
  },
  getFormMetaData: {
    fn: CRUD2API.getFormMetaData,
    args: { moduleType, productType, refID },
  },
  getGridFormMetaData: {
    fn: CRUD2API.getGridFormMetaData,
    args: { moduleType, productType, refID },
  },
});

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
      </Tabs>
      <Box py={2} className={classes.tabPanel}>
        <TabPanel value={currentTab} index="0" key={0}>
          <CRUDContextProvider
            {...roleAssignmentCrudAPIArgs("users/employee", "role", null, null)}
          >
            <GridCRUD isDataChangedRef={isDataEditedRef} />
          </CRUDContextProvider>
        </TabPanel>
      </Box>
    </Fragment>
  );
};

export const DetailsTabViewRoleAssignment = () => (
  <ClearCacheProvider>
    <DetailsTabView />
  </ClearCacheProvider>
);
