import { Fragment } from "react";
import { useQuery, useMutation } from "react-query";
import loaderGif from "assets/images/loader.gif";
import { useStyleFormWrapper } from "./style";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import * as API from "./api";
interface InsertFormDataFnType {
  submitAction: string;
  data: object;
  navigationProps: any;
  refID: any;
  displayData?: object;
  endSubmit?: any;
}

const insertFormDataFnWrapper = async ({
  data,
  navigationProps,
  refID,
}: InsertFormDataFnType) => {
  return API.submitInquiryQuestionData("inquiry", data, navigationProps, refID);
};

export const InquiryFormWrapper = ({ navigationState, onSuccess }) => {
  const classes = useStyleFormWrapper();

  const mutation = useMutation(insertFormDataFnWrapper, {
    onError: (error: any, { endSubmit }) => {
      let errorMsg = "Unknown Error occured";
      if (typeof error === "object") {
        errorMsg = error?.error_msg ?? errorMsg;
      }
      endSubmit(false, errorMsg, error?.error_detail ?? "");
    },
    onSuccess: (data, { endSubmit, refID }) => {
      endSubmit(true, "");
      if (typeof onSuccess === "function") {
        onSuccess(refID);
      }
    },
  });
  const onSubmitHandler = (data, displayData, endSubmit, setFieldError) => {
    mutation.mutate({
      //@ts-ignore
      navigationProps: navigationState?.metaProps ?? {},
      submitAction: metaData?.form?.submitAction ?? "NO_ACTION_FOUND",
      refID: metaData?.form?.refID,
      data,
      displayData,
      endSubmit,
    });
  };

  const result = useQuery(
    //@ts-ignore
    ["inquiryOrQuestion", "new", navigationState?.metaProps],
    //@ts-ignore
    () => API.getInquiryQuestionMetaData(navigationState?.metaProps ?? {}),
    {
      cacheTime: 0,
    }
  );
  let metaData: MetaDataType = {} as MetaDataType;
  if (result.isSuccess) {
    metaData = JSON.parse(JSON.stringify(result.data)) as MetaDataType;
    if (metaData?.form?.render?.renderType === "stepper") {
      metaData.form.render.renderType = "tabs";
    }
  }
  const renderResult = result.isLoading ? (
    <img
      src={loaderGif}
      className={classes.loader}
      width="50px"
      height="50px"
      alt="loader"
    />
  ) : result.isError ? (
    //@ts-ignore
    <span>{result?.error?.error_msg ?? "Unkown error occured"}</span>
  ) : (
    <Fragment>
      <FormWrapper
        //@ts-ignore
        key={`${result.dataUpdatedAt}`}
        metaData={metaData as MetaDataType}
        initialValues={{}}
        onSubmitHandler={onSubmitHandler}
      >
        {({ isSubmitting, handleSubmit }) => {
          return (
            <>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                endIcon={isSubmitting ? <CircularProgress size={20} /> : null}
              >
                Submit
              </Button>
            </>
          );
        }}
      </FormWrapper>
    </Fragment>
  );
  return renderResult;
};
