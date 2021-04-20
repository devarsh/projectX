import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { verificationInitateFormMetaData } from "./metaData";
import { useMutation } from "react-query";
import { initiateVerificationAPI } from "../api";
import { useSnackbar } from "notistack";

interface InititateDocumentUploadAPIType {
  formData: any;
  endSubmit?: any;
}

const InititateDocumentUploadAPI = (initiateDocsAPIFn) => async ({
  formData,
}: InititateDocumentUploadAPIType) => {
  return initiateDocsAPIFn(formData);
};

export const APIInterfaceForm = ({
  refID,
  moduleType,
  closeDialog,
  isDataChangedRef,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const inititateAPIMutation = useMutation(
    InititateDocumentUploadAPI(initiateVerificationAPI({ moduleType, refID })),
    {
      onError: (error: any) => {},
      onSuccess: (data) => {
        enqueueSnackbar("API Successfully Initialized", {
          variant: "success",
        });
      },
    }
  );

  const formHandleSubmit = (formData, displayFormData, endSubmit) => {
    inititateAPIMutation.mutate({ formData, endSubmit: endSubmit });
  };

  return (
    <FormWrapper
      metaData={verificationInitateFormMetaData as MetaDataType}
      initialValues={{}}
      onSubmitHandler={null}
      displayMode={"new"}
      disableGroupErrorDetection={true}
      disableGroupExclude={true}
    >
      {({ isSubmitting, handleSubmit }) => {
        return (
          <>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              endIcon={isSubmitting ? <CircularProgress size={20} /> : null}
            >
              Save
            </Button>
            <Button onClick={closeDialog} disabled={isSubmitting}>
              Cancel
            </Button>
          </>
        );
      }}
    </FormWrapper>
  );
};
