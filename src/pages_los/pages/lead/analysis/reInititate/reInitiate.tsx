import { Fragment } from "react";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSnackbar } from "notistack";
import { useMutation } from "react-query";
import { perfiosReinitiate } from "../api";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { GSTAnalysisMetaData } from "../gst";
import { BankAnalysisMetaData } from "../bank";
import { ITRAnalysisMetaData } from "../itr";

interface InititateAnalysisAPIType {
  docType?: string;
  row: any;
  moduleType: string;
}

const ReInititateAnalysisAPI = (initiateAnalysisAPI) => async ({
  docType,
  row,
  moduleType,
}: InititateAnalysisAPIType) => {
  return initiateAnalysisAPI(docType, row, moduleType);
};

export const ReInitiateExternalAPI = ({
  moduleType,
  closeDialog,
  row,
  isDataChangedRef,
  refID,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  let formData = JSON.parse(row?.data?.lastInitiatedRequest ?? false);
  formData = formData.request_data;
  formData = { management: formData.serialNo, ...formData };
  const requestType = row?.data?.requestType;
  const currentMetaData =
    requestType === "GST_UPLOAD"
      ? GSTAnalysisMetaData
      : requestType === "STMT_UPLOAD"
      ? BankAnalysisMetaData
      : requestType === "ITR_UPLOAD"
      ? ITRAnalysisMetaData
      : undefined;
  const docType =
    requestType === "GST_UPLOAD"
      ? "gst"
      : requestType === "STMT_UPLOAD"
      ? "bank"
      : requestType === "ITR_UPLOAD"
      ? "itr"
      : undefined;

  const reinitate = useMutation(ReInititateAnalysisAPI(perfiosReinitiate), {
    onError: (error: any) => {},
    onSuccess: (data) => {
      isDataChangedRef.current = true;
      enqueueSnackbar("API Successfully Re-Initialized", {
        variant: "success",
      });
      closeDialog();
    },
  });

  if (currentMetaData?.form) {
    currentMetaData.form.formState = { refID: refID, moduleType: moduleType };
  }
  return !Boolean(currentMetaData) ? (
    <Alert severity="error" onClose={closeDialog}>
      Error finding Request Type to Reinititate the request
    </Alert>
  ) : (
    <Fragment>
      {reinitate.isError ? (
        <Alert severity="error" onClose={closeDialog}>
          {reinitate.error?.error_msg ?? "Unknown error occured"}
        </Alert>
      ) : null}
      <FormWrapper
        metaData={currentMetaData as MetaDataType}
        initialValues={formData ?? {}}
        onSubmitHandler={() => null}
        displayMode={"view"}
        disableGroupErrorDetection={true}
        disableGroupExclude={true}
      >
        <Button
          onClick={() =>
            reinitate.mutate({
              docType,
              row: row?.data?.lastInitiatedRequest,
              moduleType,
            })
          }
          disabled={reinitate.isLoading}
          endIcon={reinitate.isLoading ? <CircularProgress size={20} /> : null}
        >
          ReInititate
        </Button>
        <Button onClick={closeDialog} disabled={reinitate.isLoading}>
          Cancel
        </Button>
      </FormWrapper>
    </Fragment>
  );
};
