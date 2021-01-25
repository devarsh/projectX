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

  const internalFetcher = async (
    url: string,
    payload: any
  ): Promise<CommonFetcherResponse> => {
    if (token === null && baseURL === null) {
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

  const getViewMetaData = async (type: string, refID: string) => {
    if (
      ["inquiry", "inquiryQuestion", "lead", "leadQuestion"].indexOf(type) < 0
    ) {
      throw { error_msg: "invalid data requested" };
    }
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

  const getViewData = async (type: string, refID: string) => {
    if (
      ["inquiry", "inquiryQuestion", "lead", "leadQuestion"].indexOf(type) < 0
    ) {
      throw { error_msg: "invalid data requested" };
    }
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

  const getEditMetaData = async (type: string, refID: string) => {
    if (
      ["inquiry", "inquiryQuestion", "lead", "leadQuestion"].indexOf(type) < 0
    ) {
      throw { error_msg: "invalid data requested" };
    }
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

  const getEditData = async (type: string, refID: string) => {
    if (
      ["inquiry", "inquiryQuestion", "lead", "leadQuestion"].indexOf(type) < 0
    ) {
      throw { error_msg: "invalid data requested" };
    }
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

  return {
    inititateAPI,
    setToken,
    removeToken,
    getGridMetaData,
    getGridData,
    getGridColumnFilterData,
    getViewMetaData,
    getViewData,
    getEditMetaData,
    getEditData,
    updateData,
  };
};

export const LOSSDK = LOSAPI();
