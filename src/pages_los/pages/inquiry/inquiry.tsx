import { useState, useRef, Fragment } from "react";
import Dialog from "@material-ui/core/Dialog";
import { ServerGrid } from "pages_los/common/serverGrid";
import { DetailsTabView } from "./detailsTabView";
import { ActionTypes } from "components/dataTable";
import { ClearCacheProvider } from "cache";
import { Transition } from "pages_los/common";

const actions: ActionTypes[] = [
  {
    actionName: "completeView",
    actionLabel: "360 View",
    multiple: false,
    rowDoubleClick: true,
  },
];

export const Inquiry = () => {
  let gridCode = "TRN/001";
  const [action, setAction] = useState<null | any>(null);
  const isDataEditedRef = useRef(false);
  const myGridRef = useRef<any>(null);
  const handleDialogClose = () => {
    setAction(null);
    if (isDataEditedRef.current) {
      myGridRef?.current?.fetchData?.();
      isDataEditedRef.current = false;
    }
  };

  return (
    <Fragment>
      <ServerGrid
        gridCode={gridCode}
        actions={actions}
        setAction={setAction}
        ref={myGridRef}
      />
      <Dialog
        fullScreen
        open={action !== null}
        //@ts-ignore
        TransitionComponent={Transition}
        onClose={handleDialogClose}
        key={action?.rows[0].id}
      >
        <ClearCacheProvider key={action?.rows[0].id}>
          <DetailsTabView
            key={action?.rows[0].id}
            moduleType="inquiry"
            productGridData={action?.rows[0]}
            refID={action?.rows[0].id}
            isDataChangedRef={isDataEditedRef}
            handleDialogClose={handleDialogClose}
          />
        </ClearCacheProvider>
      </Dialog>
    </Fragment>
  );
};
