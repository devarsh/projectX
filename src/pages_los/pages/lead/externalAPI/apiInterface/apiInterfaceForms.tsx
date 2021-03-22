import Button from "@material-ui/core/Button";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useQuery } from "react-query";
import { LOSSDK } from "registry/fns/los";
import loaderGif from "assets/images/loader.gif";

export const APIInterfaceForm = ({
  metaData,
  formState,
  handleSubmitFn,
  inititalValues = undefined as any,
}) => {
  if (metaData?.form) {
    metaData.form.formState = formState;
  }
  return (
    <FormWrapper
      metaData={metaData as MetaDataType}
      initialValues={inititalValues}
      onSubmitHandler={handleSubmitFn}
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
};

export const BankAPIInterfaceWrapper = ({
  metaData,
  formState,
  handleSubmitFn,
}) => {
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
    <APIInterfaceForm
      metaData={metaData}
      formState={formState}
      handleSubmitFn={handleSubmitFn}
      inititalValues={{ loanAmount: result?.data }}
    />
  );

  return renderResult;
};
