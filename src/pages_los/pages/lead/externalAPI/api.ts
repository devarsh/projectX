import { LOSSDK } from "registry/fns/los";

export const getAPIStatusGridData = async ({ refID }) => {
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

export const documentUploadInitiate = async (
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

export const documentUploadReinitiate = async (
  docType,
  formData: any,
  moduleType
) => {
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
