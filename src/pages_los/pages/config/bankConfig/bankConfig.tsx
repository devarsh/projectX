import { useRef, Fragment, useContext, useState, useEffect } from "react";
import { Tab } from "components/styledComponent/tab";
import { Tabs } from "components/styledComponent/tabs";
import { ClearCacheContext } from "cache";
import { GridCRUD, CRUDContextProvider } from "pages_los/common";
import * as API from "./api";
import { API as CRUD2API } from "pages_los/common/crud2";
import { queryClient, ClearCacheProvider } from "cache";
import { useStyles } from "./style";

const TabPanel = ({ value, index, children }) => {
  return Number(value) === Number(index) ? children : null;
};

const bankCrudAPIArgs = (moduleType, productType, refID, productCode) => ({
  context: {
    moduleType,
    productType,
    refID,
    productCode,
  },
  insertFormData: {
    fn: API.insertBankData,
    args: { moduleType, productType, refID },
  },
  checkFormDataExist: {
    fn: CRUD2API.checkFormDataExist,
    args: { moduleType, productType, refID },
  },
  deleteFormData: {
    fn: API.deleteBankData,
    args: { moduleType, productType, refID },
  },
  updateFormData: {
    fn: API.updateBankData,
    args: { moduleType, productType, refID },
  },
  getFormData: {
    fn: API.getBankData,
    args: { moduleType, productType, refID },
  },
  getGridFormData: {
    fn: API.getGridBankData,
    args: { moduleType, productType, refID },
  },
  getFormMetaData: {
    fn: API.getFormMetaData,
    args: { moduleType, productType, refID },
  },
  getGridFormMetaData: {
    fn: API.getGridFormMetaData,
    args: { moduleType, productType, refID },
  },
});

const BankConfig = () => {
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
        <Tab label="SME" id="0" />
        <Tab label="Infra" id="1" />
        <Tab label="Retail-Home" id="2" />
        <Tab label="Retail-LAP" id="3" />
        <Tab label="Retail-LRD" id="4" />
        <Tab label="Retail-APF" id="5" />
        <Tab label="Unsecured" id="6" />
      </Tabs>
      <div className={classes.tabPanel}>
        <TabPanel value={currentTab} index="0" key={0}>
          <CRUDContextProvider
            {...bankCrudAPIArgs("config/bank", "sme", null, "12000002")}
          >
            <GridCRUD isDataChangedRef={isDataEditedRef} />
          </CRUDContextProvider>
        </TabPanel>
        <TabPanel value={currentTab} index="1" key={1}>
          <CRUDContextProvider
            {...bankCrudAPIArgs("config/bank", "infra", null, "12000003")}
          >
            <GridCRUD isDataChangedRef={isDataEditedRef} />
          </CRUDContextProvider>
        </TabPanel>
        <TabPanel value={currentTab} index="2" key={2}>
          <CRUDContextProvider
            {...bankCrudAPIArgs("config/bank", "retail", null, "12000001")}
          >
            <GridCRUD isDataChangedRef={isDataEditedRef} />
          </CRUDContextProvider>
        </TabPanel>
        <TabPanel value={currentTab} index="3" key={3}>
          <CRUDContextProvider
            {...bankCrudAPIArgs("config/bank", "retaillap", null, "12000001")}
          >
            <GridCRUD isDataChangedRef={isDataEditedRef} />
          </CRUDContextProvider>
        </TabPanel>
        <TabPanel value={currentTab} index="4" key={4}>
          <CRUDContextProvider
            {...bankCrudAPIArgs("config/bank", "retaillrd", null, "12000001")}
          >
            <GridCRUD isDataChangedRef={isDataEditedRef} />
          </CRUDContextProvider>
        </TabPanel>
        <TabPanel value={currentTab} index="5" key={5}>
          <CRUDContextProvider
            {...bankCrudAPIArgs("config/bank", "retailapf", null, "12000001")}
          >
            <GridCRUD isDataChangedRef={isDataEditedRef} />
          </CRUDContextProvider>
        </TabPanel>
        <TabPanel value={currentTab} index="6" key={6}>
          <CRUDContextProvider
            {...bankCrudAPIArgs("config/bank", "unsecured", null, "12000004")}
          >
            <GridCRUD isDataChangedRef={isDataEditedRef} />
          </CRUDContextProvider>
        </TabPanel>
      </div>
    </Fragment>
  );
};

export const BankConfigWrapper = () => (
  <ClearCacheProvider>
    <BankConfig />
  </ClearCacheProvider>
);
