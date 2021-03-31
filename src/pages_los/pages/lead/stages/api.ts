import { LOSSDK } from "registry/fns/los";

export const getStagesGridData = ({ moduleType, refID }) => async (
  formData
) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/stages/grid/data`,
    {
      body: JSON.stringify({
        request_data: {
          refID: refID,
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

export const getCurrentStageData = ({ moduleType, refID }) => async () => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/stages/data/get`,
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

export const updateCurrentStageData = ({ moduleType, refID }) => async (
  formData
) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/stages/data/put`,
    {
      body: JSON.stringify({
        request_data: {
          refID: refID,
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
