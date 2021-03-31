import { useState, useRef, Fragment } from "react";
import Dialog from "@material-ui/core/Dialog";
import {
  ServerGrid,
  ServerGridContextProvider,
} from "pages_los/common/serverGrid";
import { ClearCacheProvider } from "cache";
import { Transition } from "pages_los/common";
import { serverGridContextGenerator } from "./context";
import { HeaderDetails } from "../headerDetails";
import { DetailsTabView } from "../detailsTabView";
import { AssignBranch } from "../assignBranch";
import { AssignInquiry } from "../assignInquiry";
import { Priority } from "../priority";
import { MoveToLead } from "../moveToLead";
import { InvalidAction } from "pages_los/common/invalidAction";

//All actions = [ViewDetails,ViewDetailsReadOnly,AssignBranch,Priority,MoveToLead,AssignInquiry]

export const Inquiry = ({ gridCode, actions }) => {
  const [currentAction, setCurrentAction] = useState<null | any>(null);
  const isDataChangedRef = useRef(false);
  const myGridRef = useRef<any>(null);
  const handleDialogClose = () => {
    setCurrentAction(null);
    if (isDataChangedRef.current) {
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
          ["ViewDetails", "ViewDetailsReadOnly", "Priority"].indexOf(
            currentAction?.name
          ) >= 0
            ? true
            : false
        }
        open={currentAction !== null}
        //@ts-ignore
        TransitionComponent={Transition}
        onClose={handleDialogClose}
        key={currentAction?.rows[0].id}
      >
        <ClearCacheProvider key={currentAction?.rows[0].id}>
          {(currentAction?.name ?? "") === "ViewDetails" ? (
            <Fragment key={currentAction?.rows[0].id}>
              <HeaderDetails
                productData={currentAction?.rows[0]}
                handleDialogClose={handleDialogClose}
              />
              <DetailsTabView
                moduleType="inquiry"
                refID={currentAction?.rows[0].id}
                isDataChangedRef={isDataChangedRef}
              />
            </Fragment>
          ) : (currentAction?.name ?? "") === "ViewDetailsReadOnly" ? (
            <Fragment key={currentAction?.rows[0].id}>
              <HeaderDetails
                productData={currentAction?.rows[0]}
                handleDialogClose={handleDialogClose}
              />
              <DetailsTabView
                moduleType="inquiry"
                refID={currentAction?.rows[0].id}
                isDataChangedRef={isDataChangedRef}
                isReadOnly={true}
              />
            </Fragment>
          ) : (currentAction?.name ?? "") === "AssignBranch" ? (
            <AssignBranch
              key={currentAction?.rows[0].id}
              moduleType="inquiry"
              rowsData={currentAction?.rows}
              isDataChangedRef={isDataChangedRef}
              closeDialog={handleDialogClose}
            />
          ) : (currentAction?.name ?? "") === "Priority" ? (
            <Fragment key={currentAction?.rows[0].id}>
              <HeaderDetails
                productData={currentAction?.rows[0]}
                handleDialogClose={handleDialogClose}
              />
              <Priority
                moduleType="inquiry"
                refID={currentAction?.rows[0].id}
                isDataChangedRef={isDataChangedRef}
              />
            </Fragment>
          ) : (currentAction?.name ?? "") === "MoveToLead" ? (
            <Fragment key={currentAction?.rows[0].id}>
              <HeaderDetails
                productData={currentAction?.rows[0]}
                handleDialogClose={handleDialogClose}
              />
              <MoveToLead
                moduleType="inquiry"
                refID={currentAction?.rows[0].id}
                isDataChangedRef={isDataChangedRef}
                closeDialog={handleDialogClose}
              />
            </Fragment>
          ) : (currentAction?.name ?? "") === "AssignInquiry" ? (
            <Fragment key={currentAction?.rows[0].id}>
              <HeaderDetails
                productData={currentAction?.rows[0]}
                handleDialogClose={handleDialogClose}
              />
              <AssignInquiry
                moduleType="inquiry"
                refID={currentAction?.rows[0].id}
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
