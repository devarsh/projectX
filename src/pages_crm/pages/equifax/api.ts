import { CRMSDK } from "registry/fns/crm";

export const getCreditScore = async (refID: string) => {
  const { data, status } = await CRMSDK.internalFetcher(
    "./users/healthcheck  ",
    {
      body: JSON.stringify({
        action: "healthcheck",
        request_data: {
          refID: refID,
        },
        channel: "W",
      }),
    }
  );
  if (status === "success") {
    return { status, data: data?.response_data };
  } else {
    return { status, data: data?.error_data };
  }
};
