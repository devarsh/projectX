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

  const getGridMetaData = async (gridCode) => {
    const { data, status } = await internalFetcher("./grid/metaData", {
      body: JSON.stringify({
        request_data: {
          grid_code: gridCode,
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

  const getGridData = (gridCode) => async (fromNo, toNo, sortBy, filterBy) => {
    const { data, status } = await internalFetcher("./grid/data", {
      body: JSON.stringify({
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

  const getGridColumnFilterData = (gridCode) => async (options) => {
    /*
    options = {accessor:'column_id',result_type:'getGroups|getRange',filter_conditions:[]}
    */
    const { data, status } = await internalFetcher("./grid/columnFilter", {
      body: JSON.stringify({
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

  //***END of docs API */

  const moveInquiryToLead = async (refID: string, formData: any) => {
    const { data, status } = await internalFetcher(`./inquiry/moveToLead`, {
      body: JSON.stringify({
        request_data: {
          refID: refID,
          ...formData,
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

  const getBankListForLeadDocuments = async (props) => {
    const { data, status } = await internalFetcher(
      `./lead/document/options/bank`,
      {
        body: JSON.stringify({
          request_data: {
            ...props,
          },
        }),
      }
    );
    if (status === "success" && Array.isArray(data?.response_data)) {
      const newArray = data?.response_data.map((one) => ({
        value: one?.data_val,
        label: one?.display_val,
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

  const getManagementPersonnel = async ({ refID }) => {
    const { status, data } = await internalFetcher(
      `./lead/management/options`,
      {
        body: JSON.stringify({
          request_data: {
            refID: refID,
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

  return {
    inititateAPI,
    setToken,
    removeToken,
    getToken,
    internalFetcher,
    getBaseURL,
    isAPIInitialized,

    //For Server Side Grid
    getGridMetaData,
    getGridData,
    getGridColumnFilterData,

    //Inquiry & Lead Stages
    getLeadSubStageCode,
    getLeadEmploymentType,
    moveInquiryToLead,

    //documents
    getBankListForLeadDocuments,

    //Inquiry / Leads
    deleteFormArrayFieldData,
    getProductTypeForProductName,

    //CAM API
    getManagementPersonnel,
  };
};

export const LOSSDK = LOSAPI();
