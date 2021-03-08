import Button from "@material-ui/core/Button";
import { useMutation } from "react-query";
import { SubmitFnType } from "packages/form";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSnackbar } from "notistack";

interface InsertFormDataFnType {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
}

const insertFormDataFnWrapper = (insertFormData) => async ({
  data,
}: InsertFormDataFnType) => {
  return insertFormData(data);
};

export const APIForm = ({ metaData, handleSubmitFn }) => {
  const { enqueueSnackbar } = useSnackbar();

  const mutation = useMutation(insertFormDataFnWrapper(handleSubmitFn), {
    onError: (error: any, { endSubmit }) => {
      let errorMsg = "Unknown Error occured";
      if (typeof error === "object") {
        errorMsg = error?.error_msg ?? errorMsg;
      }
      endSubmit(false, errorMsg);
    },
    onSuccess: (data, { endSubmit }) => {
      endSubmit(true, "");
      enqueueSnackbar("Data is successfully saved with", {
        variant: "success",
      });
    },
  });
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
      metaData={metaData as MetaDataType}
      initialValues={{}}
      onSubmitHandler={onSubmitHandler}
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
            <Button onClick={() => null} disabled={isSubmitting}>
              Cancel
            </Button>
          </>
        );
      }}
    </FormWrapper>
  );
};
