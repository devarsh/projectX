import { Fragment } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Alert } from "components/common/alert";
import { useSnackbar } from "notistack";
import { useMutation } from "react-query";
import { moveLeadToBankLogin } from "./api";

interface moveLeadToBankLoginType {
  refID: any;
}

const moveLeadToBankLoginWrapper = (moveLeadToBankLogin) => async ({
  refID,
}: moveLeadToBankLoginType) => {
  return moveLeadToBankLogin(refID);
};

export const MoveToBankSelection = ({ refID, closeDialog }) => {
  const { enqueueSnackbar } = useSnackbar();
  const mutation = useMutation(
    moveLeadToBankLoginWrapper(moveLeadToBankLogin),
    {
      onError: (error: any) => {},
      onSuccess: (data) => {
        enqueueSnackbar(`${data?.message} for Lead No:${data?.leadNo}`);
        closeDialog();
      },
    }
  );

  return (
    <Fragment>
      {mutation.isError ? (
        <Alert
          severity="error"
          errorMsg={mutation.error?.error_msg ?? "Unknown Error occured"}
          errorDetail={mutation.error?.error_detail ?? ""}
        />
      ) : null}
      <DialogTitle>Would you like to move this Lead To Bank Login.</DialogTitle>
      <DialogActions>
        <Button
          onClick={() => mutation.mutate({ refID })}
          disabled={mutation.isLoading}
          endIcon={mutation.isLoading ? <CircularProgress size={20} /> : null}
        >
          Yes
        </Button>
        <Button onClick={closeDialog} disabled={mutation.isLoading}>
          No
        </Button>
      </DialogActions>
    </Fragment>
  );
};
