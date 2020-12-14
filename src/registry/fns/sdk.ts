import { OptionsProps } from "components/common/types";
import { osName } from "react-device-detect";

interface CommonFetcherResponse {
  data: any;
  status: "success" | "failure";
}
type ExternalResponse = any;

interface sessionObjType {
  baseURL?: URL;
  loginStatus: boolean;
  token?: any;
}

const RaatnaFinAPI = () => {
  let sessionObj: sessionObjType = {
    loginStatus: false,
    token: {},
  };
  let sessionToken;
  const createSession = async (APIURL: string) => {
    sessionObj.baseURL = new URL(APIURL);
    var myHeaders = new Headers();
    myHeaders.append("mac_id", "null");
    myHeaders.append("client_id", "null");
    myHeaders.append("host_name", "null");
    myHeaders.append("os_name", osName);
    myHeaders.append(
      "Authorization",
      `Basic ${btoa(`ratnaafin-acute-client:ratnaafin-acute-client-secret`)}`
    );
    var formdata = new FormData();
    formdata.append("grant_type", "password");
    formdata.append("username", "UUID");
    formdata.append("password", "Windows 8.1");
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
    const url = new URL("./oauth/token", sessionObj.baseURL);
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
    } else {
      sessionObj.loginStatus = false;
    }
  };
  const loginStatus = () => {
    return sessionObj.loginStatus;
  };

  const externalFetcher = async (
    url: string,
    payload: any
  ): Promise<ExternalResponse> => {
    try {
      let response = await fetch(url, payload);
      let data = await response.json();
      return data;
    } catch (e) {
      return new Error(`Error fetching data-${e.message}`);
    }
  };
  const getPincode = async (
    pincode: string
  ): Promise<{ options: OptionsProps[]; others: any }> => {
    const data = await externalFetcher(
      `https://api.postalpincode.in/pincode/${pincode}`,
      {
        method: "GET",
        redirect: "follow",
      }
    );
    if (Array.isArray(data) && data.length === 1) {
      let result = data[0];
      if (String(result.Status).toLowerCase() === "success") {
        let areaArray = result.PostOffice.map((dtl) => ({
          value: dtl?.Name,
          label: dtl?.Name,
        }));
        areaArray = [{ label: "Select option", value: "00" }, ...areaArray];
        const otherValues = result.PostOffice.reduce((accumlator, current) => {
          const val = {
            city: current.Block,
            district: current.District,
            state: current.State,
            country: current.Country,
          };
          accumlator[current.Name] = val;
          return accumlator;
        }, {});
        return { options: areaArray, others: otherValues };
      }
    }
    return {
      options: [{ label: "Error fetching pincode", value: "0" }],
      others: null,
    };
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
          Authorization: `Bearer ${sessionObj.token.access_token}`,
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

  const getProductType = async (
    _: any,
    productCode: string
  ): Promise<OptionsProps[]> => {
    const { status, data } = await internalFetcher("./users/get_sub_product", {
      body: JSON.stringify({
        action: "get_sub_product",
        request_data: {
          code: productCode,
        },
        channel: "W",
      }),
    });
    if (status === "success" && Array.isArray(data.response_data)) {
      const newArray = data.response_data.map((one) => ({
        value: one?.sub_prod_code,
        label: one?.sub_prod_desc,
      }));
      return newArray;
    }
    return [
      {
        label: "oops error loading..",
        value: 1,
      },
    ];
  };
  const getPropertyCity = async (): Promise<OptionsProps[]> => {
    const { status, data } = await internalFetcher(
      "./users/get_property_city",
      {
        body: JSON.stringify({
          action: "get_property_city",
          request_data: {
            property_city: "",
          },
          channel: "W",
        }),
      }
    );
    if (status === "success" && Array.isArray(data.response_data)) {
      const newArray = data.response_data.map((one) => ({
        value: one?.data_val,
        label: one?.display_val,
      }));
      return newArray;
    }
    return [
      {
        label: "oops error loading..",
        value: 1,
      },
    ];
  };
  const getBankList = async (): Promise<OptionsProps[]> => {
    const { status, data } = await internalFetcher("./users/getBankList", {
      body: JSON.stringify({
        action: "get_bank_list",
        request_data: {
          get_bank_list: "",
        },
        channel: "W",
      }),
    });
    if (status === "success" && Array.isArray(data.response_data)) {
      const newArray = data.response_data.map((one) => ({
        value: one?.bank_cd,
        label: one?.bank_name,
      }));
      return newArray;
    }
    return [
      {
        label: "oops error loading..",
        value: 1,
      },
    ];
  };

  const getMiscVal = (categCode: string) => async (): Promise<
    OptionsProps[]
  > => {
    const { status, data } = await internalFetcher("./users/getmiscval", {
      body: JSON.stringify({
        action: "get_misc_val",
        request_data: {
          category_nm: categCode,
        },
        channel: "W",
      }),
    });
    if (status === "success" && Array.isArray(data.response_data)) {
      const newArray = data.response_data.map((one) => ({
        value: one?.data_val,
        label: one?.display_val,
      }));
      return newArray;
    }
    return [
      {
        label: "oops error loading..",
        value: 1,
      },
    ];
  };

  const requestForOTP = async (phoneNumber: string) => {
    const { data, status } = await internalFetcher("./users/OTPSent", {
      body: JSON.stringify({
        action: "OTPSent",
        request_data: {
          mobile: phoneNumber,
          password: "",
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

  const handleverifyOtp = async (mobileNumber: string, otp: string) => {
    const { data, status } = await internalFetcher("./users/OTPVerify", {
      body: JSON.stringify({
        action: "OTPVerify",
        request_data: {
          mobile_number: mobileNumber,
          otp: otp,
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

  const handleverifyPwd = async (password: string, phoneNumber: string) => {
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

  const getMetaData = async (state) => {
    const { prodCode, empCode } = state;
    const { data, status } = await internalFetcher("./users/getMetaData", {
      body: JSON.stringify({
        action: "render_form",
        request_data: {
          main_prod_cd: `${prodCode}`,
          empl_cd: `${empCode}`,
        },
      }),
    });
    if (status === "success") {
      return data?.response_data ?? {};
    } else {
      return {};
    }
  };
  const pushFormData = async (
    submitAction?: string,
    formData?: any,
    navigationProps?: any
  ) => {
    //rename prodCode to formCode since backend uses prodCode as FormCode
    const { prodCode, ...others } = navigationProps;
    const { data, status } = await internalFetcher("./users/inquiry", {
      body: JSON.stringify({
        action: submitAction,
        request_data: { ...formData, ...others, formCode: prodCode },
        channel: "W",
      }),
    });
    if (status === "success") {
      return { status, data: data?.response_data };
    } else {
      return { status, data: data?.response_data };
    }
  };
  //remove this function after migration
  const getAccessToken = async () => {
    await sessionToken;
    if (sessionObj?.token["access_token"]) {
      return `Bearer ${sessionObj?.token["access_token"]}`;
    }
    return "Bearer not_valid_token";
  };

  const getsubProductDtl = async (fieldData) => {
    if (fieldData.value.length !== 0) {
      let codes = await getProductType(null, fieldData.value);
      return {
        subProductType: {
          options: codes,
          value: "00",
        },
      };
    } else if (fieldData.value === "") {
      return {
        subProductType: {
          options: [],
          value: "",
        },
      };
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

  const getDashdoardDisplayEmpDetails = async (inquiryCode: string) => {
    const { data, status } = await internalFetcher(
      "./users/getInquiryDetails",
      {
        body: JSON.stringify({
          action: "get_inquiry_details",
          request_data: {
            inquiry_code: inquiryCode,
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

  const submitBecomePartnerData = async (submitAction, formData?: any) => {
    const { data, status } = await internalFetcher("./users/become_partner", {
      body: JSON.stringify({
        action: submitAction,
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

  const validatePanNumber = async (currentField) => {
    const { data, status } = await internalFetcher("./users/panvalidator", {
      body: JSON.stringify({
        action: "panvalidator",
        request_data: { doc_number: currentField?.value ?? "INVALID_PAN" },
        channel: "W",
      }),
    });
    if (status === "success") {
      return "";
    } else {
      return "invalid pan number";
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

  const initiateAadharValidation = async (tranCode) => {
    const { data, status } = await internalFetcher(
      "./users/aadharUniqueURLReq",
      {
        body: JSON.stringify({
          action: "aadharUniqueURLReq",
          request_data: { inquiryID: tranCode },
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

  const fetchAadharRequestStatus = async (aadharRequestID) => {
    //console.log(refIdForAadhar);
    const { data, status } = await internalFetcher(
      "./users/fetchaadharstatus",
      {
        body: JSON.stringify({
          action: "aadharstatus",
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

  const fetchAadharRequestStatusEventSource = async (
    aadharRequestID
  ): Promise<CommonFetcherResponse> => {
    var urlEndPoint = `https://digix.aiplsolution.in/ratnaafin/users/getaadharstatus?transactionId=${aadharRequestID}`;
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

  return {
    createSession,
    loginStatus,
    getPincode,
    getProductType,
    getPropertyCity,
    getBankList,
    getMiscVal,
    getAccessToken,
    requestForOTP,
    getMetaData,
    pushFormData,
    handleverifyOtp,
    handleverifyPwd,
    getsubProductDtl,
    getDashboardEmployeeDataList,
    getDashdoardDisplayEmpDetails,
    submitBecomePartnerData,
    validatePanNumber,
    checkPhoneNumberExists,
    updateUserPassword,
    initiateAadharValidation,
    fetchAadharRequestStatus,
    fetchAadharRequestStatusEventSource,
  };
};

export const APISDK = RaatnaFinAPI();

export const wait = () => {
  return new Promise((res) => {
    setTimeout(() => res(true), 1);
  });
};
