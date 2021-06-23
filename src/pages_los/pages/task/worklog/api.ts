import { LOSSDK, crudType } from "registry/fns/los";
import { worklogGridMetaData } from "./metadata/grid";
import { worklogFormMetaData } from "./metadata/form";

export const getWorkLogData = ({ moduleType }: crudType) => async (
  serialNo?: string
) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/data/get`,
    {
      body: JSON.stringify({
        request_data: { tranID: serialNo },
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

export const getGridWorkLogData = ({ moduleType }: crudType) => async () => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/grid/data`,
    {
      body: JSON.stringify({
        request_data: {},
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

export const insertWorkLogData = ({ moduleType }: crudType) => async (
  formData: any
) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/data/post`,
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

export const updateWorkLogData = ({ moduleType }: crudType) => async (
  formData: any,
  serialNo?: any
) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/data/put`,
    {
      body: JSON.stringify({
        request_data: {
          tranID: serialNo,
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

export const deleteWorkLogData = ({ moduleType }: crudType) => async (
  serialNo: any
) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/data/delete`,
    {
      body: JSON.stringify({
        request_data: {
          tranID: serialNo,
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

export const getFormMetaData = ({ moduleType }: crudType) => async () => {
  switch (moduleType) {
    case "worklog":
      return worklogFormMetaData;
    default:
      throw { error_msg: "Invalid Module type" };
  }
};

export const getGridFormMetaData = ({ moduleType }: crudType) => async () => {
  switch (moduleType) {
    case "worklog":
      return worklogGridMetaData;
    default:
      throw { error_msg: "Invalid Module type" };
  }
};
