import { useState, useRef, Fragment } from "react";
import Dialog from "@material-ui/core/Dialog";
import {
  ServerGrid,
  ServerGridContextProvider,
} from "pages_los/common/serverGrid";
import { Transition } from "pages_los/common";
import { ClearCacheProvider } from "cache";
import { serverGridContextGenerator } from "../context";
import { InvalidAction } from "pages_los/common/invalidAction";
import { AddColdCalling } from "./coldCallingCRUD";

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
          ["AddColdCalling"].indexOf(currentAction?.name) >= 0 ? true : false
        }
        open={currentAction !== null}
        //@ts-ignore
        TransitionComponent={Transition}
        onClose={handleDialogClose}
        maxWidth="md"
        PaperProps={{ style: { width: "100%", height: "100%" } }}
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
          ) : (
            <InvalidAction closeDialog={handleDialogClose} />
          )}
        </ClearCacheProvider>
      </Dialog>
    </Fragment>
  );
};
