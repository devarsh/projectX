import { useState, useRef, forwardRef, Fragment } from "react";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import Snackbar from "@material-ui/core/Snackbar";
import { DetailsView } from "./detailsView";
import { ListingGrid } from "./listingGrid";
import { ActionTypes } from "components/dataTable";

const actions: ActionTypes[] = [
  {
    actionName: "completeView",
    actionLabel: "360 View",
    multiple: false,
    rowDoubleClick: true,
  },
];

const Transition = forwardRef(function Transition(props, ref) {
  //@ts-ignore
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Product = () => {
  let gridCode = "TRN/001";
  const [action, setAction] = useState<null | any>(null);
  const [disableDialogClose, setDisableDialogClose] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [gridRefresh, setGridRefresh] = useState(false);
  const isInquiryEditedRef = useRef(false);

  const handleDialogClose = () => {
    if (!disableDialogClose) {
      setAction(null);
      if (isInquiryEditedRef.current) {
        setGridRefresh(true);
        isInquiryEditedRef.current = false;
      }
    } else {
      setSnackBarOpen(true);
    }
  };

  return (
    <Fragment>
      <ListingGrid
        gridCode={gridCode}
        actions={actions}
        setAction={setAction}
        gridRefresh={gridRefresh}
        setGridRefresh={setGridRefresh}
      />
      <Dialog
        fullScreen
        open={action !== null}
        //@ts-ignore
        TransitionComponent={Transition}
        onClose={handleDialogClose}
      >
        <DetailsView
          inquiryData={action?.rows[0]}
          inquiryID={action?.rows[0].id}
          setDisableDialogClose={setDisableDialogClose}
          isInquiryEditedRef={isInquiryEditedRef}
        />
        <Snackbar
          open={snackBarOpen}
          autoHideDuration={2000}
          onClose={() => setSnackBarOpen(false)}
          message={"please save any unsaved changes before closing this window"}
          key={"bottomcenter"}
        />
      </Dialog>
    </Fragment>
  );
};