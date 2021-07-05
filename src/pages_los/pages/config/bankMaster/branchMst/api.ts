import { LOSSDK, crudType } from "registry/fns/los";
import { bankBranchMasterGridMetaData } from "./metadata/grid";
import {
  bankBranchMasterMetadata,
  bankBranchMasterMetadataEditView,
} from "./metadata/form";

export const insertBranchData = ({ moduleType, refID }: crudType) => async (
  formData: any
) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/data/post`,
    {
      body: JSON.stringify({
        request_data: {
          bankID: refID,
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

export const getFormData = ({ moduleType, refID }: crudType) => async (
  serialNo?: string
) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/data/get`,
    {
      body: JSON.stringify({
        request_data: { branchID: serialNo, bankID: refID },
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

export const getGridData = ({ moduleType, refID }: crudType) => async () => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/grid/data`,
    {
      body: JSON.stringify({
        request_data: {
          bankID: refID,
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

export const updateBranchData = ({ moduleType, refID }: crudType) => async (
  formData: any,
  serialNo?: any
) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/data/put`,
    {
      body: JSON.stringify({
        request_data: {
          branchID: serialNo,
          bankID: refID,
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

export const deleteBranchData = ({ moduleType, refID }: crudType) => async (
  serialNo: any
) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/data/delete`,
    {
      body: JSON.stringify({
        request_data: {
          branchID: serialNo,
          bankID: refID,
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

export const getFormMetaData = () => async (metadataType: any) => {
  switch (metadataType) {
    case "edit":
      return bankBranchMasterMetadataEditView;
    case "view":
      return bankBranchMasterMetadataEditView;
    case "new":
      return bankBranchMasterMetadata;
    default:
      throw { error_msg: "Invalid Module type" };
  }
};

export const getGridMetaData = () => async () => {
  return bankBranchMasterGridMetaData;
};
