import { useState, useRef, forwardRef, Fragment, useCallback, FC } from "react";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import Snackbar from "@material-ui/core/Snackbar";
import { ListingGrid } from "pages_los/common/listingGrid";
import { DetailsView } from "./detailsView";
import { ActionTypes } from "components/dataTable";
import { ClearCacheProvider } from "cache";
import Alert from "@material-ui/lab/Alert";

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

type SnackbarMessageType =
  | string
  | { message: string; type: "error" | "success" };

interface SnackBarType {
  open: boolean;
  message: SnackbarMessageType;
  onClose: any;
}
export const Lead = () => {
  let gridCode = "TRN/003";
  const [action, setAction] = useState<null | any>(null);
  const disableDialogCloseRef = useRef(false);
  const isProductEditedRef = useRef(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [gridRefresh, setGridRefresh] = useState(false);
  const [userMessage, setUserMessage] = useState<SnackbarMessageType>("");

  const formState = {
    serialNo: 1,
  };

  const onCloseSnackBar = useCallback(() => {
    setSnackBarOpen(false);
  }, []);

  const setSnackBarMessage = useCallback(
    (userMessage) => {
      setUserMessage(userMessage);
      setSnackBarOpen(true);
    },
    [setUserMessage, setSnackBarOpen]
  );

  const handleDialogClose = () => {
    if (!disableDialogCloseRef.current) {
      setAction(null);
      if (isProductEditedRef.current) {
        setGridRefresh(true);
        isProductEditedRef.current = false;
      }
    } else {
      setSnackBarMessage("complete the current action before closing");
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
        key={action?.rows[0].id}
      >
        <ClearCacheProvider key={action?.rows[0].id}>
          <DetailsView
            key={action?.rows[0].id}
            productGridData={action?.rows[0]}
            refID={action?.rows[0].id}
            formState={formState}
            disableDialogCloseRef={disableDialogCloseRef}
            isProductEditedRef={isProductEditedRef}
            handleDialogClose={handleDialogClose}
            setSnackBarMessage={setSnackBarMessage}
          />
        </ClearCacheProvider>
      </Dialog>
      <SnackbarMessage
        open={snackBarOpen}
        onClose={onCloseSnackBar}
        message={userMessage}
        key={"bottomcenter"}
      />
    </Fragment>
  );
};

const SnackbarMessage: FC<SnackBarType> = ({ open, message, onClose }) => {
  const autoHideDuration = 2000; //need to set proper time
  return typeof message === "string" ? (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      message={message}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
    />
  ) : typeof message === "object" ? (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      key="bottomcenter"
    >
      <Alert onClose={onClose} severity={message.type}>
        {message.message}
      </Alert>
    </Snackbar>
  ) : null;
};
