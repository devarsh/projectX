import { forwardRef } from "react";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { useQuery } from "react-query";
import { LOSSDK } from "registry/fns/los";
import loaderGif from "assets/images/loader.gif";

export const APIInterfaceForm = forwardRef<any, any>(
  (
    { metaData, formState, handleSubmitFn, inititalValues = undefined as any },
    ref
  ) => {
    if (metaData?.form) {
      metaData.form.formState = formState;
    }
    return (
      <FormWrapper
        ref={ref}
        metaData={metaData as MetaDataType}
        initialValues={inititalValues}
        onSubmitHandler={handleSubmitFn}
        displayMode={"new"}
        disableGroupErrorDetection={true}
        disableGroupExclude={true}
        hideTitleBar={true}
      />
    );
  }
);

export const BankAPIInterfaceWrapper = forwardRef<any, any>(
  ({ metaData, formState, handleSubmitFn }, ref) => {
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
        ref={ref}
        metaData={metaData}
        formState={formState}
        handleSubmitFn={handleSubmitFn}
        inititalValues={{ loanAmount: result?.data }}
      />
    );

    return renderResult;
  }
);
