import { useState, useRef, Fragment, useEffect, useContext } from "react";
import { ClearCacheProvider, queryClient, ClearCacheContext } from "cache";
import { ActionTypes } from "components/dataTable";
import { useQuery } from "react-query";
import GridWrapper from "components/dataTableStatic";
import Dialog from "@material-ui/core/Dialog";
import { InvalidAction } from "pages_los/common/invalidAction";
import { AddBank } from "./addBank";
import { ViewEditBank } from "./viewEditBank";
import { DeleteBank } from "./deleteBank";
import { BankBranchMaster } from "./branchMst";
import { bankMasterGridMetaData } from "./metadata";
import * as API from "./api";

const actions: ActionTypes[] = [
  {
    actionName: "ViewBranch",
    actionLabel: "View Branches",
    multiple: false,
    rowDoubleClick: true,
  },
  {
    actionName: "EditBank",
    actionLabel: "Edit Details",
    multiple: false,
    rowDoubleClick: false,
  },
  {
    actionName: "DeleteBank",
    actionLabel: "Delete",
    multiple: false,
    rowDoubleClick: false,
  },
  {
    actionName: "AddBank",
    actionLabel: "Add Bank",
    multiple: undefined,
    rowDoubleClick: false,
    alwaysAvailable: true,
  },
];

export const BankMaster = () => {
  const [currentAction, setCurrentAction] = useState<null | any>(null);
  const removeCache = useContext(ClearCacheContext);
  const isDataChangedRef = useRef(false);
  const handleDialogClose = () => {
    setCurrentAction(null);
    if (isDataChangedRef.current === true) {
      isDataChangedRef.current = true;
      result?.refetch();
      isDataChangedRef.current = false;
    }
  };
  useEffect(() => {
    return () => {
      let entries = removeCache?.getEntries() as any[];
      entries.forEach((one) => {
        queryClient.removeQueries(one);
      });
      queryClient.removeQueries(["getGridData", "bank"]);
    };
  }, [removeCache]);

  const result = useQuery(["getGridData", "bank"], () =>
    API.getGridData({ moduleType: "bank" })
  );

  let selectedAction = currentAction?.name ?? "";

  return (
    <Fragment>
      <GridWrapper
        key={`staticGrid`}
        //@ts-ignore
        finalMetaData={bankMasterGridMetaData}
        data={result?.data ?? []}
        setData={() => null}
        actions={actions}
        setAction={setCurrentAction}
        defaultSortOrder={[{ id: "bankCode", desc: false }]}
        loading={result?.isLoading || result.isFetching}
      />
      <Dialog
        open={currentAction !== null}
        //@ts-ignore
        onClose={handleDialogClose}
        fullScreen={selectedAction === "ViewBranch" ? true : false}
        maxWidth="lg"
        PaperProps={{
          style:
            selectedAction.indexOf("AddBank", "ViewDetails") >= 0
              ? { width: "100%", height: "50%" }
              : {},
        }}
      >
        {selectedAction === "AddBank" ? (
          <Fragment>
            <AddBank
              moduleType="bank"
              isDataChangedRef={isDataChangedRef}
              closeDialog={handleDialogClose}
            />
          </Fragment>
        ) : selectedAction === "EditBank" ? (
          <Fragment>
            <ViewEditBank
              bankCode={currentAction?.rows[0].id}
              moduleType="bank"
              isDataChangedRef={isDataChangedRef}
              closeDialog={handleDialogClose}
              readOnly={false}
            />
          </Fragment>
        ) : selectedAction === "DeleteBank" ? (
          <Fragment>
            <DeleteBank
              bankCode={currentAction?.rows.map((one) => one.id)}
              moduleType="bank"
              closeDialog={handleDialogClose}
              isDataChangedRef={isDataChangedRef}
            />
          </Fragment>
        ) : selectedAction === "ViewBranch" ? (
          <Fragment>
            <BankBranchMaster
              closeDialog={handleDialogClose}
              bankCode={currentAction?.rows[0].id}
              bankName={currentAction?.rows[0].data?.bankName}
            />
          </Fragment>
        ) : (
          <InvalidAction closeDialog={handleDialogClose} />
        )}
      </Dialog>
    </Fragment>
  );
};

export const BankMasterWrapper = () => (
  <ClearCacheProvider>
    <BankMaster />
  </ClearCacheProvider>
);
