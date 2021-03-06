import { useEffect, useRef, useState, useContext } from "react";
import Dialog from "@material-ui/core/Dialog";
import { ActionTypes } from "components/dataTable";
import { queryClient, ClearCacheContext } from "cache";
import { MyGridWrapper } from "./gridWrapper";
import { CAMContextProvider, CAMProviderType } from "./context";
import { LOSSDK } from "registry/fns/los";
import { DownloadCAM } from "./download";
import { ViewCAM } from "./view";
import { PreviewCAM } from "./preview";
import { InvalidAction } from "pages_los/common/invalidAction";

const CAMAPIArgs = ({ refID }): CAMProviderType => ({
  context: { refID },
  generateCAM: { fn: LOSSDK.generateCAM, args: { refID } },
  previewCAM: { fn: LOSSDK.generateCAM_URL, args: { refID } },
  getGridCAMData: { fn: LOSSDK.getCAMGridData, args: { refID } },
  getGridCAMMetaData: { fn: LOSSDK.getCAMGridMetaData, args: { refID } },
});

const actions: ActionTypes[] = [
  {
    actionName: "View",
    actionLabel: "View",
    multiple: false,
    rowDoubleClick: true,
    shouldExclude: (rows) => {
      let exclude = false;
      for (let i = 0; i < rows.length; i++) {
        if (rows[i].data?.status !== "Completed") {
          exclude = true;
          break;
        }
      }
      return exclude;
    },
  },
  {
    actionName: "Download",
    actionLabel: "download",
    multiple: true,
    rowDoubleClick: false,
    shouldExclude: (rows) => {
      let exclude = false;
      for (let i = 0; i < rows.length; i++) {
        if (rows[i].data?.status !== "Completed") {
          exclude = true;
          break;
        }
      }
      return exclude;
    },
  },
  {
    actionName: "Preview",
    actionLabel: "Preview CAM",
    multiple: undefined,
    alwaysAvailable: true,
  },
];

export const CAM = ({ refID, moduleType, isDataChangedRef }) => {
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
  }, [removeCache, moduleType, refID]);

  return (
    <CAMContextProvider {...CAMAPIArgs({ refID: refID })}>
      <MyGridWrapper
        ref={gridRef}
        key="grid"
        actions={actions}
        setAction={setCurrentAction}
      />
      <Dialog open={Boolean(currentAction)} maxWidth="xl">
        {currentAction?.name === "Download" ? (
          <DownloadCAM
            closeDialog={closeMyDialog}
            serialNo={currentAction?.rows[0].id}
          />
        ) : currentAction?.name === "View" ? (
          <ViewCAM
            closeDialog={closeMyDialog}
            serialNo={currentAction?.rows[0].id}
          />
        ) : currentAction?.name === "Preview" ? (
          <PreviewCAM
            closeDialog={closeMyDialog}
            dataChangedRef={isMyDataChangedRef}
          />
        ) : (
          <InvalidAction closeDialog={closeMyDialog} />
        )}
      </Dialog>
    </CAMContextProvider>
  );
};
