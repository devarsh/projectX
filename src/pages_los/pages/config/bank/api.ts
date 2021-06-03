import { LOSSDK, crudType } from "registry/fns/los";
import {
  retailAPFFormMetaData,
  retailFormMetaData,
  retailLAPFormMetaData,
  retailLRDFormMetaData,
  infraFormMetaData,
  smeFormMetaData,
  unsecureFormMetaData,
} from "./metaData/form";
import {
  retailAPFGridMetaData,
  retailGridMetaData,
  retailLAPGridMetaData,
  retailLRDGridMetaData,
  infraGridMetaData,
  smeGridMetaData,
  unsecureGridMetaData,
} from "./metaData/grid";

export const updateBankData = ({
  moduleType,
  productType,
  refID,
}: crudType) => async (formData: any, bankRefCode?: any) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/${productType}/data/put`,
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

export const deleteBankData = ({
  moduleType,
  productType,
  refID,
}: crudType) => async (bankRefCode: any) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/${productType}/data/delete`,
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

export const insertBankData = ({
  moduleType,
  productType,
  refID,
}: crudType) => async (formData: any) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/${productType}/data/post`,
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

export const getGridBankData = ({
  moduleType,
  productType,
  refID,
}: crudType) => async () => {
  const { data, status } = await LOSSDK.internalFetcher(
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

export const getBankData = ({ moduleType, productType }: crudType) => async (
  serialNo?: string
) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/${productType}/data/get`,
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

export const getFormMetaData = ({
  moduleType,
  productType,
  refID,
}: crudType) => async (metadataType: any) => {
  switch (productType) {
    case "sme":
      return smeFormMetaData;
    case "infra":
      return infraFormMetaData;
    case "retail":
      return retailFormMetaData;
    case "retaillap":
      return retailLAPFormMetaData;
    case "retaillrd":
      return retailLRDFormMetaData;
    case "retailapf":
      return retailAPFFormMetaData;
    case "unsecured":
      return unsecureFormMetaData;
    default:
      throw { error_msg: "Invalid Product type" };
  }
};

export const getGridFormMetaData = ({
  moduleType,
  productType,
  refID,
}: crudType) => async () => {
  switch (productType) {
    case "sme":
      return smeGridMetaData;
    case "infra":
      return infraGridMetaData;
    case "retail":
      return retailGridMetaData;
    case "retaillap":
      return retailLAPGridMetaData;
    case "retaillrd":
      return retailLRDGridMetaData;
    case "retailapf":
      return retailAPFGridMetaData;
    case "unsecured":
      return unsecureGridMetaData;
    default:
      throw { error_msg: "Invalid Product type" };
  }
};
