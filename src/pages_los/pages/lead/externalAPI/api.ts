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
