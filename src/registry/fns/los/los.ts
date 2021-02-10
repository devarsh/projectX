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

  const uploadDocuments = async (
    type: string,
    files: File[],
    docID: string,
    refID: string,
    progressHandler: any = () => {},
    completeHandler: any = () => {}
  ) => {
    if (!isAPIInitialized()) {
      return {
        status: "failure",
        data: "Invalid token or API not initialized",
      };
    }
    const newURL = new URL(`./${type}/document/upload`, baseURL as URL).href;
    let formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
    }
    formData.append("refID", refID);
    formData.append("docID", docID);
    let xhr = new XMLHttpRequest();
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
    xhr.send(formData);
  };
  const getDocumentListingTemplate = async (type: string, refID: string) => {
    const { data, status } = await internalFetcher(
      `./${type}/document/template`,
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
  const getDocumentsList = async (type: string, refID: string) => {
    const { data, status } = await internalFetcher(`./${type}/document/get`, {
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
  const verifyDocuments = async (
    type: string,
    refID: string,
    docID: string,
    userComments: string
  ) => {
    const { data, status } = await internalFetcher(
      `./${type}/document/verify`,
      {
        body: JSON.stringify({
          request_data: {
            refID: refID,
            docID: docID,
            comment: userComments,
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
  const rejectDocuments = async (
    type: string,
    refID: string,
    docID: string,
    userComments: string
  ) => {
    const { data, status } = await internalFetcher(
      `./${type}/document/reject`,
      {
        body: JSON.stringify({
          request_data: {
            refID: refID,
            docID: docID,
            comment: userComments,
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
  const deleteDocuments = async (
    type: string,
    refID: string,
    docID: string
  ) => {
    const { data, status } = await internalFetcher(
      `./${type}/document/delete`,
      {
        body: JSON.stringify({
          request_data: {
            refID: refID,
            docID: docID,
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
  const constructDocumentDownloadURL = (type, documentID) => {
    if (!isAPIInitialized()) {
      return "";
    }
    let downloadURL = new URL(`./${type}/document/download`, baseURL as URL)
      .href;
    return `${downloadURL}?docUUID=${documentID}&token=${token}`;
  };

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
  //for Lead

  const getLeadDataForView = async (type: string, refID: string) => {
    const { data, status } = await internalFetcher(`./lead/${type}/data/view`, {
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

  const getLeadDataForEdit = async (
    type: string,
    refID: string,
    serialNo?: string
  ) => {
    const { data, status } = await internalFetcher(`./lead/${type}/data/get`, {
      body: JSON.stringify({
        request_data: {
          refID: refID,
          serialNo: serialNo,
          srCD: serialNo,
        },
      }),
    });
    if (status === "success") {
      return data?.response_data;
    } else {
      throw data?.error_data;
    }
  };

  const updateLeadData = async (
    type: string,
    refID: string,
    formData: any,
    serialNo?: any
  ) => {
    const { data, status } = await internalFetcher(`./lead/${type}/data/put`, {
      body: JSON.stringify({
        request_data: {
          refID: refID,
          serialNo: serialNo,
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
  const deleteLeadData = async (type: string, refID: string, serialNo: any) => {
    const { data, status } = await internalFetcher(`./lead/${type}/data/put`, {
      body: JSON.stringify({
        request_data: {
          refID: refID,
          serialNo: serialNo,
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

  const insertLeadData = async (type: string, refID: string, formData: any) => {
    const { data, status } = await internalFetcher(`./lead/${type}/data/post`, {
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

  const checkLeadDataExist = async (type: string, refID: string) => {
    const { data, status } = await internalFetcher(
      `./lead/${type}/data/exists`,
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

  const getLeadDetailsGridData = async (type: string, refID: string) => {
    const { data, status } = await internalFetcher(`./lead/${type}/grid/data`, {
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
    uploadDocuments,
    getDocumentListingTemplate,
    getDocumentsList,
    verifyDocuments,
    rejectDocuments,
    deleteDocuments,
    constructDocumentDownloadURL,
    moveInquiryToLead,
    getLeadDataForView,
    getLeadDataForEdit,
    updateLeadData,
    insertLeadData,
    checkLeadDataExist,
    getLeadDetailsGridData,
    deleteLeadData,
  };
};

export const LOSSDK = LOSAPI();
