import { LOSSDK } from "registry/fns/los";

export const getPriorityGridData = ({ moduleType, refID }) => async (
  formData
) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/priority/grid/data`,
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

export const getCurrentPriorityData = ({ moduleType, refID }) => async () => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/priority/data/get`,
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

export const updateCurrentPriorityData = ({ moduleType, refID }) => async (
  formData
) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/priority/data/put`,
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
