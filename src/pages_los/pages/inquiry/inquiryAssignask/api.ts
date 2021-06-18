import { LOSSDK } from "registry/fns/los";
import { inquiryTaskAssignMetadata } from "./metadata";

export const assignTask = ({ moduleType }) => async (formData) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/post`,
    {
      body: JSON.stringify({
        request_data: {
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

export const getMetadata = () => inquiryTaskAssignMetadata;
