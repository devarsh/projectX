import { useRef } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import { useMutation } from "react-query";
import { useSnackbar } from "notistack";
import { SubmitFnType } from "packages/form";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { branchAssignMetadata } from "./metadata";
import * as API from "./api";

interface InsertFormDataFnType {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
}

const insertFormDataFnWrapper = (assignBranchFn) => async ({
  data,
}: InsertFormDataFnType) => {
  return assignBranchFn(data);
};

export const AssignBranch = ({
  moduleType,
  rowsData,
  isDataChangedRef,
  closeDialog,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const inquiriesRef = useRef(null);
  if (inquiriesRef.current === null) {
    inquiriesRef.current = rowsData.map((one) => one.id);
  }
  const mutation = useMutation(
    insertFormDataFnWrapper(
      API.assignBranch({ moduleType, inquiries: inquiriesRef.current })
    ),
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
      key="assignBranch"
      metaData={branchAssignMetadata as MetaDataType}
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
