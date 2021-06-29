import { LOSSDK } from "registry/fns/los";

export const moveLeadToBankLogin = async (refID) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./lead/moveToBankLogin`,
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
