import { Fragment } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import { perfiosReinitiate } from "../../api";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import {
  GSTUploadMetaData,
  BankUploadMetaData,
  ITRUploadMetaData,
} from "../metaData";

export const ReInitiateExternalAPI = ({
  moduleType,
  closeDialog,
  row,
  isDataChangedRef,
  refID,
}) => {
  let formData = JSON.parse(row?.data?.lastInitiatedRequest ?? false);
  formData = formData.request_data;
  formData = { management: formData.serialNo, ...formData };
  const requestType = row?.data?.requestType;
  const currentMetaData =
    requestType === "GST_UPLOAD"
      ? GSTUploadMetaData
      : requestType === "STMT_UPLOAD"
      ? BankUploadMetaData
      : requestType === "ITR_UPLOAD"
      ? ITRUploadMetaData
      : undefined;
  const docType =
    requestType === "GST_UPLOAD"
      ? "gst"
      : requestType === "STMT_UPLOAD"
      ? "bank"
      : requestType === "ITR_UPLOAD"
      ? "itr"
      : undefined;

  const handleApiInititation = () => {
    perfiosReinitiate(docType, row?.data?.lastInitiatedRequest, moduleType);
    isDataChangedRef.current = true;
    closeDialog();
  };
  if (currentMetaData?.form) {
    currentMetaData.form.formState = { refID: refID, moduleType: moduleType };
  }
  return !Boolean(currentMetaData) ? (
    <Alert severity="error" onClose={closeDialog}>
      Error fiding Request Type to Reinititate the request
    </Alert>
  ) : (
    <Fragment>
      <DialogTitle id="alert-dialog-title">
        Re-Initiate Upload With Following Details
      </DialogTitle>
      <DialogContent>
        <FormWrapper
          metaData={currentMetaData as MetaDataType}
          initialValues={formData ?? {}}
          onSubmitHandler={() => null}
          displayMode={"view"}
          disableGroupErrorDetection={true}
          disableGroupExclude={true}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={() => handleApiInititation()}>Re-Initiate</Button>
      </DialogActions>
    </Fragment>
  );
};
