import { useContext, useRef, useState, useEffect, Fragment } from "react";
import Dialog from "@material-ui/core/Dialog";
import { queryClient, ClearCacheContext } from "cache";
import { ActionTypes } from "components/dataTable";
import { InvalidAction } from "pages_los/common/invalidAction";
import { APIGrid } from "./apiGrid";
import { generateAnalysisAPIContext, AnalysisAPIProvider } from "./context";
import { ReInitiateExternalAPI } from "./reInititate";
import { Download } from "./download";
import { BankAPIInterface } from "./bank";
import { GSTAPIInterface } from "./gst";
import { ITRInterface } from "./itr";

const actions: ActionTypes[] = [
  {
    actionName: "Bank",
    actionLabel: "Bank",
    multiple: undefined,
    alwaysAvailable: true,
  },
  {
    actionName: "Financial",
    actionLabel: "Financial",
    multiple: undefined,
    alwaysAvailable: true,
  },
  {
    actionName: "GST",
    actionLabel: "GST",
    multiple: undefined,
    alwaysAvailable: true,
  },
  {
    actionName: "reInitiatePerfios",
    actionLabel: "Re-Initiate",
    multiple: false,
    shouldExclude: (rows: any) => {
      let exclude = false;
      for (let i = 0; i < rows.length; i++) {
        if (["ERROR", "FAILED"].indexOf(rows[i].data?.status) < 0) {
          exclude = true;
          break;
        }
      }
      return exclude;
    },
  },
  {
    actionName: "download",
    actionLabel: "Download",
    multiple: false,
    shouldExclude: (rows: any) => {
      let exclude = false;
      for (let i = 0; i < rows.length; i++) {
        if (["SUCCESS"].indexOf(rows[i].data?.status) < 0) {
          exclude = true;
          break;
        }
      }
      return exclude;
    },
  },
];

export const Analysis = ({ refID, moduleType }) => {
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
    <Fragment>
      <AnalysisAPIProvider
        {...generateAnalysisAPIContext({ refID, moduleType })}
      >
        <APIGrid
          ref={gridRef}
          key="grid"
          actions={actions}
          setAction={setCurrentAction}
          transformData={(data) => {
            return data.map((one) => ({
              ...one,
              requestTypeDisplay:
                one?.requestType === "STMT_UPLOAD"
                  ? "Bank"
                  : one?.requestType === "GST_UPLOAD"
                  ? "GST"
                  : one?.requestType === "ITR_UPLOAD"
                  ? "Financial"
                  : one?.requestType === "CORPOSITORY(creditOrder)"
                  ? "Financial"
                  : "Invalid",
            }));
          }}
        />
      </AnalysisAPIProvider>
      <Dialog
        open={Boolean(currentAction)}
        maxWidth="xl"
        PaperProps={{ style: { width: "100%", height: "100%" } }}
      >
        {(currentAction?.name ?? "") === "Bank" ? (
          <BankAPIInterface
            refID={refID}
            moduleType={moduleType}
            closeDialog={closeMyDialog}
            isDataChangedRef={isMyDataChangedRef}
          />
        ) : (currentAction?.name ?? "") === "GST" ? (
          <GSTAPIInterface
            refID={refID}
            moduleType={moduleType}
            closeDialog={closeMyDialog}
            isDataChangedRef={isMyDataChangedRef}
          />
        ) : (currentAction?.name ?? "") === "Financial" ? (
          <ITRInterface
            refID={refID}
            moduleType={moduleType}
            closeDialog={closeMyDialog}
            isDataChangedRef={isMyDataChangedRef}
          />
        ) : (currentAction?.name ?? "") === "reInitiatePerfios" ? (
          <ReInitiateExternalAPI
            refID={refID}
            moduleType={moduleType}
            closeDialog={closeMyDialog}
            row={currentAction?.rows[0] ?? undefined}
            isDataChangedRef={isMyDataChangedRef}
          />
        ) : (currentAction?.name ?? "") === "download" ? (
          <Download
            moduleType={moduleType}
            closeDialog={closeMyDialog}
            row={currentAction?.rows[0] ?? undefined}
          />
        ) : (
          <InvalidAction closeDialog={closeMyDialog} />
        )}
      </Dialog>
    </Fragment>
  );
};
