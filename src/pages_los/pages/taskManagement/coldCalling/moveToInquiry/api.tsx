import { LOSSDK } from "registry/fns/los";
import { moveToInquiryMetaData } from "./metadata";

export const moveToInquiry = ({ moduleType, refID }) => async (formData) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/moveToLead`,
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

export const getMetadata = () => moveToInquiryMetaData;
