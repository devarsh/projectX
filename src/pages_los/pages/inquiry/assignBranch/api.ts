import { LOSSDK } from "registry/fns/los";

export const assignBranch = ({ moduleType, inquiries }) => async (formData) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/branch/assign`,
    {
      body: JSON.stringify({
        request_data: {
          refID: inquiries,
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
