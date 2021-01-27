import { CommonFetcherResponse } from "../type";

const CRMAPI = () => {
  let baseURL: URL | null = null;
  const inititateAPI = (APIURL: string) => {
    baseURL = new URL(APIURL);
  };
  const internalFetcher = async (
    url: string,
    payload: any
  ): Promise<CommonFetcherResponse> => {
    if (baseURL === null) {
      return {
        status: "failure",
        data: "API not inititated",
      };
    }
    try {
      let response = await fetch(new URL(url, baseURL).href, {
        method: "POST",
        ...payload,
      });
      if (String(response.status) === "200") {
        let data = await response.json();
        return {
          status: String(data.status) === "0" ? "success" : "failure",
          data: data,
        };
      } else {
        return {
          status: "failure",
          data: "",
        };
      }
    } catch (e) {
      return {
        status: "failure",
        data: e,
      };
    }
  };
  const getInquiryQuestionMetaData = async (state) => {
    const { action, ...others } = state;
    if (action === "crm_inquiry_metaData") {
      const { data, status } = await internalFetcher(
        "./inquiry/metaData/get/new",
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
      const { data, status } = await internalFetcher(
        "./inquiryQuestion/metaData/get/new",
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
      throw "Invalid Metadata type";
    }
  };

  const submitInquiryQuestionData = async (
    submitAction?: string,
    formData?: any,
    navigationProps?: any,
    refID?: any
  ) => {
    //rename prodCode to formCode since backend uses prodCode as FormCode
    if (submitAction === "inquiry") {
      const { data, status } = await internalFetcher("./inquiry/data/post", {
        body: JSON.stringify({
          request_data: { refID: refID, ...formData, ...navigationProps },
          channel: "W",
        }),
      });
      if (status === "success") {
        return { status, data: data?.response_data };
      } else {
        return { status, data: data?.response_data };
      }
    } else if (submitAction === "question") {
      const { data, status } = await internalFetcher(
        "./inquiryquestion/data/post",
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

  //External API - called from dynamic form
  const validatePanNumber = async (currentField) => {
    const { status } = await internalFetcher(
      "./inquiry/external/pan/validate",
      {
        body: JSON.stringify({
          request_data: { doc_number: currentField?.value ?? "INVALID_PAN" },
          channel: "W",
        }),
      }
    );
    if (status === "success") {
      return "";
    } else {
      return "invalid pan number";
    }
  };

  const initiateAadharValidation = async (refID) => {
    const { data, status } = await internalFetcher(
      "./inquiry/external/aadhar/initiate",
      {
        body: JSON.stringify({
          request_data: { refID: refID, sms: "0" },
          channel: "W",
        }),
      }
    );
    if (status === "success") {
      return { status, data: data?.response_data };
    } else {
      return { status, data: data?.error_data };
    }
  };
  const getAadharRequestStatus = async (aadharRequestID) => {
    const { data, status } = await internalFetcher(
      "./inquiry/external/aadhar/status",
      {
        body: JSON.stringify({
          request_data: {
            transactionID: aadharRequestID,
            updateStatus: "",
          },
          channel: "W",
        }),
      }
    );
    if (status === "success") {
      return { status, data: data?.response_data };
    } else {
      return { status, data: data?.error_data };
    }
  };

  const requestOTP = async (refID: number | string) => {
    const { data, status } = await internalFetcher(
      "./inquiry/external/otp/request",
      {
        body: JSON.stringify({
          request_data: {
            refID: refID,
          },
          channel: "W",
        }),
      }
    );
    if (status === "success") {
      return { status, data: data?.response_data };
    } else {
      return { status, data: data?.error_data };
    }
  };

  const verifyOTP = async (
    refID: string,
    transactionID: string,
    otp: string
  ) => {
    const { data, status } = await internalFetcher(
      "./inquiry/external/otp/verify",
      {
        body: JSON.stringify({
          request_data: {
            refID: refID,
            transaction_id: transactionID,
            otp: otp,
          },
          channel: "W",
        }),
      }
    );
    if (status === "success") {
      return { status, data: data?.response_data };
    } else {
      return { status, data: data?.error_data };
    }
  };

  //Extra API

  const getAadharRequestStatusEventSource = async (
    aadharRequestID
  ): Promise<CommonFetcherResponse> => {
    var urlEndPoint = new URL(
      `./inquiry/external/aadhar/statusSSE?transactionId=${aadharRequestID}`,
      baseURL as URL
    ).href;
    var eventSource = new EventSource(urlEndPoint);
    return new Promise((res) => {
      //@ts-ignore
      eventSource.addEventListener("transactionId", ({ data: eventData }) => {
        eventData = JSON.parse(eventData);
        console.log(eventData);
        let response: CommonFetcherResponse = { status: "failure", data: "" };
        if (eventData.status === "0") {
          response.status = "success";
          response.data = eventData?.response_data ?? {};
          res(response);
        } else {
          response.status = "failure";
          response.data = eventData?.response_data ?? {};
          res(response);
        }
        eventSource.close();
      });
    });
  };

  //Dummy function for metaData
  const getMetaData = async (productType, refID) => {
    const { data, status } = await internalFetcher(
      `./${productType}/metaData/get/new`,
      {
        body: JSON.stringify({
          refID: refID,
        }),
      }
    );
    if (status === "success") {
      return data?.response_data;
    } else {
      throw data?.error_data;
    }
  };

  return {
    inititateAPI,
    getInquiryQuestionMetaData,
    submitInquiryQuestionData,
    validatePanNumber,
    initiateAadharValidation,
    getAadharRequestStatus,
    verifyOTP,
    requestOTP,
    getAadharRequestStatusEventSource,
    getMetaData,
  };
};

export const CRMSDK = CRMAPI();
