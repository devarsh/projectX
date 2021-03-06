import { CommonFetcherResponse } from "../type";

const MiddlewareAPI = () => {
  let baseURL: URL | null = null;
  let token: string | null = null;
  const inititateAPI = (APIURL: string) => {
    baseURL = new URL(APIURL);
  };
  const setToken = (accessToken: string) => {
    token = accessToken;
  };
  const removeToken = () => {
    token = null;
  };
  const isAPIInitialized = () => {
    if (token === null && baseURL === null) {
      return false;
    }
    return true;
  };

  const internalFetcher = async (
    url: string,
    payload: any
  ): Promise<CommonFetcherResponse> => {
    if (!isAPIInitialized()) {
      return {
        status: "failure",
        data: "Invalid token or API not initialized",
      };
    }
    try {
      const newURL = new URL(url, baseURL as URL);
      newURL.searchParams.append("signature", token ?? "");
      let response = await fetch(newURL.href, {
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

  const getCAMData = async ({ refID }) => {
    const { data, status } = await internalFetcher(`./lead/cam/data`, {
      body: JSON.stringify({
        request_data: {
          refID: refID,
        },
        channel: "W",
      }),
    });
    if (status === "success") {
      const { response_data, ...others } = data;
      return { data: response_data, others };
    } else {
      throw data?.error_data;
    }
  };

  return {
    inititateAPI,
    setToken,
    removeToken,
    getCAMData,
  };
};

export const MiddlewareSDK = MiddlewareAPI();
