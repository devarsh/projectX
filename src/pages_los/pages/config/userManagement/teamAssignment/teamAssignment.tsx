import { useRef, useState, Fragment, FC } from "react";
import Dialog from "@material-ui/core/Dialog";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { ActionTypes } from "components/dataTable";
import { FormViewEdit } from "pages_los/common/crud2/formViewEdit";
import { MyGridWrapper } from "pages_los/common/crud2/gridWrapper";
import { InvalidAction } from "pages_los/common/invalidAction";
import { CRUDContextProvider } from "pages_los/common";
import { createTeamAssignmentContext } from "./context";

const actions: ActionTypes[] = [
  {
    actionName: "View",
    actionLabel: "View Details",
    multiple: false,
    rowDoubleClick: true,
  },
];

export const TeamAssignment: FC<{
  isDataChangedRef: any;
  serialNo: any;
  closeDialog: any;
  setEditFormStateFromInitValues?: any;
}> = ({
  isDataChangedRef,
  serialNo,
  closeDialog,
  setEditFormStateFromInitValues,
}) => {
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
        {...createTeamAssignmentContext("users/employee", "team", serialNo)}
      >
        <MyGridWrapper
          ref={gridRef}
          key="grid"
          actions={actions}
          setAction={setCurrentAction}
        />
        <Dialog open={Boolean(currentAction)} maxWidth="xl">
          {(currentAction?.name ?? "") === "View" ? (
            <FormViewEdit
              isDataChangedRef={isMyDataChangedRef}
              closeDialog={closeMyDialog}
              serialNo={currentAction?.rows[0]?.id}
              setEditFormStateFromInitValues={setEditFormStateFromInitValues}
            />
          ) : (
            <InvalidAction closeDialog={closeMyDialog} />
          )}
        </Dialog>
      </CRUDContextProvider>
    </Fragment>
  );
};
