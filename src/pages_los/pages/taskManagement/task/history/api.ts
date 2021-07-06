import { LOSSDK } from "registry/fns/los";

export const getTaskHistoryGridData = async ({ moduleType, taskID }) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/history/get`,
    {
      body: JSON.stringify({
        request_data: {
          taskID: taskID,
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
