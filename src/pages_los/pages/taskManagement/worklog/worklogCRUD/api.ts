import { LOSSDK } from "registry/fns/los";
import { worklogFormMetaData } from "../../../taskManagement/worklog/metadata/form";

export const getWorkLogData = ({ moduleType }) => async (serialNo?: string) => {
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

export const getGridWorkLogData = ({ moduleType }) => async () => {
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

export const insertWorkLogData = ({ moduleType }) => async (formData: any) => {
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

export const updateWorkLogData = ({ moduleType, serialNo }: any) => async (
  formData: any
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

export const deleteWorkLogData = ({ moduleType, worklogID }) => async () => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/data/delete`,
    {
      body: JSON.stringify({
        request_data: {
          tranID: worklogID,
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

export const getFormMetaData = () => worklogFormMetaData;
