import { useState, forwardRef } from "react";
import Dialog from "@material-ui/core/Dialog";
import DataGrid, { ActionTypes } from "components/dataTable";
import { InquiryDetails } from "./inquiryDetail";
import Slide from "@material-ui/core/Slide";

const actions: ActionTypes[] = [
  {
    actionName: "completeView",
    actionLabel: "360 View",
    multiple: false,
  },
];

const Transition = forwardRef(function Transition(props, ref) {
  //@ts-ignore
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Inquiry = () => {
  const [action, setAction] = useState<null | any>(null);
  const handleDialogClose = () => setAction(null);
  console.log(action);
  return (
    <>
      <DataGrid gridCode="trn/001" actions={actions} setAction={setAction} />
      <Dialog
        fullScreen
        open={action !== null}
        //@ts-ignore
        TransitionComponent={Transition}
        onClose={handleDialogClose}
      >
        <InquiryDetails inquiryID={action?.rows[0].id} />
      </Dialog>
    </>
  );
};
