import { useEffect, useRef, useState, useContext } from "react";
import { useStyles } from "./style";
import Dialog from "@material-ui/core/Dialog";
import { ActionTypes } from "components/dataTable";
import { queryClient, ClearCacheContext } from "cache";
import { MyGridWrapper } from "./grid";
import { CAMContextProvider } from "./context";
import { DownloadCAM } from "./download";
import { ViewCAM } from "./view";
import { PreviewCAM } from "./preview";
import { InvalidAction } from "pages_los/common/invalidAction";
import { generateCAMAPIContext } from "./context";
import { MoveToBankSelection } from "./moveToBankSelection/moveToBankSelection";

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
  {
    actionName: "bankSelection",
    actionLabel: "Move To Bank Selection",
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
  const classes = useStyles();
  useEffect(() => {
    return () => {
      let entries = removeCache?.getEntries() as any[];
      entries.forEach((one) => {
        queryClient.removeQueries(one);
      });
    };
  }, [removeCache, moduleType, refID]);

  return (
    <CAMContextProvider {...generateCAMAPIContext({ refID: refID })}>
      <MyGridWrapper
        ref={gridRef}
        key="grid"
        actions={actions}
        setAction={setCurrentAction}
      />
      <Dialog
        open={Boolean(currentAction)}
        maxWidth={
          currentAction?.name === "Preview" || currentAction?.name === "view"
            ? "xl"
            : "md"
        }
        className={
          currentAction?.name === "Preview" || currentAction?.name === "View"
            ? classes.printLayout
            : ""
        }
        scroll="paper"
        PaperProps={
          currentAction?.name === "Preview" || currentAction?.name === "View"
            ? {
                style: {
                  margin: "0",
                  maxHeight: "100vh",
                  padding: "8px 0",
                  width: "100%",
                  height: "100%",
                },
              }
            : {}
        }
      >
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
        ) : currentAction?.name === "bankSelection" ? (
          <MoveToBankSelection refID={refID} closeDialog={closeMyDialog} />
        ) : (
          <InvalidAction closeDialog={closeMyDialog} />
        )}
      </Dialog>
    </CAMContextProvider>
  );
};
