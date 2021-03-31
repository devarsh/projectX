import { CommonFetcherResponse } from "../type";

const LOSAPI = () => {
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
  const getToken = () => {
    return token;
  };
  const isAPIInitialized = () => {
    if (token === null && baseURL === null) {
      return false;
    }
    return true;
  };
  const getBaseURL = () => {
    return baseURL;
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

  //***END of docs API */

  //We will use theme for lead and inquiry alike - for now only enabled for lead
  //  moduleType - lead/inquiry
  // productType - products within this module

  ///--------------------CAM crud metaData

  const getLeadSubStageCode = async (dependentFields: any, formState: any) => {
    const { status, data } = await internalFetcher(`lead/options/subStage`, {
      body: JSON.stringify({
        request_data: {
          refID: formState?.refID,
          stageCode: dependentFields?.stageCode?.value,
        },
      }),
    });
    if (status === "success" && Array.isArray(data.response_data)) {
      const newArray = data.response_data.map((one) => ({
        value: one?.subStageCode,
        label: one?.subStageName,
      }));
      return newArray;
    } else {
      throw data?.error_data;
    }
  };

  const getLeadEmploymentType = async (_, formState: any) => {
    const { status, data } = await internalFetcher(
      `lead/options/employmentType`,
      {
        body: JSON.stringify({
          request_data: {
            refID: formState?.refID,
          },
        }),
      }
    );
    if (status === "success" && Array.isArray(data.response_data)) {
      const newArray = data.response_data.map((one) => ({
        value: one?.data_val,
        label: one?.display_val,
      }));
      return newArray;
    } else {
      throw data?.error_data;
    }
  };

  const getBankListForLeadDocumentsForGridUpload = async ({
    docCategory,
    moduleType,
    productType,
    refID,
    serialNo,
  }) => {
    const { data, status } = await internalFetcher(
      Boolean(productType)
        ? `./${moduleType}/${productType}/document/options/${docCategory}`
        : `./${moduleType}/document/options/${docCategory}`,
      {
        body: JSON.stringify({
          request_data: {
            refID,
            serialNo,
          },
        }),
      }
    );
    if (status === "success" && Array.isArray(data?.response_data)) {
      const newArray = data?.response_data.map((one) => ({
        value: one?.data_val,
        label: `${one?.bankName}-${one?.facility}-${one?.accountNumber}`,
      }));
      return newArray;
    } else {
      throw data?.error_data;
    }
  };

  const deleteFormArrayFieldData = async (
    formState: any,
    arrayfieldName: string
  ) => {
    const { moduleType, productType, ...others } = formState;
    const { data, status } = await internalFetcher(
      `./${moduleType}/${productType}/${arrayfieldName}/delete`,
      {
        body: JSON.stringify({
          request_data: {
            ...others,
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

  const getProductTypeForProductName = async (dependentFields: any) => {
    const { status, data } = await internalFetcher(
      `./lead/options/propertytype`,
      {
        body: JSON.stringify({
          request_data: {
            productId: dependentFields?.productId?.value,
          },
        }),
      }
    );
    if (status === "success" && Array.isArray(data?.response_data)) {
      const newArray = data.response_data.map((one) => ({
        value: one?.propertyType,
        label: one?.propertyName,
      }));
      const otherValues = data.response_data.reduce((accumlator, current) => {
        const val = {
          minLTV: current.minLTV,
          maxLTV: current.maxLTV,
        };
        accumlator[current.propertyType] = val;
        return accumlator;
      }, {});
      return { options: newArray, others: otherValues };
    } else {
      throw data?.error_data;
    }
  };

  const getManagementPersonnel = async (_, formState) => {
    const { status, data } = await internalFetcher(
      `./lead/management/options`,
      {
        body: JSON.stringify({
          request_data: {
            refID: formState?.refID ?? "NO_REF_ID_FOUND",
          },
        }),
      }
    );
    if (status === "success" && Array.isArray(data?.response_data)) {
      const newArray = data.response_data.map((one) => ({
        value: one?.data_val,
        label: one?.display_val,
      }));
      return newArray;
    } else {
      throw data?.error_data;
    }
  };

  const getBankFacilityOptions = async (dependentValues, formState) => {
    if (!Boolean(dependentValues?.entityType?.value)) {
      return [{ value: "", label: "No Data" }];
    }
    const { status, data } = await internalFetcher(
      (dependentValues?.entityType?.value ?? "X") === "L"
        ? "./lead/document/options/facility"
        : "./lead/management/document/options/facility",
      {
        body: JSON.stringify({
          request_data: {
            refID: formState?.refID ?? "NO_REF_ID_FOUND",
            serialNo:
              dependentValues?.management?.value ?? "SERIAL_NO_NOT_FOUND",
          },
        }),
      }
    );
    if (status === "success" && Array.isArray(data?.response_data)) {
      const newArray = data.response_data.map((one) => ({
        value: one?.data_val,
        label: `${one?.facility}`,
      }));
      return newArray;
    } else {
      throw data?.error_data;
    }
  };

  const getBankListForLeadDocumentsForAPICallInterface = async (
    dependentValues,
    formState
  ) => {
    if (!Boolean(dependentValues?.entityType?.value)) {
      return [{ value: "", label: "No Data" }];
    }
    const { data, status } = await internalFetcher(
      (dependentValues?.entityType?.value ?? "X") === "L"
        ? `./${formState?.moduleType}/document/options/bank`
        : `./${formState?.moduleType}/management/document/options/bank`,
      {
        body: JSON.stringify({
          request_data: {
            refID: formState?.refID ?? "NO_REF_ID_FOUND",
            serialNo:
              dependentValues?.management?.value ?? "SERIAL_NO_NOT_FOUND",
          },
        }),
      }
    );
    if (status === "success" && Array.isArray(data?.response_data)) {
      const newArray = data?.response_data.map((one) => ({
        value: one?.data_val,
        label: `${one?.bankName}-${one?.facility}-${one?.accountNumber}`,
      }));
      const otherValues = data.response_data.reduce((accumlator, current) => {
        const val = {
          facility: current.facility,
        };
        accumlator[current.data_val] = val;
        return accumlator;
      }, {});
      return { options: newArray, others: otherValues };
    } else {
      throw data?.error_data;
    }
  };

  const getPropertyTypeCAM = (productCode: string) => async () => {
    const { status, data } = await internalFetcher(
      `./lead/options/propertytype`,
      {
        body: JSON.stringify({
          request_data: {
            productId: productCode,
          },
        }),
      }
    );
    if (status === "success" && Array.isArray(data?.response_data)) {
      const newArray = data.response_data.map((one) => ({
        value: one?.propertyType,
        label: one?.propertyName,
      }));
      const otherValues = data.response_data.reduce((accumlator, current) => {
        const val = {
          minLTV: current.minLTV,
          maxLTV: current.maxLTV,
        };
        accumlator[current.propertyType] = val;
        return accumlator;
      }, {});
      return { options: newArray, others: otherValues };
    } else {
      throw data?.error_data;
    }
  };

  const getLoanAmountForDocumentsForAPICallInterface = async (formState) => {
    const { status, data } = await internalFetcher(
      `./lead/loanAmount/data/get`,
      {
        body: JSON.stringify({
          request_data: {
            refID: formState.formState.refID,
          },
        }),
      }
    );
    if (status === "success" && Array.isArray(data?.response_data)) {
      const newValue = data?.response_data[0]?.data_val;
      return newValue;
    } else {
      throw data?.error_data;
    }
  };

  const getBranchList = async () => {
    const { status, data } = await internalFetcher(`./users/options/branch`, {
      body: JSON.stringify({
        request_data: {},
      }),
    });
    if (status === "success" && Array.isArray(data?.response_data)) {
      const newArray = data.response_data.map((one) => ({
        value: one?.branchCode,
        label: one?.branchName,
      }));
      return newArray;
    } else {
      throw data?.error_data;
    }
  };

  const getRoleList = async () => {
    const { status, data } = await internalFetcher(`./users/options/role`, {
      body: JSON.stringify({
        request_data: {},
      }),
    });
    if (status === "success" && Array.isArray(data?.response_data)) {
      const newArray = data.response_data.map((one) => ({
        value: one?.roleCode,
        label: one?.roleName,
      }));
      return newArray;
    } else {
      throw data?.error_data;
    }
  };
  const getAllUnRegisteredUsersList = async () => {
    const { status, data } = await internalFetcher(
      `./users/employee/options/new`,
      {
        body: JSON.stringify({
          request_data: {},
        }),
      }
    );
    if (status === "success" && Array.isArray(data?.response_data)) {
      const newArray = data.response_data.map((one) => ({
        value: one?.userID,
        label: one?.userName,
      }));
      return newArray;
    } else {
      throw data?.error_data;
    }
  };
  const getAllRegisteredUsersList = async () => {
    const { status, data } = await internalFetcher(
      `./users/employee/options/all`,
      {
        body: JSON.stringify({
          request_data: {},
        }),
      }
    );
    if (status === "success" && Array.isArray(data?.response_data)) {
      const newArray = data.response_data.map((one) => ({
        value: one?.userID,
        label: one?.userName,
      }));
      return newArray;
    } else {
      throw data?.error_data;
    }
  };

  const getTeamRoleList = async (_, formState) => {
    const { status, data } = await internalFetcher(
      `./users/employee/team/options/role`,
      {
        body: JSON.stringify({
          request_data: {
            teamDesignationCode: formState?.teamDesignationCode ?? " ",
          },
        }),
      }
    );
    if (status === "success" && Array.isArray(data?.response_data)) {
      const newArray = data.response_data.map((one) => ({
        value: one?.roleCode,
        label: one?.roleName,
      }));
      return newArray;
    } else {
      throw data?.error_data;
    }
  };

  const getUserListFromTeamRole = async (_, formState, dependentFields2) => {
    const { status, data } = await internalFetcher(
      `./users/employee/team/options/unregistered`,
      {
        body: JSON.stringify({
          request_data: {
            teamRole: dependentFields2["userTeamDetails.teamRole"].value ?? " ",
            branchCode: formState?.branchCode ?? " ",
          },
        }),
      }
    );
    if (status === "success" && Array.isArray(data?.response_data)) {
      const newArray = data.response_data.map((one) => ({
        value: one?.userID,
        label: one?.username,
      }));
      return newArray;
    } else {
      throw data?.error_data;
    }
  };

  const getRoleListForInquiryAssign = async (_, formState) => {
    const { status, data } = await internalFetcher(
      `./${formState?.moduleType}/assign/options/role`,
      {
        body: JSON.stringify({
          request_data: {
            refID: formState?.refID ?? " ",
          },
        }),
      }
    );
    if (status === "success" && Array.isArray(data?.response_data)) {
      const newArray = data.response_data.map((one) => ({
        value: one?.roleCode,
        label: one?.roleName,
      }));
      return newArray;
    } else {
      throw data?.error_data;
    }
  };

  const getTeamRoleListForInquiryAssign = async (
    _,
    formState,
    dependentFields2
  ) => {
    const { status, data } = await internalFetcher(
      `./${formState?.moduleType}/assign/options/team `,
      {
        body: JSON.stringify({
          request_data: {
            refID: formState?.refID ?? " ",
            teamRole:
              dependentFields2["usersAssignDetails.teamRole"].value ?? " ",
          },
        }),
      }
    );
    if (status === "success" && Array.isArray(data?.response_data)) {
      const newArray = data.response_data.map((one) => ({
        value: one?.userID,
        label: one?.username,
      }));
      return newArray;
    } else {
      throw data?.error_data;
    }
  };
  return {
    inititateAPI,
    setToken,
    removeToken,
    getToken,
    internalFetcher,
    getBaseURL,
    isAPIInitialized,

    //Inquiry & Lead Stages
    getLeadSubStageCode,
    getLeadEmploymentType,

    getPropertyTypeCAM,

    //documents
    getBankListForLeadDocumentsForGridUpload,

    //Inquiry / Leads
    deleteFormArrayFieldData,
    getProductTypeForProductName,

    //CAM API
    getManagementPersonnel,
    getBankFacilityOptions,
    getBankListForLeadDocumentsForAPICallInterface,
    getLoanAmountForDocumentsForAPICallInterface,

    getBranchList,
    getRoleList,
    getAllUnRegisteredUsersList,
    getAllRegisteredUsersList,
    getTeamRoleList,
    getUserListFromTeamRole,

    //For Assign Inquiry or Lead Inquiry
    getRoleListForInquiryAssign,
    getTeamRoleListForInquiryAssign,
  };
};

export const LOSSDK = LOSAPI();
