import { LOSSDK } from "registry/fns/los";

export const getStagesGridData = ({ refID, branchID }) => async () => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./lead/bankLogin/stages/grid/data`,
    {
      body: JSON.stringify({
        request_data: {
          refID: refID,
          branchID: branchID,
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

export const getCurrentStageData = ({ refID, branchID }) => async () => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./lead/bankLogin/stages/data/get`,
    {
      body: JSON.stringify({
        request_data: {
          refID: refID,
          branchID: branchID,
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

export const updateCurrentStageData = ({ refID, branchID }) => async (
  formData
) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./lead/bankLogin/stages/data/put`,
    {
      body: JSON.stringify({
        request_data: {
          refID: refID,
          branchID: branchID,
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
