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

  const getNewMetaData = async (type: string, refID: string) => {
    const { data, status } = await internalFetcher(
      `./${type}/metaData/get/new`,
      {
        body: JSON.stringify({
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

  const getViewMetaData = async (type: string, refID: string) => {
    const { data, status } = await internalFetcher(
      `./${type}/metaData/get/view`,
      {
        body: JSON.stringify({
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

  const getEditMetaData = async (type: string, refID: string) => {
    const { data, status } = await internalFetcher(
      `./${type}/metaData/get/edit`,
      {
        body: JSON.stringify({
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

  const getViewData = async (type: string, refID: string) => {
    const { data, status } = await internalFetcher(`./${type}/data/view`, {
      body: JSON.stringify({
        request_data: {
          refID: refID,
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

  const getEditData = async (type: string, refID: string) => {
    const { data, status } = await internalFetcher(`./${type}/data/get`, {
      body: JSON.stringify({
        request_data: {
          refID: refID,
        },
      }),
    });
    if (status === "success") {
      return data?.response_data;
    } else {
      throw data?.error_data;
    }
  };

  const updateData = async (type: string, refID: string, formData: any) => {
    const { data, status } = await internalFetcher(`./${type}/data/put`, {
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

  const insertData = async (type: string, refID: string, formData: any) => {
    const { data, status } = await internalFetcher(`./${type}/data/post`, {
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

  const checkDataExist = async (type: string, refID: string) => {
    const { data, status } = await internalFetcher(`./${type}/data/exists`, {
      body: JSON.stringify({
        request_data: {
          refID: refID,
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

  interface DOCCRUDTYPE {
    moduleType: string;
    docCategory: string;
    refID: string;
  }

  const uploadDocuments = ({
    moduleType,
    docCategory,
    refID,
  }: DOCCRUDTYPE) => async (
    data: FormData,
    progressHandler: any = () => {},
    completeHandler: any = () => {}
  ) => {
    if (!isAPIInitialized()) {
      return {
        status: "failure",
        data: "Invalid token or API not initialized",
      };
    }
    const newURL = new URL(
      `./${moduleType}/document/${docCategory}/data/post`,
      baseURL as URL
    ).href;
    let xhr = new XMLHttpRequest();
    data.append("refID", refID);
    xhr.open("POST", newURL, true);
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
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
    xhr.send(data);
  };

  const listingDocuments = ({
    moduleType,
    docCategory,
    refID,
  }: DOCCRUDTYPE) => async () => {
    const { data, status } = await internalFetcher(
      `./${moduleType}/document/${docCategory}/data/get`,
      {
        body: JSON.stringify({
          request_data: {
            refID: refID,
          },
        }),
      }
    );
    if (status === "success") {
      return data?.request_data;
    } else {
      throw data?.error_data;
    }
  };

  const deleteDocuments = ({
    moduleType,
    docCategory,
    refID,
  }: DOCCRUDTYPE) => async (docUUID: any) => {
    const { data, status } = await internalFetcher(
      `./${moduleType}/document/${docCategory}/data/delete`,
      {
        body: JSON.stringify({
          request_data: {
            refID: refID,
            docUUID: docUUID,
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

  const verifyDocuments = ({
    moduleType,
    docCategory,
    refID,
  }: DOCCRUDTYPE) => async (
    docUUID: any,
    remarks: any,
    docStatus: "Verfiy" | "Rejected"
  ) => {
    const { data, status } = await internalFetcher(
      `./${moduleType}/document/${docCategory}/data/verification`,
      {
        body: JSON.stringify({
          request_data: {
            refID: refID,
            docUUID: docUUID,
            remarks: remarks,
            status:
              docStatus === "Verfiy"
                ? "Y"
                : docStatus === "Rejected"
                ? "R"
                : "X",
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

  const updateDocuments = ({
    moduleType,
    docCategory,
    refID,
  }: DOCCRUDTYPE) => async (updateData: any) => {
    const { data, status } = await internalFetcher(
      `./${moduleType}/document/${docCategory}/data/put`,
      {
        body: JSON.stringify({
          request_data: {
            refID: refID,
            details: updateData,
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

  const getCRUDTabsMetadata = async ({ moduleType, refID }) => {
    const { data, status } = await internalFetcher(
      `./${moduleType}/tabs/metaData`,
      {
        body: JSON.stringify({
          request_data: {
            refID: refID,
          },
        }),
      }
    );
    if (status === "success") {
      return data?.response_data;
    } else {
      throw data?.error_data;
    }
  };

  interface crudType {
    moduleType: string;
    productType: string;
    refID: string;
    metadataType: string;
  }

  const getFormData = ({ moduleType, productType, refID }: crudType) => async (
    serialNo?: string
  ) => {
    const { data, status } = await internalFetcher(
      `./${moduleType}/${productType}/data/get`,
      {
        body: JSON.stringify({
          request_data: {
            refID: refID,
            serialNo: serialNo,
          },
        }),
      }
    );
    if (status === "success") {
      return data?.response_data;
    } else {
      throw data?.error_data;
    }
  };

  const updateFormData = ({
    moduleType,
    productType,
    refID,
  }: crudType) => async (formData: any, serialNo?: any) => {
    const { data, status } = await internalFetcher(
      `./${moduleType}/${productType}/data/put`,
      {
        body: JSON.stringify({
          request_data: {
            refID: refID,
            serialNo: serialNo,
            ...formData,
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
  const deleteFormData = ({
    moduleType,
    productType,
    refID,
  }: crudType) => async (serialNo: any) => {
    const { data, status } = await internalFetcher(
      `./${moduleType}/${productType}/data/delete`,
      {
        body: JSON.stringify({
          request_data: {
            refID: refID,
            serialNo: serialNo,
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

  const insertFormData = ({
    moduleType,
    productType,
    refID,
  }: crudType) => async (formData: any) => {
    const { data, status } = await internalFetcher(
      `./${moduleType}/${productType}/data/post`,
      {
        body: JSON.stringify({
          request_data: {
            refID: refID,
            ...formData,
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

  const checkFormDataExist = ({
    moduleType,
    productType,
    refID,
  }: crudType) => async () => {
    const { data, status } = await internalFetcher(
      `./${moduleType}/${productType}/data/exists`,
      {
        body: JSON.stringify({
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

  const getStaticGridData = ({
    moduleType,
    productType,
    refID,
  }: crudType) => async () => {
    const { data, status } = await internalFetcher(
      `./${moduleType}/${productType}/grid/data`,
      {
        body: JSON.stringify({
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

  const getBankData = ({ moduleType, productType }: crudType) => async (
    serialNo?: string
  ) => {
    const { data, status } = await internalFetcher(
      `./${moduleType}/${productType}/get`,
      {
        body: JSON.stringify({
          request_data: {
            refID: serialNo,
          },
        }),
      }
    );
    if (status === "success") {
      return data?.response_data;
    } else {
      throw data?.error_data;
    }
  };

  const updateBankData = ({
    moduleType,
    productType,
    refID,
  }: crudType) => async (formData: any, bankRefCode?: any) => {
    const { data, status } = await internalFetcher(
      `./${moduleType}/${productType}/put`,
      {
        body: JSON.stringify({
          request_data: {
            refID: bankRefCode,
            ...formData,
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
  const deleteBankData = ({
    moduleType,
    productType,
    refID,
  }: crudType) => async (bankRefCode: any) => {
    const { data, status } = await internalFetcher(
      `./${moduleType}/${productType}/delete`,
      {
        body: JSON.stringify({
          request_data: {
            refID: bankRefCode,
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

  const insertBankData = ({
    moduleType,
    productType,
    refID,
  }: crudType) => async (formData: any) => {
    const { data, status } = await internalFetcher(
      `./${moduleType}/${productType}/post`,
      {
        body: JSON.stringify({
          request_data: {
            ...formData,
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

  const getStaticBankGridData = ({
    moduleType,
    productType,
    refID,
  }: crudType) => async () => {
    const { data, status } = await internalFetcher(
      `./${moduleType}/${productType}/grid/data`,
      {
        body: JSON.stringify({
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

  ///--------------------CAM crud metaData

  const getFormMetaData = ({
    moduleType,
    productType,
    refID,
  }: crudType) => async (metadataType: any) => {
    const { data, status } = await internalFetcher(
      `./${moduleType}/${productType}/metadata/${metadataType}`,
      {
        body: JSON.stringify({
          request_data: {
            refID: refID,
          },
        }),
      }
    );
    if (status === "success") {
      return data?.response_data;
    } else {
      throw data?.error_data;
    }
  };

  const getGridFormMetaData = ({
    moduleType,
    productType,
    refID,
  }: crudType) => async () => {
    const { data, status } = await internalFetcher(
      `./${moduleType}/${productType}/grid/metadata`,
      {
        body: JSON.stringify({
          request_data: {
            refID: refID,
          },
        }),
      }
    );
    if (status === "success") {
      return data?.response_data;
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

  const getLeadSubStageCode = async (
    moduleType,
    refID,
    dependentFields: any
  ) => {
    const { status, data } = await internalFetcher(`lead/options/subStage`, {
      body: JSON.stringify({
        request_data: {
          refID: "89",
          stageCode: "2",
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

  const getLeadEmploymentType = async (moduleType, refID) => {
    const { status, data } = await internalFetcher(
      `lead/options/employmentType`,
      {
        body: JSON.stringify({
          request_data: {
            refID: "89",
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

  return {
    inititateAPI,
    setToken,
    removeToken,
    checkDataExist,
    getGridMetaData,
    getGridData,
    getGridColumnFilterData,
    getNewMetaData,
    getViewMetaData,
    getViewData,
    getEditMetaData,
    getEditData,
    insertData,
    updateData,
    //document
    uploadDocuments,
    updateDocuments,
    deleteDocuments,
    listingDocuments,
    verifyDocuments,
    getBankListForLeadDocuments,

    moveInquiryToLead,
    //Lead
    updateFormData,
    getFormData,
    insertFormData,
    checkFormDataExist,
    deleteFormData,
    deleteFormArrayFieldData,
    getStaticGridData,

    getCRUDTabsMetadata,

    getLeadSubStageCode,
    getLeadEmploymentType,

    //Bank
    updateBankData,
    deleteBankData,
    insertBankData,
    getStaticBankGridData,
    getBankData,

    //CAM
    getFormMetaData,
    getGridFormMetaData,
  };
};

export const LOSSDK = LOSAPI();
