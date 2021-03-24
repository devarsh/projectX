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
        headers: new Headers({
          "Content-Type": "application/json",
        }),
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

  //External API - called from dynamic form
  const validatePanNumber = async (currentField, _, formState) => {
    if (!Boolean(currentField?.value)) {
      return "";
    }
    if (
      /^([A-Za-z]){5}([0-9]){4}([A-Za-z]){1}$/.test(currentField?.value) ===
      false
    ) {
      return "Please enter valid format for Pan Card Number.";
    }
    const { status, data } = await internalFetcher(
      "./inquiry/external/pan/validate",
      {
        body: JSON.stringify({
          request_data: {
            doc_number: currentField?.value ?? "INVALID_PAN",
            refID: formState?.refID,
          },
          channel: "W",
        }),
      }
    );

    if (status === "success") {
      let result = { error: "", apiResult: data?.response_data?.name };
      return result;
    } else {
      return "Please enter valid Pan Card Number.";
    }
  };

  const requestEmailOTP = async (refID: number | string) => {
    const { data, status } = await internalFetcher(
      "./inquiry/external/email/validateRequest",
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

  const verifyEmailOTP = async (
    refID: number,
    emailTransactionID: string,
    emailOTP: string
  ) => {
    const { data, status } = await internalFetcher(
      "./inquiry/external/email/validateresponse",
      {
        body: JSON.stringify({
          request_data: {
            refID: refID,
            transactionID: emailTransactionID,
            OTP: emailOTP,
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

  const getCompanyNameFromGST = async (currentField, formState) => {
    const { status, data } = await internalFetcher(
      "./partnerinquiry/external/gst/fetchcompanyname",
      {
        method: "POST",
        body: JSON.stringify({
          request_data: {
            gstNumber: currentField?.value ?? "INVALID_GST",
            partnerInquiryID: formState?.refID,
          },
          channel: "W",
        }),
      }
    );
    if (status === "success") {
      let comapanyName = data?.response_data?.companyName;
      return comapanyName;
    } else {
      return "Invalid GST";
    }
  };

  return {
    inititateAPI,
    internalFetcher,
    baseURL,

    validatePanNumber,
    requestEmailOTP,
    verifyEmailOTP,
    getCompanyNameFromGST,
  };
};

export const CRMSDK = CRMAPI();
