import { LOSSDK } from "registry/fns/los";

export const getGridColumnFilterData = (gridCode) => async (options) => {
  /*
    options = {accessor:'column_id',result_type:'getGroups|getRange',filter_conditions:[]}
    */
  const { data, status } = await LOSSDK.internalFetcher("./grid/columnFilter", {
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

export const getGridData = (gridCode) => async (
  fromNo,
  toNo,
  sortBy,
  filterBy
) => {
  const { data, status } = await LOSSDK.internalFetcher("./grid/data", {
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

export const getGridMetaData = async (gridCode) => {
  const { data, status } = await LOSSDK.internalFetcher("./grid/metaData", {
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
