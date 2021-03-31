import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import { useMutation } from "react-query";
import { useSnackbar } from "notistack";
import { SubmitFnType } from "packages/form";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { inquiryAssignMetadata } from "./metadata";
import * as API from "./api";

interface InsertFormDataFnType {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
}

const insertFormDataFnWrapper = (assignInquiryFn) => async ({
  data,
}: InsertFormDataFnType) => {
  return assignInquiryFn(data);
};

export const AssignInquiry = ({
  moduleType,
  refID,
  isDataChangedRef,
  closeDialog,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const mutation = useMutation(
    insertFormDataFnWrapper(API.assignInquiry({ moduleType, inquiry: refID })),
    {
      onError: (error: any, { endSubmit }) => {
        let errorMsg = "Unknown Error occured";
        if (typeof error === "object") {
          errorMsg = error?.error_msg ?? errorMsg;
        }
        endSubmit(false, errorMsg);
      },
      onSuccess: (data, { endSubmit }) => {
        endSubmit(true, "");
        isDataChangedRef.current = true;
        enqueueSnackbar("inquiries successfully assigned to branch", {
          variant: "success",
        });
        closeDialog();
      },
    }
  );
  const onSubmitHandler: SubmitFnType = (
    data,
    displayData,
    endSubmit,
    setFieldError
  ) => {
    mutation.mutate({
      data,
      displayData,
      endSubmit,
      setFieldError,
    });
  };
  return (
    <FormWrapper
      key="assignInquiry"
      metaData={inquiryAssignMetadata as MetaDataType}
      initialValues={{}}
      onSubmitHandler={onSubmitHandler}
      displayMode={"new"}
      disableGroupErrorDetection={true}
      disableGroupExclude={true}
      hideDisplayModeInTitle={true}
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
