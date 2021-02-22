import { Fragment, useContext, useRef } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import { cacheWrapperKeyGen } from "cache";
import { useMutation } from "react-query";
import { DOCCRUDContext } from "./context";

interface VerifyFormDataType {
  docUUID?: string;
}

const ConfirmDocumentDataFnWrapper = (verifyDocuments) => async ({
  docUUID,
}: VerifyFormDataType) => {
  return verifyDocuments(docUUID);
};
const RejectDocumentDataFnWrapper = (verifyDocuments) => async ({
  docUUID,
}: VerifyFormDataType) => {
  return verifyDocuments(docUUID);
};

export const VerifyDocumentAction = ({
  isProductEditedRef,
  closeDialog,
  docUUID,
}) => {
  const { deleteDocuments } = useContext(DOCCRUDContext);
  const wrapperKey = useRef<any>(null);
  if (wrapperKey.current === null) {
    wrapperKey.current = cacheWrapperKeyGen(
      Object.values(deleteDocuments.args)
    );
  }
  const verifyMutation = useMutation(
    ConfirmDocumentDataFnWrapper(deleteDocuments.fn(deleteDocuments.args)),
    {
      onError: (error: any) => {},
      onSuccess: (data) => {
        isProductEditedRef.current = true;
        closeDialog();
      },
    }
  );
  const rejectMutation = useMutation(
    RejectDocumentDataFnWrapper(deleteDocuments.fn(deleteDocuments.args)),
    {
      onError: (error: any) => {},
      onSuccess: (data) => {
        isProductEditedRef.current = true;
        closeDialog();
      },
    }
  );
  const isError = rejectMutation.isError || verifyMutation.isError;
  let errorMsg = `${rejectMutation?.error?.error_msg ?? ""} ${
    verifyMutation?.error?.errorMsg ?? ""
  }`;
  errorMsg = Boolean(errorMsg.trimEnd().trimStart())
    ? errorMsg
    : "unknown error occured";

  return (
    <Fragment>
      {isError ? <Alert severity="error">{errorMsg}</Alert> : null}
      <DialogTitle id="alert-dialog-title">Document Verification</DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color="primary">
          Cancel
        </Button>
        <Button
          color="primary"
          onClick={() => verifyMutation.mutate({ docUUID })}
        >
          Verify
        </Button>
        <Button
          color="primary"
          onClick={() => rejectMutation.mutate({ docUUID })}
        >
          Reject
        </Button>
      </DialogActions>
    </Fragment>
  );
};
