import { CommonFetcherResponse } from "../type";

const VerificationAPI = () => {
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

  return {
    inititateAPI,
    internalFetcher,
    baseURL,
  };
};

export const VerificationSDK = VerificationAPI();
