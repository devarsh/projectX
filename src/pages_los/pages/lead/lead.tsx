import { useState, useRef, Fragment } from "react";
import Dialog from "@material-ui/core/Dialog";
import { ListingGrid } from "pages_los/common/listingGrid";
import { ActionTypes } from "components/dataTable";
import { ClearCacheProvider } from "cache";
import { Transition } from "pages_los/common";
import { InvalidAction } from "pages_los/common/invalidAction";
import { HeaderDetails } from "./headerDetails";
import { DetailsTabView } from "./detailsTabView";
import { ExternalAPI } from "./externalAPI";
import { CAM } from "./cam";

const actions: ActionTypes[] = [
  {
    actionName: "completeView",
    actionLabel: "360 View",
    multiple: false,
    rowDoubleClick: true,
  },
  {
    actionName: "cam",
    actionLabel: "CAM",
    multiple: false,
    rowDoubleClick: false,
  },
  {
    actionName: "external",
    actionLabel: "External API",
    multiple: false,
    rowDoubleClick: false,
  },
];

export const Lead = () => {
  let gridCode = "TRN/003";
  const [currentAction, setCurrentAction] = useState<null | any>(null);
  const isDataEditedRef = useRef(false);
  const [gridRefresh, setGridRefresh] = useState(false);

  const handleDialogClose = () => {
    setCurrentAction(null);
    if (isDataEditedRef.current) {
      setGridRefresh(true);
      isDataEditedRef.current = false;
    }
  };

  return (
    <Fragment>
      <ListingGrid
        gridCode={gridCode}
        actions={actions}
        setAction={setCurrentAction}
        gridRefresh={gridRefresh}
        setGridRefresh={setGridRefresh}
      />
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
          {(currentAction?.name ?? "") === "completeView" ? (
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
          ) : (
            <InvalidAction closeDialog={handleDialogClose} />
          )}
        </ClearCacheProvider>
      </Dialog>
    </Fragment>
  );
};
