import { useState, useRef, Fragment } from "react";
import Dialog from "@material-ui/core/Dialog";
import {
  ServerGrid,
  ServerGridContextProvider,
} from "pages_los/common/serverGrid";
import { ClearCacheProvider } from "cache";
import { serverGridContextGenerator } from "../context";
import { InvalidAction } from "pages_los/common/invalidAction";
import {
  AddColdCalling,
  ColdCallingViewEdit,
  ColdCallingDelete,
} from "./coldCallingCRUD";
import { MoveToInquiry } from "./moveToInquiry";

export const ColdCalling = ({ gridCode, actions }) => {
  const [currentAction, setCurrentAction] = useState<null | any>(null);
  const isDataChangedRef = useRef(false);
  const myGridRef = useRef<any>(null);
  const handleDialogClose = () => {
    setCurrentAction(null);
    if (isDataChangedRef.current === true) {
      isDataChangedRef.current = true;
      myGridRef?.current?.fetchData?.();
      isDataChangedRef.current = false;
    }
  };

  return (
    <Fragment>
      <ServerGridContextProvider {...serverGridContextGenerator(gridCode)}>
        <ServerGrid
          gridCode={gridCode}
          actions={actions}
          setAction={setCurrentAction}
          ref={myGridRef}
        />
      </ServerGridContextProvider>
      <Dialog
        fullScreen={
          ["moveToInquiry"].indexOf(currentAction?.name) >= 0 ? true : false
        }
        open={currentAction !== null}
        onClose={handleDialogClose}
        maxWidth="md"
      >
        <ClearCacheProvider>
          {(currentAction?.name ?? "") === "AddColdCalling" ? (
            <Fragment>
              <AddColdCalling
                moduleType="cold-calling"
                isDataChangedRef={isDataChangedRef}
                closeDialog={handleDialogClose}
              />
            </Fragment>
          ) : (currentAction?.name ?? "") === "viewDetails" ? (
            <Fragment>
              <ColdCallingViewEdit
                tran_cd={currentAction?.rows[0].id}
                moduleType="cold-calling"
                isDataChangedRef={isDataChangedRef}
                closeDialog={handleDialogClose}
                readOnly={false}
                disableCache={false}
              />
            </Fragment>
          ) : (currentAction?.name ?? "") === "delete" ? (
            <Fragment>
              <ColdCallingDelete
                tran_cd={currentAction?.rows[0].id}
                moduleType="cold-calling"
                isDataChangedRef={isDataChangedRef}
                closeDialog={handleDialogClose}
              />
            </Fragment>
          ) : (currentAction?.name ?? "") === "moveToInquiry" ? (
            <Fragment>
              <MoveToInquiry
                // refID={currentAction?.rows[0].id}
                tran_cd={currentAction?.rows[0].id}
                moduleType="cold-calling"
                isDataChangedRef={isDataChangedRef}
                closeDialog={handleDialogClose}
              />
            </Fragment>
          ) : (
            <InvalidAction closeDialog={handleDialogClose} />
          )}
        </ClearCacheProvider>
      </Dialog>
    </Fragment>
  );
};
