import { CRMSDK } from "registry/fns/crm";

export const getInquiryQuestionMetaData = async (state) => {
  const { action, ...others } = state;
  if (action === "crm_inquiry_metaData") {
    const { data, status } = await CRMSDK.internalFetcher(
      "./inquiry/main/metaData/new",
      {
        body: JSON.stringify({
          request_data: others,
        }),
      }
    );
    if (status === "success") {
      return data?.response_data;
    } else {
      throw data?.error_data;
    }
  } else if (action === "crm_questionnaire_metaData") {
    const { data, status } = await CRMSDK.internalFetcher(
      "./inquiry/question/metaData/new",
      {
        body: JSON.stringify({
          request_data: others,
        }),
      }
    );
    if (status === "success") {
      return data?.response_data;
    } else {
      throw data?.error_data;
    }
  } else {
    throw new Error("Invalid Metadata type");
  }
};

export const submitInquiryQuestionData = async (
  submitAction?: string,
  formData?: any,
  navigationProps?: any,
  refID?: any
) => {
  //rename prodCode to formCode since backend uses prodCode as FormCode
  if (submitAction === "inquiry") {
    const { data, status } = await CRMSDK.internalFetcher(
      "./inquiry/main/data/post",
      {
        body: JSON.stringify({
          request_data: { refID: refID, ...formData, ...navigationProps },
          channel: "W",
        }),
      }
    );
    if (status === "success") {
      return { status, data: data?.response_data };
    } else {
      return { status, data: data?.response_data };
    }
  } else if (submitAction === "question") {
    const { data, status } = await CRMSDK.internalFetcher(
      "./inquiry/question/data/post",
      {
        body: JSON.stringify({
          request_data: { refID: refID, ...formData, ...navigationProps },
          channel: "W",
        }),
      }
    );
    if (status === "success") {
      return { status, data: data?.response_data };
    } else {
      return { status, data: data?.response_data };
    }
  } else {
    return { status: "failure", data: "invalid submitAction" };
  }
};
