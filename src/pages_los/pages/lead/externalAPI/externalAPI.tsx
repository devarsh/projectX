import { useContext, useRef, useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import { queryClient, ClearCacheContext } from "cache";
import { ActionTypes } from "components/dataTable";
import { InvalidAction } from "pages_los/common/invalidAction";
import { APIGrid } from "./apiGrid";
import { APIInterface } from "./apiInterface";
import { generateExternalAPIContext, ExternalAPIProvider } from "./context";

const actions: ActionTypes[] = [
  {
    actionName: "perfiosUpload",
    actionLabel: "Perfios Upload",
    multiple: undefined,
    alwaysAvailable: true,
  },

  {
    actionName: "reInitiate",
    actionLabel: "Re-Initiate",
    multiple: true,
    shouldExclude: (rows) => {
      let exclude = false;
      for (let i = 0; i < rows.length; i++) {
        if (rows[i].data?.status !== "ERROR") {
          exclude = true;
          break;
        }
      }
      return exclude;
    },
  },
];

export const ExternalAPI = ({ refID, moduleType }) => {
  const [currentAction, setCurrentAction] = useState<any>(null);
  const removeCache = useContext(ClearCacheContext);
  const gridRef = useRef<any>(null);
  const isMyDataChangedRef = useRef(false);
  const closeMyDialog = () => {
    setCurrentAction(null);
    if (isMyDataChangedRef.current === true) {
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
  }, [removeCache, moduleType, refID]);

  return (
    <ExternalAPIProvider {...generateExternalAPIContext({ refID, moduleType })}>
      <APIGrid
        ref={gridRef}
        key="grid"
        actions={actions}
        setAction={setCurrentAction}
      />
      <Dialog
        open={Boolean(currentAction)}
        maxWidth="xl"
        PaperProps={
          currentAction === "Delete"
            ? {}
            : { style: { width: "100%", height: "100%" } }
        }
      >
        {(currentAction?.name ?? "") === "perfiosUpload" ? (
          <APIInterface
            refID={refID}
            moduleType={moduleType}
            closeDialog={closeMyDialog}
            isDataChangedRef={isMyDataChangedRef}
          />
        ) : (currentAction?.name ?? "") === "reInitiate" ? (
          "hiiii"
        ) : (
          <InvalidAction closeDialog={closeMyDialog} />
        )}
      </Dialog>
    </ExternalAPIProvider>
  );
};
