import { Fragment, useContext } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useMutation } from "react-query";
import { YearlyTargetCRUDContext } from "./context";
import { useSnackbar } from "notistack";

interface DeleteFormDataType {
  serialNo?: string;
}

const DeleteDocumentDataFnWrapper = (deleteYearlyTarget) => async ({
  serialNo,
}: DeleteFormDataType) => {
  return deleteYearlyTarget(serialNo);
};

export const DeleteAction = ({ dataChangedRef, closeDialog, serialNo }) => {
  console.log(serialNo, "hiii");
  const { deleteYearlyTarget, context } = useContext(YearlyTargetCRUDContext);
  const { enqueueSnackbar } = useSnackbar();
  const mutation = useMutation(
    DeleteDocumentDataFnWrapper(deleteYearlyTarget.fn(deleteYearlyTarget.args)),
    {
      onError: (error: any) => {},
      onSuccess: (data) => {
        dataChangedRef.current = true;
        enqueueSnackbar("Record successful deleted", { variant: "success" });
        closeDialog();
      },
    }
  );

  return (
    <Fragment>
      {console.log("diuyuasd", serialNo)}
      {mutation.isError ? (
        <Alert severity="error">
          {mutation?.error?.error_msg ?? "Unknown Error occured"}
        </Alert>
      ) : null}
      {mutation.isLoading ? <LinearProgress variant={"indeterminate"} /> : null}
      <DialogTitle id="alert-dialog-title">
        Are you sure you want to delete the selected Records
      </DialogTitle>
      <DialogActions>
        <Button
          onClick={closeDialog}
          color="primary"
          disabled={mutation.isLoading}
        >
          No
        </Button>
        <Button
          color="primary"
          onClick={() => mutation.mutate({ serialNo })}
          disabled={mutation.isLoading}
        >
          Yes
        </Button>
      </DialogActions>
    </Fragment>
  );
};
