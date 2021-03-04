import { useRef, Fragment, useContext, useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import { Tab } from "components/styledComponent/tab";
import { Tabs } from "components/styledComponent/tabs";
import { ClearCacheContext } from "cache";
import { GridCRUD, CRUDContextProvider } from "pages_los/common/crud2";
import { LOSSDK } from "registry/fns/los";
import { queryClient, ClearCacheProvider } from "cache";

const TabPanel = ({ value, index, children }) => {
  return Number(value) === Number(index) ? children : null;
};

const bankCrudAPIArgs = (moduleType, productType, refID) => ({
  context: {
    moduleType,
    productType,
    refID,
  },
  insertFormData: {
    fn: LOSSDK.insertBankData,
    args: { moduleType, productType, refID },
  },
  checkFormDataExist: {
    fn: LOSSDK.checkFormDataExist,
    args: { moduleType, productType, refID },
  },
  deleteFormData: {
    fn: LOSSDK.deleteBankData,
    args: { moduleType, productType, refID },
  },
  updateFormData: {
    fn: LOSSDK.updateBankData,
    args: { moduleType, productType, refID },
  },
  getFormData: {
    fn: LOSSDK.getBankData,
    args: { moduleType, productType, refID },
  },
  getGridFormData: {
    fn: LOSSDK.getStaticBankGridData,
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

export const DetailsTabView = () => {
  const isDataEditedRef = useRef(false);
  const removeCache = useContext(ClearCacheContext);
  const [currentTab, setCurrentTab] = useState(0);
  const handleChangeTab = (_, currentTab) => {
    setCurrentTab(currentTab);
  };
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
      </Tabs>
      <Box py={2}>
        <TabPanel value={currentTab} index="0" key={0}>
          <CRUDContextProvider {...bankCrudAPIArgs("config/bank", "sme", null)}>
            <GridCRUD isDataChangedRef={isDataEditedRef} />
          </CRUDContextProvider>
        </TabPanel>
        <TabPanel value={currentTab} index="1" key={1}>
          <CRUDContextProvider
            {...bankCrudAPIArgs("config/bank", "infra", null)}
          >
            <GridCRUD isDataChangedRef={isDataEditedRef} />
          </CRUDContextProvider>
        </TabPanel>
      </Box>
    </Fragment>
  );
};

export const DetailsTabViewBank = () => (
  <ClearCacheProvider>
    <DetailsTabViewBank />
  </ClearCacheProvider>
);
