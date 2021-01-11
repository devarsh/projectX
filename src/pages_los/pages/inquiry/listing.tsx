import { useState, useRef, forwardRef } from "react";
import Dialog from "@material-ui/core/Dialog";
import DataGrid, { ActionTypes } from "components/dataTable";
import { InquiryDetails } from "./inquiryDetail";
import Slide from "@material-ui/core/Slide";
import Snackbar from "@material-ui/core/Snackbar";
import { setIn } from "packages/form";

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

export const Inquiry = () => {
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
    <>
      <DataGrid
        gridCode="trn/001"
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
        <InquiryDetails
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
    </>
  );
};
