import { LOSSDK } from "registry/fns/los";

export interface TargetCRUDTYPE {
  moduleType: string;
  productType: string;
  userID?: string;
  serialNo?: string;
}

export const listYearlyTarget = async ({
  moduleType,
  productType,
  userID,
}: TargetCRUDTYPE) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/${productType}/grid/data`,
    {
      body: JSON.stringify({
        request_data: {
          userId: userID,
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

export const getYearlyTargetGridMetaData = async ({
  moduleType,
  productType,
}: TargetCRUDTYPE) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/${productType}/grid/metadata`,
    {
      body: JSON.stringify({
        request_data: {},
      }),
    }
  );
  if (status === "success") {
    return data?.response_data;
  } else {
    throw data?.error_data;
  }
};

export const deleteYearlyTarget = ({
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
