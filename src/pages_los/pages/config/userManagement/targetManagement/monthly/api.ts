import { LOSSDK } from "registry/fns/los";
import { MonthlyTargetGridMetadata } from "./monthlyTargetGridMetadata";
import { monthlyTargetFormMetaDataEdit } from "./metaDataEdit";

export interface MonthlyTargetCRUDTYPE {
  moduleType: string;
  productType: string;
  serialNo?: string;
}

export const getTargetGridData = ({
  moduleType,
  productType,
  serialNo,
}: MonthlyTargetCRUDTYPE) => async () => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/${productType}/grid/data`,
    {
      body: JSON.stringify({
        request_data: {
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

export const getTargetFormData = ({
  moduleType,
  productType,
  serialNo,
}: MonthlyTargetCRUDTYPE) => async () => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/${productType}/grid/data`,
    {
      body: JSON.stringify({
        request_data: {
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

export const updateMonthlyTargetData = ({
  moduleType,
  productType,
  serialNo,
}: MonthlyTargetCRUDTYPE) => async (formData: any) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/${productType}/data/put`,
    {
      body: JSON.stringify({
        request_data: {
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

export const getMonthlyTargetFormData = ({
  moduleType,
  productType,
  serialNo,
}: MonthlyTargetCRUDTYPE) => async (lineNo?: string) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/${productType}/data/get`,
    {
      body: JSON.stringify({
        request_data: {
          serialNo: serialNo,
          lineNo: lineNo,
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

export const getFormMetaData = () => () => monthlyTargetFormMetaDataEdit;

export const getGridFormMetaData = () => async () => MonthlyTargetGridMetadata;
