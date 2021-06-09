import { LOSSDK } from "registry/fns/los";

export const assignTask = ({ moduleType, inquiry }) => async (formData) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/assign/data/put`,
    {
      body: JSON.stringify({
        request_data: {
          refID: inquiry,
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
