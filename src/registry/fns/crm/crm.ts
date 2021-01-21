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
    try {
      if (baseURL === null) {
        return {
          status: "failure",
          data: "API not inititated",
        };
      }
      let response = await fetch(new URL(url, baseURL).href, {
        method: "GET",
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
  const getInquiryMetaData = async (state) => {
    const { action, ...others } = state;

    const { data, status } = await internalFetcher("./users/getMetaData", {
      body: JSON.stringify({
        action: action,
        request_data: others,
      }),
    });
    if (status === "success") {
      return data?.response_data ?? {};
    } else {
      return {};
    }
  };
  const sumibtInquiryData = async (
    submitAction?: string,
    formData?: any,
    navigationProps?: any,
    refID?: any
  ) => {
    //rename prodCode to formCode since backend uses prodCode as FormCode

    const { data, status } = await internalFetcher("./users/inquiry", {
      body: JSON.stringify({
        action: submitAction,
        request_data: { refID: refID, ...formData, ...navigationProps },
        channel: "W",
      }),
    });
    if (status === "success") {
      return { status, data: data?.response_data };
    } else {
      return { status, data: data?.response_data };
    }
  };

  return {
    inititateAPI,
  };
};

export const MiscSDK = CRMAPI();
