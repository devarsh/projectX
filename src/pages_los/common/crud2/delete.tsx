import { Fragment } from "react";
import { LOSSDK } from "registry/fns/los";
import { useMutation } from "react-query";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";

interface DeleteFormDataType {
  moduleType: string;
  productType: string;
  refID: string;
  serialNo?: string;
}

const DeleteFormData = async ({
  moduleType,
  productType,
  refID,
  serialNo,
}: DeleteFormDataType) => {
  return LOSSDK.deleteFormData(moduleType, productType, refID, serialNo);
};

export const DeleteAction = ({
  refID,
  moduleType,
  productType,
  isProductEditedRef,
  closeDialog,
  serialNo,
}) => {
  const mutation = useMutation(DeleteFormData, {
    onError: (error: any) => {
      let errorMsg = "Unknown Error occured";
      if (typeof error === "object") {
        errorMsg = error?.error_msg ?? errorMsg;
      }
    },
    onSuccess: (data) => {
      isProductEditedRef.current = true;
      closeDialog();
    },
  });

  return (
    <Fragment>
      <DialogTitle id="alert-dialog-title">
        Are you sure you want to delete the selected Records
      </DialogTitle>
      {mutation.isLoading ? (
        <DialogContent>Deleting...</DialogContent>
      ) : mutation?.isError ? (
        <DialogContent>
          {mutation.error?.error_msg ?? "Unknown Error occured"}
        </DialogContent>
      ) : mutation.isSuccess ? (
        <DialogContent>All Records successfully deleted</DialogContent>
      ) : null}
      {mutation.isSuccess ? (
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      ) : (
        <DialogActions>
          <Button
            onClick={closeDialog}
            color="primary"
            disabled={mutation.isLoading}
          >
            Disagree
          </Button>
          <Button
            onClick={() =>
              mutation.mutate({ refID, moduleType, productType, serialNo })
            }
            color="primary"
            disabled={mutation.isLoading}
          >
            Agree
          </Button>
        </DialogActions>
      )}
    </Fragment>
  );
};
