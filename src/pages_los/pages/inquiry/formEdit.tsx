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
}> = ({ inquiryID, inquiryType }) => {
  const mutation = useMutation(updateFormData, {
    onError: (error: any, { endSubmit }) => {
      if (typeof error === "object") {
        console.log(error?.error_msg);
      }
      endSubmit(false, error);
    },
    onSuccess: (data, { endSubmit }) => {
      endSubmit(true, "");
      queryClient.refetchQueries(["viewFormData", inquiryType, inquiryID]);
      queryClient.refetchQueries(["editFormData", inquiryType, inquiryID]);
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
      key={`${inquiryID}-${inquiryType}`}
      metaData={metaData as MetaDataType}
      initialValues={formEditData as InitialValuesType}
      onSubmitHandler={onSubmitHandler}
    />
  );
  return renderResult;
};
