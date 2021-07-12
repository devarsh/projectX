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
import { LeadAssignTask } from "../leadAssignTask";
import { HeaderDetails } from "../headerDetails";
import { DetailsTabView } from "../detailsTabView";
import { Analysis } from "../analysis";
import { Stage } from "../stages";
import { CAM } from "../cam";
import { LeadAssign } from "../leadAssign";
import { Verification } from "../verification";
import { BankLogin } from "../bankLogin";
import { Mandate } from "../mandate";
import { Sanction } from "../sanction";
import { Disbursement } from "../disbursement";

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
          defaultSortOrder={[{ id: "tran_cd", desc: true }]}
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
            />
          ) : (currentAction?.name ?? "") === "cam" ? (
            <CAM
              key={currentAction?.rows[0].id}
              moduleType="lead"
              refID={currentAction?.rows[0].id}
              isDataChangedRef={isDataEditedRef}
            />
          ) : (currentAction?.name ?? "") === "analysis" ? (
            <Analysis
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
          ) : (currentAction?.name ?? "") === "taskAssign" ? (
            <LeadAssignTask
              leadNo={currentAction?.rows[0]?.data?.lead_no}
              trancdCode={currentAction?.rows[0]?.data?.tran_cd}
              taskFor="lead"
              moduleType="task"
              isDataChangedRef={isDataEditedRef}
              closeDialog={handleDialogClose}
            />
          ) : (currentAction?.name ?? "") === "verification" ? (
            <Verification
              key={currentAction?.rows[0].id}
              moduleType="lead"
              refID={currentAction?.rows[0].id}
            />
          ) : (currentAction?.name ?? "") === "bankLogin" ? (
            <BankLogin
              key={currentAction?.rows[0].id}
              moduleType="lead"
              refID={currentAction?.rows[0].id}
            />
          ) : (currentAction?.name ?? "") === "viewMandate" ? (
            <Mandate
              key={currentAction?.rows[0].id}
              moduleType="lead"
              productType="mandate"
              refID={currentAction?.rows[0].id}
              isDataChangedRef={isDataEditedRef}
              closeDialog={handleDialogClose}
            />
          ) : (currentAction?.name ?? "") === "sanction" ? (
            <Sanction
              key={currentAction?.rows[0].id}
              moduleType="lead"
              refID={currentAction?.rows[0].id}
            />
          ) : (currentAction?.name ?? "") === "disbursement" ? (
            <Disbursement
              key={currentAction?.rows[0].id}
              moduleType="lead"
              refID={currentAction?.rows[0].id}
            />
          ) : (
            <InvalidAction closeDialog={handleDialogClose} />
          )}
        </ClearCacheProvider>
      </Dialog>
    </Fragment>
  );
};
