import { useEffect, useRef, useState, useContext } from "react";
import Dialog from "@material-ui/core/Dialog";
import { ActionTypes } from "components/dataTable";
import { InvalidAction } from "pages_los/common/invalidAction";
import { ClearCacheContext, queryClient } from "cache";
import { PriorityGrid } from "./grid";
import { PriorityAPIProvider, generatePriorityAPIContext } from "./context";
import { UpdatePriority } from "./updatePriorirty";

const actions: ActionTypes[] = [
  {
    actionName: "priority",
    actionLabel: "Change Priority",
    multiple: undefined,
    alwaysAvailable: true,
  },
];

export const Priority = ({ refID, moduleType, isDataChangedRef }) => {
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
    <PriorityAPIProvider {...generatePriorityAPIContext({ refID, moduleType })}>
      <PriorityGrid
        ref={gridRef}
        key="grid"
        actions={actions}
        setAction={setCurrentAction}
      />
      <Dialog
        open={Boolean(currentAction)}
        maxWidth="sm"
        PaperProps={{ style: { height: "100%", width: "100%" } }}
      >
        {(currentAction?.name ?? "") === "priority" ? (
          <UpdatePriority
            closeDialog={closeMyDialog}
            isDataChangedRef={isMyDataChangedRef}
          />
        ) : (
          <InvalidAction closeDialog={closeMyDialog} />
        )}
      </Dialog>
    </PriorityAPIProvider>
  );
};
