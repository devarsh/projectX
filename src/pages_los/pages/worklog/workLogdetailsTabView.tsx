import { useRef, useContext, useEffect } from "react";
import { ClearCacheContext } from "cache";
import { GridCRUD, CRUDContextProvider } from "pages_los/common";
import * as API from "./api";
import { API as CRUD2API } from "pages_los/common/crud2";
import { queryClient, ClearCacheProvider } from "cache";

const worklogCrudAPIArgs = (moduleType, productType, refID, productCode) => ({
  context: {
    moduleType,
    productType,
    refID,
    productCode,
  },
  insertFormData: {
    fn: API.insertWorkLogData,
    args: { moduleType, productType, refID },
  },
  checkFormDataExist: {
    fn: CRUD2API.checkFormDataExist,
    args: { moduleType, productType, refID },
  },
  deleteFormData: {
    fn: API.deleteWorkLogData,
    args: { moduleType, productType, refID },
  },
  updateFormData: {
    fn: API.updateWorkLogData,
    args: { moduleType, productType, refID },
  },
  getFormData: {
    fn: API.getWorkLogData,
    args: { moduleType, productType, refID },
  },
  getGridFormData: {
    fn: API.getGridWorkLogData,
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

export const DetailsTabView = () => {
  const isDataEditedRef = useRef(false);
  const removeCache = useContext(ClearCacheContext);
  useEffect(() => {
    return () => {
      let entries = removeCache?.getEntries() as any[];
      entries.forEach((one) => {
        queryClient.removeQueries(one);
      });
    };
  }, [removeCache]);

  return (
    <CRUDContextProvider {...worklogCrudAPIArgs("worklog", null, null, null)}>
      <GridCRUD isDataChangedRef={isDataEditedRef} />
    </CRUDContextProvider>
  );
};

export const WorkLogDetailsTabView = () => (
  <ClearCacheProvider>
    <DetailsTabView />
  </ClearCacheProvider>
);
