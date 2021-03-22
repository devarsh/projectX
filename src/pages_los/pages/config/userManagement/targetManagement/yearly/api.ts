import { LOSSDK } from "registry/fns/los";
import { YearlyTargetGridMetaData } from "./yearlyTargetGridMetadata";

export interface TargetCRUDTYPE {
  moduleType: string;
  productType: string;
  userID?: string;
  serialNo?: string;
}

export const insertUserData = ({
  moduleType,
  productType,
}: TargetCRUDTYPE) => async (formData: any) => {
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

export const getTargetGridData = ({
  moduleType,
  productType,
  userID,
}: TargetCRUDTYPE) => async () => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/${productType}/grid/data`,
    {
      body: JSON.stringify({
        request_data: {
          userID: userID,
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

export const deleteTarget = ({
  moduleType,
  productType,
}: TargetCRUDTYPE) => async (serialNo: any) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/${productType}/data/delete`,
    {
      body: JSON.stringify({
        request_data: {
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

export const getGridFormMetaData = () => async () => YearlyTargetGridMetaData;
