import { CommonFetcherResponse, sessionObjType } from "../type";
import { isBroswer } from "./utils";

const LOSAPI = () => {
  let sessionObj: sessionObjType = {
    loginStatus: false,
    token: {},
  };
  let sessionToken;
  const createSession = async (APIURL: string) => {
    sessionObj.baseURL = new URL(APIURL);
    var formdata = new FormData();
    let existingSession = "";
    if (isBroswer()) {
      existingSession = localStorage.getItem("currentAccessToken") ?? "";
    }
    formdata.append("tokenId", existingSession);
    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };
    const url = new URL("./Login", sessionObj.baseURL);
    sessionToken = fetch(
      url.href,
      //@ts-ignore
      requestOptions
    );
    sessionToken
      .then((response) => response.json())
      .then((result) => {
        verifyRequest(result);
      });
    sessionToken.catch((error) => {
      verifyRequest(error);
    });
  };
  const verifyRequest = (data) => {
    if (data["access_token"] && data["refresh_token"]) {
      sessionObj.loginStatus = true;
      sessionObj.token = data;
      if (isBroswer()) {
        localStorage.setItem(
          "currentAccessToken",
          sessionObj?.token?.access_token ?? ""
        );
      }
    } else {
      sessionObj.loginStatus = false;
    }
  };
  const loginStatus = () => {
    return sessionObj.loginStatus;
  };

  const internalFetcher = async (
    url: string,
    payload: any
  ): Promise<CommonFetcherResponse> => {
    try {
      await sessionToken;
      await wait(); //wait of 1ms to execute code in next event loop cycle to make sure sessionToken has time to update sessionObj
      if (sessionObj.loginStatus === false) {
        return {
          status: "failure",
          data: new Error("session expired"),
        };
      }
      let response = await fetch(new URL(url, sessionObj.baseURL).href, {
        method: "POST",
        ...payload,
        headers: new Headers({
          Authorization: `Bearer ${sessionObj?.token?.access_token}`,
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
    createSession,
    loginStatus,
    authVeirfyUsername,
    authVerifyPassword,
  };
};

export const LOSSDK = LOSAPI();

export const wait = () => {
  return new Promise((res) => {
    setTimeout(() => res(true), 1);
  });
};
