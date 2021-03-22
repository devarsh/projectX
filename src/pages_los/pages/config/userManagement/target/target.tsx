import { Fragment, FC, useState, useRef } from "react";
import Dialog from "@material-ui/core/Dialog";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { ActionTypes } from "components/dataTable";
import { MyGridWrapper } from "pages_los/common/crud2/gridWrapper";
import { FormNew } from "pages_los/common/crud2/formNew";
import { FormViewEdit } from "pages_los/common/crud2/formViewEdit";
import { DeleteAction } from "pages_los/common/crud2/delete";
import { InvalidAction } from "pages_los/common/invalidAction";
import { CRUDContextProvider } from "pages_los/common";
import { TargetAPICrudProviderGenerator } from "./context";

const actions: ActionTypes[] = [
  {
    actionName: "Add",
    actionLabel: "Add Yearly Target",
    multiple: undefined,
    alwaysAvailable: true,
  },
  {
    actionName: "Delete",
    actionLabel: "Delete",
    multiple: true,
  },
  {
    actionName: "Update",
    actionLabel: "Update",
    multiple: false,
  },
];

export const Target: FC<{
  isDataChangedRef: any;
  closeDialog?: any;
  serialNo?: string;
  setEditFormStateFromInitValues?: any;
}> = ({ isDataChangedRef, closeDialog, serialNo }) => {
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
          serialNo
        )}
      >
        <MyGridWrapper
          ref={gridRef}
          key="grid"
          actions={actions}
          setAction={setCurrentAction}
        />
        <Dialog open={Boolean(currentAction)} maxWidth="xl">
          {(currentAction?.name ?? "") === "Add" ? (
            <FormNew
              successAction={closeMyDialog}
              cancelAction={closeMyDialog}
              isDataChangedRef={isMyDataChangedRef}
            />
          ) : (currentAction?.name ?? "") === "View" ? (
            <FormViewEdit
              isDataChangedRef={isMyDataChangedRef}
              closeDialog={closeMyDialog}
              serialNo={currentAction?.rows[0]?.id}
              setEditFormStateFromInitValues={(initialValues) => {
                const { userID } = initialValues;
                return { userID };
              }}
            />
          ) : (currentAction?.name ?? "") === "Delete" ? (
            <DeleteAction
              serialNo={currentAction?.rows.map((one) => one?.data?.serialNo)}
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
