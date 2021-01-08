import { FC } from "react";
import { APISDK } from "registry/fns/sdk";
import loaderGif from "assets/images/loader.gif";
import {
  ViewFormWrapper,
  isMetaDataValid,
  MetaDataType,
} from "components/dyanmicForm";
import { useQueries } from "react-query";

export const InquiryViewFormWrapper: FC<{
  inquiryID: string;
  inquiryType: "questionnaire" | "inquiry";
}> = ({ inquiryID, inquiryType }) => {
  const result = useQueries([
    {
      queryKey: ["viewMetaData", inquiryType, inquiryID],
      queryFn: () =>
        APISDK.getInquiryFormDisplayMetaData(inquiryID, inquiryType),
      cacheTime: 100000000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
    {
      queryKey: ["viewFormData", inquiryType, inquiryID],
      queryFn: () => APISDK.getInquiryFormDisplayData(inquiryID, inquiryType),
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
  let metaData = result[0].data;
  let formDisplayValues = result[1].data;
  if (loading === false && isError === false) {
    isError = !isMetaDataValid(metaData);
    if (isError === true) {
      errorMsg = "Error loading form";
    }
  }

  const renderResult = loading ? (
    <img src={loaderGif} alt="loader" />
  ) : isError === true ? (
    <span>{errorMsg}</span>
  ) : (
    <ViewFormWrapper
      metaData={metaData as MetaDataType}
      //@ts-ignore
      formDisplayValues={formDisplayValues}
    />
  );
  return renderResult;
};
