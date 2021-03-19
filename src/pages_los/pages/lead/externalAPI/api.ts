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
  formState,
  value: any,
  refID,
  moduleType
) => {
  //https://digix.aiplsolution.in/ratnaafin/los/lead/external/bankupload/initiate
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/external/${formState}upload/initiate`,
    {
      body: JSON.stringify({
        request_data: {
          refID: refID,
          serialNo: value?.current?.management ?? 1,
          ...value?.current,
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
