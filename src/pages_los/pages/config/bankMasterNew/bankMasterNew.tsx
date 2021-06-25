import { useState, useRef, Fragment } from "react";
import Dialog from "@material-ui/core/Dialog";
import * as API from "pages_los/pages/config/bankMasterNew/bankMaster/api";
import { ClearCacheProvider } from "cache";
import { Transition } from "pages_los/common";
import { BankBranchMaster } from "pages_los/pages/config/bankBranchMaster";
import { BankMaster } from "./bankMaster";
import { BankMasterViewEdit } from "./bankMaster/viewEditBankMaster";
import { DeleteAction } from "./bankMaster/deleteBankMaster";
import { InvalidAction } from "pages_los/common/invalidAction";
import GridWrapper from "components/dataTableStatic";
import { bankMasterGridMetaData } from "./bankMaster/metadata/grid";
import { useQuery } from "react-query";
import { ActionTypes } from "components/dataTable";

const actions: ActionTypes[] = [
  {
    actionName: "ViewDetails",
    actionLabel: "View Details",
    multiple: false,
    rowDoubleClick: true,
  },
  {
    actionName: "Delete",
    actionLabel: "Delete",
    multiple: false,
    rowDoubleClick: false,
  },
  {
    actionName: "AddBranch",
    actionLabel: "Add Branch",
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

export const BankMasterNew = () => {
  const [currentAction, setCurrentAction] = useState<null | any>(null);
  const isDataChangedRef = useRef(false);
  const handleDialogClose = () => {
    setCurrentAction(null);
    if (isDataChangedRef.current === true) {
      isDataChangedRef.current = true;
      result?.refetch();
      isDataChangedRef.current = false;
    }
  };

  const result = useQuery(["getGridData"], () =>
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
      />
      <Dialog
        fullScreen={
          ["ViewDetails", "AddBank", "AddBranch"].indexOf(
            currentAction?.name
          ) >= 0
            ? true
            : false
        }
        open={currentAction !== null}
        //@ts-ignore
        TransitionComponent={Transition}
        onClose={handleDialogClose}
        maxWidth="md"
        PaperProps={{
          style:
            selectedAction.indexOf("AddBank") >= 0 ||
            selectedAction === "ViewDetails"
              ? { width: "100%", height: "100%" }
              : selectedAction === "Delete"
              ? { width: "40%", height: "20%" }
              : {},
        }}
      >
        <ClearCacheProvider>
          {(currentAction?.name ?? "") === "AddBank" ? (
            <Fragment>
              <BankMaster
                moduleType="bank"
                isDataChangedRef={isDataChangedRef}
                closeDialog={handleDialogClose}
              />
            </Fragment>
          ) : (currentAction?.name ?? "") === "ViewDetails" ? (
            <Fragment>
              <BankMasterViewEdit
                bankCode={currentAction?.rows[0].id}
                moduleType="bank"
                isDataChangedRef={isDataChangedRef}
                closeDialog={handleDialogClose}
                readOnly={false}
                disableCache={true}
              />
            </Fragment>
          ) : (currentAction?.name ?? "") === "Delete" ? (
            <Fragment>
              <DeleteAction
                bankCode={currentAction?.rows.map((one) => one.id)}
                moduleType="bank"
                closeDialog={handleDialogClose}
                isDataChangedRef={isDataChangedRef}
              />
            </Fragment>
          ) : (currentAction?.name ?? "") === "AddBranch" ? (
            <Fragment>
              <BankBranchMaster closeDialog={handleDialogClose} />
            </Fragment>
          ) : (
            <InvalidAction closeDialog={handleDialogClose} />
          )}
        </ClearCacheProvider>
      </Dialog>
    </Fragment>
  );
};
