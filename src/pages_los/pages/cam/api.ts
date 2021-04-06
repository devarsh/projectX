import { LOSSDK } from "registry/fns/los";

export const getCAMData = async ({ refID }) => {
  const { data, status } = await LOSSDK.internalFetcher(`./lead/cam/data`, {
    body: JSON.stringify({
      request_data: {
        refID: refID,
      },
      channel: "W",
    }),
  });
  if (status === "success") {
    const { response_data, ...others } = data;
    return { data: response_data, others };
  } else {
    throw data?.error_data;
  }
};
