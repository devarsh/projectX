import { useState, useRef, Fragment } from "react";
import Dialog from "@material-ui/core/Dialog";
import {
  ServerGrid,
  ServerGridContextProvider,
} from "pages_los/common/serverGrid";
import { ClearCacheProvider } from "cache";
import { Transition } from "pages_los/common";
import { InvalidAction } from "pages_los/common/invalidAction";
import { serverGridContextGenerator } from "./context";
import { HeaderDetails } from "../headerDetails";
import { DetailsTabView } from "../detailsTabView";
import { ExternalAPI } from "../externalAPI";
import { Stage } from "../stages";
import { CAM } from "../cam";
import { LeadAssign } from "../leadAssign";

export const LeadGrid = ({ gridCode, actions }) => {
  const [currentAction, setCurrentAction] = useState<null | any>(null);
  const isDataEditedRef = useRef(false);
  const myGridRef = useRef<any>(null);
  const handleDialogClose = () => {
    setCurrentAction(null);
    if (isDataEditedRef.current) {
      myGridRef?.current?.fetchData?.();
      isDataEditedRef.current = false;
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
        fullScreen
        open={Boolean(currentAction)}
        //@ts-ignore
        TransitionComponent={Transition}
        key={currentAction?.rows[0].id}
      >
        <ClearCacheProvider>
          <HeaderDetails
            rowData={currentAction?.rows[0]}
            handleDialogClose={handleDialogClose}
          />
          {(currentAction?.name ?? "") === "detailView" ? (
            <DetailsTabView
              key={currentAction?.rows[0].id}
              moduleType="lead"
              refID={currentAction?.rows[0].id}
              isDataChangedRef={isDataEditedRef}
              rowData={currentAction?.rows[0]}
            />
          ) : (currentAction?.name ?? "") === "cam" ? (
            <CAM
              key={currentAction?.rows[0].id}
              moduleType="lead"
              refID={currentAction?.rows[0].id}
              isDataChangedRef={isDataEditedRef}
            />
          ) : (currentAction?.name ?? "") === "external" ? (
            <ExternalAPI
              key={currentAction?.rows[0].id}
              moduleType="lead"
              refID={currentAction?.rows[0].id}
            />
          ) : (currentAction?.name ?? "") === "stages" ? (
            <Stage
              key={currentAction?.rows[0].id}
              moduleType="lead"
              refID={currentAction?.rows[0].id}
              isDataChangedRef={isDataEditedRef}
            />
          ) : (currentAction?.name ?? "") === "leadAssign" ? (
            <LeadAssign
              closeDialog={handleDialogClose}
              moduleType="lead"
              refID={currentAction?.rows[0].id}
              isDataChangedRef={isDataEditedRef}
            />
          ) : (
            <InvalidAction closeDialog={handleDialogClose} />
          )}
        </ClearCacheProvider>
      </Dialog>
    </Fragment>
  );
};
