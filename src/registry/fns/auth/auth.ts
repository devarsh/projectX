import { CommonFetcherResponse } from "../type";

const authAPI = () => {
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
  const authVeirfyUsername = async (userName: any, loginType: string) => {
    const { data, status } = await internalFetcher(
      `./users/los/auth/${loginType}/login`,
      {
        body: JSON.stringify({
          request_data: {
            userId: userName,
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

  const authVerifyPassword = async (transactionId, password, loginType) => {
    const { data, status } = await internalFetcher(
      `./users/los/auth/${loginType}/verify`,
      {
        body: JSON.stringify({
          request_data: {
            transactionId: transactionId,
            password: password,
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

  return {
    inititateAPI,
    authVeirfyUsername,
    authVerifyPassword,
  };
};

export const AuthSDK = authAPI();
