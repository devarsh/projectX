import { useEffect, useRef, useState, useContext } from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import { ActionTypes } from "components/dataTable";
import { InvalidAction } from "pages_los/common/invalidAction";
import { ClearCacheContext, queryClient } from "cache";
import { StagesGrid } from "./grid";
import { StagesAPIProvider, generateStagesAPIContext } from "./context";
import { UpdatePriority } from "./updateStage";

const actions: ActionTypes[] = [
  {
    actionName: "stages",
    actionLabel: "Change Bank Stage",
    multiple: undefined,
    alwaysAvailable: true,
  },
];

export const BankStage = ({
  refID,
  branchID,
  isDataChangedRef,
  closeDialog,
  gridTitle,
}) => {
  const [currentAction, setCurrentAction] = useState<any>(null);
  const removeCache = useContext(ClearCacheContext);
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
  useEffect(() => {
    return () => {
      let entries = removeCache?.getEntries() as any[];
      entries.forEach((one) => {
        queryClient.removeQueries(one);
      });
    };
  }, [removeCache]);

  return (
    <StagesAPIProvider {...generateStagesAPIContext({ refID, branchID })}>
      <div style={{ display: "flex" }}>
        <div style={{ flexGrow: 1 }} />
        <Button onClick={closeDialog}>Close</Button>
      </div>
      <StagesGrid
        ref={gridRef}
        key="stagesGrid"
        actions={actions}
        setAction={setCurrentAction}
        gridTitle={gridTitle}
      />
      <Dialog open={Boolean(currentAction)} maxWidth="sm" fullWidth>
        {(currentAction?.name ?? "") === "stages" ? (
          <UpdatePriority
            closeDialog={closeMyDialog}
            isDataChangedRef={isMyDataChangedRef}
          />
        ) : (
          <InvalidAction closeDialog={closeMyDialog} />
        )}
      </Dialog>
    </StagesAPIProvider>
  );
};
