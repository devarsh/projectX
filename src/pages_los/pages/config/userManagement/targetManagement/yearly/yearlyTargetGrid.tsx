import { Fragment, FC, useState, useRef } from "react";
import Dialog from "@material-ui/core/Dialog";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { ActionTypes } from "components/dataTable";
import { MyGridWrapper } from "pages_los/common/crud2/gridWrapper";
import { FormNew } from "./formNew";
import { InvalidAction } from "pages_los/common/invalidAction";
import { CRUDContextProvider } from "pages_los/common";
import { TargetAPICrudProviderGenerator } from "./context";
import { MonthlyTargetGrid } from "../monthly";
import { FormViewEdit } from "./formViewEdit";
import { DeleteAction } from "pages_los/common/crud2/delete";

const actions: ActionTypes[] = [
  {
    actionName: "Add",
    actionLabel: "Add Yearly Target",
    multiple: undefined,
    alwaysAvailable: true,
  },
  {
    actionName: "Delete",
    actionLabel: "Delete Target",
    multiple: true,
  },
  {
    actionName: "View",
    actionLabel: "Update Target",
    multiple: false,
    rowDoubleClick: true,
  },
  {
    actionName: "Monthly",
    actionLabel: "Monthly Target Details",
    multiple: false,
  },
];

export const YearlyTargetGrid: FC<{
  isDataChangedRef: any;
  closeDialog?: any;
  userID?: string;
  setEditFormStateFromInitValues?: any;
}> = ({ isDataChangedRef, closeDialog, userID }) => {
  const [currentAction, setCurrentAction] = useState<any>(null);
  const gridRef = useRef<any>(null);
  const isMyDataChangedRef = useRef(false);
  const closeMyDialog = () => {
    setCurrentAction(null);
    if (isMyDataChangedRef.current === true) {
      isDataChangedRef.current = true;
      gridRef.current?.refetch?.();
      isMyDataChangedRef.current = false;
    }
  };

  return (
    <Fragment>
      <Box display="flex">
        <Box flexGrow={1} />
        <Button onClick={closeDialog}>Close</Button>
      </Box>
      <CRUDContextProvider
        {...TargetAPICrudProviderGenerator(
          "users/employee",
          "yearlyTarget",
          userID
        )}
      >
        <MyGridWrapper
          ref={gridRef}
          key="grid"
          actions={actions}
          setAction={setCurrentAction}
        />
        <Dialog
          open={Boolean(currentAction)}
          maxWidth="xl"
          PaperProps={{ style: { width: "100%", height: "100%" } }}
        >
          {(currentAction?.name ?? "") === "Add" ? (
            <FormNew
              successAction={closeMyDialog}
              cancelAction={closeMyDialog}
              isDataChangedRef={isMyDataChangedRef}
            />
          ) : (currentAction?.name ?? "") === "Monthly" ? (
            <MonthlyTargetGrid
              serialNo={currentAction?.rows[0]?.id}
              closeDialog={closeMyDialog}
              isDataChangedRef={isMyDataChangedRef}
            />
          ) : (currentAction?.name ?? "") === "View" ? (
            <FormViewEdit
              serialNo={currentAction?.rows[0]?.id}
              closeDialog={closeMyDialog}
              isDataChangedRef={isMyDataChangedRef}
            />
          ) : (currentAction?.name ?? "") === "Delete" ? (
            <DeleteAction
              serialNo={currentAction?.rows.map((one) => one.id)}
              closeDialog={closeMyDialog}
              isDataChangedRef={isMyDataChangedRef}
            />
          ) : (
            <InvalidAction closeDialog={closeMyDialog} />
          )}
        </Dialog>
      </CRUDContextProvider>
    </Fragment>
  );
};
