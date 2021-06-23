import { useRef, useContext, useEffect } from "react";
import * as API from "./api";
import { API as CRUD2API } from "pages_los/common/crud2";
import { ClearCacheContext, ClearCacheProvider, queryClient } from "cache";
import { CRUDContextProvider, GridCRUD } from "pages_los/common";

const bankMasterCrudAPIArgs = (
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
    fn: API.insertBankMasterData,
    args: { moduleType, productType, refID },
  },
  checkFormDataExist: {
    fn: CRUD2API.checkFormDataExist,
    args: { moduleType, productType, refID },
  },
  deleteFormData: {
    fn: API.deleteBankMasterData,
    args: { moduleType, productType, refID },
  },
  updateFormData: {
    fn: API.updateBankMasterData,
    args: { moduleType, productType, refID },
  },
  getFormData: {
    fn: API.getFormData,
    args: { moduleType, productType, refID },
  },
  getGridFormData: {
    fn: API.getGridData,
    args: { moduleType, productType, refID },
  },
  getFormMetaData: {
    fn: API.getFormMetaData,
    args: { moduleType, productType, refID },
  },
  getGridFormMetaData: {
    fn: API.getGridMetaData,
    args: { moduleType, productType, refID },
  },
});

export const BankMaster = () => {
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
    <CRUDContextProvider {...bankMasterCrudAPIArgs("bank", null, null, null)}>
      <GridCRUD isDataChangedRef={isDataEditedRef} />
    </CRUDContextProvider>
  );
};

export const BankMasterWrapper = () => (
  <ClearCacheProvider>
    <BankMaster />
  </ClearCacheProvider>
);
