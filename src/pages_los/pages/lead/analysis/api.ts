import { LOSSDK } from "registry/fns/los";

export const getAnalysisAPIStatusData = async ({ refID }) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./lead/external/grid/data`,
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

export const perfiosUploadInitiate = async (
  docType,
  formData: any,
  refID,
  moduleType
) => {
  //https://digix.aiplsolution.in/ratnaafin/los/lead/external/bankupload/initiate
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/external/${docType}upload/initiate`,
    {
      body: JSON.stringify({
        request_data: {
          refID: refID,
          serialNo: formData?.management ?? 1,
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

export const perfiosReinitiate = async (docType, formData: any, moduleType) => {
  //https://digix.aiplsolution.in/ratnaafin/los/lead/external/bankupload/initiate
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/external/${docType}upload/initiate`,
    {
      body: formData, //JSON
    }
  );
  if (status === "success") {
    return data?.response_data;
  } else {
    throw data?.error_data;
  }
};

export const generateDocumentDownloadURL = (
  moduleType,
  requestType,
  docUUID
) => {
  return new URL(
    ["GST_UPLOAD", "STMT_UPLOAD", "ITR_UPLOAD"].indexOf(requestType) >= 0
      ? `./${moduleType}/external/perfios/data/download?docUUID=${docUUID}&tokenID=${LOSSDK.getToken()}`
      : `./${moduleType}/external/corpository/data/download?docUUID=${docUUID}&tokenID=${LOSSDK.getToken()}`,
    LOSSDK.getBaseURL() as URL
  ).href;
};

export const corpositoryCompanySearch = async (
  moduleType: string,
  refID: string,
  entityName: string
) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/external/corpository/companySearch`,
    {
      body: JSON.stringify({
        request_data: {
          refID: refID,
          entityName: entityName,
        },
        channel: "W",
      }),
    }
  );
  if (status === "success") {
    return data?.response_data?.companies ?? [];
  } else {
    throw data?.error_data;
  }
};

export const corpositoryInititate = ({ moduleType, refID }) => async (
  companyID: string,
  companyName: string
) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/external/corpository/initiate`,
    {
      body: JSON.stringify({
        request_data: {
          refID: refID,
          companyID: companyID,
          companyName: companyName,
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

export const corpositoryGetFirmName = async ({ moduleType, refID }) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/external/corpository/getFirmName`,
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
    return data?.response_data?.data_val ?? "";
  } else {
    throw data?.error_data;
  }
};
