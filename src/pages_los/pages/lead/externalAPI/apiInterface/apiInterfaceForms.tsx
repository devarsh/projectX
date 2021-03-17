import Button from "@material-ui/core/Button";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useQuery } from "react-query";
import { LOSSDK } from "registry/fns/los";
import loaderGif from "assets/images/loader.gif";

export const APIInterfaceForm = ({ metaData, formState, handleSubmitFn }) => {
  if (metaData?.form) {
    metaData.form.formState = formState;
  }
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
      // onSubmitHandler={handleSubmitFn}
      displayMode={"new"}
      disableGroupErrorDetection={true}
      disableGroupExclude={true}
      onSubmitHandler={(values, displayValues, endSubmit) => {
        console.log("values", values);
        endSubmit(true);
      }}
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
