import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { useMutation } from "react-query";
import { useSnackbar } from "notistack";
import { leadTaskAssignMetadata } from "./metadata";
import * as API from "./api";
import { AssignTaskAPIProvider, generateAssignTaskAPIContext } from "./context";
import { SubmitFnType } from "packages/form";

interface TaskAssignFormDataFnType {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
}

const taskAssignFormDataFnWrapper = (taskAssignFn) => async ({
  data,
}: TaskAssignFormDataFnType) => {
  return taskAssignFn(data);
};

export const LeadAssignTask = ({
  moduleType,
  isDataChangedRef,
  closeDialog,
  leadNo,
  taskFor,
  trancdCode,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const mutation = useMutation(
    taskAssignFormDataFnWrapper(API.assignTask({ moduleType })),
    {
      onError: (error: any, { endSubmit }) => {
        let errorMsg = "Unknown Error occured";
        if (typeof error === "object") {
          Error = error?.error_msg ?? errorMsg;
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
      key="assign"
      metaData={leadTaskAssignMetadata as MetaDataType}
      initialValues={{ taskFor: taskFor, leadID: leadNo, refID: trancdCode }}
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

export const LeadAssignTaskWrapper = ({
  moduleType,
  isDataChangedRef,
  closeDialog,
  leadNo,
  taskFor,
  trancdCode,
}) => {
  return (
    <AssignTaskAPIProvider {...generateAssignTaskAPIContext({ moduleType })}>
      <LeadAssignTask
        leadNo={leadNo}
        moduleType={moduleType}
        isDataChangedRef={isDataChangedRef}
        closeDialog={closeDialog}
        taskFor={taskFor}
        trancdCode={trancdCode}
      />
    </AssignTaskAPIProvider>
  );
};
