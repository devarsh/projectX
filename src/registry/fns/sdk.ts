//import { OptionsProps } from "components/common/types";
import { CommonFetcherResponse, sessionObjType } from "./type";

import { isBroswer } from "./utils";

const RaatnaFinAPI = () => {
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
      let response = await fetch(new URL(url, baseURL as URL).href, {
        method: "POST",
        ...payload,
        headers: new Headers({
          Authorization: `Bearer ${token}`,
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

  const submitBecomePartnerData = async (formData?: any) => {
    const { data, status } = await internalFetcher("./users/become_partner", {
      body: JSON.stringify({
        action: "become_partner",
        request_data: { ...formData },
        channel: "W",
      }),
    });
    if (status === "success") {
      return { status, data: data?.response_data };
    } else {
      return { status, data: data?.response_data };
    }
  };

  //change this API to fetch against refID

  const updateUserPassword = async (
    confirmPassword: string,
    phoneNumber: string
  ) => {
    const { data, status } = await internalFetcher("./users/set_password", {
      body: JSON.stringify({
        action: "set_password",
        request_data: {
          mobile: phoneNumber,
          password: confirmPassword,
        },
        channel: "W",
      }),
    });
    if (status === "success") {
      return { status, data: data?.response_data };
    } else {
      return { status, data: data?.error_data };
    }
  };

  const verifyPwd = async (phoneNumber: string, password: string) => {
    const { data, status } = await internalFetcher("./users/customer_login", {
      body: JSON.stringify({
        action: "customer_login",
        request_data: {
          mobile: phoneNumber,
          password: password,
        },
        channel: "W",
      }),
    });
    if (status === "success") {
      return { status, data: data?.response_data };
    } else {
      return { status, data: data?.error_data };
    }
  };

  const getDashboardEmployeeDataList = async () => {
    const { data, status } = await internalFetcher("./users/getInquiryData", {
      body: JSON.stringify({
        action: "get_inquiry_data",
        request_data: {
          status: "P",
        },
        channel: "W",
      }),
    });

    if (status === "success") {
      return { status, data: data?.response_data };
    } else {
      return { status, data: data?.error_data };
    }
  };
  const checkPhoneNumberExists = async (phoneNumber) => {
    const { data, status } = await internalFetcher("./users/verify_user", {
      body: JSON.stringify({
        action: "verify_user",
        request_data: { mobile: phoneNumber },
        channel: "W",
      }),
    });

    if (status === "success") {
      return { status, data: data?.response_data };
    } else {
      return { status, data: data?.error_data };
    }
  };
  const getInquiryDataToConvertIntoLead = async (refID) => {
    const { data, status } = await internalFetcher("./users/getMetaData", {
      body: JSON.stringify({
        action: "crm_inquiry_view",
        request_data: {
          refID: refID,
        },
        channel: "W",
      }),
    });

    if (status === "success") {
      return { status, data: data?.response_data };
    } else {
      return { status, data: data?.error_data };
    }
  };

  const getEmployeeListToAssignLead = async (branchCode) => {
    const { data, status } = await internalFetcher("./users/getEmployeeList", {
      body: JSON.stringify({
        action: "get_employee_list",
        request_data: {
          branch_code: branchCode,
        },
      }),
    });
    if (status === "success") {
      return data?.response_data;
    } else {
      throw data?.error_data;
    }
  };

  const inquiryAssignToLead = async (
    refID: any,
    empIDToAssignLead: any,
    inquiryStatus: string
  ) => {
    const { data, status } = await internalFetcher("./users/inquiryAssign", {
      body: JSON.stringify({
        action: "inquiryAssign",
        request_data: {
          refID: refID,
          assignID: empIDToAssignLead,
          inquiryStatus: inquiryStatus,
        },
        channel: "W",
      }),
    });
    if (status === "success") {
      return data?.response_data;
    } else {
      throw data?.error_data;
    }
  };

  const getHealthCheckScore = async (refID: string) => {
    const { data, status } = await internalFetcher("./users/healthcheck  ", {
      body: JSON.stringify({
        action: "healthcheck",
        request_data: {
          refID: refID,
        },
        channel: "W",
      }),
    });
    if (status === "success") {
      return { status, data: data?.response_data };
    } else {
      return { status, data: data?.error_data };
    }
  };

  return {
    submitBecomePartnerData,

    //Need to fix these APIS

    updateUserPassword,
    verifyPwd,
    getDashboardEmployeeDataList,
    checkPhoneNumberExists,
    getInquiryDataToConvertIntoLead,

    //For inquiry assign to employee
    getEmployeeListToAssignLead,
    inquiryAssignToLead,

    getHealthCheckScore,

    //login API's for customer and employee
  };
};

export const APISDK = RaatnaFinAPI();

export const wait = () => {
  return new Promise((res) => {
    setTimeout(() => res(true), 1);
  });
};
