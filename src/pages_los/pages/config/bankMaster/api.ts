import { LOSSDK, crudType } from "registry/fns/los";
import { bankMasterGridMetaData } from "./metadata/grid";
import { bankMasterMetadata } from "./metadata/form";

export const insertBankMasterData = ({ moduleType }: crudType) => async (
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

export const getFormData = ({ moduleType }: crudType) => async (
  serialNo?: string
) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/data/get`,
    {
      body: JSON.stringify({
        request_data: { bankCode: serialNo },
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

export const getGridData = ({ moduleType }: crudType) => async () => {
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

export const updateBankMasterData = ({ moduleType }: crudType) => async (
  formData: any,
  serialNo?: any
) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/data/put`,
    {
      body: JSON.stringify({
        request_data: {
          bankCode: serialNo,
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

export const deleteBankMasterData = ({ moduleType }: crudType) => async (
  serialNo: any
) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/data/delete`,
    {
      body: JSON.stringify({
        request_data: {
          bankCode: serialNo,
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
    case "bank":
      return bankMasterMetadata;
    default:
      throw { error_msg: "Invalid Module type" };
  }
};

export const getGridMetaData = ({ moduleType }: crudType) => async () => {
  switch (moduleType) {
    case "bank":
      return bankMasterGridMetaData;
    default:
      throw { error_msg: "Invalid Module type" };
  }
};
