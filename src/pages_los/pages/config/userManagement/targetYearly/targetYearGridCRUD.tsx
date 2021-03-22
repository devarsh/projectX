import { useState, Fragment, useRef, useCallback } from "react";
import Dialog from "@material-ui/core/Dialog";
import { ActionTypes } from "components/dataTable";
import { MyGridWrapper } from "./gridWrapper";
import { DeleteAction } from "./delete";
// import { AddTargetYear } from "./addTarget";
import { InvalidAction } from "pages_los/common/invalidAction";

const actions: ActionTypes[] = [
  {
    actionName: "Add",
    actionLabel: "Add Taregt Year",
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

export const YearlyTargetGridCRUD = () => {
  const [currentAction, setCurrentAction] = useState<any>(null);
  const gridRef = useRef<any>(null);
  const dataChangedRef = useRef(false);
  const closeMyDialog = useCallback(() => {
    setCurrentAction(null);
    if (dataChangedRef.current === true) {
      gridRef.current?.refetch?.();
      dataChangedRef.current = false;
    }
  }, [setCurrentAction]);
  console.log(currentAction);
  return (
    <Fragment>
      <MyGridWrapper
        ref={gridRef}
        key={`yearlyTargetListing`}
        actions={actions}
        setAction={setCurrentAction}
      />
      <Dialog open={Boolean(currentAction)} maxWidth="xl">
        {
          // (currentAction?.name ?? "") === "Add" ? (
          //   <AddTargetYear
          //     onClose={closeMyDialog}
          //     editableFileName={false}
          //     dataChangedRef={dataChangedRef}
          //   />
          // ) :
          (currentAction?.name ?? "") === "Delete" ? (
            <DeleteAction
              serialNo={currentAction?.rows.map((one) => one?.data?.serialNo)}
              closeDialog={closeMyDialog}
              dataChangedRef={dataChangedRef}
            />
          ) : (
            <InvalidAction closeDialog={closeMyDialog} />
          )
        }
      </Dialog>
    </Fragment>
  );
};
