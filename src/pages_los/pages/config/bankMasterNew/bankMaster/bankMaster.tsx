import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { useMutation } from "react-query";
import { useSnackbar } from "notistack";
import { bankMasterMetadata } from "pages_los/pages/config/bankMaster/metadata/form";
import * as API from "./api";
import { BankMasterAPIProvider, generateBankMasterAPIContext } from "./context";
import { SubmitFnType } from "packages/form";

interface TaskAssignFormDataFnType {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
}

const addBankFormDataFnWrapper = (taskAssignFn) => async ({
  data,
}: TaskAssignFormDataFnType) => {
  return taskAssignFn(data);
};

export const BankMaster = ({ moduleType, isDataChangedRef, closeDialog }) => {
  const { enqueueSnackbar } = useSnackbar();

  const mutation = useMutation(
    addBankFormDataFnWrapper(API.addBank({ moduleType })),
    {
      onError: (error: any, { endSubmit }) => {
        let errorMsg = "Unknown Error occured";
        if (typeof error === "object") {
          errorMsg = error?.error_msg ?? errorMsg;
        }
        endSubmit(false, errorMsg, error?.error_details ?? "");
      },
      onSuccess: (data, { endSubmit }) => {
        endSubmit(true, "");
        isDataChangedRef.current = true;
        enqueueSnackbar("Task Assign Successfully", {
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
    mutation.mutate({ data, displayData, endSubmit, setFieldError });
  };

  return (
    <FormWrapper
      key="bank"
      metaData={bankMasterMetadata as MetaDataType}
      initialValues={""}
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

export const BankMasterkWrapper = ({
  moduleType,
  isDataChangedRef,
  closeDialog,
}) => {
  return (
    <BankMasterAPIProvider {...generateBankMasterAPIContext({ moduleType })}>
      <BankMaster
        moduleType={moduleType}
        isDataChangedRef={isDataChangedRef}
        closeDialog={closeDialog}
      />
    </BankMasterAPIProvider>
  );
};
