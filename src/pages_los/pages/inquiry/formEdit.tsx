import { FC } from "react";
import { APISDK } from "registry/fns/sdk";
import loaderGif from "assets/images/loader.gif";
import FormWrapper, {
  isMetaDataValid,
  MetaDataType,
} from "components/dyanmicForm";
import { SubmitFnType, InitialValuesType } from "packages/form";
import { useMutation, useQueries } from "react-query";
import { transformMetaDataForEdit } from "pages_los/utils/transformMetaDataForEdit";
import { queryClient } from "./cache";

interface updateFormDataType {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
  inquiryID: string;
  inquiryType: "questionnaire" | "inquiry";
}

const updateFormData = async ({
  data,
  inquiryID,
  inquiryType,
}: updateFormDataType) => {
  return APISDK.updateInquiryFormData(inquiryID, inquiryType, data);
};

export const InquiryEditFormWrapper: FC<{
  inquiryID: string;
  inquiryType: "questionnaire" | "inquiry";
  moveToViewForm: any;
  setUserMessage: any;
}> = ({ inquiryID, inquiryType, moveToViewForm, setUserMessage }) => {
  if (typeof setUserMessage !== "function") {
    setUserMessage = () => alert("userMessage function not set");
  }
  if (typeof moveToViewForm !== "function") {
    moveToViewForm = () => alert("move to view form function not set");
  }
  const mutation = useMutation(updateFormData, {
    onError: (error: any, { endSubmit }) => {
      let errorMsg = "Unknown Error occured";
      if (typeof error === "object") {
        errorMsg = error?.error_msg ?? errorMsg;
      }
      endSubmit(false, errorMsg);
      setUserMessage({
        type: "error",
        message: errorMsg,
      });
    },
    onSuccess: (data, { endSubmit }) => {
      queryClient.refetchQueries(["viewFormData", inquiryType, inquiryID]);
      queryClient.refetchQueries(["editFormData", inquiryType, inquiryID]);
      endSubmit(true, "");
      console.log("saved");
      setUserMessage({
        type: "success",
        message: "Changes successfully saved",
      });
      moveToViewForm();
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
      inquiryID,
      inquiryType,
    });
  };

  const result = useQueries([
    {
      queryKey: ["editMetaData", inquiryType, inquiryID],
      queryFn: () => APISDK.getInquiryFormEditMetaData(inquiryID, inquiryType),
      cacheTime: 100000000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
    {
      queryKey: ["editFormData", inquiryType, inquiryID],
      queryFn: () => APISDK.getInquiryFormData(inquiryID, inquiryType),
      cacheTime: 100000000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  ]);
  const dataUniqueKey = result[1].dataUpdatedAt;

  const loading = result[0].isLoading || result[1].isLoading;
  let isError = result[0].isError || result[1].isError;
  //@ts-ignore
  let errorMsg = `${result[0].error?.error_msg ?? ""} ${
    //@ts-ignore
    result[1].error?.error_msg ?? ""
  }`;
  let metaData = JSON.parse(
    JSON.stringify(result[0].data ?? {})
  ) as MetaDataType;
  let formEditData = result[1].data;
  if (loading === false && isError === false) {
    isError = !isMetaDataValid(metaData);
    if (isError === false) {
      metaData = transformMetaDataForEdit(metaData as MetaDataType);
    } else {
      errorMsg = "Error loading form";
    }
  }

  //for some odd reason our formWrapper is called without initial values need to find out why

  const renderResult = loading ? (
    <img src={loaderGif} alt="loader" />
  ) : isError === true ? (
    <span>{errorMsg}</span>
  ) : (
    <FormWrapper
      key={`${inquiryID}-${inquiryType}-${dataUniqueKey}-editMode`}
      metaData={metaData as MetaDataType}
      initialValues={formEditData as InitialValuesType}
      onSubmitHandler={onSubmitHandler}
      onCancleHandler={moveToViewForm}
    />
  );
  return renderResult;
};
