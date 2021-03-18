import { useCallback, useState } from "react";
import Button from "@material-ui/core/Button";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useMutation, useQuery } from "react-query";
import { LOSSDK } from "registry/fns/los";
import loaderGif from "assets/images/loader.gif";
import { useSnackbar } from "notistack";

interface docUploadInitiateFnType {
  formState: any;
  data: any;
  endSubmit?: any;
}

export const APIInterfaceForm = ({ metaData, formState, handleSubmitFn }) => {
  const { enqueueSnackbar } = useSnackbar();
  if (metaData?.form) {
    metaData.form.formState = formState;
  }

  const uploadDocument = async ({ data }: docUploadInitiateFnType) => {
    return LOSSDK.documentUploadInitiate(data, formState);
  };

  const uploadInitiate = useMutation(uploadDocument, {
    onMutate: () => {},
    onError: (error: any, { endSubmit }) => {
      let errorMsg = "Unknown Error occured";
      if (typeof error === "object") {
        errorMsg = error?.error_msg ?? errorMsg;
      }
      endSubmit(false, errorMsg);
      enqueueSnackbar(errorMsg, { variant: "error" });
    },
    onSuccess: (data, { endSubmit }) => {
      endSubmit(true, "");
      enqueueSnackbar("Success", {
        variant: "success",
      });
    },
  });

  const onSubmitHandler = useCallback(
    (values, endSubmit) => {
      uploadInitiate.mutate({ data: values, formState, endSubmit });
    },
    [uploadInitiate]
  );

  const result = useQuery(
    ["getLoanAmountForDocumentsForAPICallInterface", formState],
    () => LOSSDK.getLoanAmountForDocumentsForAPICallInterface({ formState })
  );

  const renderResult = result.isLoading ? (
    <img src={loaderGif} height="50px" width="50px" alt="loader" />
  ) : result.isError ? (
    <span>
      {
        //@ts-ignore
        result.error?.error_msg ?? "unknown error occured"
      }
    </span>
  ) : (
    <FormWrapper
      metaData={metaData as MetaDataType}
      initialValues={{ loanAmount: result?.data }}
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
              Proceed
            </Button>
          </>
        );
      }}
    </FormWrapper>
  );
  return renderResult;
};
