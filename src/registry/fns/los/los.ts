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
  // const validatePanNumber = async (currentField) => {
  //   const { status } = await internalFetcher("./users/panvalidator", {
  //     body: JSON.stringify({
  //       action: "panvalidator",
  //       request_data: { doc_number: currentField?.value ?? "INVALID_PAN" },
  //       channel: "W",
  //     }),
  //   });
  //   if (status === "success") {
  //     return "";
  //   } else {
  //     return "invalid pan number";
  //   }
  // };

  // const initiateAadharValidation = async (refID) => {
  //   const { data, status } = await internalFetcher(
  //     "./users/initiateaadharreq",
  //     {
  //       body: JSON.stringify({
  //         action: "initiateaadharreq",
  //         request_data: { refID: refID, sms: "0" },
  //         channel: "W",
  //       }),
  //     }
  //   );
  //   if (status === "success") {
  //     return { status, data: data?.response_data };
  //   } else {
  //     return { status, data: data?.error_data };
  //   }
  // };
  // const fetchAadharRequestStatus = async (aadharRequestID) => {
  //   //console.log(refIdForAadhar);
  //   const { data, status } = await internalFetcher(
  //     "./users/fetchaadharstatus",
  //     {
  //       body: JSON.stringify({
  //         action: "aadharstatus",
  //         request_data: {
  //           transactionID: aadharRequestID,
  //           updateStatus: "",
  //         },
  //         channel: "W",
  //       }),
  //     }
  //   );
  //   if (status === "success") {
  //     return { status, data: data?.response_data };
  //   } else {
  //     return { status, data: data?.error_data };
  //   }
  // };
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

  // const sumibtInquiryData = async (
  //   submitAction?: string,
  //   formData?: any,
  //   navigationProps?: any,
  //   refID?: any
  // ) => {
  //   //rename prodCode to formCode since backend uses prodCode as FormCode

  //   const { data, status } = await internalFetcher("./users/inquiry", {
  //     body: JSON.stringify({
  //       action: submitAction,
  //       request_data: { refID: refID, ...formData, ...navigationProps },
  //       channel: "W",
  //     }),
  //   });
  //   if (status === "success") {
  //     return { status, data: data?.response_data };
  //   } else {
  //     return { status, data: data?.response_data };
  //   }
  // };

  const getInquiryFormData = async (inquiryID: string, type: string) => {
    const { data, status } = await internalFetcher("./users/inquiry", {
      body: JSON.stringify({
        action:
          type === "inquiry"
            ? "crm_inquiry_edit_data"
            : "crm_questionnaire_edit_data",
        request_data: {
          refID: inquiryID,
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
  const getInquiryFormDisplayData = async (inquiryID: string, type: string) => {
    const { data, status } = await internalFetcher("./users/inquiry", {
      body: JSON.stringify({
        action:
          type === "inquiry"
            ? "crm_inquiry_view_data"
            : "crm_questionnaire_view_data",
        request_data: {
          refID: inquiryID,
        },
      }),
    });
    if (status === "success") {
      return data?.response_data;
    } else {
      throw data?.error_data;
    }
  };
  //change this API to fetch against refID
  const getInquiryFormDisplayMetaData = async (
    inquiryID: string,
    type: string
  ) => {
    const { data, status } = await internalFetcher("./users/getMetaData", {
      body: JSON.stringify({
        action:
          type === "inquiry"
            ? "crm_inquiry_view_metaData"
            : "crm_questionnaire_view_metaData",
        request_data: {
          refID: inquiryID,
        },
      }),
    });
    if (status === "success") {
      return data?.response_data;
    } else {
      throw data?.error_data;
    }
  };

  const getInquiryFormEditMetaData = async (
    inquiryID: string,
    type: string
  ) => {
    const { data, status } = await internalFetcher("./users/getMetaData", {
      body: JSON.stringify({
        action:
          type === "inquiry"
            ? "crm_inquiry_edit_metaData"
            : "crm_questionnaire_edit_metaData",
        request_data: {
          refID: inquiryID,
        },
      }),
    });
    if (status === "success") {
      return data?.response_data;
    } else {
      throw data?.error_data;
    }
  };

  const updateInquiryFormData = async (
    InquiryID: string,
    type: string,
    fromData: any
  ) => {
    const { data, status } = await internalFetcher("./users/inquiry", {
      body: JSON.stringify({
        action: type === "inquiry" ? "inquiry_update" : "questionnaire_update",
        request_data: {
          refID: InquiryID,
          ...fromData,
        },
      }),
    });
    console.log(data, status);
    if (status === "success") {
      return data?.response_data;
    } else {
      throw data?.error_data;
    }
  };

  const fetchGridMetaData = async (gridCode) => {
    const { data, status } = await internalFetcher("./users/getInquiryData", {
      body: JSON.stringify({
        action: "grid_form_data",
        request_data: {
          grid_code: gridCode,
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
  const fetchGridData = async (gridCode, fromNo, toNo, sortBy, filterBy) => {
    const { data, status } = await internalFetcher("./users/getInquiryData", {
      body: JSON.stringify({
        action: "inquiry_data_pagewise",
        request_data: {
          grid_code: gridCode,
          from_row: fromNo,
          to_row: toNo,
          orderby_columns: sortBy,
          filter_conditions: filterBy,
        },
      }),
    });
    if (status === "success") {
      return { status, data: data?.response_data };
    } else {
      return { status, data: data?.error_data };
    }
  };
  const fetchGridColumnFilterProps = async (gridCode, options) => {
    /*
    options = {accessor:'column_id',result_type:'getGroups|getRange',filter_conditions:[]}
    */
    const { data, status } = await internalFetcher("./users/getInquiryData", {
      body: JSON.stringify({
        action: "grid_column_options",
        request_data: {
          grid_code: gridCode,
          ...options,
        },
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

  const uploadDocuments = async (
    files: File[],
    docID: string,
    refID: string,
    progressHandler: any = () => {},
    completeHandler: any = () => {}
  ) => {
    await sessionToken;
    await wait(); //wait of 1ms to execute code in next event loop cycle to make sure sessionToken has time to update sessionObj
    const newURL = new URL("./users/crm/document/upload", sessionObj.baseURL)
      .href;
    let formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
    }
    formData.append("refID", refID);
    formData.append("docID", docID);
    formData.append("action", "upload");
    let xhr = new XMLHttpRequest();
    xhr.open("POST", newURL, true);
    xhr.setRequestHeader(
      "Authorization",
      `Bearer ${sessionObj?.token?.access_token}`
    );
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        var precentage = Math.round((e.loaded / e.total) * 100);
        progressHandler(precentage);
      } else {
        progressHandler(Infinity);
      }
    };
    xhr.onload = (e) => {
      try {
        const result = JSON.parse(xhr.responseText);
        if (result.status === "0") {
          completeHandler({ status: "success", data: result?.response_data });
        } else {
          completeHandler({ status: "failure", data: result?.error_data });
        }
      } catch (e) {
        completeHandler({
          status: "failure",
          data: { message: "unknown error occured" },
        });
      }
    };
    xhr.send(formData);
  };

  const getDocumentTemplate = async (refID: string) => {
    const { data, status } = await internalFetcher(
      "./users/crm/document/template",
      {
        body: JSON.stringify({
          action: "document_template",
          request_data: {
            refID: refID,
          },
          channel: "W",
        }),
      }
    );
    if (status === "success") {
      return data?.response_data;
    } else {
      throw data?.error_data;
    }
  };

  const getDocuments = async (refID: string) => {
    const { data, status } = await internalFetcher(
      "./users/crm/document/template",
      {
        body: JSON.stringify({
          action: "view_document",
          request_data: {
            refID: refID,
          },
          channel: "W",
        }),
      }
    );
    if (status === "success") {
      return data?.response_data;
    } else {
      throw data?.error_data;
    }
  };

  const verifyDocuments = async (refID: string, flag: string) => {
    const { data, status } = await internalFetcher(
      "./users/crm/document/vefiy",
      {
        body: JSON.stringify({
          action: "verify_document",
          request_data: {
            refID: refID,
            docStatus: flag,
          },
          channel: "W",
        }),
      }
    );
    if (status === "success") {
      return data?.response_data;
    } else {
      throw data?.error_data;
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
    //validatePanNumber,
    //requestOTP,
    //verifyOTP,
    //initiateAadharValidation,
    //fetchAadharRequestStatus,
    submitBecomePartnerData,

    //sumibtInquiryData,

    getInquiryFormData,
    getInquiryFormDisplayData,
    getInquiryFormDisplayMetaData,
    getInquiryFormEditMetaData,
    updateInquiryFormData,

    fetchGridMetaData,
    fetchGridColumnFilterProps,
    fetchGridData,

    //Need to fix these APIS
    //fetchAadharRequestStatusEventSource,
    updateUserPassword,
    verifyPwd,
    getDashboardEmployeeDataList,
    checkPhoneNumberExists,
    getInquiryDataToConvertIntoLead,

    //For inquiry assign to employee
    getEmployeeListToAssignLead,
    inquiryAssignToLead,

    getHealthCheckScore,
    uploadDocuments,
    getDocumentTemplate,
    getDocuments,
    verifyDocuments,

    //login API's for customer and employee
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
