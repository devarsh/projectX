import { Fragment, FC, useState, useRef } from "react";
import Dialog from "@material-ui/core/Dialog";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { ActionTypes } from "components/dataTable";
import { MyGridWrapper } from "pages_los/common/crud2/gridWrapper";
import { FormViewEdit } from "pages_los/common/crud2/formViewEdit";
import { InvalidAction } from "pages_los/common/invalidAction";
import { CRUDContextProvider } from "pages_los/common";
import { TargetAPICrudProviderGenerator } from "./context";

const actions: ActionTypes[] = [
  {
    actionName: "View",
    actionLabel: "Update Monthly Target",
    multiple: false,
    rowDoubleClick: true,
  },
];

export const MonthlyTargetGrid: FC<{
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
          "monthlyTarget",
          serialNo
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
          {(currentAction?.name ?? "") === "View" ? (
            <FormViewEdit
              isDataChangedRef={isMyDataChangedRef}
              closeDialog={closeMyDialog}
              serialNo={currentAction?.rows[0]?.id} //lineNO
            />
          ) : (
            <InvalidAction closeDialog={closeMyDialog} />
          )}
        </Dialog>
      </CRUDContextProvider>
    </Fragment>
  );
};
