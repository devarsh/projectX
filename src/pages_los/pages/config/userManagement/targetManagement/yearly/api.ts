import { LOSSDK } from "registry/fns/los";
import {
  yearlyTargetFormMetaDataEdit,
  yearlyTargetFormMetaDataNew,
  yearlyTargetFormMetaDataView,
  YearlyTargetGridMetaData,
} from "./metaData";

export interface TargetCRUDTYPE {
  moduleType: string;
  productType: string;
  userID?: string;
  serialNo?: string;
}

export const insertYearlyTargetData = ({
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

export const getFormMetaData = () => (metaDataType) => {
  if (metaDataType === "new") {
    return yearlyTargetFormMetaDataNew;
  } else if (metaDataType === "edit") {
    return yearlyTargetFormMetaDataEdit;
  } else if (metaDataType === "view") {
    return yearlyTargetFormMetaDataView;
  } else {
    return yearlyTargetFormMetaDataView;
  }
};

export const getYearlyTargetFormData = ({
  moduleType,
  productType,
  userID,
}: TargetCRUDTYPE) => async (serialNo?: string) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/${productType}/data/get`,
    {
      body: JSON.stringify({
        request_data: {
          userID: userID,
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

export const getYearlyTargetUserBranchList = async (userID: any) => {
  const { status, data } = await LOSSDK.internalFetcher(
    `./users/employee/options/registered/branch`,
    {
      body: JSON.stringify({
        request_data: {
          userID: userID,
        },
      }),
    }
  );
  if (status === "success" && Array.isArray(data?.response_data)) {
    const newArray = data?.response_data.map((one) => ({
      value: one?.branchCode,
      label: one?.branchName,
      products: one?.ownProductList ?? [],
    }));
    return newArray;
  } else {
    throw data?.error_data;
  }
};
