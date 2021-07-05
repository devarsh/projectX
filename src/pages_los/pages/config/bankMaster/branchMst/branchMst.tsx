import { useRef, useContext, useEffect, useState, FC } from "react";
import * as API from "./api";
import { API as CRUD2API } from "pages_los/common/crud2";
import { ClearCacheContext, ClearCacheProvider, queryClient } from "cache";
import { CRUDContextProvider, GridCRUD } from "pages_los/common";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";

interface BankBranchFnType {
  closeDialog: any;
  bankCode: string;
  bankName: string;
}

const BranchMasterCrudAPIArgs = (moduleType, refID) => ({
  context: {
    moduleType,
    refID,
  },
  insertFormData: {
    fn: API.insertBranchData,
    args: { moduleType, refID },
  },
  checkFormDataExist: {
    fn: CRUD2API.checkFormDataExist,
    args: { moduleType, refID },
  },
  deleteFormData: {
    fn: API.deleteBranchData,
    args: { moduleType, refID },
  },
  updateFormData: {
    fn: API.updateBranchData,
    args: { moduleType, refID },
  },
  getFormData: {
    fn: API.getFormData,
    args: { moduleType, refID },
  },
  getGridFormData: {
    fn: API.getGridData,
    args: { moduleType, refID },
  },
  getFormMetaData: {
    fn: API.getFormMetaData,
    args: { moduleType, refID },
  },
  getGridFormMetaData: {
    fn: API.getGridMetaData,
    args: { moduleType, refID },
  },
});

export const BankBranchMaster = ({ bankCode }) => {
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
    <div>
      <CRUDContextProvider
        {...BranchMasterCrudAPIArgs("bank-branch", bankCode)}
      >
        <GridCRUD isDataChangedRef={isDataEditedRef} />
      </CRUDContextProvider>
    </div>
  );
};

export const BankBranchMasterWrapper: FC<BankBranchFnType> = ({
  closeDialog,
  bankCode,
  bankName,
}) => (
  <ClearCacheProvider>
    <AppBar position="relative" color="secondary">
      <Toolbar>
        <Typography component="h3" variant="h6">
          Bank: {bankName}
        </Typography>
        <div style={{ flexGrow: 1 }} />
        <Button onClick={closeDialog}>Close</Button>
      </Toolbar>
    </AppBar>
    <BankBranchMaster bankCode={bankCode} />
  </ClearCacheProvider>
);
