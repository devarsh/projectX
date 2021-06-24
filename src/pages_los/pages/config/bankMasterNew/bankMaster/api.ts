import { LOSSDK } from "registry/fns/los";
import { bankMasterGridMetaData } from "./metadata/grid";
import { bankMasterMetadata } from "./metadata/form";

export const addBank = ({ moduleType }) => async (formData: any) => {
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

export const getFormData = ({ moduleType }) => async (serialNo?: string) => {
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

export const getGridData = async ({ moduleType }) => {
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

export const updateBankData = ({ moduleType, bankCode }) => async (
  formData: any
) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/data/put`,
    {
      body: JSON.stringify({
        request_data: {
          bankCode: bankCode,
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

export const deleteBankData = ({ moduleType, bankCode }) => async () => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/data/delete`,
    {
      body: JSON.stringify({
        request_data: {
          bankCode: bankCode,
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

export const getFormMetaData = () => {
  return bankMasterMetadata;
};

export const getGridMetaData = () => {
  return bankMasterGridMetaData;
};
