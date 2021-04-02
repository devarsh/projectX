import { LOSSDK } from "registry/fns/los";
import { transFormData } from "./transformMetadataNew";
import { YearlyTargetGridMetaData } from "./yearlyTargetGridMetadata";
import { yearlyTargetTransformMetadata } from "./yearlyTargetTransformMetadata";

export interface TargetCRUDTYPE {
  moduleType: string;
  productType: string;
  userID?: string;
  serialNo?: string;
}

export const insertUserData = ({
  moduleType,
  productType,
  userID,
}: TargetCRUDTYPE) => async (formData: any) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/${productType}/data/post`,
    {
      body: JSON.stringify({
        request_data: {
          userID: userID,
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

export const updateYearlyTargetData = ({
  moduleType,
  productType,
  userID,
}: TargetCRUDTYPE) => async (formData: any, serialNo?: any) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/${productType}/data/put`,
    {
      body: JSON.stringify({
        request_data: {
          userID: userID,
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

export const getGridFormMetaData = () => async () => YearlyTargetGridMetaData;

export const getFormMetaData = () => async () => yearlyTargetTransformMetadata;

export const getFormMetaData1 = ({
  moduleType,
  productType,
  userID,
}: TargetCRUDTYPE) => async (metadataType: any) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/${productType}/metadata/${metadataType}`,
    {
      body: JSON.stringify({
        request_data: {
          refID: userID,
        },
      }),
    }
  );
  if (status === "success") {
    const productTypes = [
      "retailVolume",
      "smeVolume",
      "infraVolume",
      "unsecuredVolume",
      "insuranceVolume",
    ];
    const ownProducts = ["retailVolume", "smeVolume"];
    var test = transFormData(data?.response_data, ownProducts);

    return test;
  } else {
    throw data?.error_data;
  }
};
