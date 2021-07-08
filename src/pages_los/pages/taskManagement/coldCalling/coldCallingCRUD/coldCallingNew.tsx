import CircularProgress from "@material-ui/core/CircularProgress";
import { SubmitFnType } from "packages/form";
import { useSnackbar } from "notistack";
import Button from "@material-ui/core/Button";
import { useMutation } from "react-query";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { coldCallingMetadata } from "../metadata";
import * as API from "./api";

interface ColdCallingFormDataFnType {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
}

const coldCallingFormDataFnWrapper = (coldCallingAddFn) => async ({
  data,
}: ColdCallingFormDataFnType) => {
  return coldCallingAddFn(data);
};

export const AddColdCalling = ({
  moduleType,
  isDataChangedRef,
  closeDialog,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const mutation = useMutation(
    coldCallingFormDataFnWrapper(API.addColCalling({ moduleType })),
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
        enqueueSnackbar("ColdCalling Added Successfully", {
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
      key="coldCalling"
      metaData={coldCallingMetadata as MetaDataType}
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
