import { useEffect, useRef, useState, useContext } from "react";
import Dialog from "@material-ui/core/Dialog";
import { ActionTypes } from "components/dataTable";
import { InvalidAction } from "pages_los/common/invalidAction";
import { ClearCacheContext, queryClient } from "cache";
import { StagesGrid } from "./grid";
import { StagesAPIProvider, generateStagesAPIContext } from "./context";
import { UpdatePriority } from "./updateStage";

const actions: ActionTypes[] = [
  {
    actionName: "stages",
    actionLabel: "Change Lead Stage",
    multiple: undefined,
    alwaysAvailable: true,
  },
];

export const Stage = ({ refID, moduleType, isDataChangedRef }) => {
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
    <StagesAPIProvider {...generateStagesAPIContext({ refID, moduleType })}>
      <StagesGrid
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
